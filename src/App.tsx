import { MealCard } from "./components/MealCard";

function App() {
  return (
    <div>
      <MealCard mealTime="10am" foods={[
        {name: "breakfast", serving: {vegetable: 1, fruit: 2, carbohydrate: 3, protein: 4, fat: 5, sweeet: 6}},
        {name: "coffee", serving: {protein: 0.25}},
        {name: "bread", serving: {carbohydrate: 1.5}}
        ]} 
        />
    </div>
  );
}

export default App;
