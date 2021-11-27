import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams();

  const number = pageNumber ? pageNumber : 1;

  useEffect(() => {
    listProducts(dispatch, keyword, number);
  }, [dispatch, keyword, number]);

  const { products, error, loading, pages, page } = useSelector(
    (state) => state.productList
  );

  return (
    <>
      <Helmet>
        <title>Welcome to ProShop | Home</title>
        <meta
          name="description"
          content="We sell the best products for cheap"
        />
        <meta
          name="keywords"
          content="electronics buy electronics, cheap electronics"
        />
      </Helmet>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
