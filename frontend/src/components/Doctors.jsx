import { useState,useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";

const Doctors = () => {
    const [doctors, setDoctors] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);

    const getDoctors = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch("/api/doctors", requestOptions);
        if (!response.ok) {
          setErrorMessage("Something went wrong. Couldn't load the Doctors");
        } else {
          const data = await response.json();
          setDoctors(data);
          setLoaded(true);
        }
      };

    useEffect(() => {
        getDoctors();
    }, []);
  return (
    <div>
        <div className='text-center text-3xl'>
            <h1 className='font-semibold'>Our Trusted Doctors</h1>
        </div>
        <div className="mx-8">
        {loaded && doctors ? (
                <div className="grid grid-cols-3 gap-8 justify-center my-12">
                    {doctors.map((doctor) => (
                      <Card className="w-auto" key={doctor.id}>
                        <CardHeader floated={false} className="h-66 rounded-full">
                          <img src={doctor.image_url} alt="profile-picture" />
                        </CardHeader>
                        <CardBody className="text-center">
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            Dr. {doctor.name}
                          </Typography>
                          <Typography color="blue-gray" className="font-medium" textGradient>
                            {doctor.area}
                          </Typography>
                          <Typography color="blue-gray" className="font-medium" textGradient>
                            {doctor.description}
                          </Typography>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-7 pt-2">
                        </CardFooter>
                      </Card>
                    ))}
                </div>
            ) : <p>Loading</p>}
        </div>
    </div>
  )
}

export default Doctors