import { connect } from "react-redux";
import { editTargetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetCaloriePanel } from "../../components/target/TargetCaloriePanel";

const mapStateToProps = (state: RootState) => ({
  editTarget: editTargetSelector(state),
})

export default connect(mapStateToProps)(TargetCaloriePanel);