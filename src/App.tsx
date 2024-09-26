import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import store from "./app/store";
import DayPage from "./features/day-page/DayPage";
import Script from 'next/script';

export default function Root() {
  return (
    <Provider store={store}>
      <Container>
        <Script
          id="auto-dark-mode">
            {`  
            const setTheme = () => {
              document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
            };
            setTheme();
            `}
          </Script>
        <DayPage />
      </Container>
    </Provider>
  );
}