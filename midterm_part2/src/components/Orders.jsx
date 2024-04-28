import React, { useState, useEffect } from "react";
import { order_point } from "../api/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Orders() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(order_point, {
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
        setOrders(data.orders);
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
            <th className="font-primary">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="font-primary">
                <Link to={`/orders/${order._id}`}>{order._id}</Link>
              </td>
              <td className="font-primary">
                {order.product ? (
                  <Link to={`/products/${order.product._id}`}>
                    {order.product._id}
                  </Link>
                ) : (
                  "Product Not Found"
                )}
              </td>
              <td className="font-primary">{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
