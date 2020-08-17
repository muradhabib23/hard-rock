const searchButton = document.getElementById('searchBtn');

searchButton.addEventListener('click',function(){
    const inputSong = document.getElementById('inputSong').value;

    fetch(`https://api.lyrics.ovh/suggest/${inputSong}/`)
    .then(response => response.json())
    .then(data => getSongsList(data))
})

function getSongsList(data){
    let songResults = document.getElementById('songResults');
    for(let i = 0; i<10 ;i++){
        let title = data.data[i].title;
        let albumTitle = data.data[i].album.title;
        let artist = data.data[i].artist.name;
        let image = data.data[i].artist.picture_small;
        
        let result = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-7">
                <h3 class="lyrics-name" id="title">${title}</h3>
                <p class="author lead">Album by <span id="artistName">${artist}</span></p>
                <p class="author lead">Album Title :  <span id="artistName">${albumTitle}</span></p>
                </div>
            <div class="col-md-2">
                <img src="${image}" alt="">
            </div>
            <div class="col-md-3 text-md-right text-center">
            <a href="#lyrics" onclick="getArtistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</a>
            </div>
        </div>`;
        songResults.innerHTML += result;
        
    }
}

function getArtistTitle(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(song => showLyrics(song,title));
}

function showLyrics(song,title){
    if(song.lyrics == undefined){
        document.getElementById('songLyrics').innerText = "No lyrics found";
    }else{
        document.getElementById('songLyrics').innerText = song.lyrics;
    }
    document.getElementById('songTitles').innerText = title;
}