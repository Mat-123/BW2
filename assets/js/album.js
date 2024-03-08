const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId");
const imgAlbum = document.getElementById("img-album");
const title = document.getElementById("title-album");
const imgArtist = document.getElementById("img-artist");
const artistName = document.getElementById("artist-name");
const duration = document.getElementById("duration");
const containerFluidSong = document.getElementById("container-fluid-song");
containerFluidSong.className = "text-decoration-none text-white";
const footerImg = document.getElementById("footer-img");
const footerTitle = document.getElementById("footer-title");
const footerArtistName = document.getElementById("footer-artist-name");
const footerPlayBtn = document.getElementById("footer-play");
const footerPlayer = document.getElementById("footer-player");

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
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
  .then((album) => {
    console.log(album);

    imgAlbum.src = album.cover_medium;
    title.innerText = album.title;
    imgArtist.src = album.artist.picture_small;
    artistName.innerText = album.artist.name;
    duration.innerText = album.duration + " s";

    artistName.addEventListener("click", (e) => {
      window.location.assign(`/artist-page.html?artistId=${album.artist.id}`);
    });

    //generazione Tracks
    const tracksArray = album.tracks.data;
    for (let i = 0; i < tracksArray.length; i++) {
      const divContainer = document.createElement("div");
      divContainer.className = "container mt-4";
      divContainer.style = "cursor:pointer;";

      const rowFirst = document.createElement("div");
      rowFirst.className = "row";

      const col7 = document.createElement("div");
      col7.className = "col-7";

      const rowSecond = document.createElement("div");
      rowSecond.className = "row";

      const col1 = document.createElement("div");
      col1.className = "col-1 align-self-center";

      const number = document.createElement("div");
      number.className = "opacity-50 text-end";
      number.innerText = i + 1;

      const col11 = document.createElement("div");
      col11.className = "col-11";

      const title = document.createElement("p");
      title.innerText = tracksArray[i].title;

      const artistName = document.createElement("p");
      artistName.className = "opacity-50";
      artistName.innerText = tracksArray[i].artist.name;

      const col3 = document.createElement("div");
      col3.className = "col-3 align-self-center opacity-50";
      col3.innerText = tracksArray[i].rank;

      const col2 = document.createElement("div");
      col2.className = "col-2 align-self-center opacity-50";
      col2.innerText = tracksArray[i].duration + " s";

      col1.appendChild(number);
      col11.appendChild(title);
      col11.appendChild(artistName);
      rowSecond.appendChild(col1);
      rowSecond.appendChild(col11);
      col7.appendChild(rowSecond);
      rowFirst.appendChild(col7);
      rowFirst.appendChild(col3);
      rowFirst.appendChild(col2);
      divContainer.appendChild(rowFirst);
      containerFluidSong.appendChild(divContainer);

      const audio = new Audio(tracksArray[i].preview);
      audio.id = i + 1;

      divContainer.addEventListener("click", (e) => {
        footerPlayer.classList.remove("d-none");
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
        footerImg.src = tracksArray[i].album.cover;
        footerTitle.innerText = tracksArray[i].title;
        footerArtistName.innerText = tracksArray[i].artist.name;
      });
      // footerPlayBtn.addEventListener("click", e => {
      //   if (audio.paused) {
      //     audio.play();
      //   } else {
      //     audio.pause();
      //   }
      // });
    }
  })
  .catch((err) => console.log(err));
