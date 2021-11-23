import { useAppSelector } from "../../app/hooks";
import { diarySelector } from "../../app/selectors";
import downloadAsCsv from "./exportCsv";

export function useDownload() {
  const { date, meals } = useAppSelector(diarySelector);
  return () => downloadAsCsv(date, meals);
}
