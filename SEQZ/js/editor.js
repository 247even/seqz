function saveSeqz(id) {
    var http = new XMLHttpRequest();
    http.open("POST", "editor.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            var location = window.location;
            location = location.href.split('seqz');
            console.log(location);
            $('#seqzUrl').val(location[0] + 'seqz/?' + http.responseText);
        }
    }
    var data = localStorage.getItem('newSeqz_' + newSeqz.id);
    console.log(data);
    if (data) {
        http.send(data);
    }
};

function checkOverwrite(url, cb) {
    var httpux = new XMLHttpRequest();
    httpux.open('HEAD', url);
    httpux.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            if (window.confirm("File exists. Overwrite?")) {
                cb();
            };
        } else {
            cb();
        }
    }
    httpux.send();
};

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

function buildQuickSeqz() {
    var errors = 0;
    var frageObject;
    var i;
    var fId = 0;
    var fSub = 0;
    var valid = 0;
    var Fragen = [];
    var passwort = $('#password').val();
    var fragenVal = $('#fragen-area').val();

    if (!fragenVal || fragenVal == '\n' || fragenVal == ' ') {
        console.log('no val');
        $('#fragen-area').val('');
        setStatus(0);
        return false;
    }

    // regex windows vs mac/linux:
    fragenVal = fragenVal.replace(/\r\n/g, '\n');

    // nothing to do:
    if (!fragenVal.includes('\n')) {
        console.log('no "n" found ');
        setStatus(0);
        return false;
    }

    // prevent triple linebreaks:
    if (fragenVal.includes('\n\n\n')) {
        console.log('"nnn" found ');
        fragenVal = fragenVal.replace(/\n\n\n/g, '\n\n');
        $('#fragen-area').val(fragenVal);
        return false;
    }

    if (!fragenVal.includes('\n\n')) {
        console.log('no "nn" found ');
        return false;
    }

    if (fragenVal.endsWith('\n\n')) {

    }

    var fragenObjects = fragenVal.trim().split('\n\n');
    // remove empty values:
    fragenObjects = fragenObjects.filter(function() {
        return true;
    });

    //console.log(fragenObjects.count(''));
    console.log("fragenObjects:");
    console.log(fragenObjects);
    var fOl = fragenObjects.length;
    for (var i = 0; i < fOl; i++) {

        frageOutput = null;
        frageOutput = {};
        frageOutput['Frage'] = null;
        frageOutput['Antworten'] = [];

        if (!fragenObjects[i]) {
            break;
        }
        var frageObject = fragenObjects[i].split('\n');
        frageObject = frageObject.filter(function() {
            return true;
        });
        var frl = frageObject.length;

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
            if (frageObject[j]) {
                if (j === 0) {
                    frageOutput.Frage = frageObject[j].trim();
                }
                if (j > 0) {
                    frageOutput.Antworten.push(frageObject[j].trim());
                }
            }
        }

        Fragen.push(frageOutput);
    }

    newNewSeqz();

    localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
    newSeqzOutput()
};

function newNewSeqz() {

    if (!newSeqz) {

        if(!$('#name1').val()){
          toastr.info('Spieler 1 fehlt!');
          $('#name1').focus();
          return false;
        }
        
        if(!$('#name2').val()){
          toastr.info('Spieler 2 fehlt!');
          $('#name2').focus();
          return false;
        }

        var player1 = $('#name1').val();
        var player2 = $('#name2').val();
        var id = (player1 + player2).toLowerCase();
        var passwort = $('#password').val();

        newSeqz = {
            "id": id,
            "Player1": player1,
            "Player2": player2,
            "Fragen": []
        };

        if (passwort) {
            newSeqz['Passwort'] = passwort;
        }

        localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());

    }

};

function pushNewSeqz(frage) {
    console.log("pushNewSeqz()");

    newNewSeqz();
    newSeqz.Fragen.push(frage);
    localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
    saveSeqz();

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

    localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
    saveSeqz();

    if (newSeqz.Fragen.length < 1) {
      $('#speichern-row').addClass('hidden');
    }
    newSeqzOutput();
    console.log(newSeqz);
};

var newSeqz;
var total = 0;

function jumpNextInput(e) {

}

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

    //newSeqzOutput();
    resetComfort();
}

function resetComfort() {
    $('#comfort-editor textarea').val('').focus();
    $('#comfort-editor input').val('');
}

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
var newSeqz;

ready(function() {
    resetComfort();
    setStatus();
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
        if(!newSeqz){
            newNewSeqz();
            return false;
        }
        newSeqz.Player1 = $('#name1').val().trim();
        newSeqz.Player2 = $('#name2').val().trim();
        newSeqz.id = (newSeqz.Player1 + newSeqz.Player2).toLowerCase();
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

    $('.link-button').on('click', function(e){
        var url = $('#seqzUrl').val();
        window.open(url, '_blank', '');
    });

    $('.copy-button').on('click', function(){
        $('#seqzUrl').select();
        var url = $('#seqzUrl').val();
        try {
          if (document.execCommand('copy')){
            toastr.info('SEQZ-URL in die Zwischenablage kopiert');
          };
          //var msg = successful ? 'successful' : 'unsuccessful';
          //console.log('Copying text command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
    });


});
