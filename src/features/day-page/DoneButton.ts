import { connect } from "react-redux";
import { exitEditModeAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

const mapStateToProps = () => ({
  label: "Done",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(exitEditModeAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryButton);