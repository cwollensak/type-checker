import React, { useEffect, useState } from 'react';
import './App.css';

const validTypes = new Set(["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"]);
const validTypesArray = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"];

const types = {
  "normal": {
    "normal": 0,
    "fighting": -2,
    "flying": 0,
    "poison": 0,
    "ground": 0,
    "rock": 0,
    "bug": 0,
    "ghost": 99,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": 0,
    "ice": 0,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "fighting": {
    "normal": 0,
    "fighting": 0,
    "flying": -2,
    "poison": 0,
    "ground": 0,
    "rock": 2,
    "bug": 2,
    "ghost": 0,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": -2,
    "ice": 0,
    "dragon": 0,
    "dark": 2,
    "fairy": -2
  },
  "flying": {
    "normal": 0,
    "fighting": 2,
    "flying": 0,
    "poison": 0,
    "ground": 99,
    "rock": -2,
    "bug": 2,
    "ghost": 0,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 2,
    "electric": -2,
    "psychic": 0,
    "ice": -2,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "poison": {
    "normal": 0,
    "fighting": 2,
    "flying": 0,
    "poison": 2,
    "ground": -2,
    "rock": 0,
    "bug": 2,
    "ghost": 0,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 2,
    "electric": 0,
    "psychic": -2,
    "ice": 0,
    "dragon": 0,
    "dark": 0,
    "fairy": 2
  },
  "ground": {
    "normal": 0,
    "fighting": 0,
    "flying": 0,
    "poison": 2,
    "ground": 0,
    "rock": 2,
    "bug": 0,
    "ghost": 0,
    "steel": 0,
    "fire": 0,
    "water": -2,
    "grass": -2,
    "electric": 99,
    "psychic": 0,
    "ice": -2,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "rock": {
    "normal": 2,
    "fighting": -2,
    "flying": 2,
    "poison": 2,
    "ground": -2,
    "rock": 2,
    "bug": 0,
    "ghost": 0,
    "steel": -2,
    "fire": 0,
    "water": -2,
    "grass": -2,
    "electric": 0,
    "psychic": 0,
    "ice": 0,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "bug": {
    "normal": 0,
    "fighting": 2,
    "flying": -2,
    "poison": 0,
    "ground": 2,
    "rock": -2,
    "bug": 0,
    "ghost": 0,
    "steel": 0,
    "fire": -2,
    "water": 0,
    "grass": 2,
    "electric": 0,
    "psychic": 0,
    "ice": 0,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "ghost": {
    "normal": 99,
    "fighting": 99,
    "flying": 0,
    "poison": 2,
    "ground": 0,
    "rock": 0,
    "bug": 2,
    "ghost": -2,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": 0,
    "ice": 0,
    "dragon": 0,
    "dark": -2,
    "fairy": 0
  },
  "steel": {
    "normal": 2,
    "fighting": -2,
    "flying": 2,
    "poison": 99,
    "ground": -2,
    "rock": 2,
    "bug": 2,
    "ghost": 0,
    "steel": 2,
    "fire": -2,
    "water": 0,
    "grass": 2,
    "electric": 0,
    "psychic": 2,
    "ice": 2,
    "dragon": 2,
    "dark": 0,
    "fairy": 2
  },
  "fire": {
    "normal": 0,
    "fighting": 0,
    "flying": 0,
    "poison": 0,
    "ground": -2,
    "rock": -2,
    "bug": 2,
    "ghost": 0,
    "steel": 2,
    "fire": 2,
    "water": -2,
    "grass": 2,
    "electric": 0,
    "psychic": 0,
    "ice": 2,
    "dragon": 0,
    "dark": 0,
    "fairy": 2
  },
  "water": {
    "normal": 0,
    "fighting": 0,
    "flying": 0,
    "poison": 0,
    "ground": 0,
    "rock": 0,
    "bug": 0,
    "ghost": 0,
    "steel": 2,
    "fire": 2,
    "water": 2,
    "grass": -2,
    "electric": -2,
    "psychic": 0,
    "ice": 2,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "grass": {
    "normal": 0,
    "fighting": 0,
    "flying": -2,
    "poison": -2,
    "ground": 2,
    "rock": 0,
    "bug": -2,
    "ghost": 0,
    "steel": 0,
    "fire": -2,
    "water": 2,
    "grass": 2,
    "electric": 2,
    "psychic": 0,
    "ice": -2,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "electric": {
    "normal": 0,
    "fighting": 0,
    "flying": 2,
    "poison": 0,
    "ground": -2,
    "rock": 0,
    "bug": 0,
    "ghost": 0,
    "steel": 2,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 2,
    "psychic": 0,
    "ice": 0,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "psychic": {
    "normal": 0,
    "fighting": 2,
    "flying": 0,
    "poison": 0,
    "ground": 0,
    "rock": 0,
    "bug": -2,
    "ghost": -2,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": 2,
    "ice": 0,
    "dragon": 0,
    "dark": -2,
    "fairy": 0
  },
  "ice": {
    "normal": 0,
    "fighting": -2,
    "flying": 0,
    "poison": 0,
    "ground": 0,
    "rock": -2,
    "bug": 0,
    "ghost": 0,
    "steel": -2,
    "fire": -2,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": 0,
    "ice": 2,
    "dragon": 0,
    "dark": 0,
    "fairy": 0
  },
  "dragon": {
    "normal": 0,
    "fighting": 0,
    "flying": 0,
    "poison": 0,
    "ground": 0,
    "rock": 0,
    "bug": 0,
    "ghost": 0,
    "steel": 0,
    "fire": 2,
    "water": 2,
    "grass": 2,
    "electric": 2,
    "psychic": 0,
    "ice": -2,
    "dragon": -2,
    "dark": 0,
    "fairy": -2
  },
  "dark": {
    "normal": 0,
    "fighting": -2,
    "flying": 0,
    "poison": 0,
    "ground": 0,
    "rock": 0,
    "bug": -2,
    "ghost": 2,
    "steel": 0,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": 99,
    "ice": 0,
    "dragon": 0,
    "dark": 2,
    "fairy": -2
  },
  "fairy": {
    "normal": 0,
    "fighting": 2,
    "flying": 0,
    "poison": -2,
    "ground": 0,
    "rock": 0,
    "bug": 2,
    "ghost": 0,
    "steel": -2,
    "fire": 0,
    "water": 0,
    "grass": 0,
    "electric": 0,
    "psychic": 0,
    "ice": 0,
    "dragon": 99,
    "dark": 2,
    "fairy": 0
  }
}

function App() {

  const [typeOne, setTypeOne] = useState("normal");
  const [typeTwo, setTypeTwo] = useState("");
  const [regular, setRegular] = useState([]);
  const [resist, setResist] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [doubleResist, setDoubleResist] = useState([]);
  const [doubleWeakness, setDoubleWeakness] = useState([]);
  const [immune, setImmune] = useState([]);

  useEffect(() => {
    if (validTypes.has(typeOne) && validTypes.has(typeTwo)) {
      returnWeakness(mergeTypes(typeOne, typeTwo));
    }
    else if (validTypes.has(typeOne) && typeTwo == "") {
      returnWeakness(types[typeOne]);
    }
    else {
      resetState();
    }
  }, [typeOne, typeTwo]);

  function resetState() {
    setRegular([]);
    setResist([]);
    setWeakness([]);
    setDoubleResist([]);
    setDoubleWeakness([]);
    setImmune([]);
  }

  function mergeTypes(typeOne, typeTwo) {
    const mergedTypes = {
      "normal": types[typeOne].normal + types[typeTwo].normal,
      "fighting": types[typeOne].fighting + types[typeTwo].fighting,
      "flying": types[typeOne].flying + types[typeTwo].flying,
      "poison": types[typeOne].poison + types[typeTwo].poison,
      "ground": types[typeOne].ground + types[typeTwo].ground,
      "rock": types[typeOne].rock + types[typeTwo].rock,
      "bug": types[typeOne].bug + types[typeTwo].bug,
      "ghost": types[typeOne].ghost + types[typeTwo].ghost,
      "steel": types[typeOne].steel + types[typeTwo].steel,
      "fire": types[typeOne].fire + types[typeTwo].fire,
      "water": types[typeOne].water + types[typeTwo].water,
      "grass": types[typeOne].grass + types[typeTwo].grass,
      "electric": types[typeOne].electric + types[typeTwo].electric,
      "psychic": types[typeOne].psychic + types[typeTwo].psychic,
      "ice": types[typeOne].ice + types[typeTwo].ice,
      "dragon": types[typeOne].dragon + types[typeTwo].dragon,
      "dark": types[typeOne].dark + types[typeTwo].dark,
      "fairy": types[typeOne].fairy + types[typeTwo].fairy
    };
    return mergedTypes;
  }

  function returnWeakness(inputType) {
    resetState();
    for (const type in inputType) {
      if (inputType[type] === -4) {
        setDoubleWeakness(doubleWeakness => [doubleWeakness, <span className={`button ${type}`}>{type}</span>]);
      }
      else if (inputType[type] === -2) {
        setWeakness(weakness => [weakness, <span className={`button ${type}`}>{type}</span>]);
      }
      else if (inputType[type] === 4) {
        setDoubleResist(doubleResist => [doubleResist, <span className={`button ${type}`}>{type}</span>]);
      }
      else if (inputType[type] === 2) {
        setResist(resist => [resist, <span className={`button ${type}`}>{type}</span>]);
      }
      else if ((inputType[type] === 0) || (inputType[type] === 1)) {
        setRegular(regular => [regular, <span className={`button ${type}`}>{type}</span>]);
      }
      else {
        setImmune(immune => [immune, <span className={`button ${type}`}>{type}</span>]);
      }
    }
  }

  function handleChangeOne(e) {
    setTypeOne(e.target.value);
  }

  function handleChangeTwo(e) {
    setTypeTwo(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <select
          value={typeOne}
          onChange={handleChangeOne}
        >
          {validTypesArray.flatMap(
            (type) => {
              if ( type != typeTwo ) {
                return <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              } else {
                return <option
                disabled
                key={type}
                value={type}
              >
                {type}
              </option>
              }
            }
          )}
        </select>
        <select
          value={typeTwo}
          onChange={handleChangeTwo}
        >
          <option
            key="none"
            value=""
          >none</option>
          {validTypesArray.flatMap(
            (type) => {
              if ( type != typeOne ) {
                return <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              } else {
                return <option
                disabled
                key={type}
                value={type}
              >
                {type}
              </option>
              }
            }
          )}
        </select>
        <p>Regular: <br/> {regular}</p>
        <p>Resists: <br/> {resist}</p>
        <p>Double Resists: <br/> {doubleResist}</p>
        <p>Weak to: <br/> {weakness}</p>
        <p>Double Weak to: <br/> {doubleWeakness}</p>
        <p>Immune: <br/> {immune}</p>
      </header>
    </div>
  );
}

export default App;
