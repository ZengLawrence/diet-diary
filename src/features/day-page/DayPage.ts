import { connect } from "react-redux";
import { editModeSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { DayPage } from "../../components/day-page/DayPage";

const mapStateToProps = (state: RootState) => ({
  editMode: editModeSelector(state),
})

export default connect(mapStateToProps)(DayPage);