function MFModeleWebCoverageService(nomModel){
	this.lesCoverageIds=getAromeWCSCapabilities(nomModel)  	     // Exécution de la requête GetCapabilities du WCS (Web Coverage Service) qui renvoie la liste des coverages accessibles par la requête GetCoverage du WCS
	this.nbCoverages=Object.keys(this.lesCoverageIds).length;    // nombre de coverages proposés par le WCS via les requete "describeCoverage" puis "getCoverage"
	this.nomModel=nomModel;
}