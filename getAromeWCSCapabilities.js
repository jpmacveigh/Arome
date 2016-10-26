function getAromeWCSCapabilities(nomModele){
	var model=getNomModeleMF(nomModele);
	var service="WCS";
	var lesCoverageIds=[];
	cle_jpmv="__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__"
	var url="https://geoservices.meteofrance.fr/services/"+model+service+"?request=GetCapabilities&version=1.3.0&service="+service+"&token="+cle_jpmv;		
	$.ajax({   // requette GetCapabilities du service WCS 
			type: "GET",
			url: url,
			async:false,
			dataType: "xml",
			success: parseWCS,
			error: function(){
				console.log("erreur lecture Ajax");
			}
	});
	function parseWCS(xml){
		console.log("parseWCS");
		console.log(xml);
		//$("#capaWCS").html(xml);
		$(xml).find("wcs\\:Capabilities wcs\\:Contents wcs\\:CoverageSummary,CoverageSummary").each(function(){
				var id=$(this).find("wcs\\:CoverageId,CoverageId").text();
				lesCoverageIds.push(id);	
		});
	}
	return lesCoverageIds
}