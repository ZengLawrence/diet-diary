import { Serving } from "../../model/Food";
import { CompactServingSummary } from "./CompactServingSummary";
import { FullSizeServingSummary } from "./FullSizeServingSummary";

export const ServingSummary = (props: { serving: Serving; }) => (
  <div>
    <div className="d-block d-sm-none">
      <CompactServingSummary {...props} />
    </div>
    <div className="d-none d-sm-block">
      <FullSizeServingSummary {...props} />
    </div>
  </div>
)