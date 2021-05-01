import { useReducer } from "react";
import { Container } from "react-bootstrap";
import { DayPage } from "./container/DayPage";
import { MealDispatch } from "./components/MealDispatch";
import { reducer } from "./reducers";
import { AppState } from "./model/AppState";

const INITIAL_STATE: AppState = {
  meals: [],
};

function App() {
  const [appState, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Container>
      <MealDispatch.Provider value={dispatch} >
        <DayPage meals={appState.meals} editState={appState.editState} />
      </MealDispatch.Provider>
    </Container>
  );
}

export default App;
