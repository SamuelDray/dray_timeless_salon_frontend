import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupComponent = () => {
    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatephone] = useState("");
    let [password, updatePassword] = useState("");

    // Loading state variables
    let [loading, updateLoadind] = useState("");
    let [success, updateSuccess] = useState("");
    let [error, updateError] = useState("");

    let handleSubmit = async (e) => {
        // prevent form from reloding page
        e.preventDefault();

        // Alert user loading
        updateError("");
        updateSuccess("");
        updateLoadind("Submitting Data, Please wait...");

        // Confirm user data
        console.log(username, email, phone, password);

        // try send data to the server
        try {
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            // use axios to send data to server
        const response = await axios.post(
            "http://sdray.alwaysdata.net/api/signup", 
            user_data,
        );
        console.log(response);
        if(response.status === 200){
            updateSuccess(response.data.message);
            updateLoadind("");
            updateUsername("");
            updateEmail("");
            updatephone("");
            updatePassword("");
        }
        } catch (error) {
            console.log(error);
            updateLoadind("");
            updateError(error.message);
        };
    };


    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Username"
                    required
                    value={username}
                    onChange={(e)=>{updateUsername(e.target.value)}}
                    /><br/><br/>
                    

                    <input 
                    type="email" 
                    className="form-control"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={(e)=>{updateEmail(e.target.value)}}
                    /><br/><br/>

                    <input 
                    type="tel" className="form-control"
                    placeholder="Enter phone Number"
                    required
                    value={phone}
                    onChange={(e)=>{updatephone(e.target.value)}}
                    /><br/><br/>
                    
                    <input 
                    type="password" 
                    className="form-control"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e)=>{updatePassword(e.target.value)}}
                    /><br/><br/>

                    <button className="btn btn-primary">
                        Sign Up
                    </button><br /><br />
                    <Link to="/login">Already have an account? Log In</Link>
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;