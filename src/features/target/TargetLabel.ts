import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { TargetLabel } from "../../components/target/TargetLabel";

const mapStateToProps = (state: RootState) => ({
  label: targetSelector(state).calorie,
})

export default connect(mapStateToProps)(TargetLabel);