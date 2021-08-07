
export function $_GET(argument) {
    const url = new URL(window.location.href); // url vaut l'url de la page en cours
    const tempurl = url.href.split(argument);
    return tempurl[1]; // cherche l'argument dans les parametres de l'url. Renvoie null ou la valeur de cet argument
}

export function sqlToJsDate(sqlDate) {
    var sqlDateArr1 = sqlDate.split('-');
    var sYear = sqlDateArr1[0];
    var sMonth = sqlDateArr1[1];
    var sDay = sqlDateArr1[2].substr(0, 2);

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
