from django.shortcuts import render
from .models import Employee, Vacancy
from .serializers import EmployeeSerializer, VacancySerializer
from rest_framework import status


from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_framework.views import APIView

class EmployeeView(APIView):
    def get(self, request, *args, **kwargs):
        data = Employee.objects.all()
        serializer = EmployeeSerializer(data, many=True)
        return Response(serializer.data, status=200)


class EmployeeQueryView(APIView):
    def post(self, request, *args, **kwargs):
        card_no = request.data['card_no']

        try: 
            data = Employee.objects.get(card_no=card_no)
            
            result = {
                "name": data.name,
                "designation": data.designation,
                "card_no": data.card_no,
                "department": data.department,
                "mobile_no": data.mobile_no,
                "email": data.email
                }

        except Exception as e:
            print(f"exception- : {e}")
            return Response({"Message": str(e)})
        
        return Response(result, status=200)
    

class VacancyView(APIView):
    def post(self, request, *args, **kwargs):
        
        __card_no = request.data.get('card_no')
        print(__card_no)
        job_title = request.data.get('job_title')
        location = request.data.get('location')
        roles_and_responsibility = request.data.get('roles_and_responsibility')
        requirements = request.data.get('requirements')

        if not all([__card_no, job_title, location, roles_and_responsibility, requirements]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the Vacancy object
        try:
            # get employee
            try: 
                get_employee = Employee.objects.get(card_no=__card_no)
            except Exception as e:
                print(f"exception- : {e}")
                return Response({"Message": str(e)})
            

            vacancy = Vacancy.objects.create(
                employee=get_employee,
                job_title=job_title,
                location=location,
                roles_and_responsibility=roles_and_responsibility,
                requirements=requirements
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Return the created vacancy's details
        return Response(
            {
                "message": "Vacancy created successfully.",
                "vacancy_id": vacancy.id,
                "vacancy_jobtitle": vacancy.job_title
            },
            status=status.HTTP_201_CREATED,
        )



