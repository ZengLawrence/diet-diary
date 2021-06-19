import { Button } from "react-bootstrap"

export const PrimaryButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant="outline-primary"
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)