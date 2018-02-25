
var express = require('express');
var app = express();
var port = process.env.PORT || 4040;
var resu = [];
var wiki = require("node-wikipedia");


app.use(express.static('server/public'));

app.get('/stars', function(req, res) {
  res.send(resu);
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
      console.log(color);

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

      resu.push(element);

    } // END IF STATEMENT

  });
});

// Start listening for requests on a specific port
app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
