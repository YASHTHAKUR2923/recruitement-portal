from django.urls import path
from .views import EmployeeView, EmployeeQueryView, VacancyView


urlpatterns = [
    path('employees', EmployeeView.as_view()),
    path('query_employee', EmployeeQueryView.as_view()),
    path('create_vacancy', VacancyView.as_view()),


]