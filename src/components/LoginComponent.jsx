import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = () => {
    let [email, updateEmail] = useState("");
    let [password, updatePassword] = useState("");


    let [loading, updateLoading] = useState("");
    let [success, updateSuccess] = useState("");
    let [error, updateError] = useState("");

    // use useNavigate hook to automatically navigate to home

    let navigator = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateError("");
        updateSuccess("");
        updateLoading("Please wait...");

        try {
            // Create a form data
            const user_data = new FormData();
            user_data.append("email", email);
            user_data.append("password", password);

            // Get response from server after sending data
            const response = await axios.post("http://sdray.alwaysdata.net/api/login", user_data);
            console.log(response)
            if (response.data.user) {
                updateSuccess(response.data.message);
                updateLoading("")

                // to save user data after login
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // re route to homepage
                navigator("/");
            } else {
                updateError(response.data.message);
                updateLoading("");
            }





        } catch (error) {
            updateError(error.message);
            updateLoading("");

        }

    }
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-success">{success}</h5>
                    <h5 className="text-danger">{error}</h5>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => { updateEmail(e.target.value) }} />
                    <br />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => { updatePassword(e.target.value) }} />
                    <br />

                    <button className="btn btn-primary">
                        Log In
                    </button><br /><br />
                    <Link to="/signup">Don't have an account? Sign Up</Link>

                </form>
            </div>
        </div>
    );
};

export default LoginComponent;