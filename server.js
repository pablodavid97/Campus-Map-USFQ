var express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const logger = require('morgan');
var app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}));
dotenv.config();
app.set('view engine', '.hbs');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
app.use(require('./routes/'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
if(process.env.NODE_ENV === 'production') {
    app.listen(app.get('port'), () => {
      console.log('Server on port', app.get('port'));
    });
} else {
    const reload = require('reload');
    
    reload(app).then((reloadReturned) => {
      app.listen(app.get('port'), () => {
        console.log('Server on port', app.get('port'));
      });
    }).catch((err) => {
      console.error("Reload could not start", err);
    });
}
  