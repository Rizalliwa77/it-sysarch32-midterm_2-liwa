import React from 'react';
import { useEffect, useState } from "react";
import Products from "./Products.jsx";
import { product_get } from "../api/api.jsx";
import Loading from "./Loading.jsx";

function Body() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      const response = await fetch(product_get);
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    };
    fetchAPI();
  }, []);
  if (loading || products === null) {
    return <Loading />;
  }
  return <Products data={products} />;
}

export default Body;
