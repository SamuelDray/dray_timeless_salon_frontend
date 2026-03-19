import { Link } from "react-router-dom"

const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Timeless Salon</Link> 
            <button className="navbar-toggler" data-bs-toggle="Collapse" data-bs-target="#navbarcollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Home</Link>
                </div>

                <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/login">LogIn</Link>
                    <Link className="nav-link" to="/signup">SignUp</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;