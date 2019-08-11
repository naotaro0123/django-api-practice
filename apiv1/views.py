from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from shop.models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
  # BookオブジェクトのCRUDを行うAPI
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permissions_classes = (IsAuthenticatedOrReadOnly,)