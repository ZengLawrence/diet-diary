import { useReducer } from "react";
import { Container } from "react-bootstrap";
import { DayPage } from "./components/day-page/DayPage";
import { MealDispatch } from "./components/MealDispatch";
import { initialState } from "./model/AppState";
import { reducer } from "./reducers";

function App() {
  const [appState, dispatch] = useReducer(reducer, initialState());

  return (
    <Container>
      <MealDispatch.Provider value={dispatch} >
        <DayPage state={appState} />
      </MealDispatch.Provider>
    </Container>
  );
}

export default App;
