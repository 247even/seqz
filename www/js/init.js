var seqz = {
    "id": "0000",
    "Player1": "Uschi",
    "Player2": "Ulli",
    "User": false,
    "Timer": 60,
    "Fragen": [null],
    "answers1": [],
    "answers2": [],
    "response1": [],
    "response2": [],
    "result": [],
    "match": [],
    "match1": [],
    "match2": [],
    "time": [],
    "time1": [],
    "time2": [],
    "timeBonus1" : [],
    "timeBonus2" : [],
    "timeBonus" : [],
    "score" : null,
    "activeIndex": -1,
    "readyIndex": -1
}

var aniend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var response;
var playerPending = true;
var readyPending = true;
var busy = true;
var seqzSource = 'seqz/seqz.json';
var testMode = true;

ready(function() {

    window.localStorage.clear();

    /*
        $(window).on('load resize', debounce(
            function() {
                $('#question').center();
                //$('#loginscreen').center();
                console.log("resize")
            }, 200, false));
        */

    // wait for js to be loaded
    if (query) {
        seqzSource = 'data/seqz/' + query + '_seqz.json';
    }

//    checkHead('responses/'+seqz.id+'_'+seqz.user+'.json');
    headRequest('data/responses/uschi3ulli_1.json');


    loadJSON(seqzSource, function() {

        deleteJSON(seqz.id, function() {
            //seqzTimer();
            //stopSeqzTimer();
            //seqz.activeIndex = 0;
            setPlayers();
            //buildSeqz();
            //setActive('id1');
        })
    });

});
