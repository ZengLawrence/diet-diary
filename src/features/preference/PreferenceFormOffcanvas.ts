import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import PreferenceFormOffcanvas from "../../components/preference/PreferenceFormOffcanvas";
import { closePreferences } from "../overlays/overlaysSlice";

const mapStateToProps = (state: RootState) => ({
  show: state.overlays.showType === "preferences",
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(closePreferences()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceFormOffcanvas);