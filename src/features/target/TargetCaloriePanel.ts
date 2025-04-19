import { connect } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetCaloriePanel } from "../../components/target/TargetCaloriePanel";

const mapStateToProps = (state: RootState) => ({
  editTarget: viewOptionsSelector(state).canEdit,
})

export default connect(mapStateToProps)(TargetCaloriePanel);