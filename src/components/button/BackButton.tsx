import { CaretLeftFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../app/hooks";
import { back } from "../../features/day-page/pageOptionsSlice";
import { VariantSecondary } from "../ButtonVariant";

const BackButton = () => {

  const dispatch = useAppDispatch();
  const handleClick = () => {
    void dispatch(back());
  }

  return (
    <Button
      variant={VariantSecondary}
      onClick={handleClick}>
      <CaretLeftFill />
    </Button>
  );
}

export default BackButton;