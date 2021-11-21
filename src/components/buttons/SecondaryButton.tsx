import { Button } from "react-bootstrap"
import { VariantSecondary } from "./ButtonVariant"

export const SecondaryButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant={VariantSecondary}
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)