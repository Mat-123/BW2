const artistId = Math.ceil(Math.random() * 10);
console.log(artistId);
const title = document.getElementById("title");
const album = document.getElementById("album");
const image = document.getElementById("image");
const artistName1 = document.querySelectorAll(".artist-name")[0];
const artistName2 = document.querySelectorAll(".artist-name")[1];
const playBtn = document.getElementById("btn-play");
const divAudio = document.getElementById("audio");
const p1 = document.getElementById("p-1");
const p2 = document.getElementById("p-2");
const p3 = document.getElementById("p-3");
const p4 = document.getElementById("p-4");
const p5 = document.getElementById("p-5");
const cardsAlbum = document.querySelectorAll(".section2");
const cardsContainer = document.getElementById("card-container");
const footerImg = document.getElementById("footer-img");
const footerTitle = document.getElementById("footer-title");
const footerArtistName = document.getElementById("footer-artist-name");
const footerPlayBtn = document.getElementById("footer-play");
const footerPauseBtn = document.getElementById("footer-pause");
const footerPlayer = document.getElementById("footer-player");
const likeBtn = document.getElementById("like-btn");
const unlikeBtn = document.getElementById("unlike-btn");
const volumeControl = document.getElementById("volumeControl");

console.log(cardsAlbum);

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`)
  .then((response) => {
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
  .then((albums) => {
    //oggetto ritornato dalla response della fetch
    console.log(albums);

    //estrapoliamo array degli albums di un artista e lo salviamo in una const
    const albumsArray = albums.data;
    console.log(albums.data);

    //creiamo numero random per selezionare un album a caso
    const randomAlbumsIndex = Math.floor(Math.random() * albumsArray.length);
    //popoliamo il titolo
    title.innerText = albumsArray[randomAlbumsIndex].title;

    //popoliamo nome album
    album.innerText = albumsArray[randomAlbumsIndex].album.title;

    //popoliamo il nome artista
    artistName1.innerText = albumsArray[randomAlbumsIndex].artist.name;
    artistName2.innerText = albumsArray[randomAlbumsIndex].artist.name;

    //popoliamo l'immagine
    image.src = albumsArray[randomAlbumsIndex].album.cover;

    p1.innerText = albumsArray[0].album.title.substring(0, 25);
    p2.innerText = albumsArray[1].album.title.substring(0, 25);
    p3.innerText = albumsArray[2].album.title.substring(0, 25);
    p4.innerText = albumsArray[3].album.title.substring(0, 25);
    p5.innerText = albumsArray[4].album.title.substring(0, 25);

    for (let i = 0; i < cardsAlbum.length; i++) {
      cardsAlbum[i].addEventListener("click", (e) => {
        window.location.assign(`/album.html?albumId=${albumsArray[i].album.id}`);
      });
    }

    const audio = new Audio(albumsArray[randomAlbumsIndex].preview);
    playBtn.addEventListener("click", (e) => {
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

    footerPlayBtn.addEventListener("click", (e) => {
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

    footerPauseBtn.addEventListener("click", (e) => {
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

    // footerPlayBtn.addEventListener("click", e => {
    //   if (audio.paused) {
    //     audio.play();
    //   } else {
    //     audio.pause();
    //   }
    // });
  })
  .catch((err) => console.log(err));

const randomArtistId = Math.ceil(Math.random() * 95);

const generateCardArtist = (artistIndex) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistIndex}`)
    .then((response) => {
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
    .then((artist) => {
      console.log(artist);

      const card = document.createElement("div");
      card.classList.add("card", "text-white", "cardStile", "bg-dark", "w-19", "me-1");

      const img = document.createElement("img");
      img.classList.add("card-img-top", "rounded", "w-100");
      img.alt = "album-image";
      img.src = artist.picture_medium;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const artistName = document.createElement("h6");
      artistName.classList.add("card-title", "titolo-card");
      artistName.innerText = artist.name;

      const p = document.createElement("p");
      p.classList.add("card-text", "size-piccolo");
      p.innerText = "artist";

      cardBody.appendChild(artistName);
      cardBody.appendChild(p);
      card.appendChild(img);
      card.appendChild(cardBody);
      cardsContainer.appendChild(card);

      card.addEventListener("click", (e) => {
        window.location.assign(`/artist-page.html?artistId=${artist.id}`);
      });
    })
    .catch((err) => console.log(err));
};

likeBtn.addEventListener("click", (e) => {
  if (likeBtn.style.display !== "none") {
    likeBtn.style.display = "none";
    unlikeBtn.style.display = "block";
  }
});

unlikeBtn.addEventListener("click", (e) => {
  if (unlikeBtn.stile !== "none") {
    unlikeBtn.style.display = "none";
    likeBtn.style.display = "block";
  }
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

generateCardArtist(randomArtistId);
generateCardArtist(randomArtistId + 1);
generateCardArtist(randomArtistId + 2);
generateCardArtist(randomArtistId + 3);
generateCardArtist(randomArtistId + 4);
