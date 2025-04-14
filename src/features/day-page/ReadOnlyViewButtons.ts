import _ from "lodash";
import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import ReadOnlyViewButtons from "../../components/day-page/ReadOnlyViewButtons";
import { Meal } from "../../model/Food";

function hasAtLeastOneFood(meals: Meal[]) {
  return _.size(meals) > 0
    && _.size(meals[0].foods) > 0;
}

const mapStateToProps = (state: RootState) => ({
  showDownloadButton: hasAtLeastOneFood(mealsSelector(state)),
})

export default connect(mapStateToProps)(ReadOnlyViewButtons);
