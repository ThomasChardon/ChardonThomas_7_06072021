

export function sqlToJsDate(sqlDate){
    //sqlDate in SQL DATETIME format ("2009-05-14T04:42:00.000Z")
    var sqlDateArr1 = sqlDate.split('-');
    //format of sqlDateArr1[] = ['yyyy','mm','ddThh:mm:msZ']
    var sYear = sqlDateArr1[0];
    var sMonth = sqlDateArr1[1];
    var sqlDateArr2 = sqlDateArr1[2].split("T");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    var sDay = sqlDateArr2[0];

	//Pour sélectionner heures et minutes si besoin :
    // var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    // var sHour = sqlDateArr3[0];
    // var sMinute = sqlDateArr3[1];

	var date_temporaire = new Date(sYear,sMonth,sDay);
	var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
	let date_post = (date_temporaire.toLocaleDateString("fr-FR", options));

    return date_post;
}