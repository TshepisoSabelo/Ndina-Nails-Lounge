from app.database import Base
from sqlalchemy import Column, Integer, String, Numeric, Boolean, Float, DateTime, Text, Date, Time, Enum

class Bookings(Base): #all model classes must extend the Base model class
    booking_id = Column(Integer, primary_key= True, unique=True)
    customer_id= Column(String(255))
    service = Column(Enum("MANICURE", "PEDICURE", "BUFF&SHINE"))
    booking_date = Column(Date)
    booking_time = Column(Time)
    amoutn_paid = Column(Numeric(10, 2))
    assigned = Column(String(255))
    status = Column(Enum("PENDING", "IN-PROGRESS" ,"COMPLETE", "FAILED"))