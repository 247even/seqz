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

    //localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
    setEditorData();
    newSeqzOutput()
};
