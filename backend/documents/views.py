from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .models import Document
from .serializers import DocumentSerializer


@api_view(['GET'])
def send_some_data(request):
    return Response({
        "data": "Hello from django backend"
    })

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

