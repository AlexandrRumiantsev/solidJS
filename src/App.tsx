import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Layout = lazy(() => import("./components/layout"));

// Фильтр ограничивает роут, можно перейти только по определенной категории и Id должен быть числом
const taskFilters = { 
  category: ["work", "personal", "urgent"], 
  id: /^\d+$/ 
};

function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/task/:category/:id" component={Detail} matchFilters={taskFilters} />
      <Route path="*all" component={NotFound} /> 
    </Router>
  )
}

export default App;