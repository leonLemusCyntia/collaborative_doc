from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import DocumentViewSet, send_some_data


documents_list = DocumentViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
document_detail = DocumentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('test/', send_some_data),
    path('', documents_list, name='documents-list'),
    path('<int:pk>/', document_detail, name='document_detail-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
