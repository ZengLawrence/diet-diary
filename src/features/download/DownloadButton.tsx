import { Button } from "react-bootstrap";
import { VariantSecondary } from "../../components/buttons/ButtonVariant";
import { useDownload } from "./useDownload";

/**
 * Special implementation because it needs access to the app state directly.
 * 
 * @returns Download button
 */
export const DownloadButton = () => {
  const handleClicked = useDownload();
  return (
    <Button variant={VariantSecondary} onClick={handleClicked}>Download</Button>
  )
}