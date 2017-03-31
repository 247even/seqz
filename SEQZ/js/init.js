function setPlayers() {
    $('#log-player1').html("Hallo " + seqz.Player1 + "!");
    $('#log-player2').html("Hallo " + seqz.Player2 + "!");
    $('.playerselect').on('mousedown', function(e) {
        e.preventDefault();
        seqz.User = $(this).attr("data-player");
        $('.playerselect.selected').removeClass('selected');
        $(this).addClass('selected').detach().prependTo('#log-in');
        busy = false;
    })
};

function checkPlayers() {
    busy = true;
    if (!seqz.User) {
        console.log("checkPlayers: no Player chosen");
        busy = true;
        return false;
    }
    if (typeof response == 'undefined' || response == false) {
        console.log("checkPlayers: no response");
        busy = false;
        return false;
    }

    if (testMode) {
        response.u = 1;
        console.log("testMode Player set");
    }

    if (typeof response.u == 'undefined') {
        console.log("checkPlayers: no response.u");
        busy = false;
        return false;
    }
    if (seqz.User === response.u) {
        console.log("checkPlayers: matching players");
        busy = false;
        return false;
    }

    seqz.Opponent = response.u;
    localStorage.setItem('seqz' + seqz.id + '_user', seqz.User);
    console.log("You are: " + seqz['Player' + seqz.User]);
    console.log("Your opponent: " + seqz['Player' + seqz.Opponent]);

    $('.readybutton-warte').html("Warte auf " + seqz['Player' + seqz.Opponent] + "...");
    $('user').html(seqz['Player' + seqz.User]);
    $('opponent').html(seqz['Player' + seqz.Opponent]);

    seqz.readyIndex = 0;
    setReadybutton();

    playerPending = false;
    buildSeqz();

    $('#loginscreen').one(aniend, function() {
        $(this).hide();
        $('#readyscreen').one(aniend, function() {
            //$(this).show();
            $('#readybutton').show().animateCss('fadeInUp');
        }).show().animateCss('fadeIn');
    }).animateCss('fadeOut');

};

function setReadybutton() {
    $('.readybutton-bereit').show();
    $('.readybutton-warte').hide().removeClass('animated');

    $('.readybutton').off('click').on('click', function(e) {
        e.preventDefault();
        $(this).off('click');
        $(this).find('.readybutton-bereit').hide();
        $(this).find('.readybutton-warte').show().animateCss('flash');
        seqz.readyIndex = seqz.activeIndex + 1;

        console.log("seqz.readyIndex: " + seqz.readyIndex);

        busy = false;
        //checkReady();
    });
}

function checkReady() {
    console.log('checkReady...');
    busy = true;

    var rri;
    var sri = seqz.readyIndex;
    var sai = seqz.activeIndex;

    if (typeof sri == 'undefined' || sri <= sai) {
        console.log('no valid readyIndex');
        return false;
    }

    if (!response) {
        console.log('no response');
        busy = false;
        return false;
    }

    var rri = response.ri;

    if (testMode) {
        rri = sri;
        response.ri = sri;
    }

    if (typeof rri == 'undefined' || rri == null || rri == sai) {
        console.log('response.ri failure');
        busy = false;
        return false;
    }

    if (rri == sri) {
        readyPending = false;
        console.log('ready! Go...');
        $('#interscreen').hide();
        $('#main').show();
        setActive(sri);
        setReadybutton();
    }
};

function setActive(ind) {
    busy = true;
    console.log('setActive: ' + ind);
    stopSeqzTimer()
    clearSeqzTimer();
    $('.question').removeClass('active').addClass('inactive');

    if (seqz.activeIndex == ind) {
        console.log('ind already active');
        return false;
    }

    if (ind == 0) {
        $('#readyscreen').hide();
    }

    // fade out
    if (ind > seqz.activeIndex && ind != 0) {
        console.log('fadeOut...');
        $('#id' + seqz.activeIndex).one(aniend, function() {
            $(this).hide();
            //$('#id' + seqz.activeIndex).hide();
        }).animateCss('fadeOut');
    }

    // fade in
    $('#id' + ind).one(aniend, function() {
        //$('#id' + ind).show();
        $(this).show();
    }).show().animateCss('fadeIn');

    $('#id' + ind).removeClass('inactive').addClass('active');
    //seqz.activeIndex = seqz.readyIndex;
    seqz.activeIndex = ind;
    var total = seqz.Fragen.length;
    readyPending = false;

    //$('#footer-status').html('Frage ' + (ind + 1) + ' von ' + total + ' // ');
    $('frage').html((ind + 1));
    $('total').html(total);
    console.log('Frage ' + (ind + 1) + ' von ' + total + ' // ');

    if (seqz.activeIndex >= total) {
        console.log("setActive() - ende");
        clearSeqzTimer();

        function getSum(total, num) {
            return total + num;
        }

        var resultTotal = seqz.match.reduce(getSum);
        var resultMax = seqz.Fragen.length * 2;
        var comax = resultMax / 4;
        var co = resultMax / resultTotal;

        $('#resultscreen .result-total').html(resultTotal);
        $('#resultscreen .result-max').html(resultMax);
        $('#resultscreen .resultdiv').hide();
        if (co < 2) {
            // Wow!
            $('#resultscreen .result1').show();
        } else if (co >= 2 && co < 3) {
            // Okay
            $('#resultscreen .result2').show();
        } else if (co < 4) {
            // bad
            $('#resultscreen .result3').show();
        } else {
            // wtf
            $('#resultscreen .result4').show();
        }

        $('#resultscreen').show();

        return false;
    }

    //if (timer) {
    seqzTimer();
    //}
};

function setAnswer(index, answer, value) {
    //seqz.Fragen[index]["answer1"] = value;
    busy = true;
    var a = 0;

    if (index != seqz.activeIndex) {
        console.log(index + ' // ' + seqz.activeIndex);
        console.log("Index failure!");
        return false;
    }

    if (answer == 1) {
        a++;
        seqz.time1[index] = sqt;
        seqz.answers1[index] = parseInt(value);
    }
    if (answer == 2) {
        a++;
        seqz.time2[index] = sqt;
        seqz.answers2[index] = parseInt(value);
    }

    if (seqz.time1[index] && seqz.time2[index]) {
        seqz.time = seqz.time2[index];
        if (seqz.time1[index] > seqz.time) {
            seqz.time = seqz.time1[index];
        }
    }

    if (a >= 2) {
        busy = false;
    }

    if (seqz.answers1[index] && seqz.answers2[index]) {
        busy = false;
    }
};

function setData() {
    var data = 'id=' + seqz.id + '&u=' + seqz.User + '&ai=' + seqz.activeIndex + '&ri=' + seqz.readyIndex + '&a1=' + JSON.stringify(seqz.answers1) + '&a2=' + JSON.stringify(seqz.answers2) + '&ti=' + seqz.time + '&t=' + Date.now();
    localStorage.setItem('seqz' + seqz.id + '_answers', data);
    return data;
};


function checkMatch() {
    console.log('checkMatch...');
    // check if we have all results for activeIndex

    clearSeqzTimer();
    //stopSeqzTimer();

    var match = [0, 0];
    var m = 0;
    var ai = seqz.activeIndex;

    if (!seqz.answers1[ai] || !seqz.answers2[ai]) {
        console.log('answer/s missing');
        busy = true;
        return false;
    }

    if (testMode) {
        response.a2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        response.a1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }

    if (!response || !response.a1 || !response.a2) {
        console.log('no response a1 / a2');
        busy = false;
        return false;
    }

    if (response.a1[ai] == null || typeof response.a1[ai] == 'undefined') {
        // still waiting for both responses...
        busy = false;
        return false;
    }
    if (response.a2[ai] == null || typeof response.a2[ai] == 'undefined') {
        // still waiting for both responses...
        busy = false;
        return false;
    }


    var qu = $('.question:eq(' + ai + ')');

    qu.find('.antwort').off('click');

    seqz.match1[ai] = 0;
    seqz.match2[ai] = 0;
    seqz.timeBonus1[ai] = 0;
    seqz.timeBonus2[ai] = 0;

    if (testMode) {
      response.ti = seqz.time;
    }

    if (response.a2[ai] == seqz.answers1[ai]) {
        // he guessed right
        match[1] = 1;
        m++;
        seqz.match2[ai] = 1;

        // opponent timeBonus:
        seqz.timeBonus2[ai] = timeBonus(parseInt(response.ti));

        qu.find('.match-badge1').show().animateCss('tada');
    } else {
        qu.find('.fail-badge1').show().animateCss('fadeIn');
    }

    if (response.a1[ai] == seqz.answers2[ai]) {
        // you guessed right
        match[0] = 1;
        m++;
        seqz.match1[ai] = 1;

        // personal timeBonus:
        seqz.timeBonus1[ai] = timeBonus(seqz.time);

        setTimeout(function() {
            qu.find('.match-badge2').show().animateCss('tada');
        }, m * 500 - 500);
    } else {
        qu.find('.fail-badge2').show().animateCss('fadeIn');
    }

    seqz['result'][ai] = match;

    var tBonus = seqz.timeBonus1[ai];
    console.log('response.ti: '+response.ti);
    if (parseInt(response.ti) > seqz.time) {
        console.log(response.ti + '>' + seqz.time);
        seqz.time = response.ti;
        tBonus = seqz.timeBonus2[ai];
    }

    /*
        var tm = (seqz.time / (seqz.Timer * 1000) ) * 100;
        var timeBonus = Math.round( (50 - ((50 / 100) * tm )) / 2 );
        console.log("TimeBonus: "+timeBonus);
    */

    //var tBonus = timeBonus(seqz.time);

    if (m == 1) {
        seqz.timeBonus[ai] = tBonus;
        $('#bonus-splash').html("+" + seqz.timeBonus);
    }

    if (m == 2) {
        seqz.timeBonus[ai] = tBonus * 2;
        $('#bonus-splash').html("+" + seqz.timeBonus);

        setTimeout(function() {
            $('#splash').one(aniend, function() {
                $('#splash').hide();

                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": true,
                    "onclick": null,
                    "positionClass": "toast-bottom-center",
                    "timeOut": "4000",
                };

                setTimeout(function(){
                    toastr.success('+50 P', 'Match 1:');
                    seqz.score = seqz.score + 50;
                    $('score').html(seqz.score);
                }, 500);

                setTimeout(function(){
                    toastr.success('+50 P', 'Match 2:');
                    seqz.score = seqz.score + 50;
                    $('score').html(seqz.score);
                }, 1000);

                setTimeout(function(){
                    if (seqz.timeBonus[ai] > 1) {
                        toastr.success('+' + seqz.timeBonus[ai] + 'P', 'Zeit-Bonus:');
                        seqz.score = seqz.score + seqz.timeBonus[ai];
                        $('score').html(seqz.score);
                    }
                }, 1500);

                /*
                $('#bonus-splash').one(aniend, function(){
                      $('#bonus-splash').hide();
                }).show().animateCss('tada');
                */
            }).show().animateCss('tada');
        }, 800);
    }

    busy = true;
    console.log("Match: " + m);
    seqz.match[ai] = m;

    setTimeout(function() {
        readyPending = true;
        seqz.readyIndex = seqz.activeIndex;

        setReadybutton();
        $('#interscreen').show();
    }, 2000);

    if (m == 0) {
        // no match
    } else if (m = 1) {
        // single match

    } else if (m = 2) {
        // Monster Match
    }
};

function setScore(i) {
    console.log('setScore()...');
    var totalScore;
    var time = seqz.time2[i];
    var l = seqz.match.length

    if (seqz.time1[i] > time) {
        time = seqz.time1[i];
    }

    for (var i = 0; i < l; ++i) {
        total += seqz.match[i];
    }
    totalScore = total * 50;

};

function buildSeqz() {
    console.log('buildSeqz...');

    var i = 0;
    var total = seqz.Fragen.length;

    console.log("Build Opponent: " + seqz['Player' + seqz.Opponent]);

    for (var key in seqz.Fragen) {
        i++;
        var q = seqz.Fragen[key];
        var qid = 'id' + key;

        seqz.answers1.push(null);
        seqz.answers2.push(null);

        if (!q.Typ) {
            q.Typ = 'mp' + q.Antworten.length;
            seqz.Fragen[key]['Typ'] = q.Typ;
        }

        prototype({
            'template': '#tpl-' + q.Typ,
            'selectors': {
                'id': qid,
                'name2': seqz['Player' + seqz.Opponent],
                'frage': q.Frage,
                'ind': i - 1,
                'nr': i,
                'total': total,
                'a1': q.Antworten[0],
                'a2': q.Antworten[1],
                'a3': q.Antworten[2],
                'a4': q.Antworten[3],
                'oppo': seqz['Player' + seqz.Opponent]
            },
            'targets': '#quiz-wrapper'
        });

        $('#' + qid + ' .answers1 .antwort').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.answers1').find('.antwort').removeClass('selected');
            $(this).addClass('selected');
            setAnswer($(this).attr('data-ind'), $(this).attr('data-a'), $(this).attr('data-index'));
        });

        $('#' + qid + ' .answers2 .antwort').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.answers2').find('.antwort').removeClass('selected');
            $(this).addClass('selected');
            setAnswer($(this).attr('data-ind'), $(this).attr('data-a'), $(this).attr('data-index'));
        });
    }
};

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
        seqzSource = 'seqz/' + query + '_seqz.json';
    }

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
