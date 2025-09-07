import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useAppDispatch } from "../../app/hooks";
import { today } from "../../features/day-page/api";
import { refresh } from "../../features/day-page/dayPageSlice";
import AddMealButtons from "../../features/meal-card/AddMealButtons";
import MealCards from "../../features/meal-card/MealCards";
import PreferenceFormOffcanvas from "../../features/preference/PreferenceFormOffcanvas";
import SavedMealCardsOffcanvas from "../../features/saved-meal/SavedMealCardsOffcanvas";
import TabbedSummary from "../../features/summary/TabbedSummary";
import EditCustomTargetsOffcanvas from "../../features/target/EditCustomTargetsOffcanvas";
import { TodayListener } from "../../model/today";
import BrandNavbar from "../nav-bar/BrandNavbar";
import Warnings from "../warning/Warnings";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  showButton: boolean;
}

const DayPage = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const todayListener: TodayListener = {
      updated: (day) => {
        dispatch(refresh(day));
      },
    };
    today.registerListener(todayListener);

    return () => {
      today.unregisterListener(todayListener);
    };
  }, [dispatch]);

  return (
    <Container fluid="md">
      <div>
        <BrandNavbar />
        <div className="d-flex flex-fill mb-2">
          <Header />
        </div>
        <Warnings />
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
      <PreferenceFormOffcanvas />
      <EditCustomTargetsOffcanvas />

    </Container>
  );
}

export default DayPage;