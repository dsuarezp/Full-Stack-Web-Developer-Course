import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  var currentDate = new Date();
  var dayOfWeek = currentDate.getDay();

  let type = "a weekday";
  let adv = "it's time to work hard";

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    type = "the weekend";
    adv = "it's time to have some fun";
  }

  res.render("index.ejs", {
    dayType: type,
    advice: adv,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
