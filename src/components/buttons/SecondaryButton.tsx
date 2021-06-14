import { Button } from "react-bootstrap"

export const SecondaryButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant="outline-secondary"
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)