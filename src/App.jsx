import "./App.scss";
import AppRouter from "./Components/App/AppRouter";
import Footer from "./Components/Partials/Footer/Footer";
import Navigation from "./Components/Partials/Navigation/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;
