import { Button } from "react-bootstrap"

export const DangerButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant="outline-danger"
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)