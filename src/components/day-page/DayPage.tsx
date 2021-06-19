import _ from "lodash";
import { Tab, Tabs } from "react-bootstrap";
import { mealsSelector } from "../../app/selectors";
import AddMealButton from "../../features/day-page/AddMealButton";
import Header from "../../features/day-page/Header";
import { AppState, MealState } from "../../model/AppState";
import { Meal } from "../../model/Food";
import { Footer } from "../Footer";
import { EditableMealCard } from "../meal-card/EditableMealCard";
import { UneditableMealCard } from "../meal-card/UneditableMealCard";
import { CalorieServingSummary } from "../summary/CalorieServingSummary";
import { DifferenceSummary } from "../summary/DifferenceSummary";

const Summary = () => (
  <div className="border rounded p-1">
    <Tabs defaultActiveKey="total" id="tab-summary" variant="pills">
      <Tab eventKey="total" title="Total">
        <CalorieServingSummary />
      </Tab>
      <Tab eventKey="difference" title="Difference">
        <DifferenceSummary />
      </Tab>
    </Tabs>
  </div>
)

const UneditableDayPage = (props: { meals: Meal[] }) => (
  <div>
    <Header />
    <Summary />

    {_.map(props.meals, (meal, index) => (
      <UneditableMealCard
        key={index}
        meal={meal} />
    ))}

    <Footer />
  </div>
)

const EditableDayPage = (props: { mealStates: MealState[] }) => (
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
)


export const DayPage = (props: { state: AppState }) => {
  const { mealStates, editMode } = props.state;

  return (
      editMode ? <EditableDayPage mealStates={mealStates}/> : <UneditableDayPage meals={mealsSelector(props.state)}/>
  )
}