import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { WarningAlert } from "../../components/warning/WarningAlert";
import { isCritical, shouldShow } from "./warnings";
import { dismissWarning } from "./warningSlice";
import { warningSelector } from "../../app/selectors";

const mapStateToProps = (state: RootState) => ({
  show: shouldShow(state) && !warningSelector(state).dismissWarning,
  critical: isCritical(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeAlert: () => dispatch(dismissWarning()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert);