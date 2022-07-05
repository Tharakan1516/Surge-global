import React, { Profiler, useEffect } from "react";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

import LoginPage from "./Components/LoginPage";
import RegisterUser from "./Components/RegisterUser";
import AllUsers from "./Components/AllUsers";
import AllNotes from "./Components/AllNotes";
import UpdatePassword from "./Components/UpdatePassword";
import InsertNote from "./Components/InsertNote";
import UpdateNote from "./Components/UpdateNote";
import Navbar from "./Components/Navbar";

export default function Router() {
    return (
        <div>
            <Routers>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegisterUser />} />
                    <Route exact path="/allusers/:id" element={<AllUsers />} />
                    <Route exact path="/allnotes" element={<AllNotes />} />
                    <Route exact path="/updatepword/:id" element={<UpdatePassword />} />
                    <Route exact path="/addnote" element={<InsertNote />} />
                    <Route exact path="/updatenote/:id" element={<UpdateNote />} />
                </Routes>
            </Routers>
        </div>
    );
}