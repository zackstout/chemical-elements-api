
var allChems = [];
var can2;
var boxWidth, boxHeight, ctx;
var ids = [];

var can1Width, can1Height, can1BoxWidth, can1BoxHeight;

function setup() {

  var can1 = document.getElementById('orbitals');
  // console.log(can1.width);
  ctx = can1.getContext('2d');
  can1Width = can1.width;
  can1Height = can1.height;
  console.log(can1.width);
  can1BoxWidth = can1Width / 7;
  can1BoxHeight = can1Height / 118;

  console.log('hi p5');
  can2 = createCanvas(900, 600);
  background(201);

  boxWidth = can2.width / 18;
  boxHeight = (can2.height - 200) / 7;
  // console.log(boxWidth);

  $.ajax({
    type: 'get',
    url: '/stars'
  }).done((res) => {
    // console.log(res);
    for (var i=0; i < res.length; i++) {
      var r = res[i];
      // console.log(result);

      // if (r.num != 80) {
        $.ajax({
          type: 'get',
          url: '/elems/' + r.name
        }).done((res2) => {
          // console.log(res2);
          // console.log(r);

          if (res2.num != 80 && res2) {
            var shellNums = res2.shells.split(', ');
            $('#orbitals').append('<p id="' + res2.num + '"></p>');
            // console.log(shellNums);

            shellNums.forEach((n, index) => {
              var int = parseInt(n);
              // console.log(int, index);

              switch(index) {
                case 0:
                // console.log(can1BoxWidth);
                ctx.fillStyle = 'red';
                ctx.fillRect(0, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, 0, (res2.num - 1) * can1BoxHeight);
                break;

                case 1:
                // while (int > 0) {
                //   $('#orbitals').append()
                // }
                ctx.fillStyle = 'orange';
                ctx.fillRect(can1BoxWidth, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, can1BoxWidth, (res2.num - 1) * can1BoxHeight);
                // console.log(1);
                break;

                case 2:
                ctx.fillStyle = 'yellow';
                ctx.fillRect(can1BoxWidth * 2, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, can1BoxWidth * 2, (res2.num - 1) * can1BoxHeight);
                break;

                case 3:
                ctx.fillStyle = 'green';
                ctx.fillRect(can1BoxWidth * 3, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, can1BoxWidth * 3, (res2.num - 1) * can1BoxHeight);
                break;

                case 4:
                ctx.fillStyle = 'blue';
                ctx.fillRect(can1BoxWidth * 4, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, can1BoxWidth *4, (res2.num - 1) * can1BoxHeight);
                break;

                case 5:
                ctx.fillStyle = 'violet';
                ctx.fillRect(can1BoxWidth *5, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, can1BoxWidth*5, (res2.num - 1) * can1BoxHeight);
                break;

                case 6:
                ctx.fillStyle = 'indigo';
                ctx.fillRect(can1BoxWidth*6, (res2.num - 1) * can1BoxHeight, can1BoxWidth, can1BoxHeight);
                ctx.fillStyle = 'black';
                ctx.font = '22px Arial';
                ctx.fillText(n, can1BoxWidth*6, (res2.num - 1) * can1BoxHeight);
                break;
              }
            });
            // $('#orbitals').append('<p>' + r.shells + '</p>');
          }
        });
      // }


      // $('table').append('<tr style=background-color:' + r.color + '>' + '<td>' + r.num + '</td>' + '<td>' + r.name + '</td>' + '<td>' + r.sym + '</td>' + '<td>' + r.origin + '</td>' + '<td>' + r.melt + '</td>' + '<td>' + r.boil + '</td>' + '<td>' + r.c + '</td>' + '<td>' + r.x + '</td>' + '<td>' + r.weight + '</td>' + '<td>' + r.density + '</td>' + '<td>' + r.group + '</td>' + '<td>' + r.period + '</td>' + '<td><img src="pics/' + r.name + '_spectrum_visible.png' + '"></td>' + '</tr>');


      // how do we do this without concatenation again...?:


      // console.log(r.group, r.period, r.num);
      if (r.group) {
        r.xCoord = (r.group - 1) * boxWidth;
        r.yCoord = (r.period - 1) * boxHeight;
        // console.log(r.group);
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


      // handle the 2 weird rows:
      } else {

        console.log(r);

        if (r.period == 6) {
          var col = color(r.color);
          // console.log(r);

          // r.xCoord2 = (r.period - 1) * boxHeight;
          // r.xCo = 0;
          r.yCoord2 = parseInt(r.yCoord) + 132;

          for (var k=0; k < 14; k++) {
            r.xCoord2 = k * boxWidth;
            fill(col);
            rect(r.xCoord2, r.yCoord2, boxWidth, boxHeight);
            // r.xCo ++;
          }


          // for (var k=0; k<14; k++) {
          //   r.x2 = r.xCoord + k * boxWidth;
          //   r.yCoord2 = r.yCoord + 132;
          //   // console.log(r.num);
          //   if (!ids.includes(parseInt(r.num))) {
          //     fill(col);
          //     // console.log(r);
          //     rect(r.xCoord2, r.yCoord2, boxWidth, boxHeight);
          //     fill('black');
          //     textSize(10);
          //     text(r.num, r.xCoord2, r.yCoord2 + 10);
          //     textSize(20);
          //     text(r.sym, r.xCoord2 + 15, r.yCoord2 + 35);
          //     // console.log(r.xCoord2, r.yCoord2, r.num);
          //     ids.push(parseInt(r.num));
          //   }
          // }
        } else {
          // console.log(r);
          var col1 = color(r.color);
          fill(col1);
          // for (var l=0; l<14; l++) {
          //   r.xCoord2 = r.xCoord + l * boxWidth;
          //   r.yCoord2 = r.yCoord + 155;
          //   rect(r.xCoord2, r.yCoord2, boxWidth, boxHeight);
          //   // fill('black');
          //   // textSize(10);
          //   // text(r.num, r.xCoord, r.yCoord + 10);
          //   // textSize(20);
          //   // text(r.sym, r.xCoord + 15, r.yCoord + 35);
          // }
          // console.log(7);
        }
      }

      allChems.push(r);
    }
  }); // END DONE FUNCTION;



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
        // console.log(res);
        $('#holder').empty();
        $('#holder').append('<ul>' + '<li>Name: ' + res.el_name + '</li>' + '<li>Origin: ' + res.origin + '</li>' + '<li>Melt: ' + res.melt + '</li>' + '<li>Boil: ' + res.boil + '</li>' + '<li>Density: ' + res.density + '</li>' + '<li>Electron Config: ' + res.config + '</li>' + '<li>Specific Heat: ' + res.c + '</li>' + '<li>Electronegativity: ' + res.x + '</li>' + '<li>Shells: ' + res.shells + '</li>' + '<li>Group: ' + res.group_num + '</li>' + '</ul>');
      }).catch((err) => {
        console.log(err);
      });

    }
  });
}

// function draw() {
//
// }
//
// $(document).ready(() => {
//
// });
