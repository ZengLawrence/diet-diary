import { connect } from "react-redux";
import { enterEditTargetAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { SecondaryButton } from "../../components/buttons/SecondaryButton";

const mapStateToProps = () => ({
  label: "Change",
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(enterEditTargetAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryButton);