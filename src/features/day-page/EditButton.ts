import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { enterEditMode } from "./editModeSlice";

const mapStateToProps = () => ({
  label: "Edit",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditMode()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);