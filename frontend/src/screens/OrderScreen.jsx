import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { getOrderDetail, payOrder } from "../actions/orderActions";
import { axiosRequest } from "../requestMethods";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stripetoken, setStripeToken] = useState();
  const [clientStripe, setClientStripe] = useState("");

  const { id } = useParams();

  const orderDetail = useSelector((state) => state.orderDetail);
  const orderPay = useSelector((state) => state.orderPay);

  const { userInfo } = useSelector((state) => state.userLogin);

  let userToken = "";
  let userId = "";

  if (userInfo) {
    userToken = userInfo.token;
    userId = userInfo._id;
  }

  const { loading, error } = orderDetail;

  const { loading: loadingPay } = orderPay;

  let order = orderDetail.order;

  if (!loading) {
    const addDecimals = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order = { ...order, itemsPrice };
  }

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
    getOrderDetail(dispatch, id);
    const clientScrect = async () => {
      const { data: clientId } = await axiosRequest.get("/config/stripe");
      setClientStripe(clientId);
    };

    clientScrect();

    // eslint-disable-next-line
  }, [id, setClientStripe, userInfo]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
    const makePaymentRequest = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      try {
        const { data } = await axiosRequest.post(
          "/orders/payment",
          { amount: order.totalPrice * 100, tokenId: stripetoken },
          config
        );
        setStripeToken("");

        payOrder(dispatch, id, data);
      } catch (error) {
        console.log(error);
      }
    };
    stripetoken && makePaymentRequest();
  }, [order, userToken, stripetoken, id, dispatch, navigate, userInfo]);

  // useEffect(() => {
  //   if (paymentData.length > 0) {
  //     payOrder(dispatch, id, paymentData);
  //   }
  // }, [id, dispatch, paymentData]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : order.user._id !== userId ? (
    <Message variant="danger">No orders found</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {order.isDeliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Paymeny Method</h2>
              <p>
                <strong>Method: </strong>
                {order.payment}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidtAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Orders Is Empty</Message>
              ) : (
                <ListGroup.Item>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link
                              to={`/product/${item.product}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Price</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax Price</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay ? (
                  <Loader />
                ) : (
                  <StripeCheckout
                    name="Ankan"
                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    amount={order.totalPrice * 100}
                    token={onToken}
                    stripeKey={clientStripe}
                  >
                    <Button>CHECKOUT NOW</Button>
                  </StripeCheckout>
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
