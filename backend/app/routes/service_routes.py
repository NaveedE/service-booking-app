from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..models import Service
from ..schemas import ServiceSchema
from ..get_user import get_current_user

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


# ADD SERVICE
@router.post("/")
def add_service(
    data: ServiceSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    new_service = Service(
        title=data.title,
        description=data.description,
        price=data.price,
        vendor_id=user["user_id"]
    )

    db.add(new_service)

    db.commit()

    return {
        "message": "Service added"
    }


# GET SERVICES
@router.get("/")
def get_services(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    # CUSTOMER → see all services
    if user["role"] == "customer":

        services = db.query(Service).all()

        return services

    # VENDOR → see only own services
    services = db.query(Service).filter(
        Service.vendor_id == user["user_id"]
    ).all()

    return services


# DELETE SERVICE
@router.delete("/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not service:

        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    # Prevent deleting others services
    if service.vendor_id != user["user_id"]:

        raise HTTPException(
            status_code=403,
            detail="Unauthorized"
        )

    db.delete(service)

    db.commit()

    return {
        "message": "Service deleted"
    }