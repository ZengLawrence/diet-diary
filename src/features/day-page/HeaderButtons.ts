import { connect } from "react-redux";
import { editModeSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { HeaderButtons } from "../../components/day-page/HeaderButtons";

const mapStateToProps = (state: RootState) => ({
  editMode: editModeSelector(state),
})

export default connect(mapStateToProps)(HeaderButtons);