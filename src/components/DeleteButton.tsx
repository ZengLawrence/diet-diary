import { Button } from "react-bootstrap";

export const DeleteButton = (props: { onClick: () => void; }) => {
  return (
    <Button
      variant="outline-danger"
      className="mr-1"
      onClick={props.onClick}
    >
      Delete
    </Button>
  );
};
