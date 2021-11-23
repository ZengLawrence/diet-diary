import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantDanger } from "../../components/buttons/ButtonVariant";
import { newDay } from "./dateSlice";

const mapStateToProps = () => ({
  variant: VariantDanger,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newDay()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);