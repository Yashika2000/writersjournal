const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    helpers: {
      eq: (a, b) => a === b
    }
}));
app.set('view engine', 'handlebars');
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('about');
});

app.get("/about", (req, res) => {
  res.render("about", { active: "about", title: "About" });
});

app.get("/write", (req, res) => {
  res.render("write", { active: "write", title: "Write" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { active: "contact", title: "Contact" });
});
app.listen(port ,()=>{
    console.log(`port is running on ${port}`);
});