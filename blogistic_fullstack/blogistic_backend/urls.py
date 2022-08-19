from django.urls import path
from rest_framework import routers
from .api import ClientViewSet,OperatorViewSet,WorkerViewSet,ServiceViewSet,OrderViewSet,UserViewSet,OrdersClientViewSet,reg_check_username,reg_check_email,registraion
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
#router.register('login', views.login_view),
urlpatterns=router.urls+[
	path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
	path('api/registration/',registraion,name='registraion'),
	path('api/CheckToken',views.CheckToken,name='CheckToken'),
	path('gen_base',views.generation_base),
	path('api/reg_check_username',reg_check_username,name='CheckUsername'),
	path('api/reg_check_email',reg_check_email,name='CheckEmail'),
	]
    #path(, views.clients_list),
	#path('api/Clients/<int:pk>', views.clients_detail),
	#path('api/Operators/', views.operators_list),
	#path('api/user', views.user, name='user'),
	#path('backend/',include('blogistic_backend.urls')),bis
