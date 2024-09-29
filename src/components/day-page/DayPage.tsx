import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import AddMealButton from "../../features/day-page/AddMealButton";
import Footer from "../../features/day-page/Footer";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import Summary from "../../features/day-page/Summary";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { Header } from "./Header";

interface Props {
  numberOfMeals: number;
  showButton: boolean;
  showSavedMeals: () => void;
}

function DayPage(props: Props) {
  return (
    <Container>
      <Header />
      <Summary />

      {_.map(_.range(props.numberOfMeals), (index) => (
        <Card
          id={_.toString(index)}
          className="mt-1"
          key={index}
          data-cy="mealCard">
          <MealCardHeader mealIndex={index} />

          <ListGroup>
            <FoodListGroupItems mealIndex={index} />
          </ListGroup>
        </Card>
      ))}
      {props.showButton &&
        <div className="p2 d-flex justify-content-end mt-3">
          <AddMealButton data-cy="buttonAddMeal" variant={VariantPrimary}>
            <FontAwesomeIcon icon={faPlus} />
          </AddMealButton>&nbsp;
          <Button data-cy="buttonAddSavedMeal" variant={VariantSecondary} onClick={props.showSavedMeals}>
            <FontAwesomeIcon icon={faPlus} /> Saved Meal
          </Button>
        </div>}
      <Footer />

      <SavedMealCardsOffcanvas />

    </Container>
  );
}

export default DayPage;