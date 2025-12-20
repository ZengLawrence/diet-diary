import { connect } from "react-redux";
import { summaryTypeSelector } from "../../app/selectors";
import type { AppDispatch, RootState } from "../../app/store";
import { TabbedSummary } from "../../components/summary/TabbedSummary";
import { setSummaryType } from "../day-page/summaryTypeSlice";
import type { SummaryType } from "../../model/SummaryType";

const mapStateToProps = (state: RootState) => ({
  type: summaryTypeSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (type: SummaryType) => dispatch(setSummaryType(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabbedSummary);