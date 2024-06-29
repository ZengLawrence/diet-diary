import { connect } from "react-redux";
import { savedMealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { FoodListGroupItems } from "../../components/meal-card/FoodListGroupItems";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  foods: savedMealsSelector(state)[ownProps.mealIndex].foods,
})

export default connect(mapStateToProps)(FoodListGroupItems);
