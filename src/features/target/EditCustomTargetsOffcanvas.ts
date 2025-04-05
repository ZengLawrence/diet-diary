import { connect } from "react-redux";
import EditCustomTargetsOffcanvas from "../../components/target/EditCustomTargetsOffcanvas";
import { RootState } from "../../app/store";
import { customTargetsStateSelector } from "../../app/selectors";

const mapStateToProps = (state: RootState) => ({
    targets: customTargetsStateSelector(state).targets,
})

export default connect(mapStateToProps)(EditCustomTargetsOffcanvas);