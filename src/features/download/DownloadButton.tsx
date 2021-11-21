import { Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { diarySelector } from "../../app/selectors";
import { VariantSecondary } from "../../components/buttons/ButtonVariant";
import downloadAsCsv from "./exportCsv";

/**
 * Special implementation because it needs access to the app state directly.
 * 
 * @returns Download button
 */
export const DownloadButton = () => {
  const {date, meals} = useAppSelector(diarySelector);
  const handleClicked = () => downloadAsCsv(date, meals)

  return (
    <Button variant={VariantSecondary} onClick={handleClicked}>Download</Button>
  )
}