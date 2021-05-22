import CompactServingSummary from "../../containers/summary/CompactServingSummary";
import FullServingSummary from "../../containers/summary/FullSizeServingSummary";

export const ServingSummarySelector = (props: { compactView: boolean }) => (
  props.compactView ? <CompactServingSummary /> : <FullServingSummary />
)