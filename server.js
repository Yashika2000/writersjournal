const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const site = require('./data/site.json');

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.render('home', { title: 'Writer Sanctuary', ...site }));
app.get('/dashboard', (req, res) => res.render('dashboard', { title: 'Dashboard', ...site }));
app.get('/write_poems', (req, res) => res.render('write_poems', { title: 'Write Poems', ...site }));
app.get('/write_stories', (req, res) => res.render('write_stories', { title: 'Write Stories', ...site }));
app.get('/prompts', (req, res) => res.render('prompts', { title: 'Prompts', ...site }));
app.get('/calendar', (req, res) => res.render('calendar', { title: 'Calendar', ...site }));
app.get('/blogs', (req, res) => res.render('blogs', { title: 'Blogs', ...site }));
app.get('/themes', (req, res) => res.render('themes', { title: 'Themes', ...site }));
app.get('/profile', (req, res) => res.render('profile', { title: 'Profile', ...site }));

app.listen(PORT, () => console.log(`Writer Sanctuary running at http://localhost:${PORT}`));
