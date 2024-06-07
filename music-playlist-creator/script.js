

let eachPlaylistData = data
let playlists = document.getElementById("playlist-cards")
let searching = document.querySelector(".searchbox")

function renderPlaylists(filterText = ""){
        playlists.innerHTML = "";
        eachPlaylistData["playlists"]
        .filter(item => item['playlist_name'].toLowerCase().includes(filterText.toLowerCase()) || item['playlist_creator'].toLowerCase().includes(filterText.toLowerCase()))
        .forEach((item) => {
        let playlistElement = document.createElement("li")

        playlistElement.innerHTML =  `
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
        `
        playlistElement.classList.add("single-playlist");
        playlists.appendChild(playlistElement);
        playlistElement.addEventListener('click', () => {
            renderModal(item);
                modal.style.display = 'block';
        })


    })

}
// playlists.innerHTML = "";
// eachPlaylistData["playlists"]
// .filter(item => item['playlist_name'].toLowerCase().includes(filterText.toLowerCase()) || item['playlist_creator'].toLowerCase().includes(filterText.toLowerCase()))
// .forEach((item) => {
//     let playlistElement = document.createElement("li")

//     playlistElement.innerHTML =  `
//                 <div>
//                     <img src="${item['playlist_art']}" class="playlist_img" >
//                 </div>
//                 <div>
//                     <h3>${item['playlist_name']}</h3>
//                     <p>${item['playlist_creator']}</p>
//                     <div class="like-section">
//                         <i id="likeButton" class="fas fa-heart"></i>
//                         <span id="likeButton">${item['likeCount']}</span>
//                     </div>
//                 </div>
//     `
//     playlistElement.classList.add("single-playlist");
//     playlists.appendChild(playlistElement);
//     playlistElement.addEventListener('click', () => {
//         renderModal(item);
//             modal.style.display = 'block';
//     })


// })

searching.addEventListener('input', (event) => {
    renderPlaylists(event.target.value);
})

renderPlaylists();

//for the modal

const modal = document.getElementById('modal-overlay');
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function renderModal(item) {

    const modalPlaylistInfo = document.querySelector(".modal-playlist-info");
    modalPlaylistInfo.querySelector('img').src = item.playlist_art;
    modalPlaylistInfo.querySelector('h1').textContent = item.playlist_name;
    modalPlaylistInfo.querySelector('h2').textContent = item.playlist_creator;

    const modalEachSongContainer = document.querySelector('.modal-content');

    const existingSongElements = modalEachSongContainer.querySelectorAll('.modal-each-song');
    existingSongElements.forEach(el => el.remove());

    item.songs.forEach(song => {
        let songElement = document.createElement('div');
        songElement.classList.add('modal-each-song');
        songElement.innerHTML = `
            <img src="${song.cover_art}" alt="Each Song" class="modal-each-song-img">
            <div id="inside-life">
                    <div class="modal-each-song-desc">
                        <h3>${song.title}</h3>
                        <p><strong><em>${song.artist}</em></strong></p>
                        <p>${song.album}</p>
                    </div>
                    <div class="modal-song-time"><h3>${song.duration}</h3></div>

            </div>
        `;
        modalEachSongContainer.appendChild(songElement);
    });
}
