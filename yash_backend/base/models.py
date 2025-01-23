from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    card_no = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=12)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return self.name
    



class Vacancy(models.Model):
  
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    roles_and_responsibility = models.TextField()
    requirements = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    department = models.CharField(max_length=100)
    # Adding the new boolean field for approval status
    is_approved = models.BooleanField(default=False)  # Default is False, meaning not approved



    # APPROVAL_CHOICES = [
    #     ('pending', 'Pending'),
    #     ('approved', 'Approved'),
    #     ('rejected', 'Rejected'),
    # ]
    # status = models.CharField(
    #     max_length=10,
    #     choices=APPROVAL_CHOICES,
    #     default='pending',
    # )

    def __str__(self):
        return self.job_title
    