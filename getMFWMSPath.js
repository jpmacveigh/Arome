function getMFWMSPath(ws,nomCouche,limitesGeo,referenceTime,time,elevation){
	 //https://geoservices.meteofrance.fr/services/MF-NWP-HIGHRES-AROME-001-FRANCE-WMS?request=GetMap&service=WMS&version=1.3.0&LAYERS=TEMPERATURE__SPECIFIC_HEIGHT_LEVEL_ABOVE_GROUND&CRS=EPSG:4326&styles=T__HEIGHT__SHADING&format=image/png&width=550&height=400&BBOX=40,-6,56,8&HEIGHT=2&reference_time=2016-09-16T00:00:00Z&time=2016-09-16T20:00:00Z&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__
	var nomModel=ws.getNomModel;
	var style=ws.getLesCouches()[nomCouche]["style"];
	var height=1200;  // hauteur en pixels de la cartes demandée
	path= 'https://geoservices.meteofrance.fr/services/'+getNomModeleMF(nomModele)+'WMS?request=GetMap&service=WMS&version=1.3.0&CRS=EPSG:4326';
	path+= '&token='+getCle();        			// la clé de l'API fournie par MF
	path+= '&LAYERS='+nomCouche;      			// le nom de la couche à tracer
	path+= '&styles='+style;   					// le style de tracé
	path+= '&format=image/png&width='+getWidth(limitesGeo)+'&height='+height+'&'+getBBOX(limitesGeo); //  la taille du tracé (pixels) et la zone géographique (lat,lng)
	path+= '&REFERENCE_TIME='+referenceTime;
	path+= '&TIME='+time;
	if (elevation){
		path+= '&ELEVATION='+elevation;
	}
	return path;
	function getBBOX(limitesGeo){					// calcul de la propriété BBOX de l'url du WMS
		//  BBOX=40,-6,56,8
		var str="BBOX=";
		str+=limitesGeo.getSouthWest().lat()+",";
		str+=limitesGeo.getSouthWest().lng()+",";
		str+=limitesGeo.getNorthEast().lat()+",";
		str+=limitesGeo.getNorthEast().lng();
		return str;
	}
	function getWidth(limitesGeo){  // calcul de la largeur (pixels) de la carte. La projection CRS=EPSG:4326
									// utilisée par MF est dite "plate carrée" dans laquelle les (lat,lon) et les (heigth,width) sont homothétiques
		var width=height*(limitesGeo.getNorthEast().lng()-limitesGeo.getSouthWest().lng())/(limitesGeo.getNorthEast().lat()-limitesGeo.getSouthWest().lat());
		return Math.round(width);
	}
}