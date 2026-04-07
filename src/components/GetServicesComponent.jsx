import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetServiceComponent = () => {
    let [service, setservice] = useState([]);
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Base URL for images fromserver
    const img_url = "https://sdray.alwaysdata.net/static/images/"

    let navigator = useNavigate()

    // create function to fetch service from backend API
    const getservice = async () => {
        setLoading("Fetching service. Please wait...");
        setError("");


        try {
            const response = await axios.get("https://sdray.alwaysdata.net/api/get_services");
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

    const categories = [...new Set(service.map(item => item.service_category))];

    return (
        <div className="row">
            <center><h3>Available Services</h3></center>
            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>

            <div className="container">
                <div className="input-group input-group-sm">
                    <div className="container mb-4">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}
                                        onClick={() => console.log("Searching for:", searchTerm)}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {categories.map((category) => {
                    // Filter services for THIS specific category AND apply the search term
                    const filteredServices = service.filter(s =>
                        s.service_category === category &&
                        s.service_name.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    // Only show the category section if it has matching services
                    if (filteredServices.length === 0) return null;

                    return (
                        <div key={category} className="category-section mb-5">
                            <h2 className="text-primary border-bottom pb-2 mb-4">{category}</h2>
                            <div className="row">
                                {filteredServices.map((item) => (
                                    <div key={item.id} className="col-md-3 mb-4">
                                        <div className="card shadow border-0 h-100">
                                            <img
                                                src={img_url + item.service_image}
                                                className="card-img-top"
                                                alt={item.service_name}
                                                style={{ height: '180px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{item.service_name}</h5>
                                                <p className="card-text text-muted">{item.service_description}</p>
                                                <b className="text-warning">Ksh {item.service_cost}</b>
                                                <br /><br />
                                                <button
                                                    className="btn btn-primary rounded-pill w-100"
                                                    onClick={() => navigator('/makepayment', { state: { service: item } })}
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* 
            

            {service.filter((val) => {
                if (searchTerm === "") {
                    return val;
                } else if (val.service_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                }
            })
            .map((service) => (
                <div key={service.id} className="col-md-3 justify-content-center mb-4">
                    <div className="card shadow card-margin">
                        <img src={img_url + service.service_image}
                            alt="mt-4" />
                        <div className="card-body">
                            <center><h5 className="mt-2">{service.service_name}</h5></center>
                            <p className="text-muted">{service.service_description}</p>
                            <center><b className="text-warning">{service.service_cost}</b></center>
                            <br /><br />
                            <center><button
                                className="btn btn-primary"
                                onClick={() => {
                                    navigator('/makepayment', { state: { service } });
                                }}
                            >Purchase Now
                            </button></center>
                        </div>
                    </div>
                </div>
            ))} */}
        </div>
    );
};

export default GetServiceComponent;