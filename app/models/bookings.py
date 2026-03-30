from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Numeric, Date, Time, Enum, ForeignKey

class bookings(Base): #all model classes must extend the Base model class
    __tablename__ = "bookings" #this is the name of the table in the database
    booking_id = Column(Integer, primary_key= True, unique=True, autoincrement=True)
    name = Column(String(255), nullable= False)
    email = Column(String(255), unique= True, nullable = False)
    phone = Column(String(255), nullable = False)
    passkey = Column(String(255), nullable = False)
    service = Column(Enum("MANICURE", "PEDICURE", "BUFF&SHINE"), nullable = False)
    booking_date = Column(Date, nullable = False)
    booking_time = Column(Time, nullable = False)
    amount_paid = Column(Numeric(10, 2), nullable = True, default = 0.00) #allows a pay-later system
    assigned = Column(String(255))
    status = Column(Enum("PENDING","CONFIRMED", "IN-PROGRESS" ,"COMPLETE", "FAILED"), default="PENDING")