import Container from "react-bootstrap/Container";
import AddMealButtons from "../../features/meal-card/AddMealButtons";
import MealCards from "../../features/meal-card/MealCards";
import SavedMealCardsOffcanvas from "../../features/saved-meal/SavedMealCardsOffcanvas";
import TabbedSummary from "../../features/summary/TabbedSummary";
import CaloriesExceedAlertText from "../../features/warning/CaloriesExceedAlertText";
import CaloriesExceedWarningAlert from "../../features/warning/CaloriesExceedWarningAlert";
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
        <CaloriesExceedWarningAlert>
          <CaloriesExceedAlertText />
        </CaloriesExceedWarningAlert>
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