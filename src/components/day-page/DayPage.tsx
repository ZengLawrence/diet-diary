import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import AddMealButton from "../../features/day-page/AddMealButton";
import Footer from "../../features/day-page/Footer";
import Header from "../../features/day-page/Header";
import Summary from "../../features/day-page/Summary";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";
import { VariantPrimary } from "../ButtonVariant";

interface Props {
  numberOfMeals: number;
  showButton: boolean;
}

export const DayPage = (props: Props) => (
  <div>
    <Header />
    <Summary />

    <div data-cy="mealCards">
      {_.map(_.range(props.numberOfMeals), (index) => (
        <Card className="mt-1" key={index} data-cy={"meal-" + index}>
          <MealCardHeader mealIndex={index} />

          <ListGroup>
            <FoodListGroupItems mealIndex={index} />
          </ListGroup>
        </Card>
      ))}
    </div>
    {props.showButton &&
      <div className="p-2">
        <AddMealButton data-cy="buttonAddMeal" variant={VariantPrimary}>
          <FontAwesomeIcon icon={faPlus} />
        </AddMealButton>
      </div>}
    <Footer />
  </div>
);
