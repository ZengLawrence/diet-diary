import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import Footer from "../../features/day-page/Footer";
import Header from "../../features/day-page/Header";
import Summary from "../../features/day-page/Summary";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";
import { Meal } from "../../model/Food";

export const UneditableDayPage = (props: { meals: Meal[]; }) => (
  <div>
    <Header />
    <Summary />

    {_.map(props.meals, (_meal, index) => (
      <Card className="mt-1" key={index} data-cy={"meal-" + index}>
        <MealCardHeader mealIndex={index} />

        <ListGroup>
          <FoodListGroupItems mealIndex={index}/>
        </ListGroup>
      </Card>
    ))}

    <Footer />
  </div>
);
