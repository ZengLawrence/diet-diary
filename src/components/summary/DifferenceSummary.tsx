import CalorieDifference from "../../features/summary/CalorieDifference";
import ServingDifference from "../../features/summary/ServingDifference";
import { WarningBorder } from "../WarningBorder";

export const DifferenceSummary = () => {
  return (
    <div className="d-flex">
      <WarningBorder>
        <CalorieDifference />
      </WarningBorder>
      <div className="flex-fill">
        <ServingDifference />
      </div>
    </div>
  )
}