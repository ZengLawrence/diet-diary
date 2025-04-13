import { WarningAlert } from "./WarningAlert";

const CanNotAddNewDayWarning = (props: {show: boolean}) => (
  <WarningAlert show={props.show} >
    Must wait till tomorrow to add a new day.
  </WarningAlert>
)

export default CanNotAddNewDayWarning;