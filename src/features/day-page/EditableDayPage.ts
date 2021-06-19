import { connect } from "react-redux";
import { mealStatesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { EditableDayPage } from "../../components/day-page/EditableDayPage";

const mapStateToProps = (state: RootState) => ({
  mealStates: mealStatesSelector(state),
})

export default connect(mapStateToProps)(EditableDayPage);