
$(document).ready(() => {
  $.ajax({
    type: 'get',
    url: '/stars'
  }).done((res) => {
    console.log(res);
    for (var i=0; i < res.length; i++) {
      var r = res[i];
      // $('body').append('<li>' + res[i].group + '   ' + res[i].period + '</li>');
      $('table').append('<tr>' + '<td>' + r.num + '</td>' + '<td>' + r.name + '</td>' + '<td>' + r.sym + '</td>' + '<td>' + r.origin + '</td>' + '<td>' + r.melt + '</td>' + '<td>' + r.boil + '</td>' + '<td>' + r.c + '</td>' + '<td>' + r.x + '</td>' + '<td>' + r.weight + '</td>' + '<td>' + r.density + '</td>' + '<td>' + r.group + '</td>' + '<td>' + r.period + '</td>' + '</tr>');
    }
  });
});
