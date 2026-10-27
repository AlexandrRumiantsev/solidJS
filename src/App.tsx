import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Layout = lazy(() => import("./components/layout"));


function App() {

  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/task/:id" component={Detail} />
      <Route path="*all" component={NotFound} /> 
    </Router>
  )
}

export default App;