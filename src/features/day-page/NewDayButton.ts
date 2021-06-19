import { connect } from "react-redux";
import { newDayAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { DangerButton } from "../../components/buttons/DangerButton";

const mapStateToProps = () => ({
  label: "New Day",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newDayAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DangerButton);