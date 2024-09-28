import TabbedSummary from "../../features/summary/TabbedSummary";
import { TotalSummary } from "../summary/TotalSummary";

export const Summary = (props: { showTabs: boolean }) => (
  <div className="mt-3">
    {props.showTabs ? <TabbedSummary /> : <TotalSummary />}
  </div>
);