import React, { useState, useEffect } from 'react';
import { CardList } from './components/card-list/card-list.component';
import  { SearchBox } from './components/search-box/search-box.component';
import './App.css';

function App() {
  const [state, setState] = useState( 
    { 
      monsters: [],
      filteredMonsters: [],
      searchField: '',
    } 
  );

  const fetchMonsters = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  };

  const filterMonsters = () => {
    const {monsters, searchField} = state;
    let filtered = (searchField) 
      ? monsters.filter( monster => monster.name.toLowerCase().includes(searchField.toLowerCase()) )
      : monsters;
    setState(prev => {
      prev.filteredMonsters = filtered;
      return { ...prev };
    });
  };

  const updateSearchField = (e) => {
    const val = e.target.value;
    setState(prev => {
      prev.searchField = val;
      return { ...prev };
    });
  }

  useEffect(() => {
    (state.monsters.length > 0) || fetchMonsters().then( users => setState({ monsters: users, filteredMonsters: users }) );
    filterMonsters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.monsters.length, state.searchField]);

  return (
  <div className="App">
    <h1>Monsters Rolodex</h1>
    <SearchBox
      placeholder='search monsters'
      handleChange={updateSearchField}
    />
    <CardList monsters={ state.filteredMonsters } />
  </div>
  );
}

export default App;
