import { connect } from "react-redux";
import { dayPageSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetCaloriePanel } from "../../components/target/TargetCaloriePanel";

const mapStateToProps = (state: RootState) => ({
  editTarget: dayPageSelector(state).editMode,
})

export default connect(mapStateToProps)(TargetCaloriePanel);