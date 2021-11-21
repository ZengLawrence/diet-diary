import _ from "lodash";
import Header from "../../features/day-page/Header";
import Summary from "../../features/day-page/Summary";
import { Meal } from "../../model/Food";
import { Footer } from "../Footer";
import { UneditableMealCard } from "../meal-card/UneditableMealCard";

export const UneditableDayPage = (props: { meals: Meal[]; }) => (
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
);
