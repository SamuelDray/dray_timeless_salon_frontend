import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MakePaymentComponent = () => {

    const { service } = useLocation().state || {};
    console.log(service);

    const img_url = 'https://sdray.alwaysdata.net/static/images/';

    let [phone, setPhone] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading("Please wait...");

        try {
            const data = new FormData();
            data.append("amount", service.service_cost);
            data.append("phone", phone);

            const response = await axios.post("https://sdray.alwaysdata.net/api/mpesa_payment", data);
            console.log(response);
            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message);
                setPhone("");
            }
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    }
    return (
        <div className="row justify-content-center mt-4">
            <center><h2>LIPA NA MPESA</h2></center>
            <div className="col-md-3">
                <img src={img_url + service.service_image} className="rounded img-thumbnail" />
            </div>
            <div className="col-md-3">
                <center><h3 className="text-dark">{service.service_name}</h3></center>
                <center><h5 className="text-primary">{service.service_category}</h5></center>
                <center><p className="text-muted">{service.service_description}</p></center>
                <center><h3 className="text-warning">{service.service_cost}</h3></center>

                <hr />
                <center><h6 className="text-warning">{loading}</h6></center>
                <center><h6 className="text-danger">{error}</h6></center>
                <center><h6 className="text-success">{success}</h6></center>
                <form onSubmit={handleSubmit}>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter Amount"
                        readOnly
                        value={service.service_cost}
                    /><br />
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter Mpesa No. 254XXXXXXXXX"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    /><br />
                    <button className="btn btn-primary">Pay Now</button>
                </form>
            </div>

        </div>
    );
};

export default MakePaymentComponent;