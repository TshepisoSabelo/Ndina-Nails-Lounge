from datetime import timedelta, datetime, timezone
from tokenize import Double
from fastapi import Depends, FastAPI, Query, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import get_db
from util.init_db import create_update_tables
from contextlib import asynccontextmanager
import random
from jose import JWTError, jwt
from fastapi.middleware.cors import CORSMiddleware

#we need to repeat the command pip freeze requirements.txt to update the required packages for the venv
#we use the ORM sqlmode (pip install sqlmodel) to handle the sql connection

#Starting the connection to our db
#we create an asynchronous function that will manage the creating and connection of our db
@asynccontextmanager
async def lifespan(app: FastAPI):
    #initilise db
    try:
        create_update_tables()
        print("Created Connection")
    except Exception as e:
        print(f"Warning: Could not initialize database: {e}")
        print("Application will continue, but database operations may fail until the database is available.")
    yield #seperation for cleaning things up

# Entry to our API
# Creates a server and gives us a port number for our server
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token") #This is a fastAPI helper class that tells fastAPI that we 
#will be using OAuth2 for authentication and the token will be obtained from the /token endpoint. 
#It also provides a dependency that can be used to extract the token from the request headers.

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")
#JWT secret key for encoding and decoding JWT tokens
SECRET_KEY = "your_secrete_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#To be able to create users
class userCreate(BaseModel):
    name:str
    email:str
    phone:str
    password:str

def get_user_by_email(db: Session, email: str):
    return db.query(user).filter(user.email == email).first()

def create_user(db:Session, userobj:userCreate):
    hashed_password = pwd_context.hash(userobj.password)
    db_user = user(name = userobj.name, email = userobj.email, phone = userobj.phone, password = hashed_password)
    db.add(db_user)
    db.commit()
    return "User created successfully"

def authenticate_user(db:Session, email:str, password:str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not pwd_context.verify(password, str(user.password)):
        return False
    return user

def create_access_token(data:dict, expire_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expire_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#verify token
def verify_token(ttoken: str = Depends(oauth2_schema)):
    try:
        payload = jwt.decode(ttoken, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = str(payload.get("sub"))
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
#register users endpoint
@app.post("/register")
async def register(userobj: userCreate, db: Session = Depends(get_db)):
    try:
        existing_user = get_user_by_email(db, userobj.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        return create_user(db, userobj)
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    
    # Login endpoint
class LoginData(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login(credentials: LoginData, db: Session = Depends(get_db)):
    user_obj = authenticate_user(db, credentials.email, credentials.password)
    if not user_obj:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token({"sub": user_obj.email}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": getattr(user_obj, 'id', None),
            "name": getattr(user_obj, 'name', None),
            "email": getattr(user_obj, 'email', None)
        }
    }
    
    

#Get user by email endpoint
@app.get("/get_user/{email}")
def get_user(email, db: Session = Depends(get_db)):
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

#Authentication endpoint
@app.get("/verify_token/{token}")
def verify_user_token(token:str):
    try:
        email = verify_token(token)
        return (f"email = {email}")
    except HTTPException:
        raise HTTPException(status_code=401, detail="Invalid token")

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