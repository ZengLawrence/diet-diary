import CalorieDifference from "../../features/summary/CalorieDifference";
import ServingDifference from "../../features/summary/ServingDifference";
import WarningBorder from "../../features/warning/WarningBorder";

export const DifferenceSummary = () => {
  return (
    <div className="d-flex">
      <WarningBorder flexFill>
        <CalorieDifference />
      </WarningBorder>
      <div className="flex-fill">
        <ServingDifference />
      </div>
    </div>
  )
}