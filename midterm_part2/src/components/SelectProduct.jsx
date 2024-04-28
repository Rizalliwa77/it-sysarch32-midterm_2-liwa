import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { default_point, order_point, product_get } from "../api/api.jsx";
import Loading from "./Loading.jsx";

function SelectProduct() {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [editItem, setEditItem] = useState({
    name: "",
    price: "",
    productImage: "",
  });
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputEdit = (e) => {
    if (e.target.name === "productImage") {
      setEditItem({ ...editItem, productImage: e.target.files[0] });
    } else {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updateOps = [
        { propName: "name", value: editItem.name },
        { propName: "price", value: editItem.price },
      ];

      const res = await fetch(product_get + "/" + productId, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateOps),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.reload();
      } else {
        setAuthRes(data.message);
      }
    } catch (error) {
      setAuthRes("Please Try Again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(order_point, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: formData.quantity,
        }),
      });
      const data = await response.json();
      console.log(token);
      console.log(data);

      if (response.ok) {
        window.location.href = "/orders";
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(product_get + "/" + productId, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/products";
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Please Try Again");
    }
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      const response = await fetch(product_get + "/" + productId);
      const data = await response.json();
      const fileName = data.product.productImage.substring(
        data.product.productImage.lastIndexOf("\\") + 1
      );
      data.product.productImage = fileName;
      setProduct(data.product);
      setLoading(false);
    };
    fetchAPI();
  }, [productId]);

  if (loading || product === null) {
    return <Loading />;
  }

  return (
    <>
      <div className="add-header">
        <form onSubmit={handleDelete}>
          <label className="text-center font-primary font-bold">
            Delete Item
          </label>
          <button type="submit">Delete Product</button>
        </form>
        <form onSubmit={handleEdit}>
          <label className="text-center font-primary font-bold">
            Edit Item
          </label>
          <input
            type="text"
            onChange={handleInputEdit}
            value={editItem.name}
            name="name"
            placeholder="Product Name"
          />
          <input
            type="text"
            onChange={handleInputEdit}
            value={editItem.price}
            placeholder="Product Price"
            name="price"
          />
          <button>Edit Product</button>
        </form>
        <form onSubmit={handleSubmit}>
          <label className="text-center font-primary font-bold">
            Order Item
          </label>
          <input
            type="text"
            onChange={handleChange}
            value={productId}
            name="productId"
            placeholder="Product ID"
            hidden
          />
          <input
            type="text"
            onChange={handleChange}
            name="quantity"
            value={formData.quantity}
            placeholder="Quantity"
          />
          <button type="submit">Order Item</button>
        </form>
        {errorMessage && (
          <label className="font-primary color-primary fsize-small">
            {errorMessage}
          </label>
        )}
      </div>
      <div className="center-body">
        <div className="select-card colorbg-secondary">
          <img
            className="select-image"
            src={default_point + product.productImage}
            alt={product.productImage}
          />
          <label className="font-primary fsize-header">{product.name}</label>
          <label className="font-primary font-body">₱{product.price}</label>
        </div>
      </div>
    </>
  );
}

export default SelectProduct;
