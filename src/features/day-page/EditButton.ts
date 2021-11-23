import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { VariantPrimary } from "../../components/buttons/ButtonVariant";
import { enterEditMode } from "./editModeSlice";

const mapStateToProps = () => ({
  variant: VariantPrimary,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditMode()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);