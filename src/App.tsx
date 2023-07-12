import PokemonList from "./pages/pokemon-list";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonsDetail from "./pages/pokemon-detail";
import PageNotFound from "./pages/page-not-found";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonAdd from "./components/pokemon-add";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              Pokédex
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemons" element={<PokemonList />} />
          <Route path="/pokemons/add" element={<PokemonAdd />}></Route>
          <Route path="/pokemons/:id" element={<PokemonsDetail />} />
          <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
