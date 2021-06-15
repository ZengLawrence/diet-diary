import _ from "lodash";
import { Tab, Tabs } from "react-bootstrap";
import { newMealAction } from "../../actions";
import { useAppDispatch } from "../../app/hooks";
import Header from "../../features/day-page/Header";
import { AppState } from "../../model/AppState";
import { AddButton } from "../AddButton";
import { Footer } from "../Footer";
import { MealCard } from "../meal-card/MealCard";
import { CalorieServingSummary } from "../summary/CalorieServingSummary";
import { DifferenceSummary } from "../summary/DifferenceSummary";

const MealAddButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="p-2">
      <AddButton onClick={() => dispatch(newMealAction())} />
    </div>
  );
};

export const DayPage = (props: { state: AppState }) => {
  const { mealStates, editMode, target } = props.state;
  const mealCards = _.map(mealStates, (mealState, index) => (
    <MealCard
      key={index}
      mealIndex={index}
      state={mealState}
      editMode={editMode} />)
  );
  const meals = _.map(mealStates, 'meal');

  return (
    <div>
      <Header />

      <div className="border rounded p-1">
        <Tabs defaultActiveKey="total" id="tab-summary" variant="pills">
          <Tab eventKey="total" title="Total">
            <CalorieServingSummary meals={meals} />
          </Tab>
          <Tab eventKey="difference" title="Difference">
            <DifferenceSummary meals={meals} target={target} />
          </Tab>
        </Tabs>
      </div>

      {mealCards}
      { editMode && <MealAddButton />}
      <Footer />
    </div>
  )
}