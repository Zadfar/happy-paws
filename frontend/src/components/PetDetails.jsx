import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getPetDetails = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/posts/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the pet details");
    } else {
      const data = await response.json();
      setPet(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getPetDetails();
  }, [id]);

  return (
    <>
      <ErrorMessage message={errorMessage} />
      {loaded && pet ? (
          <div className="container mx-auto my-12">
          <div className="flex flex-col lg:flex-row items-center bg-white lg:items-start p-6 rounded-lg shadow-lg">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex justify-center">
              <div className="w-full h-96 max-w-lg overflow-hidden rounded-lg">
                <img
                  src={pet.image_url}
                  alt={pet.first_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-12">
              <h2 className="text-3xl font-semibold mb-4">{pet.first_name}</h2>
              <p className="text-lg mb-4">
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p className="text-lg mb-4">
                <strong>Age:</strong> {pet.age}
              </p>
              <p className="text-lg mb-4">
                <strong>Description:</strong> {pet.note}
              </p>
              <p className="text-lg mb-4">
                <strong>Contact No:</strong> {pet.contact}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default PetDetails;
