import { connect } from "react-redux";
import { newMealAction } from "../../actions";
import { AppDispatch } from "../../app/store";
import { AddButton } from "../../components/buttons/AddButton";

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(newMealAction()),
})

export default connect(null, mapDispatchToProps)(AddButton);