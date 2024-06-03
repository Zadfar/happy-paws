import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";


const ActiveAdopt = () => {
    const [posts, setPosts] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);

    const getPosts = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch("/api/posts/all", requestOptions);
        if (!response.ok) {
          setErrorMessage("Something went wrong. Couldn't load the Posts");
        } else {
          const data = await response.json();
          setPosts(data);
          setLoaded(true);
        }
      };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <div className='flex justify-center'>
                <h3 className='font-semibold text-center text-2xl bg-black text-white border-0 w-56 rounded-3xl p-1'>Active Adoptions</h3>
            </div>
            <ErrorMessage message={errorMessage} />
            {loaded && posts ? (
                <div className="grid grid-cols-4 gap-4 justify-center mx-12 my-12">
                    {posts.map((post) => (
                        <Card className="w-full " key={post.id}>
                        <CardHeader shadow={false} floated={false} className="h-64">
                          <img
                            src={post.image_url}
                            alt="card-image"
                            className="h-full w-full object-cover"
                          />
                        </CardHeader>
                        <CardBody>
                          <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-medium">
                              {post.first_name}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                            Age: {post.age}
                            </Typography>
                          </div>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                          >
                            Breed: {post.breed}

                          </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Button
                            ripple={false}
                            fullWidth={true}
                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                          >
                            View Post
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
            ) : <p>Loading</p>}
        </>
    );
};

export default ActiveAdopt;
