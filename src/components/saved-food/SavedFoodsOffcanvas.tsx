import _ from "lodash";
import { useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { savedFoods } from "../../features/day-page/api";
import type { Food } from "../../model/Food";
import { VariantDanger, VariantSecondary } from "../ButtonVariant";
import { FoodItem } from "../FoodItem";
import { SearchTermInput } from "../form/SearchTermInput";

interface State {
  foods: Food[];
  inSelectMode: boolean;
  selectedFoods: Food[];
}

type SetFoodsAction = { type: 'set-foods', foods: Food[] };
type EnterSelectModeAction = { type: 'enter-select-mode' };
type ExitSelectModeAction = { type: 'exit-select-mode' };
type ToggleSelectedFoodAction = { type: 'toggle-selected-food', food: Food };
type ClearSelectedFoodsAction = { type: 'clear-selected-foods' };

type Action = SetFoodsAction
  | EnterSelectModeAction
  | ExitSelectModeAction
  | ToggleSelectedFoodAction
  | ClearSelectedFoodsAction;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'set-foods':
      return { ...state, foods: action.foods };
    case 'enter-select-mode':
      return { ...state, inSelectMode: true };
    case 'exit-select-mode':
      return { ...state, inSelectMode: false, selectedFoods: [] };
    case 'toggle-selected-food': {
      const food = action.food;
      const selectedFoods = [...state.selectedFoods];
      const indexInSelectedFoods = selectedFoods.findIndex(f => _.isEqual(f, food));
      if (indexInSelectedFoods !== -1) {
        selectedFoods.splice(indexInSelectedFoods, 1);
      } else {
        selectedFoods.push(food);
      }
      return { ...state, selectedFoods };
    }
    case 'clear-selected-foods':
      return { ...state, selectedFoods: [] };
    default:
      return state;
  }
}

interface Props {
  show: boolean,
  onHide: () => void,
}

const initialState: State = {
  foods: [],
  inSelectMode: false,
  selectedFoods: [],
};

function ButtonsBand(props: {
  showDeleteButton: boolean,
  onDelete: () => void,
  onToggleSelectMode: () => void
}) {
  return (
    <div className={"px-3 d-flex " + (props.showDeleteButton ? "justify-content-between" : "justify-content-end")}>
      {props.showDeleteButton &&
        <Button
          onClick={props.onDelete}
          variant={VariantDanger}
        >
          Delete
        </Button>}
      <Button
        onClick={props.onToggleSelectMode}
        variant={VariantSecondary}
      >
        {props.showDeleteButton ? 'Cancel' : 'Select'}
      </Button>
    </div>
  );
}

function SavedFoodsOffcanvas(props: Props) {
  const [{ foods, inSelectMode, selectedFoods }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadedFoods = new Promise<Food[]>((resolve) => resolve(savedFoods.getAll()));
    void loadedFoods.then((foods) => dispatch({ type: 'set-foods', foods }));
  }, [props.show]);

  const handleDelete = () => {
    const deleteFoods = new Promise<Food[]>((resolve) => {
      savedFoods.removeAll(selectedFoods);
      const updatedFoods = savedFoods.getAll();
      resolve(updatedFoods);
    });
    void deleteFoods.then((foods) => {
      dispatch({ type: 'clear-selected-foods' });
      dispatch({ type: 'set-foods', foods });
    });
  };

  const handleToggleSelectMode = () => {
    dispatch({ type: inSelectMode ? 'exit-select-mode' : 'enter-select-mode' });
  };

  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      id="savedFoods"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Foods</Offcanvas.Title>
      </Offcanvas.Header>
      <SearchTermInput
        searchTerm={""}
        update={() => { }}
      />
      <ButtonsBand
        showDeleteButton={inSelectMode}
        onDelete={handleDelete}
        onToggleSelectMode={handleToggleSelectMode}
      />
      <Offcanvas.Body>
        <div>
          Total: {foods.length}
        </div>
        <ListGroup>
          {foods.map((food) => (
            <ListGroup.Item key={food.description}>
              <Row>
                {inSelectMode && (
                  <Col xs="auto">
                    <Form.Check
                      checked={selectedFoods.some(f => _.isEqual(f, food))}
                      onChange={() => dispatch({ type: 'toggle-selected-food', food })}
                    />
                  </Col>
                )}
                <Col>
                  <FoodItem food={food} />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SavedFoodsOffcanvas;