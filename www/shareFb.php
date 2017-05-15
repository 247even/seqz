<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="shortcut icon" href="" type="image/x-icon">
    <meta name="description" content="">
    <title>SEQZ!</title>

    <?php
        $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        if(isset($_GET['id'])) {
        	$id = $_GET['id'];
          $imgurl = 'https://247even.com/seqz/www/shared/'.$id.'.png';
        }

        $user1 = 'User1';
        $user2 = 'User2';
        $score = '1234';
    ?>

    <meta property="og:url" content="<?php echo $actual_link ?>" />
    <meta property="og:locale" content="de_DE" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="SEQZ: <?php echo $user1.' und '.$user2.' haben '.$score.' Punkte!' ?>" />
    <meta property="og:description" content="Wieviel schaffst du?" />
    <meta property="og:image" content="<?php echo $imgurl ?>" />

    <!--
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Fredoka+One" rel="stylesheet">
    -->

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/toastr.min.css" />
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/circles.css">
    <link rel="stylesheet" href="css/seqz.css">
    <link rel="stylesheet" href="css/export.css">


    <!--<script src="js/jquery-3.2.0.min.js"></script>-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="js/repaste.min.js"></script>
    <script src="js/toastr.min.js"></script>
    <script src="js/circles.min.js"></script>
    <script src="js/dom-to-image.min.js"></script>
    <script src="js/funcs.js"></script>
    <script src="js/templates.js"></script>
    <script src="js/pollSeqz.js"></script>
    <script src="js/seqz.js"></script>
    <script src="js/init.js"></script>
</head>

<body>
    <div id="loader-container">
        <div style="display:table;width:100%;height:100%;">
            <div style="display:table-cell;vertical-align:middle;">
                <div style="margin-left:auto;margin-right:auto;">
                    <div class="loader">Loading...</div>
                </div>
            </div>
        </div>
    </div>
    <div id="circle-container" class="circle-container">
        <div id="circles4" class="circle-container blur1"> </div>
        <div id="circles3" class="circle-container blur2"> </div>
        <div id="circles2" class="circle-container blur2"> </div>
        <div id="circles1" class="circle-container blur3"> </div>
        <div id="circles0" class="circle-container blur2"> </div>
    </div>
    <div id="flash" class="screen overlay hidden"></div>
    <div id="splash" class="screen splash hidden">2x!</div>
    <div id="bonus-splash" class="screen splash hidden">100</div>

    <header class="hidden">
        <div id="header-logo" class="logo-bg coloreffect">
            SEQZ!
        </div>
        <div id="info-box">
            <user>Player</user> vs.
            <opponent>Player</opponent>
        </div>
    </header>

    <div class="header-spacer"></div>

    <div id="loginscreen" class="screen">
        <div class="login-wrapper">
            <div id="login-logo" class="logo-bg coloreffect">
                SEQZ!
            </div>

            <div id="seqz-id" class="row">
                <input id="seqz-id-input" placeholder="deine-seqz-id" />
                <button id="seqz-id-button" class="button" disabled>Los geht's!</button>
            </div>

            <div id="log-in">
                <button id="log-player1" data-player="1" class="log-player1 playerselect button">Hallo Spieler 1!</button>
                <button id="log-player2" data-player="2" class="log-player2 playerselect button">Hallo Spieler 2!</button>
            </div>
        </div>
    </div>

    <div id="readyscreen" class="screen hidden">
        <div class="frame height100">
            <div class="ready-wrapper">
                <div id="readybutton" class="readybutton hidden">
                    <span class="readybutton-bereit button">Bereit, <user>Player</user>?</span>
                    <span class="readybutton-warte button hidden infinite">Warte auf <opponent>Oppo</opponent>...</span>
                </div>
            </div>
        </div>
    </div>

    <div id="interscreen" class="screen overlay hidden">
        <div class="interscreen-footer">
            <div class="readybutton">
                <span class="readybutton-bereit button">Bereit?</span>
                <span class="readybutton-warte button hidden infinite">Warte...</span>
            </div>
        </div>
    </div>

    <div id="resultscreen" class="screen hidden">
        <div class="header-spacer"></div>
        <div class="frame">
            <div class="resultdiv result1">
                <div>
                    <div class="res-text">
                        <h2><span>WOW!</span><br><span>Ihr habt <score>0</score> von <span class="result-max">150</span>Punkte!</span></h2>
                    </div>
                    <div class="star match-badge res-star1">
                        <score>0</score>
                    </div>
                </div>
            </div>
            <div class="resultdiv result2">
                <div class="res-text">
                    <h2><span>Nicht schlecht! <score>0</score> von <span class="result-max"> </span>!</span></h2>
                </div>
                <div class="star match-badge res-star2">
                    <score>0</score>
                </div>
            </div>
            <div class="resultdiv result3">
                <div class="res-text">
                    <h2><span>Da ist noch Luft nach oben... <score>0</score> von <span class="result-max"> </span>!</span></h2>
                </div>
                <div class="star match-badge res-star3">
                    <score>0</score>
                </div>
            </div>
            <div class="resultdiv result4">
                <div class="res-text">
                    <h2><span>Seid ihr Menschen...?? <score>0</score> von <span class="result-max"> </span>!</span></h2>
                </div>
                <div class="star match-badge res-star4">
                    <score>0</score>
                </div>
            </div>
        </div>
    </div>

    <div id="export-container" class="">
        <div class="logo"> </div>
        <div id="export-users">
            <user>Player</user> &amp; <opponent>Player</opponent>
        </div>
        <div id="export-score">
          <div class="star match-badge res-star1">
              <score>0</score>
          </div>
        </div>
    </div>

    <div id="main" class="screen hidden">
        <div class="header-spacer"></div>
        <div id="quiz-wrapper" class="frame">

        </div>
        <!-- quiz-wrapper -->
        <div class="footer-spacer"></div>
    </div>
    <!-- end main -->
    <div class="footer-spacer"></div>
    <footer class="hidden">
        <div id="timer" class="seqz-timer bgcoloreffect">
            <div class="seqz-timerbar">

            </div>
        </div>
        <div id="footer-status">
            Frage
            <frage>1</frage> von
            <total>12</total> //
            <score>0</score> Pkt.
        </div>
    </footer>

    <div id="bg" class="bg-image coloreffect no-scroll hidden"></div>

    <div id="prototypes" style="display: none">
        <div id="tpl-mp3" style="display: none">
            <div id="{{id}}" data-index="{{ind}}" class="mp3 question hidden inactive">
                <div class="counter">
                    {{nr}}/{{total}}
                </div>
                <div class="frage">
                    <h3><span>{{frage}}</span></h3>
                </div>
                <div class="antworten-wrapper">
                    <div>
                        Ich:
                    </div>
                    <div class="answers1">
                        <div class="match-badge match-badge1 hidden">
                            MATCH!
                        </div>
                        <div class="fail-badge fail-badge1 hidden">
                            fail
                        </div>
                        <div data-ind="{{ind}}" data-a="1" data-index="1" class="antwort">
                            {{a1}}
                        </div>
                        <div data-ind="{{ind}}" data-a="1" data-index="2" class="antwort">
                            {{a2}}
                        </div>
                        <div data-ind="{{ind}}" data-a="1" data-index="3" class="antwort">
                            {{a3}}
                        </div>
                    </div>
                    <div>
                        {{name2}}:
                    </div>
                    <div class="answers2">
                        <div class="match-badge match-badge2 hidden">
                            MATCH!
                        </div>
                        <div class="fail-badge fail-badge2 hidden">
                            fail
                        </div>
                        <div data-ind="{{ind}}" data-a="2" data-index="1" class="antwort">
                            {{a1}}
                        </div>
                        <div data-ind="{{ind}}" data-a="2" data-index="2" class="antwort">
                            {{a2}}
                        </div>
                        <div data-ind="{{ind}}" data-a="2" data-index="3" class="antwort">
                            {{a3}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- prototypes -->
    <div id="export-out">

    </div>
</body>

</html>
