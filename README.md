# SCHOOL MANAGEMENT SYSTEM

This is the backend implementation of the hospital management system using node, express, mongoose and mongodb

To use this project, run the following command

```
git clone https://github.com/

```

```
npm install

```

## create a .env file and add the following

1. PORT = 8000
2. MONGO_URL = 'mongodb://127.0.0.1:27017/school_management_system_DB'

```
npm run dev

```

### To create a new school use the endpoint

http://127.0.0.1:8000/api/v1/schoolReg

with the following fields

```
{

    "email": "",
    "password": "",
    "schoolName":"",
    "AdminName":""
}

```

### To create a new teacher use the endpoint

http://127.0.0.1:8000/api/v1/teacherReg

```

{
    "surname": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": "",
    "AssignedClasses": "",
    "school_section": "",
    "subjectsToTeach": ["Maths","Eng"], //example

    "school_ID":""
}


```

### To login as admin, use the endpoint

http://127.0.0.1:8000/api/v1/admin/login

```
{
    "schoolName":"",
    "email": "",
    "password": ""


}

```
