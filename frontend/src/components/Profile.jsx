import React, { useContext, useState, useEffect } from "react";
import Register from './Register';
import Login from './Login';
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import PostModal from "./PostModal";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Profile = () => {
  const [token, setToken] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [posts, setPosts] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const getPosts = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("/api/posts", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the Posts");
    } else {
      const data = await response.json();
      setPosts(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    if(token) {
    getPosts();
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/posts/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Failed to delete post");
    }

    getPosts();
  };

  const handleModal = () => {
    setActiveModal(!activeModal);
    getPosts();
    setId(null);
  };

  return (
    <>
      <div className="text-center my-6">
        <h1 className="text-2xl">Profile</h1>
        {token && (
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
      <div>
        <div className="w-full">
          {!token ? (
            <div className="flex flex-col">
              <div className="flex justify-center">{showLogin ? <Login /> : <Register />}</div>
              <button onClick={toggleForm} className="mb-4">
                {showLogin ? 
                <p className="text-blue-500 hover:text-blue-700">Register an account</p> : <p className="text-blue-500 hover:text-blue-700">Already have an account? - Login</p>
                }
              </button>
            </div>
          ) : ( <>
            <PostModal
              active={activeModal}
              handleModal={handleModal}
              token={token}
              id={id}
              setErrorMessage={setErrorMessage}
            />
            <div className="flex justify-center">
              <button
                className="w-64 mb-5 bg-green-500 text-white rounded-lg px-4 py-2"
                onClick={() => setActiveModal(true)}
              >
                Create Post
              </button>
            </div>
            <h2 className="font-semibold text-2xl ml-12 mb-2">My Posts</h2>
            <div className="px-12 py-2 bg-gray-300">
              <ErrorMessage message={errorMessage} />
              {loaded && posts ? (
                  <div className="grid grid-cols-4 gap-4 justify-center my-12 ">
                      {posts.map((post) => (
                          <Card className="w-full card-post" key={post.id}>
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
                              className="font-normal"
                            >
                              Breed: {post.breed}
                            </Typography>
                          </CardBody>
                          <CardFooter className="pt-0">
                            <Button onClick={() => handleDelete(post.id)}
                              ripple={false}
                              fullWidth={true}
                              className="bg-red-700 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : <p>Loading</p>}
            </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile;
