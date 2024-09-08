import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Suggestion } from "../../features/suggestions/Suggestion";
import { Serving } from "../../model/Food";

interface Props {
  foodName: string;
  suggestions: Suggestion[];
  invalid?: boolean;
  updateFoodDescription: (desc: string) => void;
  updateFoodDescriptionServing: (desc: string, serving?: Serving) => void;
}

export const FoodDescriptionInputControl = (props: Props) => {

  const [toggle, setToggle] = useState(false);

  return (
    <Dropdown show={toggle} onSelect={() => setToggle(false)}>

      <Form.Control type="text" placeholder="type in your query"
        onChange={(e) => setToggle(true)}
      />

      <Dropdown.Menu>
        <Dropdown.Item as="div">Action</Dropdown.Item>
        <Dropdown.Item as="div">Another <span className="fw-bold">action</span></Dropdown.Item>
        <Dropdown.Item as="div">Something else extremely long.....</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
