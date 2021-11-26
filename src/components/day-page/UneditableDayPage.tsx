import _ from "lodash";
import { Card, ListGroup } from "react-bootstrap";
import Footer from "../../features/day-page/Footer";
import Header from "../../features/day-page/Header";
import Summary from "../../features/day-page/Summary";
import MealCalorieServingPanel from "../../features/meal-card/MealCalorieServingPanel";
import { Meal } from "../../model/Food";
import { FoodItem } from "../FoodItem";

export const UneditableDayPage = (props: { meals: Meal[]; }) => (
  <div>
    <Header />
    <Summary />

    {_.map(props.meals, (meal, index) => (
      <div key={index} data-cy={"meal-" + index}>
        <Card className="mt-1">
          <Card.Header className="d-flex flex-wrap align-items-center">
            <div className="flex-fill">{meal.mealTime}</div>
            <MealCalorieServingPanel meal={meal} />
          </Card.Header>

          <ListGroup>
            {meal.foods.map((food, index) => <ListGroup.Item key={index}>
              <FoodItem food={food} />
            </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </div>
    ))}

    <Footer />
  </div>
);
