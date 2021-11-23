import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantPrimary } from "../../components/buttons/ButtonVariant";
import { exitMealEditMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  variant: VariantPrimary,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(exitMealEditMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);