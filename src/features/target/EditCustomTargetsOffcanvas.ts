import { connect } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import EditCustomTargetsOffcanvas from "../../components/target/EditCustomTargetsOffcanvas";
import { closeCustomTargets } from "../overlays/overlaysSlice";

const mapStateToProps = (state: RootState) => ({
  show: state.overlays.showType === "customTargets",
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(closeCustomTargets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomTargetsOffcanvas);