import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { WarningBorder } from "../../components/warning/WarningBorder";
import { isCritical, shouldShow } from "./warnings";

const mapStateToProps = (state: RootState) => ({
  show: shouldShow(state),
  critical: isCritical(state),
})

export default connect(mapStateToProps)(WarningBorder);