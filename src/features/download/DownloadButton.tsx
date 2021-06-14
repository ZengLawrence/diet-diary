import { useAppSelector } from "../../app/hooks";
import { diarySelector } from "../../app/selectors";
import { SecondaryButton } from "../../components/buttons/SecondaryButton";
import downloadAsCsv from "./exportCsv";

export const DownloadButton = () => {
  const {date, meals} = useAppSelector(diarySelector);

  const handleClicked = () => downloadAsCsv(date, meals)

  return (
    <SecondaryButton label="Download" onClick={handleClicked} />
  )
}