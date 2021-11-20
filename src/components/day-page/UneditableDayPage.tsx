import _ from "lodash";
import Header from "../../features/day-page/Header";
import TabbedSummary from "../../features/summary/TabbedSummary";
import { Meal } from "../../model/Food";
import { Footer } from "../Footer";
import { UneditableMealCard } from "../meal-card/UneditableMealCard";

export const UneditableDayPage = (props: { meals: Meal[]; }) => (
  <div>
    <Header />
    <TabbedSummary />

    {_.map(props.meals, (meal, index) => (
      <UneditableMealCard
        key={index}
        meal={meal} />
    ))}

    <Footer />
  </div>
);
