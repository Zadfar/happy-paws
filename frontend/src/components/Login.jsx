import React, {useState, useContext} from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`)
        };
        const response = await fetch("/api/token", requestOptions);
        const data = await response.json();

        if(!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    }

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                    <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <ErrorMessage message={errorMessage} />
                <br />
                <div className="flex justify-center">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login