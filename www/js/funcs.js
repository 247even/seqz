function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

/////////

var debounce = function(func, threshold, execAsap) {
    var timeout;

    return function debounced() {
        var obj = this,
            args =
            arguments;

        function delayed() {
            if (!execAsap)
                func.apply(obj, args);
            timeout = null;
        };

        if (timeout)
            clearTimeout(timeout);
        else if (execAsap)
            func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 100);
    };
};

(function($) {
    $.fn.center = function(vh) {
        this.css("position", "absolute")
            .css("top", ($(window).height() - this.height()) / 2 + "px");
        this.css("left", ($(window).width() - this.width()) / 2 + "px");
        return this;
    }
})(jQuery);


// Local Storage Test
function localStorageTest() {
    try {
        localStorage.setItem("test", "value");
        localStorage.removeItem("test");
        return true;
    } catch (e) {
        return false;
    }
};
///////////////////////////

function timeBonus(time) {
    if (!time || time < 1) {
        return 0;
    }
    var tm = (time / (seqz.Timer * 1000)) * 100;
    var timeBonus = Math.round((50 - ((50 / 100) * tm)) / 2);
    console.log("TimeBonus: " + timeBonus);
    return timeBonus;
};

// seqz-Timer
var sqt = 0;

function seqzTimer(cb, ts) {

    clearSeqzTimer();
    sqt = 0;
    var t = 0;
    var taktung = 250;
    var timeset = (ts) ? ts * 1000 : seqz.Timer * 1000;

    if (typeof timeset == 'undefined' || timeset == 0 || !timeset) {
        return false;
    }
    //console.log(timeset);

    window.stimer = setInterval(function() {
        t = t + taktung;
        sqt = t;
        //console.log(sqt);
        // tm = Prozent
        var tm = (t / timeset) * 100;
        $('.seqz-timer .seqz-timerbar').css('margin-left', tm + '%');
        if (tm >= 100) {
            clearInterval(window.stimer);
            if (cb) {
                cb();
            }
        }
    }, taktung);
};

function stopSeqzTimer() {
    clearInterval(window.stimer);
};

function clearSeqzTimer() {
    sqt = 0;
    clearInterval(window.stimer);
    $('.seqz-timer .seqz-timerbar').css('margin-left', '0%');
};


///// jquery for animate.css
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


////////
/*
        if(localStorageTest() === true){
            // available
            //alert('true');
        }else{
            // unavailable
            //alert('false');
        }
*/

////////////
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function getQuerySeqz(what) {
    var query;
    var user;

    var query = window.location.search.substring(1) ? window.location.search.substring(1) : false;
    if (!query) {
        return false;
    }

    if (query.length > 5) {
        var user = query.charAt(query.length - 1)
        if (user != 0 && user != 1 && user != 2) {
            user = false;
        } else {
          var query = query.substring(0, query.length-1);
        }
    }

    console.log("query ID: " + query);
    console.log("query User: " + user);

    if (!what || what == "id") {
        return query;
    }

    if (what == "user") {
        return user;
    }
    return false;
};

///////////////
/*
function extend(obj, src) {
	    for (var key in src) {
	        if (src.hasOwnProperty(key)) obj[key] = src[key];
	    }
	    return obj;
	}
  */

function extend(obj, src) {
    Object.keys(src).forEach(function(key) {
        obj[key] = src[key];
    });
    return obj;
}

/////////////////
Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            var c = 0;
            for (var i = 0, ll = this.length; i < ll; i++) {
                if (value == this[i]) {
                    c++;
                }
            }
            return c;
        }
    }
});

///////////////////
function autoGrow(element, init) {
    element.style.height = init;
    element.style.height = (element.scrollHeight + 10) + "px";
}

///////////
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp*/ ) {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        var res = new Array();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this))
                    res.push(val);
            }
        }

        return res;
    };
};

////////
function gotoBottom(sel) {
    var element = document.body;
    if (sel) {
        element = document.querySelector(sel);
    };
    element.scrollTop = element.scrollHeight - element.clientHeight;
};


////////////////////////////////////////////
function checkOnline() {
    if (navigator.onLine) {
        console.log("We're online.");
    } else {
        console.log("You are offline.");
    }
};
window.addEventListener('online', checkOnline());
window.addEventListener('offline', checkOnline());


/////////////////////////////////////////////

var feTimeout;

function fileExists(url, cb) {
    clearTimeout(feTimeout);
    var req = new XMLHttpRequest();
    req.open('HEAD', url);
    req.onreadystatechange = function() {
        var exists = false;
        if (req.readyState < 4) {
            feBusy = true;
        }
        if (req.readyState == 4 && req.status == 200) {
            exists = true;
            console.log(url + ' exists');
        }
        if (req.readyState == 4) {
            if (cb) {
                cb(exists);
            }
        }
    }

    feTimeout = setTimeout(
        function() {
            try {
                req.send()
            } catch (err) {
                //console.log(err);
            }
        },
        300
    );
};
