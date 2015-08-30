$(function () {
	// Collapse
	if ($('.js-collapseBtn').length > 0) {
		var $btn = $('.js-collapseBtn'),
			$container = $('#' + $btn.attr('href').substr(1));

		$btn.on('click', function (e) {
			e.preventDefault();

			if (!$container.hasClass('collapsed')) {
				$container.addClass('collapsed');
				$container.slideUp('fast');
				$btn.addClass('collapsed');
			} else {
				$container.removeClass('collapsed');
				$container.slideDown('fast');
				$btn.removeClass('collapsed');
			}
		});
	}
	// Clickable rows
	$('.js-clickable').click(function () {
		window.document.location = $(this).data('url');
	});

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
				controls: []
			});

			this.map.behaviors.disable(['scrollZoom', 'dblClickZoom']);

			if (params.pins) {
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

	// New answer map init
	if ($('#setPointMap').length > 0) {
		var buildingMap1 = new map({
			id: 'setPointMap',
			zoom: 17,
			center: [55.76, 37.64]
		});
	}

	// Select2 Prce
	$.fn.select2.defaults.set('theme', 'classic');
	$('.js-selectPriceType').select2({
		minimumResultsForSearch: Infinity,
		width: 'width'
	});

	// Select2 estates
	var estateData = [{
		value: '1',
		name: 'Квартиры',
		children: [{
			value: '1.1',
			name: 'Комната'
		}, {
			value: '1.2',
			name: 'Студия'
		}, {
			value: '1.3',
			name: 'Комната'
		}, {
			value: '1.4',
			name: '1км. квартира'
		}, {
			value: '1.5',
			name: '2км. квартира'
		}, {
			value: '1.6',
			name: '3км. квартира'
		}, , {
			value: '1.7',
			name: '4км. квартира'
		}]
	}];
	$('.js-selectEstate').select2({
		minimumResultsForSearch: Infinity,
		width: 'width'
	});

	// Tabs
	var Tabs = function (selector) {
		var $tabs = $(selector),
			self = this;

		self.init = function () {
			$tabs.find('.js-tab').on('click', function (e) {
				var currentTabId = $(this).find('a').attr('href');
				self.reset();
				$(this).addClass('active');
				console.log($tabs.find('[data-tab="' + currentTabId.substr(1) + '"]'));
				$tabs.find('[data-tab="' + currentTabId.substr(1) + '"]').addClass('active');
			});
		};

		self.reset = function () {
			$tabs.find('.js-tab').removeClass('active');
			$tabs.find('[data-tab]').removeClass('active');
		};

		self.init();
	};

	// Tabs init
	var tabs = new Tabs('.js-tabs');

});

//# sourceMappingURL=../js/app.js.map