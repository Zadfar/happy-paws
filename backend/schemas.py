import datetime as _dt
import pydantic as _pydantic
from pydantic import ConfigDict


class _UserBase(_pydantic.BaseModel):
    email: str


class UserCreate(_UserBase):
    hashed_password: str
    model_config = ConfigDict(from_attributes=True)


class User(_UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class _postBase(_pydantic.BaseModel):
    first_name: str
    breed: str
    age: str
    note: str
    image_url : str


class postCreate(_postBase):
    pass


class post(_postBase):
    id: int
    owner_id: int
    date_created: _dt.datetime
    date_last_updated: _dt.datetime

    model_config = ConfigDict(from_attributes=True)

class _DoctorBase(_pydantic.BaseModel):
    id: int
    
class Doctor(_DoctorBase):
    name: str
    area: str
    description: str
    model_config = ConfigDict(from_attributes=True)

class _appointmentBase(_pydantic.BaseModel):
    date_of_appointment: _dt.date

class appointmentCreate(_appointmentBase):
    pass

class appointment(_appointmentBase):
    id: int
    user_id: int
    doctor_id: int
    date_created: _dt.datetime
    model_config = ConfigDict(from_attributes=True)
