
var express = require('express');
var app = express();
var port = process.env.PORT || 4040;
var resu = [];
var wiki = require("node-wikipedia");

var pg = require('pg');
var config = {
  database: 'elements', // the name of the database
  host: 'localhost', // where is your database?
  port: 5432, // the port number for you database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // Close idle connections to db after
};

var pool = new pg.Pool(config);

function updateDB(elem) {
  // console.log(elem);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
    } else {
      // We connected to the db!!!!! pool -1
      // console.log(star, "HI THERE");
      var queryText = 'INSERT INTO "elems5" ("el_name", "num", "sym", "group_num", "origin", "weight", "density", "melt", "boil", "color", "type", "config", "c", "x", "shells", "stp", "period") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);';

      if (isNaN(elem.num) || elem.num == '') {
        elem.num = -1;
      }
      if (isNaN(elem.group) || elem.group == '') {
        elem.group = -1;
      }
      if (isNaN(elem.period) || elem.period == '') {
        elem.period = -1;
      }
      db.query(queryText, [elem.name, parseInt(elem.num), elem.sym, parseInt(elem.group), elem.origin, elem.weight, elem.density, elem.melt, elem.boil, elem.color, elem.type, elem.config, elem.c, elem.x, elem.shells, elem.stp, parseInt(elem.period)], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1

        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, elem);
        } else {
          // Send back success!
        }
      }); // END QUERY
    }
  }); // END POOL
}

app.use(express.static('server/public'));

app.get('/stars', function(req, res) {
  res.send(resu);
});

app.get('/elems/:num', function(req, res) {
  console.log(req.params.num);

  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
    } else {
      // We connected to the db!!!!! pool -1
      // console.log(star, "HI THERE");
      var queryText = 'SELECT * FROM "elems5" WHERE "el_name" = $1;';

      db.query(queryText, [req.params.num], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1

        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
        } else {
          // Send back success!
          res.send(result.rows[1]);
        }
      }); // END QUERY
    }
  }); // END POOL

  // don't forget to send something back!

  // res.sendStatus(201);
});



wiki.page.data("List_of_chemical_elements", { content: true }, function(response) {
  // console.log(response);
  var txt = response.text["*"];
  var table = txt.slice(txt.indexOf('<th colspan="13">List of chemical elements</th>'), txt.indexOf("<p>Notes</p>"));
  // resu = table;
  var rows = table.split('<tr>');

  // console.log(rows[59].split('<td'));

  rows.forEach((row, index) => {
    var element = {};
    if (index > 1) {
      var arr = row.split('<td');

      var num = arr[1];
      var sym = arr[2];
      var name = arr[3];
      var origin = arr[4];
      var group = arr[5];
      var period = arr[6];
      var weight = arr[7];
      var density = arr[8];
      var melt = arr[9];
      var boil = arr[10];
      var c = arr[11];
      var x = arr[12];
      var abund = arr[13];

      // use the color to distribute into categories:
      // console.log(arr[2]);

      var color = sym.slice(sym.indexOf(':') + 1, sym.indexOf('">'));
      // console.log(color);

      // Parsing the data:
      var num_real = num.slice(1, num.indexOf('<'));
      var sym_real = sym.slice(sym.indexOf('>') + 1, sym.indexOf('<'));
      var name_real = name.slice(name.indexOf('">') + 2, name.indexOf("</"));
      var group_real = group.slice(group.indexOf('>') + 1, group.indexOf('<'));
      var period_real = period.slice(period.indexOf('>') + 1, period.indexOf('<'));

      var weight_real;
      //issue with weight: sometimes has '[]', sometimes not:
      // var weight_real = weight.slice(weight.indexOf('[') + 1, weight.indexOf(']'));
      // this one's a bit weird:
      var density_real = density.slice(density.indexOf('">') + 2, density.indexOf('!'));
      // var melt_real = melt.slice(melt.indexOf('>') + 1, melt.indexOf('<'));
      var boil_real = boil.slice(boil.indexOf('>') + 1, boil.indexOf('<'));
      var c_real = c.slice(c.indexOf('>') + 1, c.indexOf('<'));
      var x_real = x.slice(x.indexOf('>') + 1, x.indexOf('<'));
      var abund_real = abund;
      var origin_real = origin.slice(origin.indexOf(">") + 1, origin.indexOf("</td"));

      // console.log(weight);

      if (weight.includes("sorttext")) {
        weight_real = weight.slice(weight.indexOf('sorttext">') + 10, weight.indexOf("<", weight.indexOf('sorttext">')));
      } else {
        weight_real = weight;
      }

      if (melt.includes("sorttext")) {
        melt_real = melt.slice(melt.indexOf('sorttext">') + 10, melt.indexOf("<", melt.indexOf('sorttext">')));
      } else {
        melt_real = melt.slice(melt.indexOf('>') + 1, melt.indexOf('<'));
      }

      // console.log(weight_real);

      if (density_real.includes("<")) {
        density_real = density_real.slice(0, density_real.indexOf("<"));
      }
      // console.log(weight);

      // console.log(x_real);
      element.num = num_real;
      element.sym = sym_real;
      element.name = name_real;
      element.group = group_real;
      element.origin = origin_real;
      element.period = period_real;
      element.weight = weight_real;
      element.density = density_real;
      element.melt = melt_real;
      element.boil = boil_real;
      element.c = c_real;
      element.x = x_real;
      element.color = color;
      // element.abund = abund_real;
      // console.log(melt_real);

      element.image = 'https://en.wikipedia.org/wiki/' + name_real + '#/media/File:' + name_real + '_spectrum_visible.png';

      // if (element.num == 54) {
      wiki.page.data(name_real, {content: true}, function(res) {
        var txt = res.text["*"];
        var type, config, shells, stp, triple;
        var electronConfig = txt.slice(txt.indexOf("Element category"), txt.indexOf("Electron configuration") + 1000);
        var arr = electronConfig.split('<td>');
        // console.log('1:', arr[1], '2:', arr[2], '3:', arr[3], '4:', arr[4], '5:', arr[5], '6:', arr[6]);
        // console.log(electronConfig.split('<td>'));
        if (arr[1]) {
          // console.log(arr[1]);
          type = arr[1].slice(arr[1].indexOf('title', 20), arr[1].indexOf('</a>'));
          config = arr[3].slice(0, arr[3].indexOf("</td>"));
          shells = arr[4].slice(0, arr[4].indexOf("<"));
          stp = arr[5].slice(0, arr[5].indexOf("</td>"));
          element.type = type;
          element.config = config;
          element.shells = shells;
          element.stp = stp;

          // updateDB(element);

          // console.log(type, config, shells, stp);
        }

      });
      // }


      resu.push(element);

    } // END IF STATEMENT

  }); // END FOREACH STATEMENT
});

// Start listening for requests on a specific port
app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
