import { connect } from "react-redux";
import { dateSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import { Header } from "../../components/day-page/Header";

const mapStateToProps = (state: RootState) => ({
  date: dateSelector(state),
})

export default connect(mapStateToProps)(Header);