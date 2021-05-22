import { Container } from "react-bootstrap";
import { useAppSelector } from "./app/hooks";
import { DayPage } from "./components/day-page/DayPage";


function App() {
  const appState = useAppSelector(state => state);

  return (
    <Container>
      <DayPage state={appState} />
    </Container>
  );
}

export default App;
