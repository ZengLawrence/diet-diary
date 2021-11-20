import { Tab, Tabs } from "react-bootstrap";
import { SummaryType } from "../../model/SummaryType";
import { TotalSummary } from "../summary/TotalSummary";
import { DifferenceSummary } from "../summary/DifferenceSummary";

export const TabbedSummary = (props: { type: SummaryType; onSelect:  (type: SummaryType) => void }) => (
  <div className="border rounded p-1">
    <Tabs
      id="tab-summary"
      activeKey={props.type}
      onSelect={(key) => props.onSelect(key as SummaryType)}
      variant="pills"
    >
      <Tab eventKey="total" title="Total">
        <TotalSummary />
      </Tab>
      <Tab eventKey="difference" title="Difference">
        <DifferenceSummary />
      </Tab>
    </Tabs>
  </div>
);
