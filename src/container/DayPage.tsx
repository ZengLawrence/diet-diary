import _ from "lodash";
import { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Action, enterEditModeAction, exitEditModeAction, newMealAction } from "../actions";
import { AddButton } from "../components/AddButton";
import { EditModeButton } from "../components/EditModeButton";
import { Footer } from "../components/Footer";
import { MealCard } from "../components/meal-card/MealCard";
import { MealDispatch } from "../components/MealDispatch";
import { NewDayButton } from "../components/NewDayButton";
import { CalorieServingSummary } from "../components/summary/CalorieServingSummary";
import { DifferenceSummary } from "../components/summary/DifferenceSummary";
import { AppState } from "../model/AppState";
import { calcCaloriesDifference } from "../model/calorieFunction";
import { Serving } from "../model/Food";
import { calcServingDifference } from "../model/servingFunction";

const SERVING_GOAL: Serving = {
  vegetable: 4,
  fruit: 4,
  carbohydrate: 5,
  protein: 4,
  fat: 3,
  sweet: 1,
}

const DayEditModeButton = (props: { editMode: boolean }) => {
  const { editMode } = props;
  const dispatch: React.Dispatch<Action> = useContext(MealDispatch);
  const handleClick = () => editMode ? dispatch(exitEditModeAction()) : dispatch(enterEditModeAction());

  return (
    <EditModeButton editMode={editMode} onClick={handleClick} />
  )
}

const MealAddButton = () => {
  const dispatch = useContext(MealDispatch);

  return (
    <div className="p-2">
      <AddButton onClick={() => dispatch(newMealAction())} />
    </div>
  );
}

export const DayPage = (props: { state: AppState }) => {
  const { date, mealStates, editMode } = props.state;
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
      <div className="d-flex justify-content-between align-items-center">
        <div />
        <h1 className="text-center">{date}</h1>
        <div>
          {editMode && <NewDayButton />}{' '}
          <DayEditModeButton editMode={editMode} />
        </div>
      </div>

      <Tabs defaultActiveKey="total" id="tab-summary">
        <Tab eventKey="total" title="Total" className="border">
          <CalorieServingSummary meals={meals} />
        </Tab>
        <Tab eventKey="difference" title="Difference" className="border">
          <DifferenceSummary calories={calcCaloriesDifference(meals, 1400)} serving={calcServingDifference(meals, SERVING_GOAL)} />
        </Tab>
      </Tabs>

      {mealCards}
      { editMode && <MealAddButton />}
      <Footer />
    </div>
  )
}