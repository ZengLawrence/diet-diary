import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import AddMealButton from "../../features/day-page/AddMealButton";
import Footer from "../../features/day-page/Footer";
import Header from "../../features/day-page/Header";
import Summary from "../../features/day-page/Summary";
import FoodListGroupItems from "../../features/meal-card/FoodListGroupItems";
import MealCardHeader from "../../features/meal-card/MealCardHeader";
import { VariantPrimary, VariantSecondary } from "../ButtonVariant";
import { useState } from "react";
import SavedMealCardsOffcanvas from "./SavedMealCardsOffcanvas";

interface Props {
  numberOfMeals: number;
  showButton: boolean;
}

function id(index: number, length: number) {
  return index === length - 1 ? "last" : index.toString();
}

function DayPage(props: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header />
      <Summary />

      {_.map(_.range(props.numberOfMeals), (index) => (
        <Card id={id(index, props.numberOfMeals)} className="mt-1" key={index} data-cy="mealCard">
          <MealCardHeader mealIndex={index} />

          <ListGroup>
            <FoodListGroupItems mealIndex={index} />
          </ListGroup>
        </Card>
      ))}
      {props.showButton &&
        <div className="p2 d-flex justify-content-end mt-3">
          <AddMealButton data-cy="buttonAddMeal" variant={VariantPrimary}>
            <FontAwesomeIcon icon={faPlus} />
          </AddMealButton>&nbsp;
          <Button data-cy="buttonAddSavedMeal" variant={VariantSecondary} onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} /> Saved Meal
          </Button>
        </div>}
      <Footer />

      <SavedMealCardsOffcanvas show={show} onHide={handleClose}/>

    </div>
  );
}

export default DayPage;