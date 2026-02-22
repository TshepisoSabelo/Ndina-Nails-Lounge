from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey

class user(Base): #all model classes must extend the Base model class
    __tablename__ = "user" #this is the name of the table in the database
    user_id = Column(Integer, primary_key= True, unique=True)
    name = Column(String(255), nullable = False)
    email = Column(String(255), unique= True, nullable = False)
    phone = Column(String(255), nullable = False)
    password = Column(String(255), nullable = False)

    bookings = relationship("bookings", back_populates="user")