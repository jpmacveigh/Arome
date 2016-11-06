function MFModeleWebMapService(nomModel){
	this.lesCouches=getAromeWMSCapabilities(nomModel);  		// Exécution de la requête GetCapabilities du WMS (Web Map Service) qui renvoie la liste des cartes accessibles par la requête GetMap du WMS
	this.nbCouches=Object.keys(this.lesCouches).length;
	this.lesNomsDesCouches=Object.keys(this.lesCouches);
	this.nomModel=nomModel;
}