from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text

class User(Base): #all model classes must extend the Base model class
    customer_id = Column(Integer, primary_key= True, unique=True)
    name = Column(String(255))
    email = Column(String(255), unique= True)
    phone = Column(String(12))
    password = Column(String(255))

    