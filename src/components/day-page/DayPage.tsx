import Container from "react-bootstrap/Container";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import AddMealButtons from "../../features/meal-card/AddMealButtons";
import MealCards from "../../features/meal-card/MealCards";
import TabbedSummary from "../../features/summary/TabbedSummary";
import WarningAlert from "../../features/warning/WarningAlert";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  showButton: boolean;
}

function DayPage(props: Props) {
  return (
    <Container fluid="md">
      <div>
        <div className="d-flex mb-2">
          <div className="flex-fill">
            <Header />
          </div>
        </div>
        <WarningAlert />
        <div className="d-flex mb-2">
          <div className="flex-fill">
            <TabbedSummary />
          </div>
        </div>
        <div className="mb-2">
          <MealCards />
          {props.showButton && <AddMealButtons />}
        </div>

        <Footer />
      </div>

      <SavedMealCardsOffcanvas />

    </Container>
  );
}

export default DayPage;