

let eachPlaylistData = data;
let playlists = document.getElementById("playlist-cards");
let searching = document.querySelector(".searchbox");

function renderPlaylists(filterText = "") {
    playlists.innerHTML = "";
    eachPlaylistData["playlists"]
        .filter(item => item['playlist_name'].toLowerCase().includes(filterText.toLowerCase()) || item['playlist_creator'].toLowerCase().includes(filterText.toLowerCase()))
        .forEach((item) => {
            let playlistElement = document.createElement("li");

            playlistElement.innerHTML = `
                <div>
                    <img src="${item['playlist_art']}" class="playlist_img">
                </div>
                <div>
                    <h3>${item['playlist_name']}</h3>
                    <p>${item['playlist_creator']}</p>
                    <div class="like-section">
                        <i class="likeButton fas fa-heart"></i>
                        <span class="likeCount">${item['likeCount']}</span>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            `;
            playlistElement.classList.add("single-playlist");
            playlists.appendChild(playlistElement);

            playlistElement.addEventListener('click', () => {
                renderModal(item);
                modal.style.display = 'block';
            });

            const likeButton = playlistElement.querySelector(".likeButton");
            const likeCountSpan = playlistElement.querySelector(".likeCount");
            likeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                item.likeCount += likeButton.classList.toggle('liked') ? 1 : -1;
                likeCountSpan.textContent = item.likeCount;
            });

            const trashButton = playlistElement.querySelector(".fa-trash");
            trashButton.addEventListener('click', (event) => {
                event.stopPropagation();
                playlistElement.remove();
            })
        });
}

if (searching) {
    searching.addEventListener('input', (event) => {
        renderPlaylists(event.target.value);
    });

    renderPlaylists();
}

// Modal functionality
const modal = document.getElementById('modal-overlay');
const closeButton = document.querySelector('.close');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
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

    const shuffle = document.getElementById('shuffle-button');
    if (shuffle) {
        shuffle.addEventListener('click', () => {
            shuffleSongs(item.songs);
            renderModal(item);
        });
    }
}

function shuffleSongs(songs) {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
}

// Function for the featured page

function getRandomPlaylist() {
    const randomIndex = Math.floor(Math.random() * eachPlaylistData.playlists.length);
    return eachPlaylistData.playlists[randomIndex];
}

function renderRandomPlaylist() {
    const playlist = getRandomPlaylist();

    const mainPartImg = document.querySelector('.mainpartimg');
    const playlistName = document.querySelector('.mainpart h2');
    const songsContainer = document.querySelector('.songspart');

    if (!mainPartImg || !playlistName || !songsContainer) {
        console.error('Error: One or more elements not found.');
        return;
    }

    mainPartImg.src = playlist.playlist_art;
    playlistName.textContent = playlist.playlist_name;
    songsContainer.innerHTML = '';

    playlist.songs.forEach(song => {
        let songElement = document.createElement('div');
        songElement.classList.add('eachsong');
        songElement.innerHTML = `
            <h3 id="songname">${song.title}</h3>`;
        songsContainer.appendChild(songElement);
    });
    console.log('Random playlist rendered:', playlist);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('featured-body')) {
        if (eachPlaylistData && eachPlaylistData.playlists) {
            renderRandomPlaylist();
        } else {
            console.error('Error: Playlist data not loaded.');
        }
    }
});
