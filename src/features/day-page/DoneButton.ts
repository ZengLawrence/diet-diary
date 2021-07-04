import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { exitEditMode } from "./editModeSlice";

const mapStateToProps = () => ({
  label: "Done",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(exitEditMode()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);