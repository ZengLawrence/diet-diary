import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import { SecondaryButton } from "../../components/buttons/SecondaryButton";
import { enterEditTarget } from "./targetStateSlice";

const mapStateToProps = () => ({
  label: "Change",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditTarget()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryButton);