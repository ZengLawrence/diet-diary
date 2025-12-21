import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from "react-redux";
import store from "./app/store";
import DayPage from "./features/day-page/DayPage";
import * as api from "./features";

api.init();

export default function Root() {
  return (
    <Provider store={store}>
      <DayPage />
    </Provider>
  );
}