import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Footer from "../../features/day-page/Footer";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import Summary from "../../features/day-page/Summary";
import AddMealButtons from "../../features/meal-card/AddMealButtons";
import MealCards from "../../features/meal-card/MealCards";
import { Header } from "./Header";

interface Props {
  showButton: boolean;
}

function DayPage(props: Props) {
  return (
    <Container>
      <Row className="gy-3">
        <Row>
          <Header />
        </Row>
        <Row>
          <Summary />
        </Row>
        <Row className="gy-1">
          <MealCards />
          {props.showButton && <AddMealButtons />}
        </Row>
        <Row>
          <Footer />
        </Row>
      </Row>

      <SavedMealCardsOffcanvas />

    </Container>
  );
}

export default DayPage;