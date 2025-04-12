import { connect } from "react-redux";
import { targetStateSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import UnlimitedFruitCheckBox from "../../components/target/UnlimitedFruitCheckBox";
import { toggleUnlimitedFruit } from "./targetStateSlice";

const mapStateToProps = (state: RootState) => ({
  unlimitedFruit: targetStateSelector(state).unlimitedFruit,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleUnlimitedFruit: () => dispatch(toggleUnlimitedFruit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UnlimitedFruitCheckBox);