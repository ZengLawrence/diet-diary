import { connect } from "react-redux";
import type { AppDispatch } from "../../app/store";
import SaveFoodIcon from "../../components/meal-card/SaveFoodIcon";
import { deleteSavedFood, saveFood } from "../day-page/dayPageSlice";

function handleClick(dispatch: AppDispatch, { isSaved, mealIndex, foodIndex }: { isSaved?: boolean; mealIndex: number; foodIndex: number }) {
  if (isSaved) {
    void dispatch(deleteSavedFood({ mealIndex, foodIndex }));
  } else {
    void dispatch(saveFood({ mealIndex, foodIndex }));
  }
}

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { isSaved?: boolean; mealIndex: number; foodIndex: number }) => ({
  onClick: () => handleClick(dispatch, ownProps),
})

export default connect(null, mapDispatchToProps)(SaveFoodIcon);
