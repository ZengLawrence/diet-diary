import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import store from "./app/store";
import DayPage from "./features/day-page/DayPage";

export default function Root() {
  return (
    <Provider store={store}>
      <Container>
        <DayPage />
      </Container>
    </Provider>
  );
}