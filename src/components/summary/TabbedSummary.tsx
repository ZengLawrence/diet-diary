import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import summary from "../../features/summary/api";
import BestChoiceComparisonSummary from "../../features/summary/BestChoiceComparisonSummary";
import { useFeatureFlag } from "../../hooks";
import { SummaryListener } from "../../model/summary";
import { SummaryType } from "../../model/SummaryType";
import { DifferenceSummary } from "./DifferenceSummary";
import { TotalSummary } from "./TotalSummary";
import WeightLossSummary from "./WeightLossSummary";

interface Props {
  type: SummaryType;
  onSelect: (type: SummaryType) => void;
}

const WeightLossTabBody = () => {
  const [weight, setWeight] = useState(0.0);

  useEffect(() => {
    setWeight(summary.totalWeightLoss());
    const listener: SummaryListener = {
      onTotalWeightLossUpdated: () => {
        setWeight(summary.totalWeightLoss());
      },
    };
    summary.registerListener(listener);
    
    return () => {
      summary.unregisterListener(listener);
      setWeight(0.0);
    };
  }, []);

  return <WeightLossSummary weight={weight} />;
};

export const TabbedSummary = (props: Props) => {
  const showWeightLoss = useFeatureFlag("weightLoss");
  
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
        {showWeightLoss && (
          <Tab eventKey="weight-loss" title="Weight Loss">
            <WeightLossTabBody />
          </Tab>
        )}
      </Tabs>
    </div>);
}
