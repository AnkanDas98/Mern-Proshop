import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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

              <div className="nav-link">
                <Link className={classes.link} to="/login">
                  <i className="fas fa-user" style={{ marginRight: "5px" }}></i>
                  Sign In
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
