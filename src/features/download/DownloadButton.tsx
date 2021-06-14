import _ from "lodash";
import { useAppSelector } from "../../app/hooks";
import { SecondaryButton } from "../../components/buttons/SecondaryButton";
import downloadAsCsv from "./exportCsv";

export const DownloadButton = () => {
  const date = useAppSelector(state => state.date);
  const meals = useAppSelector(state => _.map(state.mealStates, 'meal'))

  const handleClicked = () => downloadAsCsv(date, meals)

  return (
    <SecondaryButton label="Download" onClick={handleClicked} />
  )
}