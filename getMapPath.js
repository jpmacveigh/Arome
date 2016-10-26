function getMapPath(ws,limitesGeo,nomCouche){  // détermination de l'url du WMS de MF
	var referenceTime 	= getDernier (ws,nomCouche,"reference_time");
	var time			= getDernier (ws,nomCouche,"time");
	if (ws.getLesCouches()[nomCouche]["elevation"]){
		var elevation		= getDernier (ws,nomCouche,"elevation");
	}
	else {
		elevation = undefined;
	}
	return getMFWMSPath(ws,nomCouche,limitesGeo,referenceTime,time,elevation);
	function getDernier(ws,nomCouche,dim){
		var longueurDim=ws.getLesCouches()[nomCouche][dim].length;
		return (ws.getLesCouches()[nomCouche][dim][longueurDim-1]);
	}
}