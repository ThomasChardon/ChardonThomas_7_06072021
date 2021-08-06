
export function $_GET(argument) { // export function : permet de l'envoyer dans d'autres fichiers js
    const url = new URL (window.location.href); // url vaut l'url de la page en cours
    const tempurl = url.href.split(argument);
    return tempurl[1]; // cherche l'argument dans les parametres de l'url. Renvoie null ou la valeur de cet argument
  }

export function sqlToJsDate(sqlDate) {
    //sqlDate in SQL DATETIME format ("2009-05-14T04:42:00.000Z")
    var sqlDateArr1 = sqlDate.split('-');
    //format of sqlDateArr1[] = ['yyyy','mm','ddThh:mm:msZ']
    var sYear = sqlDateArr1[0];
    var sMonth = sqlDateArr1[1];
    var sDay = sqlDateArr1[2].substr(0, 2);
    // var sqlDateArr2 = sqlDateArr1[2].split("T");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']

    //Pour sélectionner heures et minutes si besoin :
    // var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    // var sHour = sqlDateArr3[0];
    // var sMinute = sqlDateArr3[1];

    var date_temporaire = new Date(sYear, sMonth, sDay);
    var options = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
    let date_post = (date_temporaire.toLocaleDateString("fr-FR", options));

    return date_post;
};

export function dateDuJour() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    //2009-05-14 06:42:00
    if (mm < 10) {
        mm = '0' + mm;
    }

    var hh = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    if (hh < 10) {
        hh = '0' + hh;
    }

    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }

    today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
    return today;
};

export function getUserId() {
    let dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
    return dataUser.userId;
}

// export function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//       currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
//   }