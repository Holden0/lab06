"use client";

import React, { useEffect, useState } from "react";
import Countries from "../Countries/Countries";
import styles from "./App.module.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: "", subregion: "" });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,area,continents,subregion"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  const uniqueContinents = [
    ...new Set(countries.map((c) => c.continents[0]).filter(Boolean)),
  ];

  const uniqueSubregions = [
    ...new Set(countries.map((c) => c.subregion).filter(Boolean)),
  ];

  useEffect(() => {
    let updatedCountries = [...countries];

    if (filter.continent) {
      updatedCountries = updatedCountries.filter((c) =>
        c.continents.includes(filter.continent)
      );
    }

    if (filter.subregion) {
      updatedCountries = updatedCountries.filter(
        (c) => c.subregion === filter.subregion
      );
    }

    if (sortBy === "population") {
      updatedCountries.sort((a, b) => b.population - a.population);
    } else if (sortBy === "area") {
      updatedCountries.sort((a, b) => b.area - a.area);
    } else if (sortBy === "alphabetical") {
      updatedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
    if (sortBy === "population" || sortBy === "area") {
      updatedCountries = updatedCountries.slice(0, 10);
    }

    setFilteredCountries(updatedCountries);
  }, [filter, sortBy, countries]);

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value,
      [type === "continent" ? "subregion" : "continent"]: "",
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Countries of the World</h1>
      <h2 className={styles.subHeading}>By: Holden Budiman</h2>

      <div className={styles.filters}>
        <label className={styles.label}>
          Filter by Continent:&nbsp;
          <select
            className={styles.select}
            value={filter.continent}
            onChange={(e) => handleFilterChange("continent", e.target.value)}
          >
            <option value="">All Continents</option>
            {uniqueContinents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Filter by Subregion:&nbsp;
          <select
            className={styles.select}
            value={filter.subregion}
            onChange={(e) => handleFilterChange("subregion", e.target.value)}
          >
            <option value="">All Subregions</option>
            {uniqueSubregions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.sortButtons}>
        <button
          className={styles.sortButton}
          onClick={() => setSortBy("population")}
        >
          Top 10 by Population
        </button>
        <button
          className={styles.sortButton}
          onClick={() => setSortBy("area")}
        >
          Top 10 by Area
        </button>
        <button
          className={styles.sortButton}
          onClick={() => setSortBy("alphabetical")}
        >
          Sort Alphabetically
        </button>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
