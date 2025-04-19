import { connect } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import DayPage from "../../components/day-page/DayPage";

const mapStateToProps = (state: RootState) => ({
  showButton: viewOptionsSelector(state).editMode,
})

export default connect(mapStateToProps)(DayPage);