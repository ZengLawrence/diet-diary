import { connect } from "react-redux";
import { savedMealStateSelector } from "../../app/selectors";
import { AppDispatch, RootState } from "../../app/store";
import { SearchTermInput } from "../../components/saved-meal/SearchTermInput";
import { updateSearchTerm } from "./savedMealStateSlice";

const mapStateToProps = (state: RootState) => ({
  searchTerm: savedMealStateSelector(state).searchTerm,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  update: (newTerm: string) => dispatch(updateSearchTerm(newTerm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchTermInput);