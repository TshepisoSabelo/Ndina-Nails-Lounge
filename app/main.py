from tokenize import Double
from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
from app.util.init_db import create_update_tables 
from contextlib import asynccontextmanager 
import random

#we need to repeat the command pip freeze requirements.txt to update the required packages for the venv
#we use the ORM sqlmode (pip install sqlmodel) to handle the sql connection

#Starting the connection to our db
#we create an asynchronous function that will manage the creating and connection of our db
@asynccontextmanager
async def lifespan(app: FastAPI):
    #initilise db
    create_update_tables()
    print("Created Connection")
    yield #seperation for cleaning things up 

# Entry to our API
# Creates a server and gives us a port number for our server
app = FastAPI(lifespan=lifespan)

# Defining endpoints
# Get endpoints takes the get request url "/..." as an input and they can also take the input argument if any
# Post endpoints takes the post url "/..." and the function takes a JSON data as an input to be posted
# we can define class that extends a BaseModel which is a class that validate if the incoming JSON follows the structure defined by the class
@app.get("/")
async def hello():
    return {"message":"Hello world!"}

@app.get("/Greetings")
async def greetings(name: str = Query(..., description="Your name")):
    return{"message": f"hello {name}"}

@app.get("/get_bookings")
async def get_bookings():
    return{"bookings":bookings}

# get single booking
# the function takes in an input id which is used in the endpoint name and as a function input
# the function must be able to handle the exception incase the id we are searching for is not found
# lastly, it returns an object (dictionary) of the requested booking 
@app.get("/get_booking/{id}")
async def get_booking(id: int):
    try:
        for booking in bookings:
            if(booking.get("id") == id):
                return {"Booking": booking}
    except HTTPException: 
        raise HTTPException(status_code= 404)

#Booking class for structure which extends BaseModel
class Booking(BaseModel):
    booking_id: int
    customer_id: int
    service: str
    booking_date: str
    booking_time: str
    amount_paid: float
    assigned: str
    status: str = "PENDING"
    
# Post endpoints
@app.post("/add_booking")
async def add_boooking(booking: Booking):
    booking.booking_id = random.randint(1000, 9999)
    booking_dict:dict  = booking.model_dump(exclude_unset= True)
    bookings.append(booking_dict)
    print(booking_dict)
    return (booking_dict)

@app.post("/greeting{name}")
async def greeting(name: str):
    return (f"hi {name}, how are you today?")

# Put endpoint
# the put endpoint is used to update already existing records
@app.put("/update_booking{id}")
async def update_booking(id, booking :Booking):
    for row in bookings:
        try:
            if (row.get("id") == id):
                row["status"] = booking.status
                return row
        except HTTPException:
            raise HTTPException(status_code = 404) 


#Dummy data
bookings = []