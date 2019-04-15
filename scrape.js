const readline = require("readline");
const { getBandSongs } = require("./albumsFromURL");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the band link: ", (url) => {
  getBandSongs(url)
    .then(albums => console.log(albums));
  rl.close();
})