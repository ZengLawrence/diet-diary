import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantPrimary } from "../../components/buttons/ButtonVariant";
import { enterFoodEditMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  variant: VariantPrimary,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number; foodIndex: number }) => ({
  onClick: () => dispatch(enterFoodEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);
