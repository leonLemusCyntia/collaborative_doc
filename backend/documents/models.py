from django.db import models

# Create your models here.

class Document(models.Model):
    content = models.CharField(max_length=30)
    created_date = models.DateField()
    last_modified_date = models.DateField()