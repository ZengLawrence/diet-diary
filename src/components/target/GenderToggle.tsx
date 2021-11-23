import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Gender } from "../../model/Target";
import { VariantPrimary } from "../ButtonVariant";

export const GenderToggle = (props: { value: string; onChange: (val: Gender) => void }) => (
  <ToggleButtonGroup name="genderToggle" value={props.value} onChange={props.onChange}>
    <ToggleButton variant={VariantPrimary} value="man">Man</ToggleButton>
    <ToggleButton variant={VariantPrimary} value="woman">Woman</ToggleButton>
  </ToggleButtonGroup>
)