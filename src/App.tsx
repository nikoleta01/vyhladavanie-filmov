import "./App.scss";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/my-favorites" element={<Favorites />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
