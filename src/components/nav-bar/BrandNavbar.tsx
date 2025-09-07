import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../app/apple-icon.png';
import { useAppDispatch } from '../../app/hooks';
import { openCustomTargets, openPreferences } from '../../features/overlays/overlaysSlice';

const BrandNavbar = () => {
  const dispatch = useAppDispatch();

  return (
    <Navbar
      expand="lg"
      collapseOnSelect={true}
      className="dd-brand-background-color"
    >
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
            <Nav.Link
              eventKey="preferences"
              onClick={() => dispatch(openPreferences())}>
              Preferences
            </Nav.Link>
            <Nav.Link
              eventKey="custom-targets"
              onClick={() => dispatch(openCustomTargets())}>
              Custom Targets
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BrandNavbar;