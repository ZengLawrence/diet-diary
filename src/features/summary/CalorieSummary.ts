import { connect } from "react-redux";
import { totalCaloriesSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { CalorieSummary } from "../../components/summary/CalorieSummary";

const mapStateToProps = (state: RootState) => ({
  calories: totalCaloriesSelector(state),
})


export default connect(mapStateToProps)(CalorieSummary);