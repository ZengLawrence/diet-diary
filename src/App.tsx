import { MealCard } from "./components/MealCard";

function App() {
  return (
    <div>
      <MealCard mealTime="10am" food={{name: "breakfast", serving: {vegetable: 1, fruit: 1, carbohydrate: 1, protein: 1, fat: 1, sweeet: 1}}} />
    </div>
  );
}

export default App;
