import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { FoodListGroupItems } from "../../components/meal-card/FoodListGroupItems";

const mapStateToProps = (state: RootState, ownProps: { mealIndex: number; }) => ({
  foods: mealsSelector(state)[ownProps.mealIndex].foods,
})

export default connect(mapStateToProps)(FoodListGroupItems);
