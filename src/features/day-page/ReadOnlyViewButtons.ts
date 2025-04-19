import { connect } from "react-redux";
import { viewOptionsSelector } from "../../app/selectors";
import { RootState } from "../../app/store";
import ReadOnlyViewButtons from "../../components/day-page/ReadOnlyViewButtons";


const mapStateToProps = (state: RootState) => ({
  showDownloadButton: viewOptionsSelector(state).canDownload,
  showEditButton: viewOptionsSelector(state).allowEdit,
})

export default connect(mapStateToProps)(ReadOnlyViewButtons);
