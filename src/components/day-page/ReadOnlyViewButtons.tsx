import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import EditButton from "../../features/day-page/EditButton";
import { useDownload } from "../../features/download/useDownload";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";

interface Props {
  showDownloadButton: boolean,
  showEditButton: boolean,
}

const ReadOnlyViewButtons = (props: Props) => {
  const handleClicked = useDownload();
  return (
    <Fragment>
      {props.showDownloadButton &&
        <Button variant={VariantSecondary} onClick={handleClicked}>Download</Button>
      }{' '}
      {props.showEditButton && <EditButton variant={VariantPrimary}>Edit</EditButton>}
    </Fragment>
  )
}

export default ReadOnlyViewButtons;