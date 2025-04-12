import { connect } from "react-redux";
import { dayPageSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import DayPage from "../../components/day-page/DayPage";

const mapStateToProps = (state: RootState) => ({
  showButton: dayPageSelector(state).editMode,
})

export default connect(mapStateToProps)(DayPage);