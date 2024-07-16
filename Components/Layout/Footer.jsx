import React from "react";
import { Container } from "react-bootstrap";

// Dynamic year in footer
const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center p-3 bg-dark text-white fixed-bottom">
      <Container className="text-center">
        <p> &copy; {year}. All rights reserved. </p>
      </Container>
    </footer>
  );
};

export default Footer;
