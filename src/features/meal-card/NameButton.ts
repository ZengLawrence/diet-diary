import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantSecondary } from "../../components/buttons/ButtonVariant";
import { enterMealNameMode } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  variant: VariantSecondary,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(enterMealNameMode(ownProps)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);