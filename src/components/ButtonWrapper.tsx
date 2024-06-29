// use as a wrapper around Bootstrap button to fix Typescript warning about 
// "Argument of type 'Button' is not assignable to parameter of type 'ComponentType<never>'"
import { Button, ButtonProps } from "react-bootstrap";

// have to create a dummy OwnProps
interface OwnProps {
  dummy?: string;
}

export const ButtonWrapper = (props: OwnProps & ButtonProps) => (
  <Button {...props}></Button>
)