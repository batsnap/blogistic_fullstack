from django.contrib import admin
from .models import client, worker,operator,service,order,Car,Car_order,additional_service

class clientAdmin(admin.ModelAdmin):
    list_display = ('id_client','Full_name','birthday','series_number_passport','phone_number')
    search_fields = ('Full_name','id_client')
    ordering=('id_client',)
admin.site.register(client,clientAdmin)

class workerAdmin(admin.ModelAdmin):
    list_display = ('id_worker','Full_name','experience','position','phone_number','series_number_passport','birthday')
    search_fields = ('Full_name','id')
    ordering=('id_worker',)
admin.site.register(worker,workerAdmin)

class operatorAdmin(admin.ModelAdmin):
    list_display = ('id_operator','Full_name','experience','position','phone_number','series_number_passport','birthday')
    search_fields = ('Full_name','id')
    ordering=('id_operator',)
admin.site.register(operator,operatorAdmin)

class serviceAdmin(admin.ModelAdmin):
    list_display=('id_service','name','cost')
    ordering=('id_service',)
admin.site.register(service,serviceAdmin)

class orderAdmin(admin.ModelAdmin):
    list_display = ('id_order','name_client','name_operator','name_worker','addressPV','addressPD','date','time_in','count_objects','weight','type_thing','confirmation_order','price','type_pay','status_pay','status_order')
    ordering=('id_order',)
admin.site.register(order,orderAdmin)

class Car_serviceAdmin(admin.ModelAdmin):
    list_display=('id_car','name_worker','type_car','price','car_number','status')
    ordering=('id_car',)
admin.site.register(Car,Car_serviceAdmin)

class Car_orderAdmin(admin.ModelAdmin):
    list_display=('number_order1','number_car1')
    ordering=('number_order',)
admin.site.register(Car_order,Car_orderAdmin)

class additional_serviceAdmin(admin.ModelAdmin):
    list_display=('id_order_service','name_service')
    ordering=('number_order',)
admin.site.register(additional_service,additional_serviceAdmin)
# Register your models here.
