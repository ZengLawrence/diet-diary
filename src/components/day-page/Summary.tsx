import { Tab, Tabs } from "react-bootstrap";
import { CalorieServingSummary } from "../summary/CalorieServingSummary";
import { DifferenceSummary } from "../summary/DifferenceSummary";

export const Summary = () => (
  <div className="border rounded p-1">
    <Tabs defaultActiveKey="total" id="tab-summary" variant="pills">
      <Tab eventKey="total" title="Total">
        <CalorieServingSummary />
      </Tab>
      <Tab eventKey="difference" title="Difference">
        <DifferenceSummary />
      </Tab>
    </Tabs>
  </div>
);
