
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

      var num_real = num.slice(1, num.indexOf('<'));
      var sym_real = sym.slice(sym.indexOf('>') + 1, sym.indexOf('<'));
      // console.log(num_real, sym_real);
      var name_real = name.slice(name.indexOf('">') + 2, name.indexOf("</"));
      var group_real = group.slice(group.indexOf('>') + 1, group.indexOf('<'));
      var period_real = period.slice(period.indexOf('>') + 1, period.indexOf('<'));
      var weight_real = weight.slice(weight.indexOf('[') + 1, weight.indexOf(']'));
      var density_real = density.slice(density.indexOf('">') + 2, density.indexOf('!'));
      var melt_real = melt;
      var boil_real = boil;
      var c_real = c;
      var x_real = x;
      var abund_real = abund;
      // console.log(melt_real);

      element.num = num_real;
      element.sym = sym_real;
      element.name = name_real;
      element.group = group_real;
      element.origin = origin;
      element.period = period_real;
      element.weight = weight_real;
      element.density = density_real;

      resu.push(element);


      // console.log(x.slice(1, x.indexOf('<')));

      // console.log(arr[2].slice(arr[2].indexOf('>'), arr[2].indexOf('<')));
    }


    // if (arr[1]) {
    //   var num = arr[1].slice(arr[1].indexOf('<'), arr[1].indexOf('>'));
    //   console.log(num);
    // }

  });
});

// Start listening for requests on a specific port
app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
