import Container from "react-bootstrap/Container";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import AddMealButtons from "../../features/meal-card/AddMealButtons";
import MealCards from "../../features/meal-card/MealCards";
import { Header } from "./Header";
import WarningBorder from "../../features/warning/WarningBorder";
import WarningAlert from "../../features/warning/WarningAlert";
import { Footer } from "./Footer";
import TabbedSummary from "../../features/summary/TabbedSummary";

interface Props {
  showButton: boolean;
}

function DayPage(props: Props) {
  return (
    <Container>
      <div>
        <div className="d-flex mb-2">
          <div className="flex-fill">
            <Header />
          </div>
        </div>
        <WarningAlert />
        <WarningBorder>
          <div className="d-flex mb-2">
            <div className="flex-fill">
              <TabbedSummary />
            </div>
          </div>
          <div className="mb-2">
            <MealCards />
            {props.showButton && <AddMealButtons />}
          </div>
        </WarningBorder>

        <Footer />
      </div>

      <SavedMealCardsOffcanvas />

    </Container>
  );
}

export default DayPage;