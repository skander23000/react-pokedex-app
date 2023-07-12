import Pokemon from "../models/pokemon";
import { useState } from "react";
import PokemonForm from "./pokemon-form";

function PokemonAdd() {
  const [id] = useState<number>(new Date().getTime());
  const [pokemon] = useState<Pokemon>(new Pokemon(id));

  return (
    <div className="row">
      <h2 className="header center">Ajouter un Pokemon</h2>
      <PokemonForm pokemon={pokemon} isEditForm={false}></PokemonForm>
    </div>
  );
}
export default PokemonAdd;
