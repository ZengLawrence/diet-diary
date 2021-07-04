import { Button } from "react-bootstrap";

export const SubmitButton = (props: { label: string; }) => (
  <Button
    variant="outline-primary"
    type="submit"
  >
    {props.label}
  </Button>
)