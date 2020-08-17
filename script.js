const searchButton = document.getElementById('searchBtn');

searchButton.addEventListener('click',function(){
    const inputSong = document.getElementById('inputSong').value;

    fetch(`https://api.lyrics.ovh/suggest/${inputSong}/`)
    .then(response => response.json())
    .then(data => getSerchResult(data));
})

function getSerchResult(search){
    let songResults = document.getElementById('songResults');
    for(let i = 0; i<10 ;i++){
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;
        let image = search.data[i].artist.picture_small;
        
        let result = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-8">
                <h3 class="lyrics-name" id="title">${title}</h3>
                <p class="author lead">Album by <span id="artistName">${artist}</span></p>
            </div>
            <div class="col-md-1">
                <img src="${image}" alt="">
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button  onclick="getArtistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
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
        document.getElementById('songLyrics').innerText = "there have no lyrics";
    }else{
        document.getElementById('songLyrics').innerText = song.lyrics;
    }
    document.getElementById('songTitles').innerText = title;
}