import { connect } from "react-redux";
import { editModeSelector, editTargetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetPanelRow } from "../../components/day-page/TargetPanelRow";

const mapStateToProps = (state: RootState) => ({
  showNewDayButton: editModeSelector(state) && !editTargetSelector(state),
})

export default connect(mapStateToProps)(TargetPanelRow)