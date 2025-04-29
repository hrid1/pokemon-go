import React from "react";

const PokemonCard = ({poke}) => {
  return (
    <div
      key={poke.id}
      className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 duration-200"
    >
      <span className="text-sm text-gray-500 self-start"># {poke.id}</span>

      <img
        className="w-32 h-32 object-contain my-2"
        src={
          poke.sprites.other?.dream_world?.front_default ||
          poke.sprites.front_default
        }
        alt={poke.name}
      />

      <p className="capitalize font-semibold text-lg">{poke.name}</p>

      <div className="mt-2 flex gap-2 flex-wrap justify-center">
        {poke?.types?.map((curType) => (
          <span
            key={curType.type.name}
            className="text-xs px-3 py-1 bg-teal-100 text-teal-800 rounded-full capitalize"
          >
            {curType.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
