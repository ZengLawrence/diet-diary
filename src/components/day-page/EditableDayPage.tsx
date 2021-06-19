import _ from "lodash";
import AddMealButton from "../../features/day-page/AddMealButton";
import Header from "../../features/day-page/Header";
import { MealState } from "../../model/AppState";
import { Footer } from "../Footer";
import { EditableMealCard } from "../meal-card/EditableMealCard";
import { Summary } from "./Summary";

export const EditableDayPage = (props: { mealStates: MealState[]; }) => (
  <div>
    <Header />
    <Summary />

    {_.map(props.mealStates, (mealState, index) => (
      <EditableMealCard
        key={index}
        mealIndex={index}
        state={mealState} />
    ))}
    <div className="p-2"><AddMealButton /></div>
    <Footer />
  </div>
);
