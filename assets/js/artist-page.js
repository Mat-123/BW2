const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");
const titleArtistName = document.getElementById("artist-name-title");
const numFans = document.getElementById("fans");
const divBgImg = document.getElementById("bg-img");
const artistNameLast = document.getElementById("artist-name-last");
const divContainer = document.getElementById("div-container");

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

    for (let i = 0; i < tracksArray.length; i++) {
      const card = document.createElement("div");
      card.className = "d-flex align-items-center justify-content-between ms-2 mb-2";

      const divImg = document.createElement("div");
      divImg.className = "d-flex align-items-center";

      const numSpan = document.createElement("span");
      numSpan.className = "text-secondary me-2 fs-7";
      numSpan.innerText = i + 1;

      const img = document.createElement("img");
      img.className = "w-10 me-2";
      img.src = tracksArray[i].album.cover_small;

      const title = document.createElement("h4");
      title.className = "text-white fs-6 me-3";
      title.innerText = tracksArray[i].title;

      const rank = document.createElement("p");
      rank.className = "text-secondary mb-1 me-3 fs-7";
      rank.innerText = tracksArray[i].rank;

      const duration = document.createElement("p");
      duration.className = "text-secondary mb-1 fs-7";
      duration.innerText = tracksArray[i].duration + " s";

      divImg.appendChild(numSpan);
      divImg.appendChild(img);
      divImg.appendChild(title);
      card.appendChild(divImg);
      card.appendChild(rank);
      card.appendChild(duration);
      divContainer.appendChild(card);
    }

    // tracksArray.sort(function (a, b) {
    //   return a - b;
    // });

    // let newArray = [];
    // let contatore = tracksArray[0];
    // for (let i = 0; i < tracksArray.length; i++) {
    //   if (contatore.rank < tracksArray[i].rank) {
    //     contatore = tracksArray[i];
    //   }
    //   newArray.push(contatore);
    //   tracksArray.splice(i, 1);
    // }
    // console.log(newArray);
    // console.log(tracksArray);
  })
  .catch(err => console.log(err));
