import { useEffect, useState } from "react";
import summary from "../../features/summary/api";
import { SummaryListener } from "../../model/summary";
import WeightLossTotal from "./WeightLossTotal";

export const WeightLossSummary = () => {
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

  return (
    <div className="d-flex">
      <WeightLossTotal weight={weight} />
      <div className="flex-fill" />
    </div>
  );
};