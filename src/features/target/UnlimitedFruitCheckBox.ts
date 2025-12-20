import { connect } from "react-redux";
import { unlimitedFruitSelector } from "../../app/selectors";
import type { AppDispatch, RootState } from "../../app/store";
import UnlimitedFruitCheckBox from "../../components/target/UnlimitedFruitCheckBox";
import { toggleUnlimitedFruit } from "../day-page/dayPageSlice";

const mapStateToProps = (state: RootState) => ({
  unlimitedFruit: unlimitedFruitSelector(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleUnlimitedFruit: () => dispatch(toggleUnlimitedFruit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UnlimitedFruitCheckBox);