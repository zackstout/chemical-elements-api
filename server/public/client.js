
$(document).ready(() => {
  $.ajax({
    type: 'get',
    url: '/stars'
  }).done((res) => {
    console.log(res);
  });
});
