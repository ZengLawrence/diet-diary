import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddMealButton from "../../features/day-page/AddMealButton";
import Footer from "../../features/day-page/Footer";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import Summary from "../../features/day-page/Summary";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { Header } from "./Header";
import { MealCards } from "../meal-card/MealCards";


interface Props {
  numberOfMeals: number;
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
        <MealCards numberOfMeals={props.numberOfMeals} />
        {props.showButton &&
          <div className="p2 d-flex justify-content-end">
            <AddMealButton data-cy="buttonAddMeal" variant={VariantPrimary}>
              <FontAwesomeIcon icon={faPlus} />
            </AddMealButton>&nbsp;
            <Button data-cy="buttonAddSavedMeal" variant={VariantSecondary} onClick={props.showSavedMeals}>
              <FontAwesomeIcon icon={faPlus} /> Saved Meal
            </Button>
          </div>}
      </Row>
      <Row>
        <Footer />
      </Row>

      <SavedMealCardsOffcanvas />

    </Container>
  );
}

export default DayPage;