import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import { deleteAProduct } from "../actions/adminActions";
import { listProducts } from "../actions/productAction";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber } = useParams();

  const number = pageNumber ? pageNumber : 1;

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const isAdmin = userInfo
    ? userInfo.isAdmin
      ? userInfo.isAdmin
      : false
    : false;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    } else {
      listProducts(dispatch, "", number);
    }
  }, [dispatch, isAdmin, navigate, successDelete, number]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteAProduct(dispatch, id);
    }
  };

  const createProductHandler = () => {
    navigate("/admin/createproduct");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col className="text-start">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATAGORY</th>
                <th>BRAND</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit "></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={isAdmin} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
