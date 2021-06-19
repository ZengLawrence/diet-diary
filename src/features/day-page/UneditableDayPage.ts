import { connect } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { UneditableDayPage } from "../../components/day-page/UneditableDayPage";

const mapStateToProps = (state: RootState) => ({
  meals: mealsSelector(state),
})

export default connect(mapStateToProps)(UneditableDayPage);