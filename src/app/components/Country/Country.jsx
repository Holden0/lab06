import React from "react";

const Country = ({ country }) => {
  const { flags, name, capital, population, area, continents, subregion } = country;

  return (
    <div>
      <img src={flags.png} alt={`Flag of ${name.common}`} width={100} />
      <h3>{name.common}</h3>
      <p>Capital: {capital}</p>
      <p>Population: {population.toLocaleString()}</p>
      <p>Area: {area.toLocaleString()} km²</p>
      <p>Continent: {continents.join(", ")}</p>
      <p>Subregion: {subregion}</p>
    </div>
  );
};

export default Country;