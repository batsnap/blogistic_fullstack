from multiprocessing.connection import Client
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from django.contrib.auth.models import User,Group
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import client,operator,worker,order,additional_service,service,Car,Car_order
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from random import randint


@api_view()
def user(request: Request):
    return Response({'data': userSerializer(request.user).data})

def generation_base(d):
	a=[]
	users_in_group_operator= Group.objects.get(name="operator").user_set.all()
	for i in users_in_group_operator:
		a.append(i.id)
	users_in_group_client= Group.objects.get(name="client").user_set.all()
	for i in users_in_group_client:
		a.append(i.id)
	k=[i.id for i in User.objects.all()]
	for i in range(len(a)):
		if a[i] in k:
			k.remove(a[i])
	print(k)
	group = Group.objects.get(name='worker')
	for i in range(len(k)):
		c=User.objects.all().filter(id=k[i])[0]
		c.groups.add(group)
		c.save()
	return Response(status=status.HTTP_200_OK)
	client
	
@api_view(['GET', 'POST'])
def clients_list(request):
	"""
 List  clients, or create a new client.
 """
	if request.method == 'GET':
		data = []
		nextPage = 1
		previousPage = 1
		clients = client.objects.all()
		page = request.GET.get('page', 1)
		paginator = Paginator(clients, 100)
		try:
			data = paginator.page(page)
		except PageNotAnInteger:
			data = paginator.page(1)
		except EmptyPage:
			data = paginator.page(paginator.num_pages)

		serializer = clientSerializer(data,context={'request': request} ,many=True)
		if data.has_next():
			nextPage = data.next_page_number()
		if data.has_previous():
			previousPage = data.previous_page_number()

		return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/clients/?page=' + str(nextPage), 'prevlink': '/api/clients/?page=' + str(previousPage)})

	elif request.method == 'POST':
		serializer = clientSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registraion(request):
	if request.method=='POST':
		serializer = registrationSerializer(data=request.data)
		if serializer.is_valid():
			print(serializer.data)
			user=User()
			user.id=User.objects.all().count()+1
			user.username=serializer.data['username']
			user.set_password(serializer.data['password'])
			user.email=serializer.data['email']
			user.save()
			Client=client()
			Client.user=user
			Client.id_client=client.objects.all().count()+1
			Client.Full_name=serializer.data['Full_name']
			Client.birthday=serializer.data['birthday']
			Client.Card_number=serializer.data['Card_number']
			Client.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def CheckToken(request):
	if request.user.is_authenticated:
		return Response(status=status.HTTP_200_OK)
	else:
		return Response(status=status.HTTP_401_UNAUTHORIZED)


def operators_list(request):
	"""
 List  clients, or create a new client.
 """
	if request.method == 'GET':
		data = []
		nextPage = 1
		previousPage = 1
		Operators = operator.objects.all()
		page = request.GET.get('page', 1)
		paginator = Paginator(Operators, 100)
		try:
			data = paginator.page(page)
		except PageNotAnInteger:
			data = paginator.page(1)
		except EmptyPage:
			data = paginator.page(paginator.num_pages)

		serializer = operatorSerializer(data,context={'request': request} ,many=True)
		if data.has_next():
			nextPage = data.next_page_number()
		if data.has_previous():
			previousPage = data.previous_page_number()

		return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/Operators/?page=' + str(nextPage), 'prevlink': '/api/Operators/?page=' + str(previousPage)})

	elif request.method == 'POST':
		serializer = operatorSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

