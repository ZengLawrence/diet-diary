import CalorieDifference from "../../features/summary/CalorieDifference";
import ServingDifference from "../../features/summary/ServingDifference";

export const DifferenceSummary = () => {
  return (
    <div className="d-flex">
      <CalorieDifference />
      <div className="flex-fill">
        <ServingDifference />
      </div>
    </div>
  )
}