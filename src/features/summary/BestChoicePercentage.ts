import { connect } from "react-redux";
import { bestChoicePercentSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { Percentage } from "../../components/summary/Percentage";

const mapStateToProps = (state: RootState) => ({
  value: bestChoicePercentSelector(state),
})


export default connect(mapStateToProps)(Percentage);