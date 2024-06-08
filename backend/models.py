import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database


class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String)
    hashed_password = _sql.Column(_sql.String)

    posts = _orm.relationship("post", back_populates="owner")
    appointments = _orm.relationship("appointment", back_populates="user")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class post(_database.Base):
    __tablename__ = "posts"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    first_name = _sql.Column(_sql.String, index=True)
    breed = _sql.Column(_sql.String, index=True)
    age = _sql.Column(_sql.String, index=True, default="")
    note = _sql.Column(_sql.String, default="")
    image_url = _sql.Column(_sql.String, default="")
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.now)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.now)

    owner = _orm.relationship("User", back_populates="posts")

class Doctor(_database.Base):
    __tablename__ = "doctors"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String, index=True)
    area = _sql.Column(_sql.String, index=True)
    note = _sql.Column(_sql.String, default="")

    appointments_dr = _orm.relationship("appointment", back_populates="doctor")


class appointment(_database.Base):
    __tablename__ = "appointments"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    doctor_id = _sql.Column(_sql.Integer, _sql.ForeignKey("doctors.id"))
    date_of_appointment = _sql.Column(_sql.Date, default="")
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.now)

    doctor = _orm.relationship("Doctor", back_populates="appointments_dr")
    user = _orm.relationship("User", back_populates="appointments")

