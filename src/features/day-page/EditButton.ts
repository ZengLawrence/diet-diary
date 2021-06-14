import { connect } from "react-redux";
import { enterEditModeAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

const mapStateToProps = () => ({
  label: "Edit",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditModeAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);