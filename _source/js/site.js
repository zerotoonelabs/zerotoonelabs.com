/* eslint-disable */

$(document).ready(function() {
  $('#nav-toggle').click(function() {
    $(this).toggleClass('is-active');
    $('#nav-menu').toggleClass('is-active');
  });

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});

  $('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
  $('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});

  $('a').smoothScroll();
});
