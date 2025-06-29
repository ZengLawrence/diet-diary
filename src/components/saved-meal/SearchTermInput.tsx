import Form from "react-bootstrap/Form";

interface Props {
  searchTerm: string;
  update: (s: string) => void;
}

export const SearchTermInput = (props: Props) => {
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Type to search"
        value={props.searchTerm}
        onChange={e => props.update(e.target.value)}
      />
    </Form>
  );
}
