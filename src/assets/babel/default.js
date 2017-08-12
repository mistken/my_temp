/**
 * 実行JS
 */

var tnp = tnp || {};

// require jquery
global.$ = global.jQuery = require("jquery");

// lightbox
// import Lightbox from 'lightbox2/dist/js/lightbox.min.js'

// particles
// import Particles from 'particlesjs/dist/particles.js'


$(function() {

  //文字サイズ拡大 標準
  $('.change-font-size .btn').on('click', function() {
    $('.change-font-size .btn').removeClass('current');
    $(this).addClass('current');

    var isLarge = $(this).hasClass('large');
    if (isLarge) {
      $('html').attr('style', 'font-size:120%;');
    } else {
      $('html').attr('style', 'font-size:100%;');
    }
  });

  //スマホスライドメニュー
  $('#js-slidemenu-btn').click(function() {
    $('.slidemenu-btn-icon').toggleClass('close');
    $('.global-nav').toggleClass('open');
    return false;
  });

});
