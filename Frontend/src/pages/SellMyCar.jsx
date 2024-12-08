// SellMyCar.js
import React, { useContext, useEffect, useState } from "react";
import "./SellMyCar.css";
import { AddCar } from "../components/Admin/AddCar";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const SellMyCar = () => {
    const { admin } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            alert("You are not authorized to view this page");
            navigate("/");
        }
    }, [admin])

    const [activeTab, setActiveTab] = useState(false);
    useEffect(() => {
        

        const tab = sessionStorage.getItem("wheeldeeltab");

        if (tab) {
            setActiveTab(true);
            sessionStorage.removeItem("wheeldeeltab");
        } else {
            setActiveTab(false);
        }
    }, []);

    const [editCar, setEditCar] = useState({
        brand: "",
        rating: 0,
        carName: "",
        model: "",
        price: 0,
        speed: 0,
        gps: false,
        seatType: "",
        automatic: false,
        description: "",
        file: null,
    });

    useEffect(() => {
        const currCar = JSON.parse(sessionStorage.getItem("editCar"));

        if (currCar) {
            setEditCar(currCar);
            sessionStorage.removeItem("editCar");
        } else {
            setEditCar({
                brand: "",
                rating: 0,
                carName: "",
                model: "",
                price: 0,
                speed: 0,
                gps: false,
                seatType: "",
                automatic: false,
                description: "",
                file: null,
            });
        }
    }, []);

    if (admin)
    return (
        <div className="sell-my-car">
            <div className="sidebar">
                <h3>Dashboard</h3>
                <ul>
                    <li
                        className={!activeTab ? "active" : ""}
                        onClick={() => setActiveTab(false)}
                    >
                        Profile
                    </li>
                    <li
                        className={activeTab ? "active" : ""}
                        onClick={() => setActiveTab(true)}
                    >
                        Your Cars
                    </li>
                </ul>
            </div>

            <div className="content">
                {!activeTab && (
                    <div className="profile">
                        <h2>Update Profile</h2>
                        <form>
                            <label>Name</label>
                            <input type="text" placeholder="Enter your name" />

                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                            />

                            <label>Phone</label>
                            <input type="text" placeholder="Enter your phone" />

                            <button type="submit">Update</button>
                        </form>
                    </div>
                )}

                {activeTab && (
                    <div className="your-cars">
                        <AddCar curr={editCar} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellMyCar;
