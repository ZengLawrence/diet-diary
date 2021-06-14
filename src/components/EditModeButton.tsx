import { Button } from "react-bootstrap";

export const EditModeButton = (props: { editMode: boolean; onClick: ()=>void }) => {
  const label = props.editMode ? 'Done' : "Edit";
  
  return (
    <Button
      variant="outline-primary"
      onClick={props.onClick}
    >
      {label}
    </Button>
  );
};
