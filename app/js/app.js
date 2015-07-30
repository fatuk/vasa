$(function () {
	// Slider
	var slider = $('.js-slider').owlCarousel({
		navigation: false, // Show next and prev buttons
		slideSpeed: 300,
		pagination: false,
		paginationSpeed: 400,
		autoHeight: true,
		singleItem: true
	});

	$('.js-sliderPrev').on('click', function () {
		slider.trigger('owl.prev');
	});
	$('.js-sliderNext').on('click', function () {
		slider.trigger('owl.next');
	});
});
