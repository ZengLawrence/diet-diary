import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { Header } from "../../components/day-page/Header";

const mapStateToProps = (state: RootState) => ({
  date: state.date,
  editMode: state.editMode,
})

export default connect(mapStateToProps)(Header);