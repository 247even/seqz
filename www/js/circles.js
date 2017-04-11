/**
 * brown red: #590004 dark red: #8B010E dark pink: #F7244D light pink: #FF7289
 * pink: #FF6389 okker yellow: #FFC572 light yellow: #FFF3D5
 */

function circleSeqz() {
    var darkred = [
        "#B10E11",
        "#590004",
        "#8B010E",
    ]

    var red = [
        "#D21D26",
        "#FF2C48"
    ];

    var pinkred = [
        "#FF2745",
        "#F7244D",
        "#FF3A40",
    ];

    var lightpink = [
        //    "#FF6C88",
        "#FF7289",
        "#FF728A",
        "#FF6389",
    ];

    var yellow = [
        "#FFC572",
        "#FFF3D5",
        "#FFE785"
    ];

    var lightyellow = [
        "#FFFFF3",
        "#FFFEFF"
    ];

    var colorsBack = red.concat(pinkred, lightpink);
    var colorsFront = yellow.concat(lightyellow);

    var delay = 150;

    function makeCircles(container, colors, minSize, maxSize, minCount, maxCount) {

        var colorsLength = colors.length;

        /*    var minSize = 10;
            var maxSize = 300;
            var minCount = 5;
            var maxCount = 20;*/

        var containerHeight = $(container).outerHeight();
        var containerWidth = $(container).outerWidth();
        var count = Math.floor((Math.random() * maxCount) + minCount);
        $('#container').html();

        for (var i = 0; i < count; i++) {
            setTimeout(function() {
                var color = colors[Math.floor((Math.random() * colorsLength))];
                var size = Math.floor((Math.random() * maxSize) + minSize);
                var left = Math.floor((Math.random() * containerWidth));
                var top = Math.floor((Math.random() * containerHeight));
                var blur = Math.floor((Math.random() * 3) + 1);

                // Prozent
                size = (containerWidth / 100) * size;
                // add unit
                size = ( size / 10 )+ 'rem';

                var circleElement = '<div style="width:' + size + '; height:' + size + '; background-color:' + color + '; top:' + top + 'px; left:' + left + 'px;" class="circle blur' + blur + ' animated fadeIn"></div>';

                $(container).append(circleElement);
            }, (i * delay));

        }

    };

    makeCircles('#circles-bg', darkred, 8, 30, 3, 5);

    setTimeout(function() {
        makeCircles('#circles-back', colorsBack, 3, 20, 2, 4)
      }, delay
    );

    setTimeout(function() {
        makeCircles('#circles-front', colorsFront, 1, 10, 2, 4)
      }, (delay * 2)
    );

};



$(function() {
  circleSeqz();
});
