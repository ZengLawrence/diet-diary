import { connect } from "react-redux";
import { editModeSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetCaloriePanel } from "../../components/target/TargetCaloriePanel";

const mapStateToProps = (state: RootState) => ({
  editTarget: editModeSelector(state),
})

export default connect(mapStateToProps)(TargetCaloriePanel);