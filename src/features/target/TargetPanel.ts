import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { TargetPanel } from "../../components/target/TargetPanel";

const mapStateToProps = (state: RootState) => ({
  editMode: state.editMode,
  editTarget: state.editTarget,
})

export default connect(mapStateToProps)(TargetPanel);