import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { TargetLabel } from "../../components/target/TargetLabel";

const mapStateToProps = (state: RootState) => ({
  calorie: state.target.calorie,
})

export default connect(mapStateToProps)(TargetLabel);