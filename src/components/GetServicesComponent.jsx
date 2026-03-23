import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetServiceComponent = () => {
    let [service, setservice] = useState([]);
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");

     // Base URL for images fromserver
    const img_url = "https://sdray.alwaysdata.net/static/images/"

    let navigator = useNavigate()

    // create function to fetch service from backend API
    const getservice = async () => {
        setLoading("Fetching service. Please wait...");
        setError("");


        try {
            const response = await axios.get("https://sdray.alwaysdata.net/api/get_service");
            console.log(response)

            if (response.status === 200) {
                setservice(response.data);
                setLoading("");
            }
        } catch (error) {
            setError(error.message);
            setLoading("");
        };
    };

    useEffect(() => {
        getservice();
    }, []);

    return (
        <div className="row">
            <h3>Available service</h3>
            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>

            {service.map((service)=>(
                <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin">
                    <img src={img_url+service.service_image} 
                    alt="mt-4" />
                    <div className="card-body">
                        <h5 className="mt-2">{service.service_name}</h5>
                        <p className="text-muted">{service.service_description}</p>
                        <b className="text-warning">{service.service_cost}</b>
                        <br /><br />
                        <button 
                        className="btn btn-primary" 
                        onClick={()=>{
                            navigator('/makepayment', { state: { service }});
                            }}
                            >Purchase Now
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
};

export default GetServiceComponent;