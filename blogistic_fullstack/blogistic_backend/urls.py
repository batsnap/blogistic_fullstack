from django.urls import path
from rest_framework import routers
from .api import *
from . import views
from rest_framework_simplejwt import views as jwt_views
router=routers.DefaultRouter()
router.register('api/Clients',ClientViewSet,basename='client')
router.register('api/Operators',OperatorViewSet,basename='client')
router.register('api/Workers',WorkerViewSet,basename='client')
router.register('api/Service',ServiceViewSet,basename='client')
router.register('api/Orders',OrderViewSet,basename='client')
router.register('api/Users',UserViewSet,basename='client')
router.register('api/Orders_client',OrdersClientViewSet,basename='client')
router.register('api/Cars',CarViewSet,basename='car')
urlpatterns=router.urls+[
	path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
	path('api/registration/',registraion,name='registration'),
	path('api/EditProfile/',EditProfile,name='registraion'),
	path('api/EditProfileWorker/',EditProfileWorker,name='EditProfileWorker'),	
	path('api/CheckToken',views.CheckToken,name='CheckToken'),
	path('gen_base',views.generation_base),
	path('api/reg_check_username',reg_check_username,name='CheckUsername'),
	path('api/reg_check_email',reg_check_email,name='CheckEmail'),
	path('api/get_car_price',get_car_price,name='CheckEmail'),
	path('api/path_length',path_length,name='CheckEmail'),
	path('api/MakeOrder', MakeOrder,name='MakeOrder'),
	path('gen_base',views.generation_base,name='gen_base'),
	path('api/count_free_cars',count_free_cars,name='count_free_cars'),
	path('api/Free_Workers',Free_Workers,name='count_free_cars'),
	path('api/EditOrder',EditOrder,name='count_free_cars'),
	path('api/ListOrderProcessing/',ListOrderProcessing,name='OrderProcessing'),
	path('api/NewPassword/',NewPassword,name='NewPassword'),
	path('api/GetTypeCar/',GetTypeCar,name='GetTypeCar'),
	path('api/GetUserId/',GetUserId,name='GetUserId'),
	path('api/FireWorker/',FireWorker,name='FireWorker'),
	path('api/RegistraionWorker/',RegistraionWorker,name='RegistraionWorker'),
	path('api/AddCar/',AddCar,name='AddCar'),
	path('api/ListFreeWorkers/',ListFreeWorkers,name='ListFreeWorkers'),
	path('api/EditCar/',EditCar,name='EditCar'),
	path('api/DeleteCar/',DeleteCar,name='DeleteCar'),
	path('api/AllWorkerOrders/',AllWorkerOrders,name='AllWorkerOrders'),
	path('api/TodayOrders/',TodayOrders,name='TodayOrders'),
	path('api/ChangeStatusOrder/',ChangeStatusOrder,name='ChangeStatusOrder'),
	path('api/ChangeWorker/',ChangeWorker,name='ChangeWorker'),
	path('api/ChangeStatusPay/',ChangeStatusPay,name='ChangeStatusPay'),
	path('api/DeleteOrder/',RemoveOrder,name='RemoveOrder'),
	path('api/PayOrder/',PayOrder,name='PayOrder'),
	path('api/CheckPass/',CheckPass,name='CheckPass'),
	
	
	
	
	
	
	
	
	]
    #path(, views.clients_list),
	#path('api/Clients/<int:pk>', views.clients_detail),
	#path('api/Operators/', views.operators_list),
	#path('api/user', views.user, name='user'),
	#path('backend/',include('blogistic_backend.urls')),bis
