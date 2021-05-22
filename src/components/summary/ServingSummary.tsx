import { Serving } from "../../model/Food";
import { CompactServingSummary } from "./CompactServingSummary";
import { FullSizeServingSummary } from "./FullSizeServingSummary";

export const ServingSummary = (props: { serving: Serving; }) => (
  <div>
    <div className="d-block d-md-none">
      <CompactServingSummary {...props} />
    </div>
    <div className="d-none d-md-block">
      <FullSizeServingSummary {...props} />
    </div>
  </div>
)