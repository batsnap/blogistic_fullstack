from django.contrib import admin
from django.urls import path,include 
from blogistic_backend import views                        
urlpatterns = [
	path('admin/', admin.site.urls),
	path('',include('blogistic_backend.urls'))
]