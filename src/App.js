import './App.css';
import {BrowserRouter as Router , Routes, Route, Link} from "react-router-dom";
import PokeDexPage from "./pages/PokeDexPage";
import ArenaPage from "./pages/ArenaPage";
import CatchPage from "./pages/CatchPage";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";

function App() {
  return (
      <Router>
          <nav>
              <NavBar/>
          </nav>
          <Routes>
              <Route path="/" element={<PokeDexPage/>}></Route>
              <Route path="/catchemall" element={<CatchPage/>}></Route>
              <Route path="/arena" element={<ArenaPage/>}></Route>
              <Route path="*" element={<ErrorPage/>}></Route>

          </Routes>
      </Router>

  );
}

export default App;
