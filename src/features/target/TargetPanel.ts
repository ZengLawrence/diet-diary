import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { TargetPanel } from "../../components/day-page/TargetPanel";

const mapStateToProps = (state: RootState) => ({
  target: state.target,
  editMode: state.editMode,
  editTarget: state.editTarget,
})

export default connect(mapStateToProps)(TargetPanel);