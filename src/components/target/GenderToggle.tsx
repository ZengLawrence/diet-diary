import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import type { Gender } from "../../model/Target";
import { VariantPrimary } from "../ButtonVariant";

export const GenderToggle = (props: { value: string; onChange: (val: Gender) => void }) => (
  <ToggleButtonGroup name="genderToggle" value={props.value} onChange={props.onChange}>
    <ToggleButton id="tbg-gender-btn-man" variant={VariantPrimary} value="man">Man</ToggleButton>
    <ToggleButton id="tbg-gender-btn-woman" variant={VariantPrimary} value="woman">Woman</ToggleButton>
  </ToggleButtonGroup>
)