import _ from "lodash";
import { connect } from "react-redux";
import { dayPageSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { HeaderButtons } from "../../components/day-page/HeaderButtons";

const mapStateToProps = (state: RootState) => ({
  editMode: dayPageSelector(state).editMode,
})

export default connect(mapStateToProps)(HeaderButtons);