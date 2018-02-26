
var allChems = [];
var can2;
var boxWidth, boxHeight;


function setup() {
  console.log('hi p5');
  can2 = createCanvas(900, 400);
  background(201);

  boxWidth = can2.width / 18;
  boxHeight = can2.height / 7;
  // console.log(boxWidth);

  $.ajax({
    type: 'get',
    url: '/stars'
  }).done((res) => {
    console.log(res);
    for (var i=0; i < res.length; i++) {
      var r = res[i];
      // console.log(r.image);
      // var img = '<img src="' + r.image + '">';
      // console.log(img);




      // $('table').append('<tr style=background-color:' + r.color + '>' + '<td>' + r.num + '</td>' + '<td>' + r.name + '</td>' + '<td>' + r.sym + '</td>' + '<td>' + r.origin + '</td>' + '<td>' + r.melt + '</td>' + '<td>' + r.boil + '</td>' + '<td>' + r.c + '</td>' + '<td>' + r.x + '</td>' + '<td>' + r.weight + '</td>' + '<td>' + r.density + '</td>' + '<td>' + r.group + '</td>' + '<td>' + r.period + '</td>' + '<td><img src="pics/' + r.name + '_spectrum_visible.png' + '"></td>' + '</tr>');





      // saveFile(r.image);
      // window.downloadFile(r.image);

      r.xCoord = (r.group - 1) * boxWidth;
      r.yCoord = (r.period - 1) * boxHeight;
      // console.log(r.group, r.period);
      if (r.period) {
        // ctx.fillStyle = r.color;
        var c = color(r.color);
        // console.log(c);
        fill(c);
        rect(r.xCoord, r.yCoord, boxWidth, boxHeight);
        fill('black');
        textSize(10);
        text(r.num, r.xCoord, r.yCoord + 10);
        textSize(20);
        text(r.sym, r.xCoord + 15, r.yCoord + 35);
      }

      allChems.push(r);
    }
  });
}

// Detect which element was clicked:
function mouseClicked() {
  // console.log(mouseX, mouseY);
  allChems.forEach(function(chem) {
    if((mouseX > chem.xCoord) && (mouseX < chem.xCoord + boxWidth) && (mouseY > chem.yCoord) && (mouseY < chem.yCoord + boxHeight)) {
      // console.log(chem.name, chem.stp);

      $.ajax({
        type: 'get',
        url: '/elems/' + chem.name
      }).done((res) => {
        console.log(res);
        $('#holder').empty();
        $('#holder').append('<ul>' + '<li>Name: ' + res.el_name + '</li>' + '<li>Origin: ' + res.origin + '</li>' + '<li>Melt: ' + res.melt + '</li>' + '<li>Boil: ' + res.boil + '</li>' + '<li>Density: ' + res.density + '</li>' + '<li>Electron Config: ' + res.config + '</li>' + '<li>Specific Heat: ' + res.c + '</li>' + '<li>Electronegativity: ' + res.x + '</li>' + '<li>Shells: ' + res.shells + '</li>' + '<li>STP: ' + res.stp + '</li>' + '</ul>');
      }).catch((err) => {
        console.log(err);
      });

    }
  });
}

function draw() {

}

// $(document).ready(() => {
//
// });
