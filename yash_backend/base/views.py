from django.shortcuts import render
from .models import Employee, Vacancy
from .serializers import EmployeeSerializer, VacancySerializer
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
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
        department   = request.data.get ('department')
        # SubDepartment   = request.data.get ('SubDepartment')
      

        if not all([__card_no, job_title, location, roles_and_responsibility, requirements,department]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the Vacancy object
        try:
            # get employee
            try: 
                __get_employee = Employee.objects.get(card_no=__card_no)
            except Exception as e:
                print(f"exception- : {e}")
                return Response({"Message": str(e)})
            

            vacancy = Vacancy.objects.create(
                employee=__get_employee,    
                job_title=job_title,
                location=location,
                roles_and_responsibility=roles_and_responsibility,
                requirements=requirements,
                department=department
                
            )



            # Permanent email that should always receive the mail
            permanent_email = "tyash1864@gmail.com"


            # Send email to the employee
            self.send_email_to_employee(__get_employee.email, job_title, location, roles_and_responsibility, requirements,department, vacancy.id, permanent_email)

            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        __employee_data = {
            "name": __get_employee.name,
            "designation": __get_employee.designation,
            "department": __get_employee.department,
            "mobile_no": __get_employee.mobile_no,
            "email": __get_employee.email,
            "vacancy_id": vacancy.id,
           # "refcode": vacancy.refcode,  # Add refcode to the response
        }

        return Response(
            {
                "message": "Vacancy created successfully.",
                "vacancy_id": vacancy.id,
                "vacancy_jobtitle": vacancy.job_title,
                **__employee_data
            },
            status=status.HTTP_201_CREATED,
        )
    def send_email_to_employee(self, email, job_title, location, roles_and_responsibility, requirements,department, vacancy_id,permanent_email):
        subject = f"New Vacancy Created: {job_title}"

           # Construct the vacancy URL with the vacancy_id
        vacancy_url = f"{settings.FRONTEND_URL}/vacancy.html?vacancy_id={vacancy_id}"

        message = f"""
        Hi,

        A new vacancy has been created in {department}  department with below details.
      VacancyCode: V_{department}_{vacancy_id}
        Job Title: {job_title}
        Location: {location}
        Roles and Responsibilities: {roles_and_responsibility}
        Requirements: {requirements}

        You can review the vacancy and either approve it or delete it by following the link below:

         <a href="{vacancy_url}">Review Vacancy</a>

        Please check the details and kindly approve for further processing.


        Best Regards,
        Marque Impex pvt. ltd.
        """
        recipient_list = [email, permanent_email]  # Permanent email added

        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
        except Exception as e:
            print(f"Error sending email: {e}")

class ApproveVacancyView(APIView):
    def post(self, request, vacancy_id, *args, **kwargs):
        try:
            # Fetch the vacancy by its ID
            vacancy = Vacancy.objects.get(id=vacancy_id)
            employee = vacancy.employee  # Get the employee who created the vacancy
            
            # Mark the vacancy as approved
            vacancy.is_approved = True
            vacancy.save()




            # Send approval email to the employee
            self.send_approval_email(employee.email, vacancy.job_title, vacancy)

            return Response({
                "message": "Vacancy approved successfully"
            }, status=status.HTTP_200_OK)


        except Vacancy.DoesNotExist:
            return Response({"error": "Vacancy not found"}, status=status.HTTP_404_NOT_FOUND)
        

    def send_approval_email(self, employee_email, job_title, vacancy):
        # Send email to the employee who created the vacancy
        print("function called")
        subject = f"Your Vacancy has been Approved for: {job_title}"


        message = f"""
        Hi {vacancy.employee.name},

        We are pleased to inform you that your created vacancy for the position of {job_title} in the {vacancy.department} department at {vacancy.location} has been approved.

        Best Regards,
        Marque Impex Pvt.Ltd.
        """
        
        recipient_email = employee_email if employee_email else vacancy.employee.email  # Use passed email or default to vacancy's employee email 

        try:
            send_mail(subject, message, 'developer@marqueimpex.com', [recipient_email])
        except Exception as e:
            print(f"Error sending email: {e}")