import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

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
                <h3 className='font-semibold text-center text-2xl bg-black text-white border-0 w-56 rounded-3xl p-1 mt-6'>Active Adoptions</h3>
            </div>
            <ErrorMessage message={errorMessage} />
            {loaded && posts ? (
                <div className="grid grid-cols-4 gap-4 justify-center mx-12 my-12">
                    {posts.map((post) => (
                        <Card className="w-full mb-4" key={post.id}>
                        <CardHeader shadow={false} floated={false} className="h-64">
                          <img
                            src={post.image_url}
                            alt="card-image"
                            className="h-full w-full object-cover"
                          />
                        </CardHeader>
                        <CardBody>
                          <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-large font-semibold">
                              {post.first_name}
                            </Typography>
                            <Typography color="blue-gray" className="font-large">
                            age: {post.age}
                            </Typography>
                          </div>
                          <Typography
                            variant="small"
                            color="orange"
                            className="font-large"
                          >
                            Breed: {post.breed}
                          </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Link to={`/adoption/pet/${post.id}`}>
                            <Button
                              ripple={false}
                              fullWidth={true}
                              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                              View Post
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
            ) : <p>Loading</p>}
        </>
    );
};

export default ActiveAdopt;
