import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import SavedFoodIcon from "../../components/meal-card/SaveFoodIcon";
import { saveFood } from "../day-page/dayPageSlice";

function handleClick(dispatch: AppDispatch, { isSaved, mealIndex, foodIndex }: { isSaved?: boolean; mealIndex: number; foodIndex: number }) {
  if (isSaved) {
    return;
  } else {
    dispatch(saveFood({ mealIndex, foodIndex }));
  }
}

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { isSaved?: boolean; mealIndex: number; foodIndex: number }) => ({
  onClick: () => handleClick(dispatch, ownProps),
})

export default connect(null, mapDispatchToProps)(SavedFoodIcon);
