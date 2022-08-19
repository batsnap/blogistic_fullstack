from gc import get_objects
from multiprocessing.connection import Client
from urllib import request

from .views import user
from .models import client,operator, order, service, worker
from rest_framework import viewsets,permissions
from django.core.paginator import Paginator
from django.contrib.auth.models import User,Group
from .serializers import clientSerializer,operatorSerializer,workerSerializer,serviceSerializer,orderSerializer,userSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
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
class ClientViewSet(viewsets.ViewSet):

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
		queryset = order.objects.all()
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
	user_reg.id=User.objects.count()+2
	user_reg.email=request.data['email']
	user_reg.username=request.data['username']
	user_reg.first_name=request.data['name']
	user_reg.last_name=request.data['surname']
	user_reg.set_password(request.data['password'])
	user_reg.save()
	my_group = Group.objects.all().filter(name='client')[0]
	my_group.user_set.add(user_reg)	
	my_group.save()
	new_client=client()
	new_client.user=user_reg
	new_client.id_client=client.objects.all().count()+1
	new_client.Full_name=request.data['surname']+' '+request.data['name']
	new_client.birthday=request.data['birthday']
	new_client.save()
	return Response(status=status.HTTP_201_CREATED)
