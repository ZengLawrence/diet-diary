import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch } from '../../app/hooks';
import { openCustomTargets, openPreferences, openSavedFoods } from '../../features/overlays/overlaysSlice';
import PreferenceFormOffcanvas from '../../features/preference/PreferenceFormOffcanvas';
import SavedFoodsOffcanvas from '../../features/saved-food/SavedFoodsOffcanvas';
import EditCustomTargetsOffcanvas from '../../features/target/EditCustomTargetsOffcanvas';
import { isSavedFoodEnabled } from '../../features/flags';

const BrandNavbar = () => {
  const dispatch = useAppDispatch();

  return (
    <Navbar
      expand="lg"
      collapseOnSelect={true}
      className="dd-brand-background-color"
    >
      <Container>
        <Navbar.Brand className="dd-brand-font">
          <img
            src="apple-icon.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <span className="dd-brand-yellow-color">Diet</span><span className="dd-brand-white-color"> Diary</span>
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
            {isSavedFoodEnabled() &&
              <Nav.Link
                eventKey="saved-foods"
                onClick={() => dispatch(openSavedFoods())}
              >
                Saved Foods
              </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <PreferenceFormOffcanvas />
      <EditCustomTargetsOffcanvas />
      <SavedFoodsOffcanvas />
    </Navbar>
  );
}

export default BrandNavbar;