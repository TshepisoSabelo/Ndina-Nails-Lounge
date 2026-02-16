#Connects to MySQL
#Creates the SQLAlchemy engine
#Manages sessions
#Defines Base class for models

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv( "DATABASE_URL", "mysql+pymysql://root:PC-MySQL_PassPass02@db:3306/nailsbar_db")
#What database type (MySQL)
#What driver (pymysql)
#Username & password
#Host (db → docker service name)
#Port (3306)
#Database name (db)

#Creating the engine which is the actual connection manager
engine = create_engine(DATABASE_URL)

#Creating the session for database sessions
#(bind) - connects the fastAPI to the database
# (autocommit) - Every database operation automatically commits immediately - db.commit()
#(autoflush) - Flush sends pending changes to the database without commiting first
#Everything is explicit
#Safer for APIs
sessionLocal = sessionmaker(
    autocommit = False,
    autoflush= False,
    bind = engine
)

#It creates a base class that all your database models inherit from.
#Turns Python classes into database-mapped tables
#Stores metadata
#Enables automatic table creation

#database models are classes that represent the tables of a database
#they define the columns and structure
Base = declarative_base()

#To be able to create multiple sessions we need to create a get db fuction
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally: 
        db.close()