import { Button } from "react-bootstrap"
import { VariantDanger } from "./ButtonVariant"

export const DangerButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant={VariantDanger}
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)