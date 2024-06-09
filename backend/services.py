import database as _database, models as _models
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import schemas as _schemas
import passlib.hash as _hash
import jwt as _jwt
import datetime as _dt

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = "myjwtsecret"


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()


async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, hashed_password=_hash.bcrypt.hash(user.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: _orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: _models.User):
    user_obj = _schemas.User.model_validate(user, from_attributes=True)
    token = _jwt.encode(user_obj.model_dump(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema),
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Email or Password"
        )

    return _schemas.User.model_validate(user, from_attributes=True)


async def create_post(user: _schemas.User, db: _orm.Session, post: _schemas.postCreate):
    post = _models.post(**post.model_dump(), owner_id=user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return _schemas.post.model_validate(post, from_attributes=True)


async def get_posts(user: _schemas.User, db: _orm.Session):
    posts = db.query(_models.post).filter_by(owner_id=user.id)

    return list(map(_schemas.post.from_orm, posts))


async def get_posts_all(db: _orm.Session):
    posts = db.query(_models.post)

    return list(map(_schemas.post.from_orm, posts)) 


async def _post_selector(post_id: int, user: _schemas.User, db: _orm.Session):
    post = (
        db.query(_models.post)
        .filter_by(owner_id=user.id)
        .filter(_models.post.id == post_id)
        .first()
    )

    if post is None:
        raise _fastapi.HTTPException(status_code=404, detail="post does not exist")

    return post


async def get_post(post_id: int, user: _schemas.User, db: _orm.Session):
    post = await _post_selector(post_id=post_id, user=user, db=db)

    return _schemas.post.from_orm(post)


async def delete_post(post_id: int, user: _schemas.User, db: _orm.Session):
    post = await _post_selector(post_id, user, db)

    db.delete(post)
    db.commit()


async def update_post(
    post_id: int, post: _schemas.postCreate, user: _schemas.User, db: _orm.Session
):
    post_db = await _post_selector(post_id, user, db)

    post_db.first_name = post.first_name
    post_db.breed = post.breed
    post_db.age = post.age
    post_db.note = post.note
    post_db.date_last_updated = _dt.datetime.now()

    db.commit()
    db.refresh(post_db)

    return _schemas.post.from_orm(post_db)

async def create_appointment(
        user: _schemas.User, db: _orm.Session, appointment: _schemas.appointmentCreate, doctor: _schemas.Doctor
):
    appointment = _models.appointment(**appointment.model_dump(), user_id=user.id, doctor_id=doctor)
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return _schemas.appointment.model_validate(appointment, from_attributes=True)

async def get_appointments(user: _schemas.User, db: _orm.Session):
    appointments = db.query(_models.appointment).filter_by(user_id=user.id)

    return list(map(_schemas.appointment.from_orm, appointments))

async def get_doctors(db: _orm.Session):
    doctors = db.query(_models.Doctor)

    return list(map(_schemas.Doctor.from_orm, doctors))
    
    
    