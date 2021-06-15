import _ from "lodash";
import { Tab, Tabs } from "react-bootstrap";
import AddMealButton from "../../features/day-page/AddMealButton";
import Header from "../../features/day-page/Header";
import { AppState } from "../../model/AppState";
import { Footer } from "../Footer";
import { MealCard } from "../meal-card/MealCard";
import { CalorieServingSummary } from "../summary/CalorieServingSummary";
import { DifferenceSummary } from "../summary/DifferenceSummary";

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
      {editMode && <div className="p-2"><AddMealButton /></div>}
      <Footer />
    </div>
  )
}