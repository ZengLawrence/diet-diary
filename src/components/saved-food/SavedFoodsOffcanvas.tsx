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

interface State {
  foods: Food[];
  inSelectMode: boolean;
  selectedIndexes: number[];
}

type SetFoodsAction = { type: 'set-foods', foods: Food[] };
type EnterSelectModeAction = { type: 'enter-select-mode' };
type ExitSelectModeAction = { type: 'exit-select-mode' };
type ToggleSelectIndexAction = { type: 'toggle-select-index', index: number };
type ClearSelectedIndexesAction = { type: 'clear-selected-indexes' };

type Action = SetFoodsAction
  | EnterSelectModeAction
  | ExitSelectModeAction
  | ToggleSelectIndexAction
  | ClearSelectedIndexesAction;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'set-foods':
      return { ...state, foods: action.foods };
    case 'enter-select-mode':
      return { ...state, inSelectMode: true };
    case 'exit-select-mode':
      return { ...state, inSelectMode: false, selectedIndexes: [] };
    case 'toggle-select-index': {
      const index = action.index;
      const selectedIndexes = [...state.selectedIndexes];
      const indexInSelected = selectedIndexes.indexOf(index);
      if (indexInSelected !== -1) {
        selectedIndexes.splice(indexInSelected, 1);
      } else {
        selectedIndexes.push(index);
      }
      return { ...state, selectedIndexes };
    }
    case 'clear-selected-indexes':
      return { ...state, selectedIndexes: [] };
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
  selectedIndexes: [],
};

function SavedFoodsOffcanvas(props: Props) {
  const [{ foods, inSelectMode, selectedIndexes }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadedFoods = new Promise<Food[]>((resolve) => resolve(savedFoods.getAll()));
    void loadedFoods.then((foods) => dispatch({ type: 'set-foods', foods }));
  }, [props.show]);

  const handleDelete = () => {
    const deleteFoods = new Promise<Food[]>((resolve) => {
      savedFoods.removeByIndexes(selectedIndexes);
      const updatedFoods = savedFoods.getAll();
      resolve(updatedFoods);
    });
    void deleteFoods.then((foods) => {
      dispatch({ type: 'clear-selected-indexes' });
      dispatch({ type: 'set-foods', foods });
    });
  };

  /* eslint-disable react-x/no-array-index-key */
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      id="savedFoods"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saved Foods</Offcanvas.Title>
      </Offcanvas.Header>
      <div className={"px-3 mb-2 d-flex " + (inSelectMode ? "justify-content-between" : "justify-content-end")}>
        {inSelectMode &&
          <Button
            onClick={handleDelete}
            variant={VariantDanger}
          >
            Delete
          </Button>}
        <Button
          onClick={() => dispatch({ type: inSelectMode ? 'exit-select-mode' : 'enter-select-mode' })}
          variant={VariantSecondary}
        >
          {inSelectMode ? 'Cancel' : 'Select'}
        </Button>
      </div>
      <Offcanvas.Body>
        <div>
          Total: {foods.length}
        </div>
        <ListGroup>
          {foods.map((food, index) => (
            <ListGroup.Item key={index}>
              <Row>
                {inSelectMode && (
                  <Col xs="auto">
                    <Form.Check
                      checked={selectedIndexes.includes(index)}
                      onChange={() => dispatch({ type: 'toggle-select-index', index })}
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
  /* eslint-enable react-x/no-array-index-key */
}

export default SavedFoodsOffcanvas;