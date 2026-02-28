import Form from "react-bootstrap/Form";

interface Props {
  searchTerm: string;
  update: (s: string) => void;
  className?: string;
}

export const SearchTermInput = (props: Props) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    props.update(newTerm);
  };

  return (
    <Form className={props.className}>
      <Form.Control
        id="inputSearchTerm"
        type="text"
        placeholder="Type to search"
        value={props.searchTerm}
        onChange={handleOnChange}
      />
    </Form>
  );
}
