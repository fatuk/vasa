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

	// Yandex map
	var map = function (params) {
		console.log('new map');

		var self = this,
			id = params.id || 'map',
			zoom = params.zoom || 10,
			location = params.location || [55.76, 37.64],
			center = params.center || [55.76, 37.64];

		this.init = function () {
			console.log('map init');

			this.map = new ymaps.Map(id, {
				center: location,
				zoom: zoom,
				controls: [],
				center: center
			});

			this.map.behaviors.disable(['scrollZoom', 'dblClickZoom']);

			if (params.pins.length > 0) {
				this.addPins(params.pins);
			}
		};

		this.addPins = function (pinsArray) {
			console.log('Add pins');

			var pinsCollection = new ymaps.GeoObjectCollection();
			for (var i = 0; i < pinsArray.length; i++) {
				pinsCollection.add(new ymaps.Placemark(pinsArray[i].location, {

				}, {
					// Options
					iconLayout: 'default#image',
					iconImageHref: '../public/img/placemark.png',
					iconImageSize: [47, 42],
					iconImageOffset: [-5, -37]
				}));
			}

			// TODO: Remove, it's just for testing
			pinsCollection.events.add('click', function (e) {
				window.location = 'vasa_11novostroiki_list_of_proposals.html';
			});

			this.map.geoObjects.add(pinsCollection);
		};

		ymaps.ready(function () {
			self.init();
		});
	};

	// New building map init
	if ($('#newBuildingsMap').length > 0) {
		var newBuildingsMap = new map({
			id: 'newBuildingsMap',
			zoom: 15,
			pins: [{
				location: [55.76, 37.64],
				content: 'Test pin'
			}, {
				location: [55.765, 37.645],
				content: 'Test pin'
			}]
		});
	}

	// Clusters map init
	if ($('#clustersMap').length > 0) {
		var clustersMap = new map({
			id: 'clustersMap',
			zoom: 15
		});
	}

	// Building 1 map init
	if ($('#buildingMap1').length > 0) {
		var buildingMap1 = new map({
			id: 'buildingMap1',
			zoom: 17,
			center: [55.76, 37.64],
			pins: [{
				location: [55.76, 37.64],
				content: 'Test pin'
			}]
		});
	}

	// Select2
	$.fn.select2.defaults.set('theme', 'classic');
	$('.js-selectPriceType').select2({
		minimumResultsForSearch: Infinity,
		width: 'width'
	});

});

//# sourceMappingURL=../js/app.js.map