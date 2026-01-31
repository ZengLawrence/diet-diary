import { connect } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import SavedFoodsOffcanvas from "../../components/saved-food/SavedFoodsOffcanvas";
import { closeSavedFoods } from "../overlays/overlaysSlice";

const mapStateToProps = (state: RootState) => ({
  show: state.overlays.showType === "savedFoods",
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onHide: () => dispatch(closeSavedFoods()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedFoodsOffcanvas);