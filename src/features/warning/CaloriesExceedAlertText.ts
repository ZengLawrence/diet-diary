import { connect } from "react-redux";
import type { RootState } from "../../app/store";
import CaloriesExceedAlertText from "../../components/warning/CaloriesExceedAlertText";
import { percentage } from "./warnings";

const mapStateToProps = (state: RootState) => ({
  percentage: percentage(state),
})

export default connect(mapStateToProps)(CaloriesExceedAlertText);