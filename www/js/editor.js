var newSeqz;
var total = 0;
var queryId = getQuerySeqz("id");

function setStatus(t) {
    var t = t ? t : total;
    var status = "Du hast noch keine Fragen.";
    if (t == 1) {
        status = "Du hast eine Frage.";
    }
    if (t > 1) {
        status = "Du hast " + t + " Fragen.";
    }
    $('#status').html(status);
};

function checkValid() {

    fragenObjects = fragenVal.split('\n\n');
    var fOl = fragenObjects.length;

    console.log("fragenObjects:");
    console.log(fragenObjects);

    for (var i = 0; i < fOl; i++) {
        if (!fragenObjects[i]) {
            break;
        }
        var frage = fragenObjects[i].split('\n');
        console.log("frage:");
        console.log(frage);

        var frl = frage.length;

        if (frl == 1) {
            console.log('keine Antwort');
            fragenObjects.splice(i + 1, 1);
            fragenObjects[i] = fragenObjects[i] + '\n';
            $('#fragen-area').val(fragenObjects.join('\n\n'));
            return false;
        }
        if (frl == 2) {
            console.log('zu wenige Antworten');
            fragenObjects.splice(i + 1, 1);
            fragenObjects[i] = fragenObjects[i];
            $('#fragen-area').val(fragenObjects.join('\n\n'));
            return false;
        }

        for (var j = 0; j < frl; j++) {
            if (frage[j]) {
                frage[j] = frage[j].trim();
            }
        }
        valid++;
        fragenObjects[i] = frage.join('\n');
    }

    console.log("fragenObjects Output:");
    console.log(fragenObjects);
    setStatus(valid);
    $('#fragen-area').val(fragenObjects.join('\n\n'));
};

function newNewSeqz() {

    if (!newSeqz) {

        if (!$('#name1').val()) {
            toastr.info('Spieler 1 fehlt!');
            $('#name1').focus();
            return false;
        }

        if (!$('#name2').val()) {
            toastr.info('Spieler 2 fehlt!');
            $('#name2').focus();
            return false;
        }

        var player1 = $('#name1').val().trim();
        var player2 = $('#name2').val().trim();
        //        var id = (player1 + player2).toLowerCase();
        var id = makeId(player1 + player2 + $.now());

        //var passwort = $('#password').val().trim();
        var passwort;

        newSeqz = {
            "id": id,
            "Player1": player1,
            "Player2": player2,
            "Fragen": [],
            "md5": null
        };

        console.log(newSeqz);

        if (passwort) {
            newSeqz['Passwort'] = passwort;
        }

        //localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
        setEditorData();
    }

};

function pushNewSeqz(frage) {
    console.log("pushNewSeqz()");

    newNewSeqz();
    newSeqz.Fragen.push(frage);
    //localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
    setEditorData();
    //saveSeqz();

    var key = newSeqz.Fragen.length - 1;
    console.log(newSeqz);
    console.log('#frage-tmpl' + newSeqz.Fragen[key].Antworten.length);
    prototype({
        'template': '#frage-tmpl' + newSeqz.Fragen[key].Antworten.length,
        'selectors': {
            'nr': (parseInt(key) + 1),
            'frage': newSeqz.Fragen[key].Frage,
            'antwort1': newSeqz.Fragen[key].Antworten[0],
            'antwort2': newSeqz.Fragen[key].Antworten[1],
            'antwort3': newSeqz.Fragen[key].Antworten[2],
            'antwort4': newSeqz.Fragen[key].Antworten[3],
        },
        'targets': '#seqzOutput'
    });

    $('.delete-row').off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).parent().remove();
        updateNewSeqz();
    });

    sortable('.sortable', {
        forcePlaceholderSize: true
    })[0].addEventListener('sortupdate', function(e) {
        console.log("update");
        updateNewSeqz();
    });

    gotoBottom();

    if (newSeqz.Fragen.length == 1) {
        $('#fragen-row').removeClass('hidden');
        $('#speichern-row').removeClass('hidden').animateCss('fadeInDown');
    }

    /*
        inview.destroy();
        setInview();
        */
};

function newSeqzOutput() {
    var total = newSeqz.Fragen.length;
    $('#seqzOutput').html('');

    for (var key in newSeqz.Fragen) {

        var Frage = newSeqz.Fragen[key].Frage;

        prototype({
            'template': '#frage-tmpl' + newSeqz.Fragen[key].Antworten.length,
            'selectors': {
                'nr': (parseInt(key) + 1),
                'frage': Frage,
                'antwort1': newSeqz.Fragen[key].Antworten[0],
                'antwort2': newSeqz.Fragen[key].Antworten[1],
                'antwort3': newSeqz.Fragen[key].Antworten[2],
                'antwort4': newSeqz.Fragen[key].Antworten[3],
            },
            'targets': '#seqzOutput'
        });
    }

    $('.delete-row').on('click', function(e) {
        e.preventDefault();
        $(this).parent().remove();
        updateNewSeqz();
    });

    sortable('.sortable', {
        forcePlaceholderSize: true
    })[0].addEventListener('sortupdate', function(e) {
        console.log("update");
        updateNewSeqz();
    });
    /*
        inview.destroy();
        setInview();
        */

    gotoBottom();
};

function updateNewSeqz() {
    newSeqz.Fragen = null;
    newSeqz.Fragen = [];

    $('#seqzOutput .form-row').each(function() {
        var frageOutput = {};
        frageOutput['Frage'] = $(this).find('.frage').html().trim();
        frageOutput['Antworten'] = [
            $(this).find('.antwort1').html().trim(),
            $(this).find('.antwort2').html().trim(),
            $(this).find('.antwort3').html().trim(),
            $(this).find('.antwort4').html().trim()
        ];

        // remove empty values:
        frageOutput.Antworten = frageOutput.Antworten.filter(function() {
            return true;
        });

        newSeqz.Fragen.push(frageOutput);

    });

    //localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
    setEditorData();
    saveSeqz();

    if (newSeqz.Fragen.length < 1) {
        $('#speichern-row').addClass('hidden');
    }
    newSeqzOutput();
    console.log(newSeqz);
};

function buildComfortSeqz() {
    var fr = $('#comfort-frage').val().trim();
    var aw1 = $('#comfort-aw1').val().trim();
    var aw2 = $('#comfort-aw2').val().trim();
    var aw3 = $('#comfort-aw3').val().trim();
    var aw4 = $('#comfort-aw4').val().trim();

    if (!fr) {
        console.log('keine Frage');
        return false;
    }

    if (!aw1) {
        console.log('keine Antwort 2');
        return false;
    }

    if (!aw2) {
        console.log('keine Antwort 2');
        return false;
    }

    var frageOutput = {};
    frageOutput['Frage'] = fr;
    frageOutput['Antworten'] = [aw1, aw2];

    if (aw3) {
        frageOutput.Antworten.push(aw3);
    }
    if (aw4) {
        frageOutput.Antworten.push(aw4);
    }

    // remove empty values: bullshit?
    frageOutput.Antworten = frageOutput.Antworten.filter(function() {
        return true;
    });

    pushNewSeqz(frageOutput);
    //addHash();

    //newSeqzOutput();
    resetComfort();
};

function resetComfort() {
    $('input').val('');
    //$('#seqzId').val('');
    //$('#seqzUrl').val('');
    $('#comfort-editor textarea').val('');
    $('#name1').focus();

    //$('#comfort-editor input').val('');
};

/*
function setInview() {
    inview = new Waypoint.Inview({
        element: $('#footer-shadow')[0],
        enter: function(direction) {
            console.log('Enter triggered with direction ' + direction);
            if ($('#editor-footer').hasClass('inactive')) {
                $('#editor-footer').removeClass('inactive').animateCss('slideInUp');
            }
        },
        entered: function(direction) {
            console.log('Entered triggered with direction ' + direction)
        },
        exit: function(direction) {
            console.log('Exit triggered with direction ' + direction)
        },
        exited: function(direction) {

            if (!$('#editor-footer').hasClass('inactive')) {
                $('#editor-footer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $('#editor-footer').addClass('inactive');
                }).animateCss('slideOutDown');
            }
            console.log('Exited triggered with direction ' + direction)
        }
    });
};

var inview;
*/

ready(function() {
    resetComfort();
    setStatus();

    if (queryId) {
        fileExists('./data/seqz/' + queryId + '_seqz.json', function(exists) {
            if (exists) {
                loadEditorSeqz('./data/seqz/' + queryId + '_seqz.json');
                return false;
            }

            toastr.info('SEQZ "' + queryId + '" ist unbekannt.');
        });
    }

    //setInview();
    // trigger click outside:
    $(document).on('mouseup', function(e) {
        var container = $('#comfort-editor .noenter');
        // if the target of the click isn't the container...
        // ... nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            console.log("click outside");
            buildComfortSeqz();
        }
    });

    $('.name-input').on('change blur', function() {
        if (!newSeqz) {
            newNewSeqz();
            return false;
        }
        newSeqz.Player1 = $('#name1').val().trim();
        newSeqz.Player2 = $('#name2').val().trim();
        newSeqz.id = makeId(newSeqz.Player1 + newSeqz.Player2 + $.now());
    }).on('keydown', function(e) {
        var key = e.keyCode;

        if (key === 13) {
            if ($('#name1').val() && $('#name2').val()) {
              e.preventDefault();
                $('#comfort-frage').focus();
            }
        }

        if (key === 9 || key === 13) {
            if (!$(this).val()) {
                //e.preventDefault();
                return false;
            }

        }

        if (!(key >= 65 && key <= 120) && (key != 32 && key != 0 && key != 8 && key != 9 && key != 13)) {
            e.preventDefault();
            console.log("Char not allowed");
            return false;
        }
    });

    $('#comfort-editor .noenter').on('keydown', function(e) {
        //e.preventDefault();
        if (e.keyCode === 13 || e.keyCode === 9) {
            e.preventDefault();
            var id = $(this).attr('id');
            var val = $(this).val().trim();
            $(this).val(val);
            console.log(id);

            if (!$('#comfort-frage').val()) {
                toastr.info('Ohne Frage, keine Amtwort... ;-)');
                $('#comfort-frage').focus();
                return false;
            }

            if (id == 'comfort-aw1' || id == 'comfort-aw2') {
                if (!val) {
                    toastr.info('Da fehlt doch was?!');
                    return false;
                }
            }

            if (id == 'comfort-aw3' || id == 'comfort-aw4') {
                if (!$('#comfort-aw1').val() || !$('#comfort-aw2').val()) {
                    toastr.info('Minimum zwei Antworten bitte!');
                    return false;
                }
            }


            if ($(this).attr('data-target')) {
                $('#' + $(this).attr('data-target')).focus();
            }
            if ($(this).attr('id') == "comfort-aw4") {

                buildComfortSeqz();
            }
            return false;
        }

    }).on('blur', function() {
        console.log('blur');
        //buildComfort();
    });

    $('#fragen-area').on('keyup', function(e) {
        e.preventDefault();
        //autoGrow(this, '100px');
        if (e.keyCode === 13 || e.keyCode === 8) {
            //console.log("Enter");
            buildQuickSeqz();
        }
    }).on('blur', function(e) {
        console.log('blur');
        e.preventDefault();
        //checkValid();
        buildQuickSeqz();
        //autoGrow(this, '100px');
    });

    $('#submit-btn').on('click', function(e) {
        e.preventDefault();
        //buildQuickSeqz();
        if (!newSeqz) {
            console.log("no new seqz");
            return false;
        }
        if (!newSeqz.Player1) {
            toastr.info('Spieler 1 fehlt!');
            return false;
        }
        if (!newSeqz.Player1) {
            toastr.info('Spieler 2 fehlt!');
            return false;
        }
        if (!newSeqz.id) {
            console.log("no id");
            return false;
        }
        //checkOverwrite('seqz/' + id + '_seqz.json', function(){
        saveSeqz();
        //});
    });

    $('.link-button').on('click', function(e) {
        var url = $('#seqzUrl').val();
        window.open(url, '_blank', '');
    });

    $('#copy-url-button').on('click', function() {
        $('#seqzUrl').select();
        var url = $('#seqzUrl').val();

        if (!url) {
            return false;
        }

        try {
            if (document.execCommand('copy')) {
                toastr.info('SEQZ-URL in die Zwischenablage kopiert');
            };
            //var msg = successful ? 'successful' : 'unsuccessful';
            //console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });

    $('#copy-id-button').on('click', function() {
        $('#seqzId').select();
        var id = $('#seqzId').val();
        if (!id) {
            return false;
        }
        try {
            if (document.execCommand('copy')) {
                toastr.info('SEQZ-ID in die Zwischenablage kopiert');
            };
            //var msg = successful ? 'successful' : 'unsuccessful';
            //console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });

});
