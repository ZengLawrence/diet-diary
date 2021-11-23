import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantPrimary } from "../../components/buttons/ButtonVariant";
import { enterMealEditMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  variant: VariantPrimary,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(enterMealEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);