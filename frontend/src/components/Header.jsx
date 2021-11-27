import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import classes from "./Header.module.css";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userAction";

const Header = () => {
  const dispacth = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    logout(dispacth);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <div className="nav-link">
                <Link to="/cart" className={classes.link}>
                  <i
                    className="fas fa-shopping-cart"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Cart
                </Link>
              </div>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <div className="dropdown-item">
                    <Link to="/profile" className={classes.profileLink}>
                      Profile
                    </Link>
                  </div>
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </div>
                </NavDropdown>
              ) : (
                <div className="nav-link">
                  <Link className={classes.link} to="/login">
                    <i
                      className="fas fa-user"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Sign In
                  </Link>
                </div>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <div className="dropdown-item">
                    <Link to="/admin/userlist" className={classes.profileLink}>
                      Users
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <Link
                      to="/admin/productlist"
                      className={classes.profileLink}
                    >
                      Products
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <Link to="/admin/orderlist" className={classes.profileLink}>
                      Orders
                    </Link>
                  </div>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
