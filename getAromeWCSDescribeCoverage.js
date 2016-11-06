function getAromeWCSDescribeCoverage(nomModele,coverageId){  // Envoit et traite le résultat d'une requette "describeCoverage" au service Web Coverge Servicee (WCS)
	var describedCoverage=[];
	describedCoverage["coverageId"]=coverageId;
	var model=getNomModeleMF(nomModele);
	describedCoverage["nomModele"]=nomModele;
	var service="WCS";
	cle_jpmv=getCle();
	var url ="https://geoservices.meteofrance.fr/services/"+model+service+"?SERVICE="+service+"&version=2.0.1&REQUEST=DescribeCoverage&CoverageId="+coverageId+"&token="+cle_jpmv;
	$.ajax({  // requette "describeCoverage" au service Web Coverage Service (WCS)
		type: "GET",
		url: url,
		async:false,
		dataType: "xml",
		success: parseDescribeCoverage,
		error: function(){
			console.log("erreur lecture Ajax dans requete 'describeCoverage'");
			}	
	});
	function parseDescribeCoverage(xml){
		console.log("parseDescibeCoverage");
		console.log(xml);
		$("#describecoverage").text(xml);    // affichage du xml renvoyé par la requete "describeCoverage"
		console.log ("coverageID : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription wcs\\:CoverageId,CoverageId").text());
		console.log ("beginPosition : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:beginPosition,beginPosition").text());
		describedCoverage["beginPosition"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:beginPosition,beginPosition").text();
		console.log ("endPosition : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:endPosition,endPosition").text());
		describedCoverage["endPosition"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:endPosition,endPosition").text();
		console.log ("axisLabels : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gml\\:axisLabels,axisLabels").text());
		describedCoverage["axisLabels"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gml\\:axisLabels,axisLabels").text();
		console.log ("lowerCorner : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:lowerCorner,lowerCorner").text());
		describedCoverage["lowerCorner"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:lowerCorner,lowerCorner").text();
		console.log ("upperCorner : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:upperCorner,upperCorner").text());
		describedCoverage["upperCorner"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:boundedBy gml\\:EnvelopeWithTimePeriod gml\\:upperCorner,upperCorner").text();
		console.log ("low : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gml\\:limits gml\\:GridEnvelope gml\\:low,low").text());
		describedCoverage["low"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gml\\:limits gml\\:GridEnvelope gml\\:low,low").text();
		console.log ("high : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gml\\:limits gml\\:GridEnvelope gml\\:high,high").text());
		describedCoverage["high"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gml\\:limits gml\\:GridEnvelope gml\\:high,high").text();
		console.log ("pos : "+$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gmlrgrid\\:origin gml\\:Point gml\\:pos,pos").text());
		describedCoverage["pos"]=$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gmlrgrid\\:origin gml\\:Point gml\\:pos,pos").text();
		console.log ("boucle sur les axes :");
		describedCoverage["Axes"]=[];
		$(xml).find("wcs\\:CoverageDescriptions wcs\\:CoverageDescription gml\\:domainSet gmlrgrid\\:ReferenceableGridByVectors gmlrgrid\\:generalGridAxis gmlrgrid\\:GeneralGridAxis,GeneralGridAxis").each(function(){
			var axe=[];
			var chaine=$(this).find("gmlrgrid\\:gridAxesSpanned,gridAxesSpanned").text();
			console.log("********** nom de l'axe : "+chaine+"   ***************");
			axe["nomAxe"]=chaine;
			var chaine=$(this).find("gmlrgrid\\:offsetVector,offsetVector").text();
			console.log("           offsetVector : "+chaine);
			axe["offsetVector"]=chaine;
			var chaine=$(this).find("gmlrgrid\\:coefficients,coefficients").text();
			console.log("           Axis coefficients : "+chaine);
			axe["Axiscoefficients"]=chaine;
			describedCoverage["Axes"].push(axe);
		});
	}
	console.table(describedCoverage);
	return describedCoverage;
}