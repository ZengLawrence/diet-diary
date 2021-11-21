import { Button } from "react-bootstrap"
import { VariantPrimary } from "./ButtonVariant"

export const PrimaryButton = (props: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; }) => (
  <Button
    variant={VariantPrimary}
    onClick={props.onClick}
  >
    {props.label}
  </Button>
)