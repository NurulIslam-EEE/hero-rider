import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useData from '../../hooks/useData';

const Navigation = () => {
    const { user, admin, logOut } = useAuth();
    console.log(user)
    console.log(user)
    const handleLogout = () => {
        logOut()
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Hero Rider</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"

                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/">Home</Nav.Link>

                            {(user?.email && admin) && <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>}
                            <Nav.Link as={Link} to="/">{user?.displayName}</Nav.Link>
                            {!user?.email && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                            {user?.email && <button onClick={handleLogout}>Logout</button>}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;