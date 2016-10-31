function getAromeWCSCapabilities(nomModele){ // Envoit et traite le résultat d'une requête "getCapabilities" au service Web Coverage Service (WCS)
	var model=getNomModeleMF(nomModele);
	var service="WCS";
	var lesCoverageIds=[];
	cle_jpmv="__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__"
	var url="https://geoservices.meteofrance.fr/services/"+model+service+"?request=GetCapabilities&version=1.3.0&service="+service+"&token="+cle_jpmv;		
	$.ajax({   // requête "getCapabilities" au service Web Coverage Service (WCS) 
			type: "GET",
			url: url,
			async:false,
			dataType: "xml",
			success: parseWCSCapabilities,
			error: function(){
				console.log("erreur lecture Ajax");
			}
	});
	function parseWCSCapabilities(xml){  // construit la liste des coverageId qui seront nécessaires pour les requêtes "describeCorverage" et "getCoverage"
		console.log("parseWCS");
		console.log(xml);
		//$("#capaWCS").html(xml);
		$(xml).find("wcs\\:Capabilities wcs\\:Contents wcs\\:CoverageSummary,CoverageSummary").each(function(){
				var id=$(this).find("wcs\\:CoverageId,CoverageId").text();
				lesCoverageIds.push(id);	
		});
	}
	return lesCoverageIds  // on retourne la liste des coverageId
}