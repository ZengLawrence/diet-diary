import { Button } from "react-bootstrap";
import { VariantPrimary } from "./ButtonVariant";

export const SubmitButton = (props: { label: string; }) => (
  <Button
    variant={VariantPrimary}
    type="submit"
  >
    {props.label}
  </Button>
)