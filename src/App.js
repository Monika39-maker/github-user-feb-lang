import "./App.css";
import { React, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [userRepos, setUserRepos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setUser(e.target.value);
    fetch(`https://api.github.com/users/${user}/repos`)
      .then((resp) => resp.json())
      .then((data) => {
        setUserRepos(data);
      });
  }

  let repoLanguagesArr = [];

  userRepos.map((repo) => {
    return repoLanguagesArr.push(repo.language);
  });

  let languagesUsedCounts = {};
  repoLanguagesArr.forEach((lang) => {
    languagesUsedCounts[lang] = (languagesUsedCounts[lang] || 0) + 1;
  });

  let noOfTimesEachLanguageUsedArr = Object.values(languagesUsedCounts);

  //get the highest value from languagesUsedCounts
  let max = Math.max(...noOfTimesEachLanguageUsedArr);

  //following code is to create collection of languages
  // if more than one language has highest count.
  let favouriteLanguagesArr = [];
  for (let lang in languagesUsedCounts) {
    if (languagesUsedCounts[lang] === max) {
      favouriteLanguagesArr.push(lang);
    }
  }

  return (
    <div className="App">
      <h1>Find Their Favourite Programming Language</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Github Username "
          onChange={(e) => setUser(e.target.value)}
        />
      </form>
      <div className="result-box">
        <h3>Favourite language/s:</h3>
        {favouriteLanguagesArr.map((favLang) => {
          return (
            <p key={favLang.id}>
              {favouriteLanguagesArr.length < 2
                ? favLang
                : favouriteLanguagesArr.join(", ")}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
