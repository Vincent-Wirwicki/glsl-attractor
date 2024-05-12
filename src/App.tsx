// import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/0-utils/ErrorPage";
// import Layout from "./layout/Layout";
import { Route, Switch } from "wouter";
import RoutesToScenes from "./routing/RoutesToScenes";
import MainNav from "./layout/MainNav";
import { dataApp } from "./dataApp";

const App = () => {
  return (
    <>
      <MainNav dataApp={dataApp} />
      <main className="page-wrap">
        <Switch>
          <RoutesToScenes dataApp={dataApp} />
          <Route>{() => <ErrorPage />}</Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
// http://www.3d-meier.de/tut19/Seite0.html
