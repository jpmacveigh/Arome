function traceGoogleMap (path,limitesGeo,element){
	var elem=document.getElementById(element.toString());
	var map = new google.maps.Map(document.getElementById(element.toString()),{
		zoom: 6,
		//center: {lat: 45.740, lng: 3.18}
		center: {lat: limitesGeo.getCenter().lat(), lng: limitesGeo.getCenter().lng()}
	});
	var imageAromeBounds = {
		south: limitesGeo.getSouthWest().lat(), //37.5
		west:  limitesGeo.getSouthWest().lng(), //-12.0,
		north: limitesGeo.getNorthEast().lat(), //55.4
		east:  limitesGeo.getNorthEast().lng()  //16.0					
	};
	var imageAromeOptions = {
		opacity : 0.5
	};
	aromeOverlay = new google.maps.GroundOverlay(path,imageAromeBounds,imageAromeOptions);
	//'https://geoservices.meteofrance.fr/services/MF-NWP-HIGHRES-AROME-001-FRANCE-WMS?request=GetMap&service=WMS&version=1.3.0&CRS=EPSG:4326&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__&LAYERS=GEOMETRIC_HEIGHT__GROUND_OR_WATER_SURFACE&styles=ALTITUDE__GROUND__NO_SHADING&format=image/png&width=1200&height=800&BBOX=37.5,-12,55.4,16.0&reference_time=2016-10-04T15:00:00Z&time=2016-10-04T15:00:00Z',
	//'https://geoservices.meteofrance.fr/services/MF-NWP-HIGHRES-AROME-001-FRANCE-WMS?request=GetMap&service=WMS&version=1.3.0&CRS=EPSG:4326&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__&LAYERS=BRIGHTNESS_TEMPERATURE__GROUND_OR_WATER_SURFACE&styles=BT__CHANNELS_108__SHADING&format=image/png&width=1564&height=1000&BBOX=37.5,-12.0,55.4,16.0&reference_time=2016-10-05T03:00:00Z&time=2016-10-06T18:00:00Z',
	aromeOverlay.setMap(map);
}