import { connect } from "react-redux";
import { editTargetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { NoTargetPanel } from "../../components/target/NoTargetPanel";

const mapStateToProps = (state: RootState) => ({
  editTarget: editTargetSelector(state),
})

export default connect(mapStateToProps)(NoTargetPanel);