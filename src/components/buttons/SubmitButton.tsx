import { Button } from "react-bootstrap";

export const SubmitButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant="outline-primary"
    type="submit"
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)