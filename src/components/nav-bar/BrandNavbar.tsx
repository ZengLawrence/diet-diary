import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../app/apple-icon.png';

function BrandNavbar() {
  return (
    <Navbar expand="lg" className="dd-brand-background-color">
      <Container>
        <Navbar.Brand>
          <Image
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            priority={true}
          />{' '}
          Diet Diary
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BrandNavbar;