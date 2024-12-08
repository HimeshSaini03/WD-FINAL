import React from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = ({
    selectedPayment,
    handlePaymentChange,
    handleCheckout,
    item = null,
    showCheck = true,
}) => {
    return (
        <>
            <div className="payment">
                <label
                    htmlFor="bank-transfer"
                    className="d-flex align-items-center gap-2"
                >
                    <input
                        type="radio"
                        id="bank-transfer"
                        value="bank-transfer"
                        checked={selectedPayment === "bank-transfer"}
                        onChange={handlePaymentChange}
                    />
                    Direct Bank Transfer
                </label>
            </div>

            <div className="payment mt-3">
                <label
                    htmlFor="cheque"
                    className="d-flex align-items-center gap-2"
                >
                    <input
                        type="radio"
                        id="cheque"
                        value="cheque"
                        checked={selectedPayment === "cheque"}
                        onChange={handlePaymentChange}
                    />
                    Cheque Payment
                </label>
            </div>

            <div className="payment mt-3 d-flex align-items-center justify-content-between">
                <label
                    htmlFor="master-card"
                    className="d-flex align-items-center gap-2"
                >
                    <input
                        type="radio"
                        id="master-card"
                        value="master-card"
                        checked={selectedPayment === "master-card"}
                        onChange={handlePaymentChange}
                    />
                    Master Card
                </label>
                <img src={masterCard} alt="Master Card" />
            </div>

            <div className="payment mt-3 d-flex align-items-center justify-content-between">
                <label
                    htmlFor="paypal"
                    className="d-flex align-items-center gap-2"
                    style={{
                        paddingBottom: "10px",
                    }}
                >
                    <input
                        type="radio"
                        id="paypal"
                        value="paypal"
                        checked={selectedPayment === "paypal"}
                        onChange={handlePaymentChange}
                    />
                    Paypal
                </label>
            </div>

            {showCheck && (
                <button
                    className="btnn btn-success"
                    type="button"
                    style={{
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        borderRadius: "8px",

                        border: "none",

                        transition: "background-color 0.3s ease",
                    }}
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            )}

            {/* Show the Price User Paid */}
            {!showCheck && (
                <div className="mt-4">
                    <h5 className="mb-4 fw-bold ">Total Transaction</h5>
                    <table className="vertical-table">
                        <tbody>
                            <tr>
                                <th>Price Per Day</th>
                                <td>{"Rs. " + item.price}</td>
                            </tr>
                            <tr>
                                <th>Rent Days</th>
                                <td>{item.rentDays}</td>
                            </tr>
                            <tr className="bg-success text-white">
                                <th>Total Price</th>
                                <td className="fw-bold">
                                    {"Rs. " + item.price * item.rentDays}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default PaymentMethod;
