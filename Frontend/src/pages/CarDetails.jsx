import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { AuthContext } from "../components/AuthContext";

const CarDetails = () => {
    const { user } = useContext(AuthContext);

    console.log(user);

    const [bookingData, setBookingData] = useState(null);
    const [booked, setBooked] = useState(false);

    const deleteFromDB = async (id) => {
        await fetch(`http://localhost:3000/api/cars/booked/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Data Deleted", data);
            });
    };

    useEffect(() => {
        const getUserDetails = async () => {
            await fetch(`http://localhost:3000/api/cars/booked/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("User Details", data);
                    setBookingData(data[0]);

                    if (data) {
                        const isBooked = data.find((item) => item.carId == slug);

                        console.log("Is Booked", isBooked);

                        if (isBooked && new Date(isBooked.expiryTime) > new Date()) {
                            console.log("Booked");
                            setBooked(true);
                        }
                        else
                        {
                            deleteFromDB(isBooked._id);
                            console.log("Not Booked");
                            setBooked(false);
                        }
                    } else {
                        console.log("Not Booked");
                        setBooked(false);
                    }
                });
        };

        if (user) {
            getUserDetails();
        }
    }, [user]);

    const navigate = useNavigate();

    const [bookingInfo, setBookingInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        fromAddress: "",
        toAddress: "",
        persons: "1 person",
        luggage: "1 luggage",
        journeyDate: "",
        journeyTime: "",
        rentDays: "1",
        notes: "",
    });

    const [singleCarItem, setCar] = useState(null);
    const { slug } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingInfo({ ...bookingInfo, [name]: value });
    };

    const [selectedPayment, setPayment] = useState("cash");

    const handlePaymentChange = (e) => {
        setPayment(e.target.value);
    };

    const handleCheckout = () => {
        if (
            bookingInfo.firstName === "" ||
            bookingInfo.lastName === "" ||
            bookingInfo.email === "" ||
            bookingInfo.phoneNumber === "" ||
            bookingInfo.fromAddress === "" ||
            bookingInfo.toAddress === "" ||
            bookingInfo.journeyDate === "" ||
            bookingInfo.journeyTime === "" ||
            bookingInfo.rentDays === ""
        ) {
            alert("Please fill all the fields");
            return;
        }

        sessionStorage.setItem("BookingInfo", JSON.stringify(bookingInfo));
        sessionStorage.setItem("PaymentMethod", selectedPayment);
        sessionStorage.setItem("Car", JSON.stringify(singleCarItem));
        navigate("/checkout");
    };

    const handleReserveClick = () => {
        console.log(bookingInfo);
        console.log(selectedPayment);
    };

    useEffect(() => {
        console.log(slug);

        const response = fetch(`http://localhost:3000/api/cars/data/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setCar(data);
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };

    if (user && singleCarItem != null && singleCarItem != undefined) {
        return (
            <Helmet title={singleCarItem.carName}>
                <section>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <img
                                    src={`http://localhost:3000/${singleCarItem.imgUrl}`}
                                    alt={singleCarItem.carName}
                                    className="w-100"
                                />
                            </Col>

                            <Col lg="6">
                                <div className="car__info">
                                    <h2 className="section__title">
                                        {singleCarItem.carName}
                                    </h2>

                                    {/* Message to Show that Car is Already Booked */}
                                    {booked && (
                                        <div
                                            className="alert alert-primary mt-3 fw-bold"
                                            role="alert"
                                        >
                                            This car is already booked by you
                                        </div>
                                    )}

                                    {/* If Car is Booked Then Show the Booked Time and Date */}
                                    {booked && (
                                        <div
                                            className="alert alert-secondary mt-3 fw-bold"
                                            role="alert"
                                        >
                                            Booked on:{" "}
                                            {formatDate(
                                                bookingData.find(
                                                    (item) => item.carId == slug
                                                ).bookedDate
                                            )}{" "}
                                            at{" "}
                                            {
                                                bookingData.find(
                                                    (item) => item.carId == slug
                                                ).bookedTime
                                            }
                                        </div>
                                    )}

                                    {/* Expiry of Rented Date */}
                                    {booked && (
                                        <div
                                            className="alert alert-danger mt-3 fw-bold"
                                            role="alert"
                                        >
                                            Expires on:{" "}
                                            {formatDate(
                                                bookingData.find(
                                                    (item) => item.carId == slug
                                                ).expiryTime
                                            )}
                                        </div>
                                    )}

                                    <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                                        <h6 className="rent__price fw-bold fs-4">
                                            Rs.{singleCarItem.price}.00 / Day
                                        </h6>

                                        <span className=" d-flex align-items-center gap-2">
                                            <span style={{ color: "#f9a826" }}>
                                                <i className="ri-star-s-fill"></i>
                                                <i className="ri-star-s-fill"></i>
                                                <i className="ri-star-s-fill"></i>
                                                <i className="ri-star-s-fill"></i>
                                                <i className="ri-star-s-fill"></i>
                                            </span>
                                            ({singleCarItem.rating} ratings)
                                        </span>
                                    </div>

                                    <p className="section__description">
                                        {singleCarItem.description}
                                    </p>

                                    <div
                                        className=" d-flex align-items-center mt-3"
                                        style={{ columnGap: "4rem" }}
                                    >
                                        <span className=" d-flex align-items-center gap-1 section__description">
                                            <i
                                                className="ri-roadster-line"
                                                style={{ color: "#f9a826" }}
                                            ></i>{" "}
                                            {singleCarItem.model}
                                        </span>

                                        <span className=" d-flex align-items-center gap-1 section__description">
                                            <i
                                                className="ri-settings-2-line"
                                                style={{ color: "#f9a826" }}
                                            ></i>{" "}
                                            {singleCarItem.automatic}
                                        </span>

                                        <span className=" d-flex align-items-center gap-1 section__description">
                                            <i
                                                className="ri-timer-flash-line"
                                                style={{ color: "#f9a826" }}
                                            ></i>{" "}
                                            {singleCarItem.speed}
                                        </span>
                                    </div>

                                    <div
                                        className=" d-flex align-items-center mt-3"
                                        style={{ columnGap: "2.8rem" }}
                                    >
                                        <span className=" d-flex align-items-center gap-1 section__description">
                                            <i
                                                className="ri-map-pin-line"
                                                style={{ color: "#f9a826" }}
                                            ></i>{" "}
                                            {singleCarItem.gps}
                                        </span>

                                        <span className=" d-flex align-items-center gap-1 section__description">
                                            <i
                                                className="ri-wheelchair-line"
                                                style={{ color: "#f9a826" }}
                                            ></i>{" "}
                                            {singleCarItem.seatType}
                                        </span>

                                        <span className=" d-flex align-items-center gap-1 section__description">
                                            <i
                                                className="ri-building-2-line"
                                                style={{ color: "#f9a826" }}
                                            ></i>{" "}
                                            {singleCarItem.brand}
                                        </span>
                                    </div>
                                </div>
                            </Col>

                            {/* If the Car is Booked show the Booking Information */}
                            {booked && (
                                <Col lg="7" className="mt-5">
                                    <div className="booking-info mt-5">
                                        <h5 className="mb-4 fw-bold ">
                                            Booking Information
                                        </h5>
                                        <BookingForm
                                            bookingInfo={bookingData.find(
                                                (item) => item.carId == slug
                                            )}
                                        />
                                    </div>
                                </Col>
                            )}

                            {booked && (
                                <Col lg="5" className="mt-5">
                                    <div className="payment__info mt-5">
                                        <h5 className="mb-4 fw-bold ">
                                            Payment Information
                                        </h5>
                                        <PaymentMethod
                                            selectedPayment={
                                                bookingData.find(
                                                    (item) => item.carId == slug
                                                ).paymentMethod
                                            }
                                            showCheck={false}
                                            item={{
                                                price: singleCarItem.price,
                                                rentDays: bookingData.find(
                                                    (item) => item.carId == slug
                                                ).rentDays,
                                            }}
                                        />
                                    </div>
                                </Col>
                            )}

                            {!booked && (
                                <Col lg="7" className="mt-5">
                                    <div className="booking-info mt-5">
                                        <h5 className="mb-4 fw-bold ">
                                            Booking Information
                                        </h5>
                                        <BookingForm
                                            bookingInfo={bookingInfo}
                                            handleInputChange={
                                                handleInputChange
                                            }
                                        />
                                    </div>
                                </Col>
                            )}

                            {!booked && (
                                <Col lg="5" className="mt-5">
                                    <div className="payment__info mt-5">
                                        <h5 className="mb-4 fw-bold ">
                                            Payment Information
                                        </h5>
                                        <PaymentMethod
                                            selectedPayment={selectedPayment}
                                            handleCheckout={handleCheckout}
                                            handlePaymentChange={
                                                handlePaymentChange
                                            }
                                            handleReserveClick={
                                                handleReserveClick
                                            }
                                        />
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </section>
            </Helmet>
        );
    }
};

export default CarDetails;
