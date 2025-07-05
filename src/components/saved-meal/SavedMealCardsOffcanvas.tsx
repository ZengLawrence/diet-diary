import _ from "lodash";
import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { savedMeals } from "../../features/saved-meal";
import { SavedMealCards } from "./SavedMealCards";
import { SearchTermInput } from "./SearchTermInput";
import { SavedMeal } from "../../model/SavedMeal";
import { useAppDispatch } from "../../app/hooks";
import { refresh } from "../../features/day-page/dayPageSlice";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([] as SavedMeal[]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const meals = savedMeals.searchByDescription(searchTerm);
    setMeals(meals);
  }, [searchTerm]);

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
  }
  
  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchTermInput searchTerm={searchTerm} update={setSearchTerm} />
        <div>Total: {_.size(meals)}</div>
        <SavedMealCards meals={meals} selectMeal={handleSelectMeal} deleteMeal={handleDeleteMeal} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;