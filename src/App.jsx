import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import Spinner from "./components/Spiner";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=150";

  // fetching pokemon
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data.results);

      //  get pokemon details
      const detailsPokemonData = data.results.map(async (poke) => {
        // console.log(poke.url);
        const res = await fetch(poke.url);
        const data = await res.json();
        return data;
      });
      // console.log(detailsPokemonData);
      const detailResponses = await Promise.all(detailsPokemonData);
      // console.log(detailResponses);
      setPokemons(detailResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred while fetching Pokémon.");
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // search functionality
  const searchData = pokemons.filter((curPoke) => {
    const matchesName = curPoke.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const machesType =
      selectedType === "" ||
      curPoke.types.some((typeObj) => typeObj.type.name === selectedType);

    return matchesName && machesType;
  });

  console.table(search, searchData);
  return (
    <>
      <Header />

      <div className="flex flex-col sm:flex-row items-center justify-between container mx-auto px-4 gap-4">
        <div className="w-60">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full  px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition "
            placeholder="Search Pokémon..."
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full max-w-60 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition"
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="fighting">Fighting</option>
          <option value="ghost">Ghost</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6 p-4 container mx-auto">
          {searchData?.map((poke) => (
            <PokemonCard key={poke.id} poke={poke} />
          ))}
        </section>
      )}
    </>
  );
}

export default App;
