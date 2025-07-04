import _ from "lodash";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { savedMeals } from "../../features/saved-meal";
import { SavedMealCards } from "./SavedMealCards";
import { SearchTermInput } from "./SearchTermInput";
import { SavedMeal } from "../../model/SavedMeal";
import { removeSuggestion } from "../../features/suggestions/SavedMealSuggestion";
import { useAppDispatch } from "../../app/hooks";
import { addSavedMeal, refresh } from "../../features/day-page/dayPageSlice";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {

  const [meals, setMeals] = useState([] as SavedMeal[]);
  const dispatch = useAppDispatch();

  const handleSearchTermChange = (searchTerm: string) => {
    const filteredMeals = savedMeals.searchByDescription(searchTerm);
    setMeals(filteredMeals);
  }

  const handleSelectMeal = (meal: SavedMeal) => {
    const selectedMeals = savedMeals.select(meal, (today) => {
      dispatch(refresh(today));
    });
    setMeals(selectedMeals);
    props.onHide();
  }

  const handleDeleteMeal = (meal: SavedMeal) => {
    const updatedMeals = savedMeals.remove(meal);
    setMeals(updatedMeals);
    //TODO move into savedMeals.remove
    removeSuggestion(meal);
  }
  
  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchTermInput update={handleSearchTermChange} />
        <div>Total: {_.size(meals)}</div>
        <SavedMealCards meals={meals} selectMeal={handleSelectMeal} deleteMeal={handleDeleteMeal} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;