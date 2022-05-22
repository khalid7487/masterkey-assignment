## Prerequisite
1. Postgresql as a database.
2. Node js , express js as backend.
3. React js as a fontend.
4. Typescript.


## For Backend run

1. cd ./assignment-api 
2. npm i
3. create a database mk_assignment
4. npm start


###  Authentication APIs

**API_BASE_URL=http://localhost:7005**

**1. You need to Adds Roles 2times (SUPERVISOR And MEMBER ) using api postman**  POST [http://API_BASE_URL/api/v1/auth/roles](http://API_BASE_URL/api/v1/auth/roles) 

```
Content-Type: application/json
Method: POST
```

Request

```json
{
      "id": 1, 
      "name": "SUPERVISOR",
      "code": "SUPERVISOR",
      "description": "SUPERVISOR"
}
```

Response

```json
{
    "id": 2,
    "name": "SUPERVISOR",
    "code": "SUPERVISOR",
    "description": "SUPERVISOR",
    "actions": "CRUDV",
    "created_by": null,
    "updated_by": null,
    "create_at": "2022-05-22T17:45:05.798Z",
    "updated_at": "2022-05-22T17:45:05.798Z"
}
```








