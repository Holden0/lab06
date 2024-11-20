import React from "react";
import styles from "./Countries.module.css";

const Countries = ({ countries }) => {
  return (
    <div className={styles.countriesContainer}>
      {countries.map((country) => (
        <div key={country.name.common} className={styles.countryCard}>
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className={styles.flagImage}
          />
          <div className={styles.countryInfo}>
            <h2 className={styles.countryName}>{country.name.common}</h2>
            <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {country.area} km²</p>
            <p><strong>Continent:</strong> {country.continents}</p>
            <p><strong>Sub Region:</strong> {country.subregion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countries;
