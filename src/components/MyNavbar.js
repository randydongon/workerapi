import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import LeftTopLogo120 from './image/LeftTopLogo120.png'

const MyNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" >
            <Container>
                <Navbar.Brand href="#home"><Image style={{height:'30px'}} src={LeftTopLogo120}></Image></Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={{textDecoration:'none', paddingTop:'10px'}} to="/">Home</Link> &nbsp; &nbsp;
                        <Link style={{textDecoration:'none', paddingTop:'10px'}} to="/profile">Sync Profile</Link> &nbsp; &nbsp;
                        <Link style={{textDecoration:'none', paddingTop:'10px'}} to="/hanger">Hanger line </Link> &nbsp; &nbsp;
                        <Link style={{textDecoration:'none', paddingTop:'10px'}} to="/output">View worker output</Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;