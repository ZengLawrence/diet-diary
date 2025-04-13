import { connect } from "react-redux";
import { warningSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { WarningAlert } from "../../components/warning/WarningAlert";
import { seShowCanNotAddNewDayWarning } from "./warningSlice";

const mapStateToProps = (state: RootState) => ({
  show: warningSelector(state).showCanNotAddNewDayWarning,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeAlert: () => dispatch(seShowCanNotAddNewDayWarning(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert);