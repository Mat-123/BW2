const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");
const titleArtistName = document.getElementById("artist-name-title");
const numFans = document.getElementById("fans");
const divBgImg = document.getElementById("bg-img");
const artistNameLast = document.getElementById("artist-name-last");

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
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
  .then(artist => {
    console.log(artist);

    titleArtistName.innerText = artist.name;
    numFans.innerText = artist.nb_fan + " followers";
    divBgImg.style = `background-image: url(${artist.picture_big}); background-repeat: no-repeat; background-size: cover;`;
    artistNameLast.innerText = "Di " + artist.name;
  })
  .catch(err => console.log(err));
