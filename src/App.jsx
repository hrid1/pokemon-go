import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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
  const searchData = pokemons.filter((curPoke) =>
    curPoke.name?.toLowerCase().includes(search.toLowerCase())
  );

  console.table(search, searchData);
  return (
    <>
      <Header />

      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto px-4">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition"
            placeholder="Search Pokémon..."
          />
        </div>
        <p>Total poke: {searchData.length}</p>
      </div>

      {loading ? (
        <p>Loading</p>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 container mx-auto">
          {searchData?.map((poke) => (
            <PokemonCard key={poke.id} poke={poke} />
          ))}
        </section>
      )}
    </>
  );
}

export default App;
