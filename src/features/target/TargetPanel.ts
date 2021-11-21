import { connect } from "react-redux";
import { editModeSelector, editTargetSelector, targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetPanel } from "../../components/target/TargetPanel";
import { isNoTarget } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  noTarget: isNoTarget(targetSelector(state)),
  showChangeTargetButton: editModeSelector(state) && !editTargetSelector(state),
})

export default connect(mapStateToProps)(TargetPanel);