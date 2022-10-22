from datetime import date
from random import randint
from .models import Car_order, client,operator, order, service, worker,Car
from rest_framework import viewsets,permissions
from django.contrib.auth.models import User,Group
from .serializers import clientSerializer,operatorSerializer,workerSerializer,serviceSerializer,orderSerializer,userSerializer,carSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from . import length
from django.db.models import Count,Min, Sum, Avg,Max
class UserViewSet(viewsets.ViewSet):
	
	def list(self, request):
		queryset = User.objects.all()
		serializer = userSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		groups=['Clients','Operators','Workers']
		queryset = User.objects.all()
		user = get_object_or_404(queryset, id=pk)
		serializer = userSerializer(user)
		k=serializer.data
		k['groups']=groups[serializer.data['groups'][0]-1]
		return Response(k)
class CarViewSet(viewsets.ViewSet):

	def list(self, request):
		queryset = Car.objects.all()
		serializer = carSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = Car.objects.all()
		car = get_object_or_404(queryset, id_car=pk)
		serializer = carSerializer(car)
		return Response(serializer.data)

class ClientViewSet(viewsets.ViewSet):
	permission_classes = [permissions.IsAuthenticated]
	def list(self, request):
		queryset = client.objects.all()
		serializer = clientSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = client.objects.all()
		user = get_object_or_404(queryset, user=pk)
		serializer = clientSerializer(user)
		return Response(serializer.data)
class OperatorViewSet(viewsets.ViewSet):

	def list(self, request):
		queryset = operator.objects.all()
		serializer = operatorSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = operator.objects.all()
		user = get_object_or_404(queryset, user=pk)
		serializer = operatorSerializer(user)
		return Response(serializer.data)
class WorkerViewSet(viewsets.ViewSet):

	def list(self, request):
		queryset = worker.objects.all()
		serializer = workerSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = worker.objects.all()
		user = get_object_or_404(queryset, user=pk)
		serializer = workerSerializer(user)
		return Response(serializer.data)
class ServiceViewSet(viewsets.ViewSet):

	def list(self, request):
		queryset = service.objects.all()
		serializer = serviceSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = service.objects.all()
		user = get_object_or_404(queryset, user=pk)
		serializer = serviceSerializer(user)
		return Response(serializer.data)
class OrderViewSet(viewsets.ViewSet):

	def list(self, request):
		queryset = order.objects.all().order_by('id_order')
		serializer = orderSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = order.objects.all()
		orders = get_object_or_404(queryset, id_order=pk)
		serializer = orderSerializer(orders)
		return Response(serializer.data)
class OrdersClientViewSet(viewsets.ViewSet):

	def list(self, request):
		queryset = order.objects.all()
		serializer = orderSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request,pk=None):
		queryset = order.objects.all().filter(id_client=client.objects.get(user=pk))
		serializer = orderSerializer(queryset,many=True)
		return Response(serializer.data)
@api_view(['POST'])
def reg_check_username(request):
	if User.objects.all().filter(username=request.data['username']).count()==0:
		return Response(status=status.HTTP_200_OK)
	return Response(status=status.HTTP_306_RESERVED)

@api_view(['POST'])
def reg_check_email(request):
	if User.objects.all().filter(email=request.data['email']).count()==0:
		return Response(status=status.HTTP_200_OK)
	return Response(status=status.HTTP_306_RESERVED)

@api_view(['POST'])
def registraion(request):
	user_reg=User()
	user_reg.id=User.objects.all().order_by('id').reverse()[0].id+1
	user_reg.email=request.data['email']
	user_reg.username=request.data['username']
	user_reg.first_name=request.data['name']
	user_reg.last_name=request.data['surname']
	if 'password' in request.data:
		user_reg.set_password(request.data['password'])
	else:
		user_reg.set_password('1111')
	user_reg.save()
	my_group = Group.objects.all().filter(name='client')[0]
	my_group.user_set.add(user_reg)	
	my_group.save()
	new_client=client()
	new_client.user=user_reg
	new_client.id_client=client.objects.all().order_by('id_client').reverse()[0].id_client+1
	new_client.Full_name=request.data['surname']+' '+request.data['name']
	new_client.birthday=request.data['birthday']
	new_client.series_number_passport=request.data['series_number_passport']
	new_client.phone_number=request.data['phone_number']
	new_client.save()
	return Response(status=200,data={'id_user':user_reg.id})
	

@api_view(['POST'])
def EditProfile(request):	
	user_reg=User.objects.get(id=request.data['user'])
	if len(request.data['email'])>0 and user_reg.email!=request.data['email']:
		user_reg.email=request.data['email']
	if len(request.data['username'])>0 and user_reg.username!=request.data['username']:
		user_reg.username=request.data['username']
	if len(request.data['Full_name'])>0 and user_reg.first_name!=request.data['Full_name'].split(' ')[1]:
		user_reg.first_name=request.data['Full_name'].split(' ')[1]
	if len(request.data['Full_name'])>0 and user_reg.last_name!=request.data['Full_name'].split(' ')[0]:
		user_reg.last_name=request.data['Full_name'].split(' ')[0]
	user_reg.save()
	new_client=client.objects.get(user=user_reg)
	if len(request.data['Full_name'])>0 and new_client.Full_name!=request.data['Full_name']:
		new_client.Full_name=request.data['Full_name']
	if len(request.data['birthday'])>0 and new_client.birthday!=request.data['birthday']:
		new_client.birthday=request.data['birthday']
	if len(request.data['series_number_passport'])>0 and new_client.series_number_passport!=request.data['series_number_passport']:
		new_client.series_number_passport=request.data['series_number_passport']
	if len(request.data['phone_number'])>0 and new_client.phone_number!=request.data['phone_number']:
		new_client.phone_number=request.data['phone_number']
	new_client.save()
	return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def EditProfileWorker(request):	
	user_reg=User.objects.get(id=request.data['user'])
	if len(request.data['email'])>0 and user_reg.email!=request.data['email']:
		user_reg.email=request.data['email']
	if len(request.data['username'])>0 and user_reg.username!=request.data['username']:
		user_reg.username=request.data['username']
	if len(request.data['Full_name'])>0 and user_reg.first_name!=request.data['Full_name'].split(' ')[1]:
		user_reg.first_name=request.data['Full_name'].split(' ')[1]
	if len(request.data['Full_name'])>0 and user_reg.last_name!=request.data['Full_name'].split(' ')[0]:
		user_reg.last_name=request.data['Full_name'].split(' ')[0]
	user_reg.save()
	new_client=worker.objects.get(user=user_reg)
	if len(request.data['Full_name'])>0 and new_client.Full_name!=request.data['Full_name']:
		new_client.Full_name=request.data['Full_name']
	if len(request.data['birthday'])>0 and new_client.birthday!=request.data['birthday']:
		new_client.birthday=request.data['birthday']
	if len(request.data['series_number_passport'])>0 and new_client.series_number_passport!=request.data['series_number_passport']:
		new_client.series_number_passport=request.data['series_number_passport']
	if len(request.data['phone_number'])>0 and new_client.phone_number!=request.data['phone_number']:
		new_client.phone_number=request.data['phone_number']
	if len(request.data['position'])>0 and new_client.position!=request.data['position']:
		new_client.position=request.data['position']	
	new_client.save()
	return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def get_car_price(request):
	car_price=Car.objects.all().filter(type_car=request.data['type_car'])[0]
	return Response({'price':car_price.price})


@api_view(['POST'])
def path_length(request):
	return Response({'length':length.length_all(request.data['addressOUT'],request.data['addressIN'])})

@api_view(['GET'])
def count_free_cars(request):
	print(User.objects.all().order_by('id').reverse()[0].id+1)
	result = Car.objects.values('type_car').annotate(count=Count('type_car')).filter(status='free').order_by('count').reverse()
	return Response(result)

@api_view(['POST'])
def MakeOrder(request):
	new_order=order()
	new_order.id_order=order.objects.all().order_by('id_order').reverse()[0].id_order+1
	new_order.id_client=client.objects.get(user=request.data['id_user'])
	if 'id_user_operator' in request.data:
		new_order.id_operator=operator.objects.all().filter(user=request.data['id_user_operator'])[0]
	else:
		new_order.id_operator=operator.objects.all()[randint(0,operator.objects.all().count()-1)]
	new_order.id_worker=worker.objects.all().filter(id_worker=Car.objects.all().filter(status='free').filter(type_car=request.data['type_car'])[0].id_worker.id_worker)[0]
	new_order.addressPD=request.data['addressPD']
	new_order.addressPV=request.data['addressPV']
	new_order.date=request.data['date']
	new_order.time_in=request.data['time_in']
	new_order.count_objects=request.data['count_objects']
	new_order.weight=request.data['weight']
	new_order.type_thing=request.data['type_thing']
	new_order.price=request.data['price']
	new_order.confirmation_order='Не подтвержденно'
	new_order.type_pay='card'
	new_order.status_order='В обработке'
	new_order.save()
	new_car_order=Car_order()
	new_car_order.number_order=new_order
	new_car_order.number_car=Car.objects.all().filter(id_worker=new_order.id_worker)[0]
	new_car_order.save()
	status_car=Car.objects.all().filter(id_worker=new_order.id_worker)[0]
	status_car.status='in_work'
	status_car.save()


	return Response(status=status.HTTP_201_CREATED)

@api_view(['GET'])
def Free_Workers(request):
	result = Car.objects.all().filter(status='free',id_worker__isnull=False).order_by('id_worker')
	serializer = carSerializer(result, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def EditOrder(request):
	edited_order=order.objects.all().filter(id_order=request.data['id_order'])[0]
	if edited_order.id_worker!=request.data['id_worker']:
		status_car=Car.objects.all().filter(id_worker=edited_order.id_worker)[0]
		status_car.status='free'
		status_car.save()
		edited_order.id_worker=worker.objects.all().filter(id_worker=request.data['id_worker'])[0]
	if edited_order.addressPD!=request.data['addressPD']:
		edited_order.addressPD=request.data['addressPD']
	if edited_order.addressPV!=request.data['addressPV']:
		edited_order.addressPV=request.data['addressPV']
	if edited_order.date!=request.data['date']:
		edited_order.date=request.data['date']
	if edited_order.time_in!=request.data['time_in']:
		edited_order.time_in=request.data['time_in']
	if edited_order.count_objects!=request.data['count_objects']:
		edited_order.count_objects=request.data['count_objects']
	if edited_order.weight!=request.data['weight']:
		edited_order.weight=request.data['weight']
	if edited_order.type_thing!=request.data['type_thing']:
		edited_order.type_thing=request.data['type_thing']
	if edited_order.price!=request.data['price']:
		edited_order.price=request.data['price']
	if edited_order.confirmation_order!=request.data['confirmation_order']:
		edited_order.confirmation_order=request.data['confirmation_order']
	if edited_order.type_pay!=request.data['type_pay']:
		edited_order.type_pay=request.data['type_pay']
	if edited_order.status_order!=request.data['status_order']:
		edited_order.status_order=request.data['status_order']
	edited_order.save()
	new_car_order=Car_order.objects.all().filter(number_order=edited_order)[0]
	new_car_order.number_car=Car.objects.all().filter(id_worker=edited_order.id_worker)[0]
	new_car_order.save()
	status_car=Car.objects.all().filter(id_worker=edited_order.id_worker)[0]
	status_car.status='in_work'
	status_car.save()
	return Response(status=status.HTTP_201_CREATED)
@api_view(['GET'])
def ListOrderProcessing(request):
	OrdersOperator=order.objects.all().filter(id_operator=operator.objects.all().filter(user=request.GET['id_operator'])[0])
	print(OrdersOperator)
	result=orderSerializer(OrdersOperator,many=True)
	return Response(result.data)
@api_view(['GET'])
def OrderProcessing(request):
	OrdersOperator=order.objects.all().filter(id_operator=operator.objects.all().filter(user=request.GET['id_operator'])[0])
	result=orderSerializer(OrdersOperator,many=True)
	return Response(result.data)

@api_view(['POST'])
def NewPassword(request):
	user=User.objects.get(id=request.data['id_user'])
	user.set_password('0000')
	user.save()
	return Response(status=200)
	
@api_view(['POST'])
def GetTypeCar(request):
	cars={'household_goods/1000':['Heel',],
'household_goods/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'household_goods/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'household_goods/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'household_goods/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'household_goods/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'perishable_food/1000':['Heel',],
'perishable_food/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'perishable_food/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'perishable_food/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'perishable_food/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'perishable_food/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'food/1000':['Heel',],
'food/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'food/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'food/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'food/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'food/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'Bulky_building_materials/1000':['Heel',],
'Bulky_building_materials/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'Bulky_building_materials/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'Bulky_building_materials/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'Bulky_building_materials/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'Bulky_building_materials/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'office_furniture/1000':['Heel',],
'office_furniture/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'office_furniture/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'office_furniture/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'office_furniture/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'office_furniture/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'furniture/1000':['Heel',],
'furniture/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'furniture/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'furniture/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'furniture/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'furniture/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'building_materials/1000':['Heel',],
'building_materials/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'building_materials/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'building_materials/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'building_materials/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'building_materials/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'clothes/1000':['Heel',],
'clothes/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'clothes/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'clothes/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'clothes/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'clothes/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
}
	car=Car.objects.all().filter(status='free')
	k=[]
	if float(request.data['weight'])<1000:
		for i in cars[request.data['type_thing']+'/'+'1000']:

			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(request.data['weight'])<1500:
		for i in cars[request.data['type_thing']+'/'+'1500']:

			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(request.data['weight'])<3000:
		for i in cars[request.data['type_thing']+'/	3000']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(request.data['weight'])<5000:
		for i in cars[request.data['type_thing']+'/'+'5000']:

			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(request.data['weight'])<10000:
		for i in cars[request.data['type_thing']+'/'+'10000']:

			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(request.data['weight'])<20000:
		for i in cars[request.data['type_thing']+'/'+'20000']:

			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	type_car={'type_car':k[0],
			'price':Car.objects.all().filter(type_car=k[0])[0].price}
	return Response(data=type_car,status=200)


@api_view(['POST'])
def GetUserId(request):
	print(request.data)
	if request.data['type_find']=='username':

		if User.objects.all().filter(username=request.data['find_word']).count()==1:
			user_id=User.objects.all().filter(username=request.data['find_word'])[0]
			return Response(status=200,data={'id_user':user_id.id})
		else:
			return Response(status=300)
	elif request.data['type_find']=='email':
		if User.objects.all().filter(email=request.data['find_word']).count()==1:
			user_id=User.objects.all().filter(email=request.data['find_word'])[0]
			return Response(status=200,data={'id_user':user_id.id})
		else:
			return Response(status=300)
	elif request.data['type_find']=='phone_number':
		if client.objects.all().filter(phone_number=request.data['find_word']).count()==1:
			user_id=client.objects.all().filter(phone_number=request.data['find_word'])[0]
			return Response(status=200,data={'id_user':user_id.user.id})
		else:
			return Response(status=300)

@api_view(['POST'])
def FireWorker(request):
	try:
		fired_worker=User.objects.get(id=request.data['id_user'])
		fired_worker.delete()
		return Response(status=200)
	except:
		return Response(status=400)


@api_view(['POST'])
def RegistraionWorker(request):
	user_reg=User()
	user_reg.id=User.objects.all().order_by('id').reverse()[0].id+1
	user_reg.email=request.data['email']
	user_reg.username=request.data['username']
	user_reg.first_name=request.data['Full_name'].split(' ')[0]
	user_reg.last_name=request.data['Full_name'].split(' ')[1]
	user_reg.set_password('1111')
	user_reg.save()
	my_group = Group.objects.all().filter(name='worker')[0]
	my_group.user_set.add(user_reg)	
	my_group.save()
	new_worker=worker()
	new_worker.user=user_reg
	new_worker.id_worker=worker.objects.all().order_by('id_worker').reverse()[0].id_worker+1
	new_worker.Full_name=request.data['Full_name']
	new_worker.experience=request.data['experience']
	new_worker.position=request.data['position']
	new_worker.series_number_passport=request.data['series_number_passport']
	new_worker.birthday=request.data['birthday']
	new_worker.phone_number=request.data['phone_number']
	new_worker.save()
	return Response(status=200,data={'id_user':user_reg.id})

@api_view(['POST'])
def AddCar(request):
	new_car=Car()
	new_car.id_car=Car.objects.all().order_by('id_car').reverse()[0].id_car+1
	new_car.type_car=request.data['type_car']
	new_car.price=request.data['price']
	new_car.car_number=request.data['car_number']
	new_car.save()
	return Response(status=200)

@api_view(['GET'])
def ListFreeWorkers(request):
	list_worker_free=[]
	list_worker=worker.objects.all()
	for i in list_worker:
		if Car.objects.all().filter(id_worker=i).count()!=1:
			list_worker_free.append(workerSerializer(i).data)
	return Response(status=200,data=list_worker_free)

@api_view(['POST'])
def EditCar(request):
	car=Car.objects.all().filter(id_car=request.data['id_car'])[0]
	if request.data['status']!=car.status:
		car.status=request.data['status']
	if request.data['price']!=car.price:
		car.price=request.data['price']
	if request.data['id_worker']!=car.id_worker:
		if request.data['id_worker']!='null':
			car.id_worker=worker.objects.all().filter(id_worker=request.data['id_worker'])[0]
		else:
			car.id_worker=None
	if request.data['car_number']!=car.car_number:
		car.car_number=request.data['car_number']
	car.save()
	return Response(status=200)

@api_view(['POST'])
def DeleteCar(request):
	try:
		car=Car.objects.get(id_car=request.data['id_car'])
		car.delete()
		return Response(status=200)
	except:
		return Response(status=400)

@api_view(['POST'])
def AllWorkerOrders(request):
	print(request.data['id_user'])
	worker_orders=order.objects.all().filter(id_worker=worker.objects.get(user=request.data['id_user']))
	return Response(status=200,data=orderSerializer(worker_orders,many=True).data)


@api_view(['POST'])
def TodayOrders(request):
	worker_orders=order.objects.all().filter(id_worker=worker.objects.get(user=request.data['id_user'])).filter(date=date.today())
	return Response(status=200,data=orderSerializer(worker_orders,many=True).data)

@api_view(['POST'])
def ChangeStatusOrder(request):
	order_change=order.objects.all().filter(id_order=request.data['id_order'])[0]
	order_change.status_order=request.data['status_order']
	order_change.save()
	return Response(status=200)
@api_view(['POST'])
def ChangeWorker(request):
	cars={'household_goods/1000':['Heel',],
'household_goods/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'household_goods/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'household_goods/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'household_goods/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'household_goods/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'perishable_food/1000':['Heel',],
'perishable_food/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'perishable_food/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'perishable_food/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'perishable_food/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'perishable_food/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'food/1000':['Heel',],
'food/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'food/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'food/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'food/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'food/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'Bulky_building_materials/1000':['Heel',],
'Bulky_building_materials/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'Bulky_building_materials/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'Bulky_building_materials/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'Bulky_building_materials/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'Bulky_building_materials/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'office_furniture/1000':['Heel',],
'office_furniture/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'office_furniture/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'office_furniture/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'office_furniture/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'office_furniture/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'furniture/1000':['Heel',],
'furniture/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'furniture/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'furniture/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'furniture/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'furniture/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'building_materials/1000':['Heel',],
'building_materials/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'building_materials/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'building_materials/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'building_materials/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'building_materials/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
'clothes/1000':['Heel',],
'clothes/1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters',],
'clothes/3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons',],
'clothes/5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons',],
'clothes/10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons',],
'clothes/20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons',],
}
	car=Car.objects.all().filter(status='free')
	order_to_change=order.objects.all().filter(id_order=request.data['id_order'])[0]
	k=[]
	if float(order_to_change.weight)<1000:
		for i in cars[order_to_change.type_thing+'/'+'1000']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(order_to_change.weight)<1500:
		for i in cars[order_to_change.type_thing+'/'+'1500']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(order_to_change.weight)<3000:
		for i in cars[order_to_change.type_thing+'/	3000']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(order_to_change.weight)<5000:
		for i in cars[order_to_change.type_thing+'/'+'5000']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(order_to_change.weight)<10000:
		for i in cars[order_to_change.type_thing+'/'+'10000']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	elif int(order_to_change.weight)<20000:
		for i in cars[order_to_change.type_thing+'/'+'20000']:
			if Car.objects.all().filter(type_car=i).filter(status='free').count()>0:
				k.append(i)
	car=Car.objects.all().filter(status='free').filter(type_car=k[0])[0]
	old_worker=order_to_change.id_worker
	order_to_change.id_worker=car.id_worker
	order_to_change.save()
	car.status='in work'
	car.save()
	old_car=Car.objects.all().filter(id_worker=old_worker)[0]
	old_car.status='free'
	old_car.save()
	return Response(status=200)
@api_view(['POST'])
def ChangeStatusPay(request):
	order_to_change=order.objects.all().filter(id_order=request.data['id_order'])[0]
	order_to_change.status_pay=request.data['status_pay']
	order_to_change.save()
	return Response(status=200)