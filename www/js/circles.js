/**
 * brown red: #590004 dark red: #8B010E dark pink: #F7244D light pink: #FF7289
 * pink: #FF6389 okker yellow: #FFC572 light yellow: #FFF3D5
 */

function circleSeqz() {
    var darkred = [
        "#4B0000",
        "#500000",
        "#B10E11",
        "#590004",
        "#8B010E",
    ];

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

    var colors3 = lightpink.concat(pinkred);
    var colors4 = yellow.concat(lightyellow);
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
        $(container).html();

        for (var i = 0; i < count; i++) {
            var color = colors[Math.floor((Math.random() * colorsLength))];
            var size = Math.floor((Math.random() * maxSize) + minSize);
            var left = Math.floor((Math.random() * containerWidth));
            var top = Math.floor((Math.random() * containerHeight));
            var blur = Math.floor((Math.random() * 3) + 1);

            // Prozent
            var factor = containerWidth > containerHeight ? containerWidth : containerHeight;
            size = (factor / 100) * size;
            // add unit
            //size = ( size / 10 )+ 'rem';
            size = size + 'px';

            var circleElement = '<div style="width:' + size + '; height:' + size + '; background-color:' + color + '; top:' + top + 'px; left:' + left + 'px;" class="circle"></div>';

            $(container).append(circleElement);
        }
    };

    makeCircles('#circles1', darkred, 10, 40, 5, 8);
    makeCircles('#circles2', red, 5, 20, 3, 5)
    makeCircles('#circles3', colors3, 3, 14, 2, 4)
    makeCircles('#circles4', colors4, 1, 10, 2, 4)
};

$(function() {
    circleSeqz();
});
