import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { WarningAlert } from "../../components/warning/WarningAlert";
import { isCritical, shouldShow } from "./warnings";
import { dismissWarning } from "./warningSlice";
import { warningSelector } from "../../app/selectors";

function show(state: RootState) {
  if (isCritical(state)) {
    return true;
  }

  if (shouldShow(state)) {
    if (warningSelector(state).dismissWarning) {
      return false;
    } else {
      return true;
    }
  }

  return false;
}

const mapStateToProps = (state: RootState) => ({
  show: show(state),
  critical: isCritical(state),
  dismissible: !isCritical(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeAlert: () => dispatch(dismissWarning()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert);