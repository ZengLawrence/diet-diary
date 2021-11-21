import { connect } from "react-redux";
import { editModeSelector, editTargetSelector, targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetPanel } from "../../components/target/TargetPanel";
import { NO_TARGET } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  noTarget: targetSelector(state) === NO_TARGET,
  showChangeTargetButton: editModeSelector(state) && !editTargetSelector(state),
})

export default connect(mapStateToProps)(TargetPanel);