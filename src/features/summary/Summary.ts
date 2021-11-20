import { connect } from "react-redux";
import { summaryTypeSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { Summary } from "../../components/day-page/Summary";
import { setSummaryType } from "../day-page/summaryTypeSlice";
import { SummaryType } from "../../model/SummaryType";

const mapStateToProps = (state: RootState) => ({
  type: summaryTypeSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelect: (type: SummaryType) => dispatch(setSummaryType(type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary);