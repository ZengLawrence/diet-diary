import { Button } from "react-bootstrap";

export const EditModeButton = (props: { editMode: boolean; onClick: ()=>void }) => {
  const lable = props.editMode ? 'Done' : "Edit";
  
  return (
    <Button
      variant="outline-primary"
      onClick={props.onClick}
    >
      {lable}
    </Button>
  );
};
