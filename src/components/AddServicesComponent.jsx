import axios from "axios";
import { useState } from "react";

const AddServiceComponent = () => {
    let [service_name, setserviceName] = useState("");
    let [service_cost, setserviceCost] = useState("");
    let [service_category, setserviceCategory] = useState("");
    let [service_description, setserviceDescription] = useState("");
    let [service_image, setserviceImage] = useState("");

    let [loading, setLoading] = useState("");
    let [successful, setSuccessful] = useState("");
    let [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading("Loading. Please wait...");
        setSuccessful("");
        setError("");

        try {
        const service_data = new FormData()
            service_data.append("service_name", service_name);
            service_data.append("service_cost", service_cost);
            service_data.append("service_category", service_category);
            service_data.append("service_description", service_description)
            service_data.append("service_image", service_image);


            const response = await axios.post("http://sdray.alwaysdata.net/api/add_service", service_data);
            console.log(response);
            if (response.status === 200) {
                setSuccessful(response.data.message);
                setLoading("");
                setError("");
                setserviceName("");
                setserviceCost("");
                setserviceCategory("");
                setserviceDescription("");
                setserviceImage("");
                
            }
        } catch (error) {
             setError(error.message);
            setLoading("");
        }

    };
    
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Add service</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-success">{successful}</h5>
                <h5 className="text-danger">{error}</h5>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={service_name}
                        placeholder="Enter the service Name"
                        onChange={(e) => { setserviceName(e.target.value) }}
                    /><br /><br />

                    <input
                        type="number"
                        className="form-control"
                        required
                        value={service_cost}
                        placeholder="Enter the service Cost"
                        onChange={(e) => { setserviceCost(e.target.value) }}
                    /><br /><br />

                    <select
                        className="form-control"
                        required
                        value={service_category}
                        onChange={(e) => { setserviceCategory(e.target.value) }}>
                        <option value="">Select Category</option>
                        <option value="hair">Hair Styling</option>
                        <option value="nail">Pedicure</option>
                        <option value="nails">Manicure</option>
                        <option value="massage">Massage</option>
                    </select><br /><br />

                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Enter the service Descriptions"
                        required
                        value={service_description}
                        onChange={(e) => { setserviceDescription(e.target.value) }}>
                    </textarea><br /><br />

                    <label className="form-label">service Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="form-control"
                        onChange={(e) => { setserviceImage(e.target.files[0]) }} />
                    <br /><br />

                    <button className="btn btn-primary">
                        Add service
                    </button>
                </form>
            </div>
        </div>


    );
};

export default AddServiceComponent;