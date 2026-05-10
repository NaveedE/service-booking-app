from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)

    role = Column(String)

    is_verified = Column(Integer, default=0)


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(String)

    price = Column(Integer)

    vendor_id = Column(Integer, ForeignKey("users.id"))


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer)

    service_id = Column(Integer)

    status = Column(String, default="pending")