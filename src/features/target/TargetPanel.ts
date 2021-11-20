import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetPanel } from "../../components/target/TargetPanel";
import { NO_TARGET } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  editMode: state.editMode,
  editTarget: state.editTarget,
  noTarget: targetSelector(state) === NO_TARGET,
})

export default connect(mapStateToProps)(TargetPanel);