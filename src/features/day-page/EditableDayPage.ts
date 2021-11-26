import _ from "lodash";
import { connect } from "react-redux";
import { editModeSelector, mealStatesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { EditableDayPage } from "../../components/day-page/EditableDayPage";

const mapStateToProps = (state: RootState) => ({
  numberOfMeals: _.size(mealStatesSelector(state)),
  showButton: editModeSelector(state),
})

export default connect(mapStateToProps)(EditableDayPage);