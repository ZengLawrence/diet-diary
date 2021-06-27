import { connect } from "react-redux";
import { addFoodAction, cancelAddFoodAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { ButtonLabel, FoodInputForm } from "../../components/input-form/FoodInputForm";
import { Food, newFood } from "../../model/Food";

const mapStateToProps = () => ({
  food: newFood(),
  buttonLabel: "Add" as ButtonLabel,
})

const mapDispatchToProps = (dispatch : AppDispatch, ownProps: {mealIndex: number}) => ({
  onSaveFood: (food: Food) => dispatch(addFoodAction(ownProps.mealIndex, food)),
  onCancel: () => dispatch(cancelAddFoodAction(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodInputForm);