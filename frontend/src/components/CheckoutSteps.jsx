import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./CheckoutSteps.module.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          // <div className="nav-link">
          <Link to="/login" className={classes.stepsLink}>
            Sign In
          </Link>
        ) : (
          // </div>
          <Link to="/login" className={classes.stepsLinkDisable}>
            Shipping
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          //<div className="nav-link">
          <Link to="/login" className={classes.stepsLink}>
            Shipping
          </Link>
        ) : (
          // </div>
          <Link to="/login" className={classes.stepsLinkDisable}>
            Sign In
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link to="/payment" className={classes.stepsLink}>
            Payment
          </Link>
        ) : (
          <Link to="/payment" className={classes.stepsLinkDisable}>
            Payment
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          // <div className="nav-link">
          <Link to="/placeorder" className={classes.stepsLink}>
            Place Order
          </Link>
        ) : (
          // </div>
          <Link to="/placeorder" className={classes.stepsLinkDisable}>
            Place Order
          </Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
