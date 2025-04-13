import { connect } from "react-redux";
import { RootState } from "../../app/store";
import CaloriesExceedAlertText from "../../components/warning/CaloriesExceedAlertText";
import { isCritical } from "./warnings";

const mapStateToProps = (state: RootState) => ({
  percentage: isCritical(state) ? 10 : 5,
})

export default connect(mapStateToProps)(CaloriesExceedAlertText);