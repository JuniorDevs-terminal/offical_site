from django.shortcuts import render, redirect
from django.views import View
from django.urls import reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from .models import UserProfile


class HomeView(View):
    """
    Render the home page.
    """
    def get(self, request):
        return render(request, "home.html")

class LoginView(View):
    """
    Render the login page.
    """
    def get(self, request):
        return render(request, "login.html")
    
    def post(self, request):
        # Handle login logic here
        # For now, just render the login page again
        # In a real application, you would authenticate the user here
        # and redirect them to the appropriate page upon success.
        # For example:
        authenticate = UserProfile.objects.filter(email=request.POST.get('email'))
        print(authenticate)
        if not authenticate:
            return render(request, "login.html", {"error": "User does not exist"})
        if authenticate["email","password"] == request.POST.get('email') and request.POST.get('password'):
            return redirect('home')
        else:
            return render(request, "login.html", {"error": "Invalid credentials"})

class LogoutView(View):
    """
    Handle user logout.
    """
    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse_lazy('home'))
    
class SigninView(View):
    """
    Render the sign-in page.
    """
    def get(self, request):
        return render(request, "signin.html")
    
    def post(self, request):
        # Handle sign-in logic here
        # For now, just render the sign-in page again
        # In a real application, you would create a new user here
        # and redirect them to the appropriate page upon success.
        # For example:
            user = UserProfile.objects.create(
                first_name=request.POST.get('firstName'),
                last_name=request.POST.get('lastName'),
                email=request.POST.get('email'),
                phone=str(request.POST.get('phone')),
                company=request.POST.get('company'),
                password=request.POST.get('password'),
                
            )
            if user:
                return redirect('home')
            else: 
                return render(request, "signin.html")

# Create your views here.
