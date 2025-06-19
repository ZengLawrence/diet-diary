import _ from "lodash";
import { connect } from "react-redux";
import { warningSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { WarningAlert } from "../../components/warning/WarningAlert";
import { setShowCanNotAddNewDayWarning } from "./warningSlice";

const mapStateToProps = (state: RootState) => ({
  show: _.defaultTo(warningSelector(state).showCanNotAddNewDayWarning, false),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  closeAlert: () => dispatch(setShowCanNotAddNewDayWarning(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WarningAlert);