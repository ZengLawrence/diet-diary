import Form from "react-bootstrap/Form";

interface Props {
  unlimitedFruit: boolean,
  toggleUnlimitedFruit: () => void,
}

const UnlimitedFruitCheckBox = (props: Props) => (
  <Form.Check
    type="switch"
    id="unlimited-fruit"
    label="Unlimited Fruit" 
    checked={props.unlimitedFruit}
    onChange={props.toggleUnlimitedFruit}
    />
);

export default UnlimitedFruitCheckBox;