import { Container } from "react-bootstrap";
import { DayPage } from "./container/DayPage";
import { Meal } from "./model/Food";

const breakfast: Meal = {
  mealTime: "10am",
  foods: [
    { name: "breakfast", serving: { vegetable: 1, fruit: 2, carbohydrate: 3, protein: 4, fat: 5, sweeet: 6 } },
    { name: "coffee", serving: { protein: 0.25 } },
    { name: "bread", serving: { carbohydrate: 1.5 } },
    { name: "humus", serving: { protein: 0.75 } },
    { name: "cucumber", serving: { vegetable: 1 } },
    { name: "cantaloupe", serving: { fruit: 1 }, }
  ]
};

const lunch: Meal = {
  mealTime: "12pm",
  foods: [
    { name: "rice", serving: { carbohydrate: 1.5 } },
    { name: "chicken", serving: { protein: 2 } },
    { name: "vege", serving: { vegetable: 2 } },
    { name: "pear", serving: { fruit: 1 }, }
  ]
};

const meals = [breakfast, lunch];

function App() {
  return (
    <Container>
      <DayPage meals={meals} />
    </Container>
  );
}

export default App;
