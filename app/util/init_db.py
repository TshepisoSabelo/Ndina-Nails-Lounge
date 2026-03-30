from database import Base, engine
from models import bookings

def create_update_tables():
    Base.metadata.create_all(bind = engine)

create_update_tables()