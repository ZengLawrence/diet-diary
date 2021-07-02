import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { DangerButton } from "../../components/buttons/DangerButton";
import { newDay } from "./dateSlice";

const mapStateToProps = () => ({
  label: "New Day",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newDay()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DangerButton);