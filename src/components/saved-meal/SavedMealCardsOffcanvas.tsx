import _ from "lodash";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { savedMeals } from "../../features/saved-meal";
import { Food } from "../../model/Food";
import { SavedMealCards } from "./SavedMealCards";
import { SearchTermInput } from "./SearchTermInput";

interface Props {
  show: boolean,
  onHide: () => void,
}

function SavedMealCardsOffcanvas(props: Props) {

  const [meals, setMeals] = useState([] as { index: number; foods: Food[]; }[]);

  const handleSearchTermChange = (searchTerm: string) => {
    const filteredMeals = savedMeals.searchByDescription(searchTerm);
    setMeals(_.map(filteredMeals, (m, index) => ({ index: index, foods: m.foods })));
  }

  return (
    <Offcanvas id="savedMeals" show={props.show} onHide={props.onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Meals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchTermInput update={handleSearchTermChange} />
        <div>Total: {_.size(meals)}</div>
        <SavedMealCards meals={meals} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedMealCardsOffcanvas;