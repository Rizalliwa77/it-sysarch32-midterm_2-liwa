import React from 'react';
import { Link } from "react-router-dom";
import { default_point, product_get } from "../api/api";
import { useState } from "react";

function Products(data) {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    productImage: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      setFormData({
        ...formData,
        productImage: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("productImage", formData.productImage);

      const response = await fetch(product_get, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const post_data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        setErrorMessage(post_data.message);
      }
    } catch (error) {
      console.log("Posting Error:", error);
    }
  };
  return (
    <>
      <div className="add-header">
        <form onSubmit={handleSubmit}>
          <label className="text-center font-primary font-bold">
            Add A Product
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="file"
            name="productImage"
            onChange={handleChange}
            placeholder="Image"
          />
          <button type="submit">Post Product</button>
        </form>
        {errorMessage && (
          <label className="font-primary color-primary fsize-small">
            {errorMessage}
          </label>
        )}
      </div>
      <div className="body-layer mt-3">
        {data.data.map((entry, index) => {
          const fileName = entry.productImage
            ? entry.productImage.substring(
                entry.productImage.lastIndexOf("\\") + 1
              )
            : null;
          return (
            <Link
              to={`/products/${entry._id}`}
              data={[entry.name, entry.price]}
              key={index}
              className="text-deco"
            >
              <div key={index} className="all-card">
                <img className="all-image" src={default_point + fileName} />
                <label className="font-primary font-bold">
                  {entry.name}
                </label>
                <label className="font-primary fsize-body font-bold">
                  ₱{entry.price}
                </label>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Products;
