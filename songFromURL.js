const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

// const url = "https://www.azlyrics.com/lyrics/noahkahan/hurtsomebody601610.html";

const getSongFromURL = async url => {
  const fetchres = await fetch(url);
  const html = await fetchres.text();
  const dom = new JSDOM(html)

  const songTitle = dom.window.document.querySelector('.container .col-lg-8 > b').textContent || "";
  const songLyrics = dom.window.document
    .querySelector('.container .col-lg-8 > div:nth-of-type(5)')
    .outerHTML
    .replace(/<!--(.*?)-->/,"");

  const songObj = await {
    "title": songTitle,
    "lyrics": songLyrics
  };

  return songObj;
}

module.exports = {
  getSongFromURL
};