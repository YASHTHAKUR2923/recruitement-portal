from django.urls import path
from .views import EmployeeView, EmployeeQueryView, VacancyView, ApproveVacancyView


urlpatterns = [
    path('employees', EmployeeView.as_view()),
    path('query_employee', EmployeeQueryView.as_view()),
    path('create_vacancy', VacancyView.as_view()),
    path('approve_vacancy/<int:vacancy_id>/', ApproveVacancyView.as_view()), # New path for approving vacancies


]