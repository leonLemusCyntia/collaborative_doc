from django.db import models

# Create your models here.

from django.db import models

class Document(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    modified_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
