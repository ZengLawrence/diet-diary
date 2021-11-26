import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import Footer from "../../features/day-page/Footer";
import Header from "../../features/day-page/Header";
import Summary from "../../features/day-page/Summary";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";

export const UneditableDayPage = (props: { meals: Meal[]; }) => (
  <div>
    <Header />
    <Summary />

    {_.map(props.meals, (meal, index) => (
      <Card className="mt-1" key={index} data-cy={"meal-" + index}>
        <Card.Header className="d-flex flex-wrap align-items-center">
          <div className="flex-fill">{meal.mealTime}</div>
          <MealCalorieServingPanel meal={meal} />
        </Card.Header>

        <ListGroup>
          <FoodListGroupItems mealIndex={index}/>
        </ListGroup>
      </Card>
    ))}

    <Footer />
  </div>
);
