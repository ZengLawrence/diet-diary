import { useState } from "react";
import Form from "react-bootstrap/Form";

interface Props {
  update: (s: string) => void;
}

export const SearchTermInput = (props: Props) => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    props.update(newTerm);
  };

  return (
    <Form>
      <Form.Control
        id="inputSearchTerm"
        type="text"
        placeholder="Type to search"
        value={searchTerm}
        onChange={handleOnChange}
      />
    </Form>
  );
}
