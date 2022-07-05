import React from 'react'
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    let accountType = localStorage.getItem('AccountType');

    const handleSubmit = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("AccountType");
        localStorage.removeItem("Email");
        localStorage.removeItem("Status");
        localStorage.removeItem("Id");
        alert('Logged Out...');
        navigate("/");
    }
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">

                                {/*  Student Pages */}
                                <a style={{ display: accountType == "Student" ? "flex" : "none", textDecoration: "none" }} className="sidebarListItem" href="/addnote" aria-current="page">New Note</a>
                                <a style={{ display: accountType == "Student" ? "flex" : "none", textDecoration: "none" }} className="sidebarListItem" href="/allnotes" aria-current="page">All Notes</a>
                                
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary" type="submit" style={{ float: "right", marginRight: "10px", display: accountType ? "flex" : "none" }}>
                        {"Logout"}
                    </button>

                </nav>
            </div>
        </div>
    )
}

export default Navbar