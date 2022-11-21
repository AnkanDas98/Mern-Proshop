import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

import { listTopProducts } from "../actions/productAction";

import classes from "./ProductCarousel.module.css";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.topRatedProduct
  );

  useEffect(() => {
    listTopProducts(dispatch);
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" variant="dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              className={classes.carouselImage}
              src={product.image}
              alt={product.name}
              fluid
            />
          </Link>
          <h2 className={classes.carouselText}>{product.name}</h2>
          {/* <Carousel.Caption className="carousel-caption">
          
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
