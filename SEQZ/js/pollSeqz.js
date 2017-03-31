function loadJSON(url, fn) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
            var seqz2 = JSON.parse(req.responseText);
            seqz = extend(seqz, seqz2);
            console.log(seqz);
            fn();
        } else {
          // some error handling tba...
        }
    };

    req.onerror = function() {
        //console.log('connection error');
    };

    req.send();
};

function deleteJSON(id, fn) {
    var req = new XMLHttpRequest();
    req.open('GET', 'polling.php?del='+id, true);

    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
            //req.responseText = 2 ==> two files deleted
            //console.log(req.responseText);
            fn();
        } else {
          // some error handling tba...
        }
    };

    req.onerror = function() {
        //console.log('connection error');
    };

    req.send();
};

function pollSeqz() {

    function doPoll() {
        console.log('doPoll()...');
        if(busy){
          console.log('busy: '+busy);
          return false;
        }

        var req = new XMLHttpRequest();

        if (playerPending) {
            if (!seqz.User) {
                return false;
            }
            var data = 'id=' + seqz.id + '&u=' + seqz.User + '&t=' + Date.now();
        } else {
            var data = setData();
            //var data = localStorage.getItem('seqz' + seqz.id + '_answers');
        }
        console.log(data);

        var url = 'polling.php?' + data;
        req.open('GET', url, true);
        req.onload = function() {
            //busy = true;
            if (req.status >= 200 && req.status < 400) {
                busy = true;
                //console.log(req.responseText);
                //var response = req.responseText;
                try {
                    response = JSON.parse(req.responseText);
                    console.log(response);
                } catch (e) {
                    console.log(e);
                    console.log(req.responseText);
                }

                if (playerPending) {
                    console.log("Player/s pending...");
                    checkPlayers();
                    return false;
                }

                if (readyPending) {
                    console.log('readyPending: '+readyPending);
                    checkReady();
                    return false;
                }

                localStorage.setItem('seqz' + seqz.id + '_response', response);

                seqz.response1 = response.a1;
                seqz.response2 = response.a2;
                //console.log(seqz);

                checkMatch();

                console.log(seqz);

                //fn();
                //busy = false;
            } else {
              // some kind of error handling tba...
            }
        };
        req.onerror = function() {
            //console.log('connection error');
        };
        req.send();
    };

    var pollTimer = setInterval(
        function() {
            //console.log('pollTimer');
            if (!busy) {
                doPoll();
            }
        }, 2000);

};

pollSeqz();
