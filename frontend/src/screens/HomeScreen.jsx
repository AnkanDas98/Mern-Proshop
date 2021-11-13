import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { publicRequest } from "../requestMethods";
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await publicRequest.get("/products");
      setProducts(res.data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col
            className="d-flex align-items-stretch"
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
