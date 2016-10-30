function getMFWCSPath(ws,coverageID,limitesGeo,time,elevation){ // calcul du path pour une requete getCoverage du WCS
	// https://geoservices.meteofrance.fr/services/MF-NWP-GLOBAL-ARPEGE-05-GLOBEWCS?service=WCS&version=2.0.1&REQUEST=GetCoverage&coverageid=TEMPERATURE__ISOBARIC_SURFACE___2016-05-31T00.00.00Z&subset=time(2016-05-31T12:00:00Z)&subset=lat(40,55)&subset=long(-5,10)&subset=pressure(850)&format=image/tiff&token=VOTRE_CLE
	//coverageID="TEMPERATURE__ISOBARIC_SURFACE___2016-10-30T00.00.00Z";   // constant pour les tests
	coverageID="BRIGHTNESS_TEMPERATURE__GROUND_OR_WATER_SURFACE___2016-10-30T00.00.00Z"; // constant pour les tests
	time="2016-10-30T12:00:00Z";										 // constant pour les tests
	var nomModel=ws.getNomModel;
	path= 'https://geoservices.meteofrance.fr/services/'+getNomModeleMF(nomModele)+'WCS?request=GetCoverage&service=WCS&version=2.0.1&format=image/tiff&token='+getCle();
	path+= '&coverageid='+coverageID;      		// le coverageId fourni par getDescribeCoveragenom de la couche à tracer
	path+= '&'+getSubsetGeo(limitesGeo);			// les subsets geographiques
	path+= '&subset=time('+time+')';            // heure de la prévision
	path+= '&subset=pressure(850)';             // niveau (à préciser en fonction du coverageId)
	return path;
	function getSubsetGeo(limitesGeo){
		// subset=lat(40,55)&subset=long(-5,10)
		var str='subset=lat('+limitesGeo.getSouthWest().lat()+','+limitesGeo.getNorthEast().lat()+')';
		 str+='&subset=long('+limitesGeo.getSouthWest().lng()+','+limitesGeo.getNorthEast().lng()+')';
		return str;
	}
}