import { Button } from "react-bootstrap";
import { Meal } from "../../model/Food";
import downloadAsCsv from "./exportCsv";

export const DownloadButton = (props: { date: string; meals: Meal[] }) => {
  const handleClicked = () => downloadAsCsv(props.date, props.meals)

  return (
    <Button
      variant="outline-secondary"
      onClick={handleClicked}
    >
      Download
    </Button>
  )
}