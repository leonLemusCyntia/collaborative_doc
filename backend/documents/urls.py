from django.urls import path
from django.views.generic.base import View
from . import views

urlpatterns = [
    path('', views.send_some_data, name='document'),
]
