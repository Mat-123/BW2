const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId");
const imgAlbum = document.getElementById("img-album");
const title = document.getElementById("title-album");
const imgArtist = document.getElementById("img-artist");
const artistName = document.getElementById("artist-name");
const duration = document.getElementById("duration");

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
  .then(response => {
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("400 - Errore lato client");
      }

      if (response.status === 404) {
        throw new Error("404 - Dato non trovato");
      }

      if (response.status === 500) {
        throw new Error("500 - Errore lato server");
      }

      throw new Error("Errore nel reperimento dati");
    }
  })
  .then(album => {
    console.log(album);

    imgAlbum.src = album.cover_medium;
    title.innerText = album.title.substring(0, 20);
    imgArtist.src = album.artist.picture_small;
    artistName.innerText = album.artist.name;
    duration.innerText = album.duration + " s";
  });
