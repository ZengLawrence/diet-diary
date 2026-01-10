import { CaretRightFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../app/hooks";
import { next } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const NextButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    void dispatch(next());
  }

  return (
    <Button 
      variant={VariantSecondary}
      onClick={handleClick}>
      <CaretRightFill />
    </Button>
  );
}
export default NextButton;