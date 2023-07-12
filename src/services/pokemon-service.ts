import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";
export default class PokemonService {
  static pokemons: Pokemon[] = POKEMONS;

  static isDev =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  static async getPokemons(): Promise<Pokemon[]> {
    if (this.isDev) {
      try {
        const response = await fetch("http://localhost:3001/pokemons");
        const data = await response.json();
        return data;
      } catch (error) {
        this.handleError(error);
        return [];
      }
    }
    return new Promise((resolve) => {
      resolve(this.pokemons);
    });
  }

  static async getPokemon(id: number): Promise<Pokemon | null> {
    if (this.isDev) {
      try {
        const response = await fetch(`http://localhost:3001/pokemons/${id}`);
        const data = await response.json();
        return this.isEmpty(data) ? null : data;
      } catch (error) {
        this.handleError(error);
        return null;
      }
    }

    const foundPokemon = this.pokemons.find((pokemon) => id === pokemon.id);
    return foundPokemon ? Promise.resolve(foundPokemon) : Promise.resolve(null);
  }

  static async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (this.isDev) {
      try {
        const response = await fetch(
          `http://localhost:3001/pokemons/${pokemon.id}`,
          {
            method: "PUT",
            body: JSON.stringify(pokemon),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
    return new Promise((resolve) => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    });
  }

  static async deletePokemon(pokemon: Pokemon): Promise<{}> {
    if (this.isDev) {
      try {
        const response = await fetch(
          `http://localhost:3001/pokemons/${pokemon.id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
    return new Promise((resolve) => {
      const { id } = pokemon;
      this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
      resolve({});
    });
  }

  static async addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    pokemon.created = new Date(pokemon.created);
    if (this.isDev) {
      try {
        const response = await fetch(`http://localhost:3001/pokemons`, {
          method: "POST",
          body: JSON.stringify(pokemon),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
    return new Promise((resolve) => {
      this.pokemons.push(pokemon);
      resolve(pokemon);
    });
  }

  static async searchPokemon(term: string): Promise<Pokemon[]> {
    if (this.isDev) {
      try {
        const response = await fetch(
          `http://localhost:3001/pokemons?q=${term}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        this.handleError(error);
        return [];
      }
    }
    return new Promise((resolve) => {
      const results = this.pokemons.filter((pokemon) =>
        pokemon.name.includes(term)
      );
      resolve(results);
    });
  }

  static isEmpty(data: object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: unknown): void {
    console.error(error);
  }
}
