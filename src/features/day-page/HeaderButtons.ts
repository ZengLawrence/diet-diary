import _ from "lodash";
import { connect } from "react-redux";
import { dayPageSelector, mealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { HeaderButtons } from "../../components/day-page/HeaderButtons";
import { Meal } from "../../model/Food";

function hasAtLeastOneFood(meals: Meal[]) {
  return _.size(meals) > 0
    && _.size(meals[0].foods) > 0;
}

const mapStateToProps = (state: RootState) => ({
  editMode: dayPageSelector(state).editMode,
  showDownloadButton: hasAtLeastOneFood(mealsSelector(state)),
})

export default connect(mapStateToProps)(HeaderButtons);