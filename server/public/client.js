
var allChems = [];
var can2;
var boxWidth, boxHeight;

// wow, it worked, s/o to https://ausdemmaschinenraum.wordpress.com/2012/12/06/how-to-save-a-file-from-a-url-with-javascript/:
// Ok may have spoken a bit soon:
function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  console.log(filename);
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    console.log(a);
    a.click();
    delete a;
  };
  xhr.open('GET', url);
  xhr.send();
}


// a second attempt:
// setTimeout(function() {
//
//    url = '//assets.codepen.io/images/codepen-logo.svg';
//   //  downloadFile(url); // UNCOMMENT THIS LINE TO MAKE IT WORK
//
// }, 2000);

// Source: http://pixelscommander.com/en/javascript/javascript-file-download-ignore-content-type/
window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
       //alert('Your device does not support files downloading. Please try again in desktop browser.');
       window.open(sUrl, '_blank');
       return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        link.setAttribute('target','_blank');

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_blank');
    return true;
};

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

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
      $('table').append('<tr style=background-color:' + r.color + '>' + '<td>' + r.num + '</td>' + '<td>' + r.name + '</td>' + '<td>' + r.sym + '</td>' + '<td>' + r.origin + '</td>' + '<td>' + r.melt + '</td>' + '<td>' + r.boil + '</td>' + '<td>' + r.c + '</td>' + '<td>' + r.x + '</td>' + '<td>' + r.weight + '</td>' + '<td>' + r.density + '</td>' + '<td>' + r.group + '</td>' + '<td>' + r.period + '</td>' + '<td><img src="pics/' + r.name + '_spectrum_visible.png' + '"></td>' + '</tr>');

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
      console.log(chem.name, chem.stp);
    }
  });
}

function draw() {

}

// $(document).ready(() => {
//
// });
