import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetLabel } from "../../components/target/TargetLabel";
import { NO_TARGET } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  label: targetSelector(state) === NO_TARGET ? "No Target" : targetSelector(state).calorie,
})

export default connect(mapStateToProps)(TargetLabel);