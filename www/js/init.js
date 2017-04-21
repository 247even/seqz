var seqz = {
    "id": "0000",
    "pw": null,
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
    "timeBonus1": [],
    "timeBonus2": [],
    "timeBonus": [],
    "score": null,
    "activeIndex": -1,
    "readyIndex": -1
}

var aniend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var response;
var playerPending = true;
var readyPending = true;
var busy = true;
var seqzSource = null;
var testMode = true;
var queryId = getQuerySeqz("id");
console.log("queryId: " + queryId);

ready(function() {

    window.localStorage.clear();
    $('#seqz-id-input').val('');
    idButtonDisable(true)

    if (queryId) {
        seqzSource = 'data/seqz/' + queryId + '_seqz.json';
        $('#seqz-id-input').val(queryId);
        fileExists('./data/seqz/' + queryId + '_seqz.json', function(exists) {
            if (exists) {
                idButtonDisable(false)
            }
        });
    }

    $('#seqz-id-input').on('change keyup', function(e) {
        if (e.keyCode == 32) {
            //e.preventDefault();
            //e.stopPropagation();
            //$(this).val($(this).val().trim());
            //console.log('space');
            //return false;
        }
        var val = $(this).val().trim();
        $(this).val(val);

        if (!val || val.length <= 4) {
            idButtonDisable(true)
            return false;
        }

        if (val.length > 4) {

            fileExists('./data/seqz/' + val + '_seqz.json', function(exists) {
                if (exists) {
                    idButtonDisable(false)
                }
            });
        }
    });

    $('#seqz-id-button').on('click', function(e) {
        e.preventDefault();
        var val = $('#seqz-id-input').val().trim();
        if (val) {
            seqzSource = 'data/seqz/' + val + '_seqz.json';
            loadSeqz();
        }
    });

    /*
        $(window).on('load resize', debounce(
            function() {
                $('#question').center();
                //$('#loginscreen').center();
                console.log("resize")
            }, 200, false));
        */

    //    checkHead('responses/'+seqz.id+'_'+seqz.user+'.json');
    headRequest('data/responses/uschi3ulli_1.json');

    loadSeqz();

    $('#export-container').on('click', function(){
      makeImage();
    });

});
