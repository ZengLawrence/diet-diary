import { connect } from "react-redux";
import { AppDispatch } from "../../app/store";
import TargetEditForm from "../../components/target/TargetEditForm";
import { Target } from "../../model/Target";
import { updateTarget } from "./customTargetsSlice";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    update: (target: Target) => dispatch(updateTarget(target)),
});

export default connect(null, mapDispatchToProps)(TargetEditForm);