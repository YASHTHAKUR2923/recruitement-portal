from rest_framework.validators import UniqueValidator
from .models import Employee, Vacancy
from rest_framework import serializers



class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        exclude = []
        model = Employee
        # depth = 2


class VacancySerializer(serializers.ModelSerializer):

    class Meta:
        exclude = []
        model = Vacancy
        depth = 2