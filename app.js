const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { response } = require('express');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/styles.css', (request, response) => {
  response.sendFile(path.join(__dirname + '/public/stylesheets/styles.css'));
});

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname + '/views/partials'));

// ...

// Add the route handlers here:

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      res.render('beers', { beers: beersFromAPI });
      // console.log('Beers from the database: ', beersFromAPI);
    })
    .catch(error => console.log('error'));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      const randomBeer = beer[0];
      console.log(randomBeer);
      res.render('random-beer', { beer: randomBeer });
      // console.log('Beers from the database: ', beersFromAPI);
    })
    .catch(error => console.log('error'));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
