const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");
// encode / decode

// Async function which scrapes the data
async function scrapeData() {
  try {
    //let url = "";
    let url = ""
    //let end = false;
    do {
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);
      const chapTitle = $(".article-title").html();
      const nextPageItems = $(".pagination2 a:nth-last-child(2)");
      //const nextPageItems = $(".next-chapter");
      //$(".article-content div").remove(".pagination2");
      const content = $(".article-content").html();
      // if (nextPageItems.length >= 1) {
      url = nextPageItems.last().attr('href');
      //   url = "https:" + nextPageItems.attr('href');
      // }
      // else {
      //   end = true;
      // }
      const chapter = "<title>" + chapTitle + content;

      fs.appendFile("title.txt", pretty(chapter), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    } while (!url.includes('hq9j.html'))
    // while (!end)
    console.log("Successfully written data to file");
  }
  catch (err) {
    console.error(err);
  }
}
scrapeData();