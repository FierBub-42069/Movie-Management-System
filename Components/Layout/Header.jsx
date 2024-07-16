import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthService } from "../Auth/AuthService";
import { Link } from "react-router-dom";

const Header = () => {
  // Obtaining current user authenticated and authorized using AuthService
  const user = AuthService.getCurrentUser();

  // Function for handling logout
  const handleLogout = () => {
    toast.success("Logout successful");
    AuthService.logout();
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/movies"> Movie Management System </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          {user && (
            <Nav.Item className="d-flex">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
        <Nav>
          <Nav.Item>
            {user && (
              <Nav.Link onClick={handleLogout}>
                <Button variant="outline-danger" style={{marginRight: "10px !important"}}>Logout</Button>
              </Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
