
from django.contrib import admin
from django.urls import path
from main.views import *

#add static and media files serving in development
from django.conf import settings
from django.conf.urls.static import static
 
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", HomeView.as_view(),name="home"),  # create def home in main/views.py
    path("login/", LoginView.as_view(),name="login"),  # create def login in main/views.py
    path("logout/", LogoutView.as_view(), name='logout'),  # create def logout in main/views.py
    path("signin/", SigninView.as_view(),name="signin"),  # create def signin in main/views.py    
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


