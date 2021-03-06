import TabbedSummary from "../../features/summary/TabbedSummary";
import { TotalSummary } from "../summary/TotalSummary";

export const Summary = (props: { showTabs: boolean }) => (
  props.showTabs ? <TabbedSummary /> : <TotalSummary />
);