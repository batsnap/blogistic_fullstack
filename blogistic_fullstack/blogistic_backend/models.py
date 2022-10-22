from email.policy import default
from random import choices, randint
from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

class client(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    id_client=models.IntegerField(primary_key=True)
    Full_name=models.CharField(max_length=50)
    birthday=models.DateField()
    phone_number=models.CharField(max_length=14,null=True)
    series_number_passport=models.CharField(max_length=12,null=True)

class worker(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    id_worker=models.IntegerField(primary_key=True)
    Full_name=models.CharField(max_length=50)
    experience=models.CharField(max_length=30)
    position=models.CharField(max_length=30,default='Грузчик',null=True)
    series_number_passport=models.CharField(max_length=30,null=True)
    birthday=models.DateField(null=True)
    phone_number=models.CharField(max_length=14,null=True)

class operator(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    id_operator=models.IntegerField(primary_key=True)
    Full_name=models.CharField(max_length=50)
    experience=models.CharField(max_length=30)
    position=models.CharField(max_length=30,default='Оператор',null=True)
    series_number_passport=models.CharField(max_length=30,null=True)
    birthday=models.DateField(null=True)
    phone_number=models.CharField(max_length=14,null=True)
    
class service(models.Model):
    id_service=models.IntegerField(primary_key=True)
    name=models.CharField(max_length=100)
    cost=models.IntegerField(null=True,default=300)

class order(models.Model):
    type_pay_CHOICES=(
        ('card','Картой'),
        ('cash','Наличные')
    )
    status_order_choices=(
        ('В обработке','В обработке'),
        ('Водитель выехал к начальному адрессу','Водитель выехал к начальному адрессу'),
        ('Водитель приехал к начальному адрессу','Водитель приехал к начальному адрессу'),
        ('Водитель выехал к конечному адрессу','Водитель выехал к конечному адрессу'),
        ('Водитель приехал к конечному адрессу','Водитель приехал к конечному адрессу'),
        ('Заказ завершен','Заказ завершен'),
    )
    status_pay_choices=(
    ('Не оплачено','Не оплачено'),
    ('Оплачено','Оплачено')
    )
    confirmation_order_choices=(
        ('Не подтвержденно','Не подтвержденно'),
        ('Подтвержденно','Подтвержденно'),
        ('Отказано','Отказано')
    )
    id_order=models.IntegerField(primary_key=True)
    id_client=models.ForeignKey('client',on_delete=models.CASCADE)
    id_operator=models.ForeignKey('operator',on_delete=models.SET_NULL,null=True)
    id_worker=models.ForeignKey('worker',on_delete=models.SET_NULL,null=True)
    addressPV=models.CharField(max_length=100)
    addressPD=models.CharField(max_length=100)
    date=models.DateField(null=True)
    time_in=models.TimeField(null=True)
    count_objects=models.IntegerField()
    weight=models.FloatField()
    type_thing=models.CharField(max_length=100)
    confirmation_order=models.CharField(max_length=20,default='Подтвержденно',choices=confirmation_order_choices)
    price=models.IntegerField()
    type_pay=models.CharField(max_length=100,choices=type_pay_CHOICES)
    status_pay=models.CharField(max_length=12,default='Не оплачено',choices=status_pay_choices)
    status_order=models.CharField(max_length=100,default='В обработке',choices=status_order_choices)
    @admin.display(ordering='id_client')
    def name_client(self):
        return self.id_client.Full_name
    @admin.display(ordering='id_operator')
    def name_operator(self):
        return self.id_operator.Full_name
    @admin.display(ordering='id_worker')
    def name_worker(self):
        try:
            return self.id_worker.Full_name
        except:
            return '-'

class Car(models.Model):
    type_car_choieces=(
        ('Tent low 3 meters','Тент низкий 3 метра'),
        ('Van 3 meters','Фургон 3 метра'),
        ('Van high 3 meters','Фургон высокий 3 метра'),
        ('Tent low 4 meters','Тент низкий 4 метра'),
        ('Van 4 meters','Фургон 4 метра'),
        ('Van high 4 meters','Фургон высокий 4 метра'),
        ('Heel','Каблук'),
        ('Tent 3 tons','Тент 3 тонны'),
        ('Van 3 tons','Фургон 3 тонны  '),
        ('Board 3 tons','Борт 3 тонны'),
        ('Refrigerator 3 tons','Рефрижератор 3 тонны'),
        ('Board 5 meters 5 tons','Борт 5 метров 5 тонн'),
        ('Van 5 meters 5 tons','Фургон 5 метров 5тонн'),
        ('Tent 5 meters 5 tons','Тент 5 метров 5 тонн'),
        ('Refrigerator 5 meters 5 tons','Рефрижератор 5 метров 5 тонн'),
        ('Tent 6 meters 10 tons','Тент 6 метров 10 тонн'),
        ('Van 6 meters 10 tons','Фургон 6 метров 10 тонн'),
        ('Board 6 meters 10 tons','Борт 6 метров 10 тонн'),
        ('Refrigerator 6 meters 10 tons','Рефрижератор 6 метров 10 тонн'),
        ('Tent 20 tons','Тент 20 тонн'),
        ('Van 20 tons','Фургон 20 тонн'),
        ('Board 20 tons','Борт 20 тонн'),
        ('Refrigerator 20 tons','Рефрижератор 20 тонн'),

    )
    id_car=models.IntegerField(primary_key=True)
    id_worker=models.ForeignKey('worker',on_delete=models.SET_NULL,null=True,blank=True)
    type_car=models.CharField(max_length=100,choices=type_car_choieces)
    price=models.IntegerField()
    car_number=models.CharField(max_length=10,null=True)
    status=models.CharField(max_length=20,null=True,default='free')
    @admin.display(ordering='id_worker')
    def name_worker(self):
        try:
            return self.id_worker.Full_name
        except:
            return '-'
class additional_service(models.Model):
    number_order=models.ForeignKey(order,on_delete=models.CASCADE)
    number_service=models.ForeignKey(service,on_delete=models.CASCADE)
    @admin.display(ordering='number_order')
    def name_service(self):
        return self.number_service.name
    def id_order_service(self):
        return 'Заказ номер-'+str(self.number_order.id_order)

class Car_order(models.Model):
    number_order=models.ForeignKey(order,on_delete=models.CASCADE)
    number_car=models.ForeignKey(Car,on_delete=models.SET_NULL,null=True,blank=True)
    @admin.display(ordering='number_order1')
    def number_order1(self):
        return self.number_order.id_order
    @admin.display(ordering='number_car1')
    def number_car1(self):
        return 'Номер машины-'+str(self.number_car.id_car)+', Имя водителя-'+self.number_car.id_worker.Full_name