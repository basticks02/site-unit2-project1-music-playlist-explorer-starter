// const realplaylist = document.getElementById("single-playlist")
// import data from "./data.json"

// const playlist = data.playlists[0]

// const playlist_title = document.getElementById("playlist-name")
// playlist_title.innerText = playlist["name"]

// const playlist_description = document.getElementById("playlist-desc")

let eachPlaylistData = data
let playlists = document.getElementById("playlist-cards")
const eachPlaylistCard = eachPlaylistData["playlists"].map((item) => {

    return(
    `
            <div class = "single-playlist">
                <div>
                    <img src="${item['playlist_art']}" class="playlist_img" >
                </div>
                <div>
                    <h3>${item['playlist_name']}</h3>
                    <p>${item['playlist_creator']}</p>
                    <div class="like-section">
                        <i id="likeButton" class="fas fa-heart"></i>
                        <span id="likeButton">${item['likeCount']}</span>
                    </div>
                </div>
            </div>

    `
    )
}).join("")

playlists.innerHTML = eachPlaylistCard


//for the modal

const playlistDiv = document.querySelector('.single-playlist');
const modal = document.getElementById('modal-overlay');
const closeButton = document.querySelector('.close');
playlistDiv.addEventListener('click', () => {
  modal.style.display = 'block';
});
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// const playlists = document.querySelectorAll('.single-playlist');
// const modal = document.getElementById('modal-overlay');
// const closeButton = document.querySelector('.close');
// playlists.forEach((playlist) => {
//   playlist.addEventListener('click', () => {
//     const playlistData = data.find((item) => item.id === playlist.dataset.id);
//     modal.querySelector('h1').textContent = playlistData.name;
//     modal.querySelector('h2').textContent = playlistData.creator;
//     modal.querySelector('img').src = playlistData.imageUrl;
//     const songList = modal.querySelector('ul');
//     songList.innerHTML = '';
//     playlistData.songs.forEach((song) => {
//       const li = document.createElement('li');
//       li.textContent = `${song.title} - ${song.artist}`;
//       songList.appendChild(li);
//     });
//     modal.classList.add('show');
//   });
// });
// closeButton.addEventListener('click', () => {
//   modal.classList.remove('show');
// });
// window.addEventListener('click', (event) => {
//   if (event.target === modal) {
//     modal.classList.remove('show');
//   }
// });
