import { connect } from "react-redux";
import { summaryTypeSelector, targetSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { ServingCell } from "../../components/summary/ServingCell";
import { hasATarget } from "../../model/Target";

const mapStateToProps = (state: RootState) => ({
  showTargetActionIcon: hasATarget(targetSelector(state)) && summaryTypeSelector(state) != 'best-choice-percentage',
})

export default connect(mapStateToProps)(ServingCell);