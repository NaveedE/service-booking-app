from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas import (
    SignupSchema,
    VerifyOTPSchema,
    LoginSchema
)

from ..models import User

from ..dependencies import get_db

from ..otp import (
    generate_otp,
    verify_otp,
    temp_users
)

from ..auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# SIGNUP + SEND OTP
@router.post("/signup")
def signup(
    user: SignupSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    otp = generate_otp(user.email)

    temp_users[user.email] = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role
    }

    print("OTP:", otp)

    return {
        "message": "OTP sent successfully"
    }


# VERIFY OTP
@router.post("/verify-otp")
def verify_otp_route(
    data: VerifyOTPSchema,
    db: Session = Depends(get_db)
):

    if not verify_otp(
        data.email,
        data.otp
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    user_data = temp_users.get(data.email)

    if not user_data:

        raise HTTPException(
            status_code=400,
            detail="User not found"
        )

    new_user = User(
        name=user_data["name"],
        email=user_data["email"],
        password=user_data["password"],
        role=user_data["role"],
        is_verified=1
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "Account created successfully"
    }


# LOGIN
@router.post("/login")
def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    if not verify_password(
        data.password,
        user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })

    return {
        "token": token,
        "role": user.role
    }