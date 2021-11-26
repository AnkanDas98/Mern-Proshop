import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { getOrders, deliverOrders } from "../actions/adminActions";

const OrdersListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state.getOrders);
  const { loading: loadingDeliver, error: errorDeliver } = useSelector(
    (state) => state.deliverOrders
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getOrders(dispatch);
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const deleverHandler = (id) => {
    deliverOrders(dispatch, id);
  };

  return (
    <>
      <h1>Orders</h1>
      {loadingDeliver && <Loader />}
      {errorDeliver && <Message variant="danger">{errorDeliver}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Products And Qty</th>
              <th>Shipping Address</th>
              <th>Total Price</th>
              <th>Delivered</th>
              <th>Paid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user._id}</td>
                <td>{order.user.name}</td>
                <td>
                  {order.orderItems.map((item) => (
                    <p key={item._id}>
                      {item.name}({item.qty})
                    </p>
                  ))}
                </td>
                <td>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isDelivered ? (
                    order.isDeliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    order.paidtAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {/* <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit "></i>
                    </Button>
                  </Link> */}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    disabled={order.isDelivered}
                    style={{ backgroundColor: "#15aabf" }}
                    onClick={() => deleverHandler(order._id)}
                  >
                    <i className="fas fa-shipping-fast"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
