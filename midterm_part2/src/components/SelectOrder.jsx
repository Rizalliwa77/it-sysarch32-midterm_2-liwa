import React from 'react';
import { useEffect, useState } from "react";
import { order_point } from "../api/api";
import { useParams } from "react-router-dom";
import Loading from "./Loading.jsx";

function SelectOrder() {
  const token = localStorage.getItem("token");
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteOrder = async () => {
    try {
      const response = await fetch(order_point + "/" + orderId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/orders";
        console.log(data);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(order_point + "/" + orderId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrder([data.order]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-layer font-primary font-bold fsize-header">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="order-layer">
      <table className="orange-table">
        <thead>
          <tr>
            <th className="font-primary">Order ID</th>
            <th className="font-primary">Product ID</th>
            <th className="font-primary">Product Name</th>
            <th className="font-primary">Quantity</th>
            <th className="font-primary">Delete Order</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order, index) => (
            <tr key={index}>
              <td className="font-primary">{order._id}</td>
              <td className="font-primary">
                {order.product ? order.product._id : "Product ID Not Found"}
              </td>
              <td className="font-primary">
                {order.product ? order.product.name : "Product Name Not Found"}
              </td>
              <td className="font-primary">{order.quantity}</td>
              <td>
                <button onClick={deleteOrder}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SelectOrder;
