from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..models import Booking, Service, User
from ..schemas import BookingSchema
from ..get_user import get_current_user

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


# CREATE BOOKING
@router.post("/")
def create_booking(
    data: BookingSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    existing_booking = db.query(Booking).filter(
        Booking.customer_id == user["user_id"],
        Booking.service_id == data.service_id
    ).first()

    if existing_booking:

        return {
            "message": "Already booked"
        }

    booking = Booking(
        customer_id=user["user_id"],
        service_id=data.service_id,
        status="pending"
    )

    db.add(booking)

    db.commit()

    return {
        "message": "Booking created"
    }


# GET BOOKINGS
@router.get("/")
def get_bookings(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    booking_data = []

    # CUSTOMER BOOKINGS
    if user["role"] == "customer":

        bookings = db.query(Booking).filter(
            Booking.customer_id == user["user_id"]
        ).all()

    # VENDOR BOOKINGS
    else:

        vendor_services = db.query(Service).filter(
            Service.vendor_id == user["user_id"]
        ).all()

        service_ids = [
            service.id for service in vendor_services
        ]

        bookings = db.query(Booking).filter(
            Booking.service_id.in_(service_ids)
        ).all()

    for booking in bookings:

        service = db.query(Service).filter(
            Service.id == booking.service_id
        ).first()

        customer = db.query(User).filter(
            User.id == booking.customer_id
        ).first()

        booking_data.append({

            "id": booking.id,

            "status": booking.status,

            "service_title": service.title,

            "service_price": service.price,

            "customer_name": customer.name,

            "customer_email": customer.email,

            "service_id": service.id
        })

    return booking_data


# ACCEPT BOOKING
@router.put("/{booking_id}/accept")
def accept_booking(
    booking_id: int,
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    booking.status = "accepted"

    db.commit()

    return {
        "message": "Booking accepted"
    }


# DELIVER BOOKING
@router.put("/{booking_id}/deliver")
def deliver_booking(
    booking_id: int,
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    booking.status = "delivered"

    db.commit()

    return {
        "message": "Booking delivered"
    }


# MY BOOKINGS
@router.get("/my-bookings")
def my_bookings(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    bookings = db.query(Booking).filter(
        Booking.customer_id == user["user_id"]
    ).all()

    booking_data = []

    for booking in bookings:

        service = db.query(Service).filter(
            Service.id == booking.service_id
        ).first()

        booking_data.append({

            "id": booking.id,

            "status": booking.status,

            "service_title": service.title,

            "service_price": service.price,

            "service_id": service.id
        })

    return booking_data