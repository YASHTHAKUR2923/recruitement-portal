`python --version` - Check python version


Create venv

`cd yash_backend`
`python -m venv venv`

Activate venv

`venv\Scripts\activate` - If you're using Command Prompt
`.\venv\Scripts\Activate` - If you're using PowerShell

install all packages

`pip install -r requirements.txt`


create database tables

`python manage.py makemigrations`
`python manage.py migrate`


run backend server if needed

`python manage.py runserver`
