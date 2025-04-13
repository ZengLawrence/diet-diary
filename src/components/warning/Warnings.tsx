import CaloriesExceedAlertText from "../../features/warning/CaloriesExceedAlertText";
import CaloriesExceedWarningAlert from "../../features/warning/CaloriesExceedWarningAlert";
import CanNotAddNewDayWarning from "../../features/warning/CanNotAddNewDayWarning";

const Warnings = () => (
  <div>
    <CanNotAddNewDayWarning>
      Must wait till tomorrow to add a new day.
    </CanNotAddNewDayWarning>
    <CaloriesExceedWarningAlert>
      <CaloriesExceedAlertText />
    </CaloriesExceedWarningAlert>
  </div>
);

export default Warnings;