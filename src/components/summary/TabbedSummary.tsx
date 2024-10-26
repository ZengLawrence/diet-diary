import { Tab, Tabs } from "react-bootstrap";
import { SummaryType } from "../../model/SummaryType";
import { TotalSummary } from "./TotalSummary";
import { DifferenceSummary } from "./DifferenceSummary";
import { BestChoicePercentageSummary } from "./BestChoicePercentageSummary";

export const TabbedSummary = (props: { type: SummaryType; onSelect:  (type: SummaryType) => void }) => (
  <div className="border rounded p-1">
    <Tabs
      id="tab-summary"
      activeKey={props.type}
      onSelect={(key) => props.onSelect(key as SummaryType)}
      variant="underline"
    >
      <Tab eventKey="total" title="Total">
        <TotalSummary />
      </Tab>
      <Tab eventKey="difference" title="Difference">
        <DifferenceSummary />
      </Tab>
      <Tab eventKey="best-choice-percentage" title="Best Choice %">
        <BestChoicePercentageSummary />
      </Tab>
    </Tabs>
  </div>
);
