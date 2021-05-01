import { useReducer } from "react";
import { Container } from "react-bootstrap";
import { DayPage } from "./container/DayPage";
import { MealDispatch } from "./components/MealDispatch";
import { INITIAL_STATE, reducer } from "./reducers";

function App() {
  const [appState, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Container>
      <MealDispatch.Provider value={dispatch} >
        <DayPage state={appState} />
      </MealDispatch.Provider>
    </Container>
  );
}

export default App;
