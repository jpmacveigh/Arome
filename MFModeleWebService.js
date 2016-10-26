function MFModeleWebService(nomModel){
	this.lesCouches=getAromeWMSCapabilities(nomModel);  		// Exécution de la requête GetCapabilities du WMS (Web Map Service) 
	this.lesCoverageIds=getAromeWCSCapabilities(nomModel)  	// Exécution de la requête GetCapabilities du WCS (Web Coverage Service)
	this.getLesCouches=getLesCouches;							// Renvoie la liste des cartes accessibles par la requête GetMap du WMS
	this.getLesCoverageIds=getLesCoverageIds;				// Renvoie la liste des coverages accessibles par le requête GetCoverage du WCS
	this.nbCouches=Object.keys(this.lesCouches).length;
	this.lesNomsDesCouches=Object.keys(this.lesCouches);
	function getLesCouches(){
		return this.lesCouches;
	}
	function getLesCoverageIds(){
		return this.lesCoverageIds;
	}
	function getNomModel(){
		return this.nomModel;
	}
}