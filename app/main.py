from fastapi import FastAPI, Query, Depends, HTTPException
from contextlib import asynccontextmanager
from sqlalchemy import text
from database import get_db
from util.init_db import create_update_tables
from pydantic import BaseModel
from datetime import  date, time
from sqlalchemy.orm import Session
from models.bookings import bookings
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
import random

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#We use the lifespan to connect to our db
#the lifespan is an async function that manages the creating and connection of our db
async def lifespan(app: FastAPI):
    #initiate the db
    try:
        create_update_tables()
        print ("Create connection")
    except Exception as e:
        print(f"Warning: Could not initialise database: {e}")
        print("Application will continue, but database operationsmust fail until the database is available.")


app = FastAPI(Lifespan = lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#we need to define the classes for our objects

class booking(BaseModel):
        #without fields that have defaults
        name :str
        email : str
        phone : str
        service : str
        booking_date : date
        booking_time : time

        class Config:
            json_encoders = {
                time: lambda v: v.strftime("%H:%M")  # <- removes seconds
        }

#create user endpoint function
def create_booking(db:Session, bookingObj:booking):
    passkey = str(random.randint(0, 10000))
    hashed_passkey =  pwd_context.hash(passkey),
    db_booking = bookings(
        name = bookingObj.name,
        email = bookingObj.email,
        phone = bookingObj.phone,
        passkey = hashed_passkey,
        service = bookingObj.service,
        booking_date = bookingObj.booking_date,
        booking_time = bookingObj.booking_time,
        assigned = "Ndinae"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return {
        "booking_id": db_booking.booking_id,
        "passkey": passkey,
        "status": db_booking.status
    }

def get_booking_by_email(db: Session, email: str):
    return db.query(bookings).filter(bookings.email == email).first()

def authenticate_booking(db:Session, email:str, passkey:str):
    user = get_booking_by_email(db, email)
    if not user:
        return False
    if not pwd_context.verify(passkey, str(user.passkey)):
        return True
    return user

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        if result == 1:
            return {"status": "ok", "db": "connected"}
    except Exception as e:
        return f"error: {e}"


@app.post("/Add_booking")
async def add_booking(bookingObj: booking, db: Session = Depends(get_db)):
    try:
        return create_booking(db, bookingObj)
    except Exception as e:
        print(f"ERROR: {e}")
        raise HTTPException(status_code = 500, detail = str(e))
    

@app.get("/Get_booking/{email}, {passkey}")
async def get_booking(email, passkey, db: Session = Depends(get_db)):
    try:
        return authenticate_booking(db, email, passkey)
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))
    

@app.get("/Get_all_bookings")
async def get_all_bookings(db: Session = Depends(get_db)):
    try:
        all_bookings = db.query(bookings).all()
        return all_bookings
    except HTTPException as e:
        raise HTTPException(status_code = 500, detail = str(e))