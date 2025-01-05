from django.contrib import admin
from .models import Employee, Vacancy

@admin.register(Employee)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile_no', 'card_no', 'department', 'email')

@admin.register(Vacancy)
class UserAdmin(admin.ModelAdmin):
    list_display = ('employee', 'job_title', 'location', 'roles_and_responsibility', 'requirements', 'created_at')

