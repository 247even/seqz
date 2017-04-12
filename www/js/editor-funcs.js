function loadEditorSeqz(url, cb) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
            newSeqz = JSON.parse(req.responseText);
            console.log(newSeqz);
            $('#name1').val(newSeqz.Player1);
            $('#name2').val(newSeqz.Player2);
            $('#seqzId').val(newSeqz.id);
            newSeqzOutput();
            if(cb){
                cb();
            }
        } else {
            // some error handling tba...
        }
    };

    req.onerror = function() {
        //console.log('connection error');
    };

    req.send();
};

function saveSeqz(id) {
    var http = new XMLHttpRequest();
    http.open("POST", "editor.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            $('#seqzId').val(http.responseText);
            var location = window.location.href.split('seqz');
            console.log(location);
            $('#seqzUrl').val(location[0] + 'seqz/?' + http.responseText);
            $('#url-row, #id-row').show().animateCss('fadeIn');
        }
    }
    setEditorData();
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

function addHash() {
  var hash = md5(newSeqz);
  console.log("hash: " + hash);
  newSeqz.md5 = hash;
};

function makeId(sostr){
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var sourceString = sostr ? sostr : possible;

    for ( var i=0; i < 5; i++ ) {
        var newChar = sourceString.charAt(Math.floor(Math.random() * sourceString.length));
        if (possible.indexOf(newChar) == -1){
          newChar = "0";
        }
        id += newChar;
    }

    return id;
};

function setEditorData() {
  addHash();
  localStorage.setItem('newSeqz_' + newSeqz.id, 'id=' + newSeqz.id + '&seqz=' + JSON.stringify(newSeqz) + '&t=' + Date.now());
};
