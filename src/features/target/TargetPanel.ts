import { connect } from "react-redux";
import { targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { TargetPanel } from "../../components/target/TargetPanel";
import { isNoTarget } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  noTarget: isNoTarget(targetSelector(state)),
})

export default connect(mapStateToProps)(TargetPanel);