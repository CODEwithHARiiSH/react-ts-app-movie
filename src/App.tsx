import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface Movie {
  title: string;
  directorId: number;
  Id: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({ title: '', directorId: 1 });


  useEffect(() => {
    axios.get('http://localhost:3000/movieslist')
      .then(response => {
        setMovies(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()
    axios.post('http://localhost:3000/movieslist/add', newMovie)
    .then(response => {
      if (response && response.data) {
        console.log('Movie added:', response.data);
        alert(response.data.message);
        window.location.reload()
      setNewMovie({ title: '', directorId: 0 });
    }
  })
    .catch(error => {
      console.error('Error adding movie:', error);
    });
  }

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.Id}>{movie.title}</li>
        ))}
      </ul>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          />
        </label>
        <br />
        <label>
          Director ID:
          <input
            type="number"
            name="directorId"
            value={newMovie.directorId}
            onChange={(e) => setNewMovie({ ...newMovie, directorId: parseInt(e.target.value) })}
          />
        </label>
        <br />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default App;

