# Vyld-assignment
Must to install node.js and xampp.

## Setup 
Open your terminal (cmd, powershell, git bash)
Clone this repository by :
```
git clone https://github.com/Gaurimusmade/Vyld-assignment.git
```
Enter to the repository folder :
```
cd Vyld-assignment
```
Install all required dependencies using `npm` or you can also use` yarn`:
```
npm install or yarn install
```
## Setup Database
1. **Create a database** with a name of your choice in mysql.
```
mysql=# CREATE DATABASE db_name;
```
2. **Import SQL file**, you will find vyld.sql file in our cloned folder "Vyld-assignment" .\
   in terminal
```
mysql=# mysql -U username -d db_name -f "%path%\vyld.sql";
```
* Replace username with your MySQL database username.
* Replace db_name with the name you choose in 1st step.
* Replace %path% with the actual path to your cloned folder.

3. **Setup .env file** according to your local settings.
```
PORT = 8081 // choose the port for server to run
TOKEN_SECRET = "your secret string"
DB_USER = "root" //your MySQL username
DB_HOST = "localhost" 
DB_DATABASE = "vyld" //the db_name you choose in 1st step
DB_PASSWORD = "" //password of your MySQL database
PORT = 5001
   ```
## How to use 
Now it's time to use API endpoints.
1. Import "Vyld.postman_collection.json" file to postman(find in cloned folder).
2. setup port variable in postman according to your settings.
3. start node.js server
```
npm start
```
4. Refer below API documentation for simplicity.

### POST /api/users/register

Register a new user.

- **Method:** POST
- **Endpoint:** /api/users/register

#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| Name  | string   | User's desired Name       |
| username    | string   | User's desired username          |
| bio   | string | user's bio |
| age   | int  | user's age |
| password  | string   | User's password     |

#### Response

Upon successful registration, the API will return a response with status code 201 and the following JSON data:

```json
{
  "message": "User registration successful"
}
```
## POST /api/users/login

Authenticate and generate a JWT token for the user.

- **Method:** POST
- **Endpoint:** /api/users/login
  
#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| username     | string   | User's registered username       |
| password  | string   | User's password   |

#### Response

Upon successful login, the API will return a response with status code 200 and the following JSON data:

```json
{
  "message": "User login successful",
  "token": "jwt_token",
}
```
## GET /api/users/details

Retrieve a list of all users.

- **Method:** GET
- **Endpoint:** /api/users/details
- **Authentication required**
  
#### Response

Upon successful retrieval, the API will return a response with status code 200 and the following JSON data:

```json
[
    {
        "Name": "name",
        "username": "user_name",
        "bio": "user_bio",
        "age":  "user_age"
    }
]
```


## PUT /api/users/update

Update an existing user by their jwt

- **Method:** PUT
- **Endpoint:** /api/users/update
- **Authentication required**
  
#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| Name  | string   | Updated name              |
| username    | string   | Updated username           |
| bio   | string | Updated bio |
| age   | int  | Updated age |

#### Response

Upon successful update, the API will return a response with status code 200 and the following JSON data:

```json
{
    "message": "User updated successfully"
}
```
## DELETE /api/users/delete

Delete a user by their jwt.

- **Method:** DELETE
- **Endpoint:** /api/users/delete
- **Authentication required**
  
#### Response

Upon successful deletion, the API will return a response with status code 200 and the following JSON data:

```json
{
    "message": "User deleted successfully"
}
```
## POST /api/users/logout

logout user by their jwt.

- **Method:** POST
- **Endpoint:** /api/users/logout
- **Authentication required**
  
#### Response

Upon successful logout, the API will return a response with status code 200 and the following JSON data:

```json
{
    "message": "Logout successful"
}
```
#### Thank you 
