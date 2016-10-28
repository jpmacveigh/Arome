function getMFWCSPath(ws,coverageID,limitesGeo,time,elevation){ // calcul du path pour une requete getCoverage du WCS
	// https://geoservices.meteofrance.fr/services/MF-NWP-GLOBAL-ARPEGE-05-GLOBEWCS?service=WCS&version=2.0.1&REQUEST=GetCoverage&coverageid=TEMPERATURE__ISOBARIC_SURFACE___2016-05-31T00.00.00Z&subset=time(2016-05-31T12:00:00Z)&subset=lat(40,55)&subset=long(-5,10)&subset=pressure(850)&format=image/tiff&token=VOTRE_CLE
	var nomModel=ws.getNomModel;
	path= 'https://geoservices.meteofrance.fr/services/'+getNomModeleMF(nomModele)+'WCS?request=GetCoverage&service=WCS&version=2.0&format=image/tiff&token='+getCle();
	path+= '&coverageid='+coverageID;      		// le coverageId fourni par getDescribeCoveragenom de la couche à tracer
	path+= '&'+getSubsetGeo(limiteGeo);			// les subsets geographiques
	path+= '&subset=time('+time+')';
	if (elevation){
		path+= '&ELEVATION='+elevation;
	}
	return path;
	}
	function getSubsetGeo(limiteGeo){
		// subset=lat(40,55)&subset=long(-5,10)
		var str='subset=lat('+limitesGeo.getSouthWest().lat()+','+limitesGeo.getNorthEast().lat()+')';
		 str+='&subset=long('+limitesGeo.getSouthWest().lng()+','+limitesGeo.getNorthEast().lng()+')';
		return str;
	}
}