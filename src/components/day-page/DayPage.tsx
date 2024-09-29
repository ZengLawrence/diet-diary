import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Footer from "../../features/day-page/Footer";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import Summary from "../../features/day-page/Summary";
import MealCards from "../../features/meal-card/MealCards";
import { AddMealButtons } from "../meal-card/AddMealButtons";
import { Header } from "./Header";

interface Props {
  showButton: boolean;
  showSavedMeals: () => void;
}

function DayPage(props: Props) {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <Summary />
      </Row>
      <Row className="gy-1">
        <MealCards />
        {props.showButton && <AddMealButtons showSavedMeals={props.showSavedMeals} />}
      </Row>
      <Row>
        <Footer />
      </Row>

      <SavedMealCardsOffcanvas />

    </Container>
  );
}

export default DayPage;