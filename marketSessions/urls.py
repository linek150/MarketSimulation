from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns=[
    path('', views.index,name='index'),
    path('serviceWorker.js',TemplateView.as_view(
    template_name='serviceWorker.js',
    content_type='application/javascript',
    ),name='sw.js'),
]
