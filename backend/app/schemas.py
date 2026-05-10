from pydantic import BaseModel


class SignupSchema(BaseModel):
    name: str
    email: str
    password: str
    role: str


class VerifyOTPSchema(BaseModel):
    email: str
    otp: str


class LoginSchema(BaseModel):
    email: str
    password: str
    
class ServiceSchema(BaseModel):

    title: str

    description: str

    price: int


class BookingSchema(BaseModel):

    service_id: int