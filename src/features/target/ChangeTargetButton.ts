import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantSecondary } from "../../components/buttons/ButtonVariant";
import { enterEditTarget } from "./targetStateSlice";

const mapStateToProps = () => ({
  variant: VariantSecondary,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditTarget()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);
