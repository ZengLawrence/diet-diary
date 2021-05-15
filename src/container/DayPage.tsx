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
import { Goal } from "../model/Goal";

const GoalLabel = (props: { goal: Goal }) => (
  <div className="d-flex flex-nowrap  align-items-end">
    Goal:&nbsp;<span className="text-white bg-primary border rounded px-1" style={{fontSize: '24px'}}>{props.goal.calorie}</span>&nbsp;Cal.
  </div>
)

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
  const { date, mealStates, editMode, goal } = props.state;
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
        <GoalLabel goal={goal} />
        <h1 className="text-center">{date}</h1>
        <div>
          {editMode && <NewDayButton />}{' '}
          <DayEditModeButton editMode={editMode} />
        </div>
      </div>

      <div className="border rounded p-1">
        <Tabs defaultActiveKey="total" id="tab-summary" variant="pills">
          <Tab eventKey="total" title="Total">
            <CalorieServingSummary meals={meals} />
          </Tab>
          <Tab eventKey="difference" title="Difference">
            <DifferenceSummary meals={meals} goal={goal} />
          </Tab>
        </Tabs>
      </div>

      {mealCards}
      { editMode && <MealAddButton />}
      <Footer />
    </div>
  )
}