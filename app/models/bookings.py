from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Numeric, Date, Time, Enum, ForeignKey

class bookings(Base): #all model classes must extend the Base model class
    __tablename__ = "bookings" #this is the name of the table in the database
    booking_id = Column(Integer, primary_key= True, unique=True)
    user_id= Column(String(255), ForeignKey("user.user_id"))
    service = Column(Enum("MANICURE", "PEDICURE", "BUFF&SHINE"), nullable = False)
    booking_date = Column(Date, nullable = False)
    booking_time = Column(Time, nullable = False)
    amoutn_paid = Column(Numeric(10, 2), nullable = False)
    assigned = Column(String(255))
    status = Column(Enum("PENDING", "IN-PROGRESS" ,"COMPLETE", "FAILED"), default="PENDING")

    user = relationship("user", back_populates="bookings")