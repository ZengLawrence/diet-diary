import { connect } from "react-redux";
import { bestChoiceServingTotalSelector, othersServingTotalSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { BestChoiceComparisonSummary } from "../../components/summary/BestChoiceComparisonSummary";

const mapStateToProps = (state: RootState) => ({
  bestChoice: bestChoiceServingTotalSelector(state),
  others: othersServingTotalSelector(state),
})

export default connect(mapStateToProps)(BestChoiceComparisonSummary);