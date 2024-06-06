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
