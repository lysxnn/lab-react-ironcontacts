import React from "react";
import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const fiveCelebs = contacts.slice(0, 5);
  const [celebs, setCelebs] = useState(fiveCelebs);

  function addRandomContact() {
    const allContacts = contacts;
    const randomIndex = Math.floor(Math.random() * allContacts.length - 1);
    if (!celebs.some((celeb) => celeb.id === allContacts[randomIndex].id)) {
      setCelebs([allContacts[randomIndex], ...celebs]);
    } else {
      addRandomContact();
    }
  }

function sortCelebrities(sortBy) {
   const tableCelebs = JSON.parse(JSON.stringify(celebs));
   tableCelebs.sort(function(celebA, celebB) {
     if (celebA[sortBy] > celebB[sortBy]) {
       return sortBy === "name" ? 1 : -1
     }
     if (celebA[sortBy] < celebB[sortBy]) {
       return sortBy === "name" ? -1 : 1;
     }
     return 0;
   });
   setCelebs(tableCelebs);
}

  function deleteCeleb(celebId) {
    setCelebs((tableCelebs) => {
      return tableCelebs.filter((tableCeleb) => tableCeleb.id !== celebId);
    });
  }

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={() => sortCelebrities("name")}>Sort By Name</button>
      <button onClick={() => sortCelebrities("popularity")}>Sort By Popularity</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
        {celebs.map((celeb) => {
          return (
            <tr key={celeb.id}>
              <td>
                <img src={celeb.pictureUrl} alt="Celebrity" height={100}></img>
              </td>
              <td>{celeb.name}</td>
              <td>{Math.round(celeb.popularity * 100) / 100}</td>
              <td>{celeb.wonOscar ? "🏆" : ""}</td>
              <td>{celeb.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => deleteCeleb(celeb.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
