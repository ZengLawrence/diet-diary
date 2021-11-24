import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import AddMealButton from "../../features/day-page/AddMealButton";
import Footer from "../../features/day-page/Footer";
import Header from "../../features/day-page/Header";
import { MealState } from "../../features/day-page/mealStatesSlice";
import Summary from "../../features/day-page/Summary";
import { VariantPrimary } from "../ButtonVariant";
import { EditableMealCard } from "../meal-card/EditableMealCard";

export const EditableDayPage = (props: { mealStates: MealState[]; }) => (
  <div>
    <Header />
    <Summary />

    <div id="mealCards">
      {_.map(props.mealStates, (mealState, index) => (
        <EditableMealCard
          key={index}
          mealIndex={index}
          state={mealState} />
      ))}
    </div>
    <div className="p-2">
      <AddMealButton id="buttonAddMeal" variant={VariantPrimary}>
        <FontAwesomeIcon icon={faPlus} />
      </AddMealButton>
    </div>
    <Footer />
  </div>
);
