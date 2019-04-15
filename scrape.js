const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const domain = "https://www.azlyrics.com/";
const path = "r/rageagainst.html";
const url = domain + path;

const albumNameFromString = (str="") => str.match(/"(.*?)"/)?str.match(/"(.*?)"/)[1] : "other songs";

const albumYearFromString = (str="") => str.match(/\((.*?)\)/)?str.match(/\((.*?)\)/)[1]: "";

const chunkAlbumsFromList = albumList => {
  let albumIndexHolder = -1;
  const chunkedAlbums = albumList.reduce((acc, curr) => {
    if(!/\.\./.test(curr)) {
      albumIndexHolder += 1;
      acc[albumIndexHolder] = {
        "album": albumNameFromString(curr),
        "year": albumYearFromString(curr),
        "songs": []
      }
    } else {
      acc[albumIndexHolder]["songs"].push(curr);
    }
    return acc;
  }, [])
  return chunkedAlbums;
}

const nodes2AlbumList = albumsDOM => {
  const albumsArray = Array.from(albumsDOM);

  const albumList = albumsArray.map(
    e => 
      e.getAttribute("href") ?
        e.getAttribute("href")
        : (e.querySelector('b')?e.textContent.replace("album: ",""):e.textContent)
  );

  return albumList;
}

const dom2ChunkedAlbums = albumsDOM => chunkAlbumsFromList(nodes2AlbumList(albumsDOM));

const getBandSongs = async url => {
  const fetchres = await fetch(url);
  const html = await fetchres.text();

  const dom = new JSDOM(html);

  const bandName = dom.window.document.getElementsByTagName('h1')[0].textContent.replace(" Lyrics","") || "";

  const albumsDOM = dom.window.document.querySelectorAll("#listAlbum > a:not([id]), #listAlbum > div");

  const albums = dom2ChunkedAlbums(albumsDOM);

  console.log(albums);
}

getBandSongs(url);