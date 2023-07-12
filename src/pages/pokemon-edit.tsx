import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import Loader from "../components/loader";

type Params = { id: string };

function PokemonEdit() {
  const { id } = useParams<Params>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) {
      PokemonService.getPokemon(+id).then((pokemon) => setPokemon(pokemon));
    }
  }, [id]);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true} />
        </div>
      ) : (
        <h4 className="center">
          <Loader />
        </h4>
      )}
    </div>
  );
}

export default PokemonEdit;
