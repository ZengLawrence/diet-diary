import { connect } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import type { RootState } from "../../app/store";
import { HeaderButtons } from "../../components/day-page/HeaderButtons";

const mapStateToProps = (state: RootState) => ({
  editMode: viewOptionsSelector(state).canEdit,
})

export default connect(mapStateToProps)(HeaderButtons);