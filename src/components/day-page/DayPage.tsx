import Container from "react-bootstrap/Container";
import Footer from "../../features/day-page/Footer";
import SavedMealCardsOffcanvas from "../../features/day-page/SavedMealCardsOffcanvas";
import Summary from "../../features/day-page/Summary";
import AddMealButtons from "../../features/meal-card/AddMealButtons";
import MealCards from "../../features/meal-card/MealCards";
import { Header } from "./Header";
import WarningBorder from "../../features/warning/WarningBorder";
import { WarningAlert } from "../warning/WarningAlert";

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
        <WarningBorder>
          <WarningAlert />
          <div className="d-flex mb-2">
            <div className="flex-fill">
              <Summary />
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