import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantDanger } from "../../components/buttons/ButtonVariant";
import { deleteMeal } from "../day-page/mealStatesSlice";

const mapStateToProps = () => ({
  variant: VariantDanger,
})

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: { mealIndex: number }) => ({
  onClick: () => dispatch(deleteMeal(ownProps.mealIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);