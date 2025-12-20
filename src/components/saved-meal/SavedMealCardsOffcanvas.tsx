import _ from "lodash";
import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { savedMeals } from "../../features/saved-meal";
import { SavedMealCards } from "./SavedMealCards";
import { SearchTermInput } from "./SearchTermInput";
import { SavedMeal } from "../../model/SavedMeal";
import { useAppDispatch } from "../../app/hooks";
import { refresh } from "../../features/day-page/dayPageSlice";
import { SavedMealsChangeListener } from "../../model/savedMeals";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([] as SavedMeal[]);
  const dispatch = useAppDispatch();

  const filterMeals = async (searchTerm: string) => {
    return savedMeals.searchByDescription(searchTerm);
  }

  useEffect(() => {
    const listener : SavedMealsChangeListener = {
        added: () => filterMeals(searchTerm),
        deleted: () => filterMeals(searchTerm),
    }
    savedMeals.register(listener);

    filterMeals(searchTerm).then(setMeals);

    return () => {
      savedMeals.unregister(listener);
    }
  }, [searchTerm]);

  const handleSelectMeal = (meal: SavedMeal) => {
    const selectedMeals = savedMeals.select(meal, (today) => {
      dispatch(refresh(today));
    });
    setMeals(selectedMeals);
    // clear out search term after selecting a meal
    setSearchTerm("");
    props.onHide();
  }

  const handleDeleteMeal = (meal: SavedMeal) => {
    savedMeals.remove(meal);
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