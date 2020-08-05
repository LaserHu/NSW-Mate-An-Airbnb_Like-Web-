# Import the backend with IDEA
## Prepare
#### 1. Populate database
    - mysql -u admin -p < ../data/demo_house.sql
    
## Room Related API
### 1. Get room information with id
    GET localhost:9000/api/room/{id} 200
### 2. Get room information with location
    POST localhost:9000/api/room/{location} 200
### 3. Get all rooms information
    GET localhost:9000/api/room/all 200
### 4. Search room
    POST localhost:9000/api/room/search 200
    {
        "location": "sydney",
    }

## User Related API
### 1. Register
    POST localhost:9000/register 201
### 2. Check if user exist
    GET localhost:9000/user/{id} 200
### 3. Login
    GET localhost:9000/auth 200

## Order Related API
### Create an order
    POST localhost:9000/order
    {   "roomId":int
        "checkin":yyyy-mm-dd
        "checkout":yyyy-mm-dd
        "email": string
    }
### Get an order by its id
    GET localhost:9000/order/{id} 200
## Reviews Related API

### Create new review
    POST localhost:9000/api/review 201
    {
        "content": "Hello World",
        "roomId": 1,
        "email": "mike@163.com"
    }
### Get review by room id
    GET localhost:9000/api/review/{roomid} 200