from dataclasses import field, fields
from email.policy import default
from pyexpat import model
from tokenize import group
from rest_framework import serializers
from .models import client, operator, order, service,worker,Car
from django.contrib.auth.models import User,Group
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username', 'first_name', 'last_name', 'email', 'date_joined','groups']
class clientSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    username=serializers.CharField(source="user.username")
    class Meta:
        model = client
        fields = ('__all__')
class operatorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    username=serializers.CharField(source="user.username")
    class Meta:
        model = operator
        fields = ('__all__')
class workerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    username=serializers.CharField(source="user.username")
    class Meta:
        model = worker
        fields = ('__all__')
class registrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    username=serializers.CharField()
    password=serializers.CharField()
    password_confirmation=serializers.CharField()
    class Meta:
        model = client
        fields = ('Full_name','birthday','Card_number','password','username','password_confirmation','email')
class serviceSerializer(serializers.ModelSerializer):
    class Meta:
        model=service
        fields=('__all__')
class orderSerializer(serializers.ModelSerializer):
    name_client=serializers.CharField(source="id_client.Full_name")
    user_client=serializers.CharField(source="id_client.user.id")
    name_worker=serializers.CharField(source="id_worker.Full_name",default='-')
    user_worker=serializers.CharField(source="id_worker.user.id",default='-')
    name_operator=serializers.CharField(source="id_operator.Full_name")
    user_operator=serializers.CharField(source="id_operator.user.id")
    class Meta:
        model=order
        fields=('__all__')
class carSerializer(serializers.ModelSerializer):
    name_worker=serializers.CharField(source="id_worker.Full_name",default='-')
    class Meta:
        model = Car
        fields = ('__all__')