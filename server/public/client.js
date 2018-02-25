
var allChems = [];
var can2;
var boxWidth, boxHeight;

function setup() {
  console.log('hi p5');
  can2 = createCanvas(900, 400);
  background(201);

  // console.log($('#canvas'));
  // var can = document.getElementById('canvas');
  // var ctx = can.getContext('2d');
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(0, 0, can.width, can.height);

  boxWidth = can2.width / 18;
  boxHeight = can2.height / 7;
  console.log(boxWidth);

  $.ajax({
    type: 'get',
    url: '/stars'
  }).done((res) => {
    console.log(res);
    for (var i=0; i < res.length; i++) {
      var r = res[i];
      $('table').append('<tr style=background-color:' + r.color + '>' + '<td>' + r.num + '</td>' + '<td>' + r.name + '</td>' + '<td>' + r.sym + '</td>' + '<td>' + r.origin + '</td>' + '<td>' + r.melt + '</td>' + '<td>' + r.boil + '</td>' + '<td>' + r.c + '</td>' + '<td>' + r.x + '</td>' + '<td>' + r.weight + '</td>' + '<td>' + r.density + '</td>' + '<td>' + r.group + '</td>' + '<td>' + r.period + '</td>' + '</tr>');

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

        // ctx.fillStyle = 'black';
        // ctx.font = '10px Arial';
        // ctx.fillText(r.num, (r.group - 1) * boxWidth, (r.period - 1) * boxHeight + 10);
        // ctx.font = '20px Arial';
        // ctx.fillText(r.sym, (r.group - 1) * boxWidth + 15, (r.period - 1) * boxHeight + 35);
      }

      allChems.push(r);

    }
  });
}

function mouseClicked() {
  console.log(mouseX, mouseY);
  // console.log(allChems);
  allChems.forEach(function(chem) {
    if((mouseX > chem.xCoord) && (mouseX < chem.xCoord + boxWidth) && (mouseY > chem.yCoord) && (mouseY < chem.yCoord + boxHeight)) {
      console.log(chem.name);
    }
  });
}

function draw() {

}

$(document).ready(() => {

});
