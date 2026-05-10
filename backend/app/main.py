from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base

from .routes.auth_routes import router as auth_router
from .routes.service_routes import router as service_router
from .routes.booking_routes import router as booking_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(service_router)
app.include_router(booking_router)

@app.get("/")
def root():
    return {"message": "API Running"}