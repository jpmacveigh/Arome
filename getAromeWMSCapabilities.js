function getAromeWMSCapabilities(nomModele){
	var model=getNomModeleMF(nomModele);
	var service="WMS";
	var lesCouches=[];
	var url="https://geoservices.meteofrance.fr/services/"+model+service+"?request=GetCapabilities&version=1.3.0&service="+service+"&token="+getCle();
	$.ajax({   // requete GetCapabilities pour le service Web Map Service (WMS)
			type: "GET",
			url: url,
			async:false,
			dataType: "xml",
			success: parseWMS,
			error: function(){
				console.log("erreur lecture Ajax");
			}
	});
	function parseWMS(xml) {
		console.log("parseWMS");
		console.log(xml);
		//$("#capaWMS").html(xml);
		$(xml).find("Capability").find("Layer").find("Layer").each(function(){ // boucle sur les balises. On a alors accès à $(this) pour chercher les sous-balises.
									var nom = $(this).find("Name").html();
									console.log ("nom de la couche : "+nom);
									var lesDimensions=[];
									var style=$(this).find("Style").find("Name").html();
									console.log ("style de la couche : "+ style);
									$(this).find("Dimension").each(function(){
													//console.log ($(this).attr("name"));
													//console.log ($(this).text());
													lesDimensions[($(this).attr("name"))]=($(this).text().split(","));			
																});
									lesCouches[nom]=lesDimensions;
									lesCouches[nom]["style"]=style;
								});
	}
	return lesCouches;
}