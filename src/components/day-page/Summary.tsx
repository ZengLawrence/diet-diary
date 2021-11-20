import { Tab, Tabs } from "react-bootstrap";
import { SummaryType } from "../../model/SummaryType";
import { CalorieServingSummary } from "../summary/CalorieServingSummary";
import { DifferenceSummary } from "../summary/DifferenceSummary";

export const Summary = (props: { type: SummaryType; onSelect:  (type: SummaryType) => void }) => (
  <div className="border rounded p-1">
    <Tabs
      id="tab-summary"
      activeKey={props.type}
      onSelect={(key) => props.onSelect(key as SummaryType)}
      variant="pills"
    >
      <Tab eventKey="total" title="Total">
        <CalorieServingSummary />
      </Tab>
      <Tab eventKey="difference" title="Difference">
        <DifferenceSummary />
      </Tab>
    </Tabs>
  </div>
);
