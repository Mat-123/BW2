const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");
const titleArtistName = document.getElementById("artist-name-title");
const numFans = document.getElementById("fans");
const divBgImg = document.getElementById("bg-img");
const artistNameLast = document.getElementById("artist-name-last");
const divContainer = document.getElementById("div-container");

const footerImg = document.getElementById("footer-img");
const footerTitle = document.getElementById("footer-title");
const footerArtistName = document.getElementById("footer-artist-name");
const footerPlayer = document.getElementById("footer-player");
const footerPlayBtn = document.getElementById("footer-play");
footerPlayBtn.style = "cursor: pointer;";
const playBtn = document.getElementById("play-btn-green");
playBtn.style = "cursor: pointer;";
const footerPauseBtn = document.getElementById("footer-pause");

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
    numFans.classList.add("mb-3");
    divBgImg.style = `background-image: url(${artist.picture_big}); background-repeat: no-repeat; background-size: cover; `;
    artistNameLast.innerText = "Di " + artist.name;
  })
  .catch(err => console.log(err));

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=5`)
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
  .then(tracks => {
    const tracksArray = tracks.data;
    console.log(tracksArray);

    const audio = new Audio();

    for (let i = 0; i < tracksArray.length; i++) {
      // SEZIONE DIV GLOBALE
      const card = document.createElement("div");
      card.className = "row justify-content-between mb-2 ms-2 align-items-center";
      card.style = "cursor: pointer;";

      //SEZIONE RANK, IMG E TITOLO

      const divRank = document.createElement("div");
      divRank.className = "col-1 text-end";

      const divImg8 = document.createElement("div");
      divImg8.className = "col-8";

      // ELEMENTI SEZIONE RANK, IMG E TITOLO
      const numSpan = document.createElement("span");
      numSpan.className = "text-secondary text-end fs-7";
      numSpan.innerText = i + 1;

      const img = document.createElement("img");
      img.className = "w-10 me-3";
      img.src = tracksArray[i].album.cover_small;

      const title = document.createElement("span");
      title.className = "text-white fs-7 display-2 ";
      title.innerText = tracksArray[i].title;

      //SEZIONE FOLLOWER E DURATA

      const divImg4 = document.createElement("div");
      divImg4.className = "col-3";

      //ELEMENTI FOLLOWER E DURATA

      const rowFollower = document.createElement("div");
      rowFollower.className = "row";

      const colFollower = document.createElement("div");
      colFollower.className = "col-6";

      const rank = document.createElement("span");
      rank.className = "text-secondary mb-1 me-3 fs-7";
      rank.innerText = tracksArray[i].rank;

      const colDurata = document.createElement("div");
      colDurata.className = "col-6";

      const duration = document.createElement("span");
      duration.className = "text-secondary mb-1 fs-7";
      duration.innerText = tracksArray[i].duration + " s";

      //DOM MANIPULATION per la parte titolo

      divRank.appendChild(numSpan);
      divImg8.appendChild(img);
      divImg8.appendChild(title);

      //DOM MANIPULATION per la parte follower/durata
      colFollower.appendChild(rank);
      colDurata.appendChild(duration);

      rowFollower.appendChild(colFollower);

      rowFollower.appendChild(colDurata);

      divImg4.appendChild(rowFollower);

      card.appendChild(divRank);
      card.appendChild(divImg8);
      card.appendChild(divImg4);

      divContainer.appendChild(card);

      let isPlaying = false;
      let currentTrack = null;

      card.addEventListener("click", e => {
        footerPlayer.classList.remove("d-none");

        if (!isPlaying || currentTrack !== tracksArray[i]) {
          audio.src = tracksArray[i].preview;
          audio.play();
          isPlaying = true;
          currentTrack = tracksArray[i];
          footerPlayBtn.classList.add("d-none");
          footerPauseBtn.classList.remove("d-none");
        } else {
          audio.pause();
          isPlaying = false;
          footerPlayBtn.classList.remove("d-none");
          footerPauseBtn.classList.add("d-none");
        }

        footerImg.src = tracksArray[i].album.cover;
        footerTitle.innerText = tracksArray[i].title;
        footerArtistName.innerText = tracksArray[i].artist.name;
      });

      playBtn.addEventListener("click", e => {
        footerPlayer.classList.remove("d-none");
        if (audio.paused) {
          audio.src = tracksArray[0].preview;
          audio.play();
          footerPlayBtn.classList.add("d-none");
          footerPauseBtn.classList.remove("d-none");
        } else {
          audio.pause();
          footerPlayBtn.classList.remove("d-none");
          footerPauseBtn.classList.add("d-none");
        }
        footerImg.src = tracksArray[0].album.cover;
        footerTitle.innerText = tracksArray[0].title;
        footerArtistName.innerText = tracksArray[0].artist.name;
      });

      footerPlayBtn.addEventListener("click", e => {
        footerPlayer.classList.remove("d-none");
        if (audio.paused) {
          audio.play();
          footerPlayBtn.classList.add("d-none");
          footerPauseBtn.classList.remove("d-none");
        } else {
          audio.pause();
          footerPlayBtn.classList.remove("d-none");
          footerPauseBtn.classList.add("d-none");
        }
        footerImg.src = albumsArray[randomAlbumsIndex].album.cover;
        footerTitle.innerText = albumsArray[randomAlbumsIndex].title;
        footerArtistName.innerText = albumsArray[randomAlbumsIndex].artist.name;
      });

      footerPauseBtn.addEventListener("click", e => {
        footerPlayBtn.classList.remove("d-none");
        footerPauseBtn.classList.add("d-none");
        if (audio.played) {
          audio.pause();
          footerPlayBtn.classList.remove("d-none");
          footerPauseBtn.classList.add("d-none");
        } else {
          audio.play();
        }
      });
    }
  })
  .catch(err => console.log(err));
