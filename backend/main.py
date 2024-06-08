import fastapi as _fastapi
import fastapi.security as _security
from typing import List
from fastapi import File, UploadFile, Form

import cloudinary
from cloudinary.uploader import upload

import sqlalchemy.orm as _orm

import services as _services, schemas as _schemas

app = _fastapi.FastAPI()

cloudinary.config(
    cloud_name="dhmdi4nut",
    api_key="225271535762999",
    api_secret="8Tsgw3HdMigQBS0A9BYSqVg3T8k"
)

@app.post("/api/users")
async def create_user(
    user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_user = await _services.get_user_by_email(user.email, db)
    if db_user:
        raise _fastapi.HTTPException(status_code=400, detail="Email already is use")

    user = await _services.create_user(user, db)

    return await _services.create_token(user)


@app.post("/api/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

    return await _services.create_token(user)


@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/posts", response_model=_schemas.post)
async def create_post(
    first_name: str = Form(...),
    breed: str = Form(...),
    age: str = Form(...),
    note: str = Form(...),
    file: UploadFile = File(...),
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    try:
        # Upload file to Cloudinary
        result = upload(file.file)
        file_url = result["secure_url"]

        # Create post data
        post_data = _schemas.postCreate(
            first_name=first_name,
            breed=breed,
            age=age,
            note=note,
            image_url=file_url
        )
        return await _services.create_post(user=user, db=db, post=post_data)
    except Exception as e:
        raise _fastapi.HTTPException(status_code=500, detail=str(e))


@app.get("/api/posts", response_model=List[_schemas.post])
async def get_posts(
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_posts(user=user, db=db)


@app.get("/api/posts/all", response_model=List[_schemas.post])
async def get_posts_all(
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_posts_all(db=db)


@app.get("/api/posts/{post_id}", status_code=200)
async def get_post(
    post_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_post(post_id, user, db)


@app.delete("/api/posts/{post_id}", status_code=204)
async def delete_post(
    post_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_post(post_id, user, db)
    return {"message", "Successfully deleted"}


@app.put("/api/posts/{post_id}", status_code=200)
async def update_post(
    post_id: int,
    post: _schemas.postCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_post(post_id, post, user, db)
    return {"message", "Successfully updated"}

@app.get("/api")
async def root():
    return {"message": "Happy paws api test"}

@app.post("/api/appointments", response_model=_schemas.appointment)
async def create_appointment(
    appointment: _schemas.appointmentCreate,
    doctor: _schemas.Doctor,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_appointment(user=user, db=db, appointment=appointment, doctor = doctor.id)


