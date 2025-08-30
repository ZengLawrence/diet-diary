import { Tab, Tabs } from "react-bootstrap";
import BestChoiceComparisonSummary from "../../features/summary/BestChoiceComparisonSummary";
import { SummaryType } from "../../model/SummaryType";
import { DifferenceSummary } from "./DifferenceSummary";
import { TotalSummary } from "./TotalSummary";
import WeightLossSummary from "./WeightLossTabBody";

interface Props {
  type: SummaryType;
  onSelect: (type: SummaryType) => void;
}


export const TabbedSummary = (props: Props) => {
  return (
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
        <Tab eventKey="best-choice" title="Best Choice">
          <BestChoiceComparisonSummary />
        </Tab>
        <Tab eventKey="weight-loss" title="Weight Loss">
          <WeightLossSummary />
        </Tab>
      </Tabs>
    </div>);
}
