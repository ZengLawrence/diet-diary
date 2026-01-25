import { connect } from "react-redux";
import { mealsSelector, mealStatesSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { FoodListGroupItems } from "../../components/meal-card/FoodListGroupItems";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  editState: mealStatesSelector(state)[ownProps.mealIndex].editState,
  foods: mealsSelector(state)[ownProps.mealIndex].foods,
  foodEditIndex: mealStatesSelector(state)[ownProps.mealIndex].foodEditIndex,
  savedFoodsIndexes: mealStatesSelector(state)[ownProps.mealIndex].savedFoodsIndexes,
})

export default connect(mapStateToProps)(FoodListGroupItems);
