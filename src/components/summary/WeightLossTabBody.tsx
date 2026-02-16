import { useEffect, useState } from "react";
import summary from "../../features/summary/api";
import type { SummaryListener } from "../../model/summary";
import WeightLossTotal from "./WeightLossTotal";

const WeightLossSummary = () => {
  const [weight, setWeight] = useState(0.0);

  useEffect(() => {
    const getTotalWeightLoss = () => {
      return new Promise<number>(resolve => {
        resolve(summary.totalWeightLoss());
      });
    }
    void getTotalWeightLoss().then(setWeight);
    
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

export default WeightLossSummary;