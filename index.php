<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!--Link Main Stylesheet First: Javascript will swap it out when
      Infographic is loaded-->
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="global.css">
  <script src="js/jquery-3.1.0.js"></script>
  <script src="js/TweenMax.js"></script>
  <script src="js/main.js"></script>
  <script src="js/grta.js"></script>
  <title>Buying Butler</title>
</head>
<body>
  <div id="wrapper">
    <div id="screen-1" class="screen">
      <div class="frame scroll-under" id="statement">
        <div class="statement-wrap vcenter">
          <h2 class="yolo two-tone text-shadow">Y.O.L.O.</h2>
          <h3 class="white-text two-tone text-shadow">So why waste time?</h3>
        </div>
        <div class="arrow-down screen-1-arrow left-arrow"></div>
        <div class="arrow-down screen-1-arrow right-arrow"></div>
      </div>
      <div class="frame scroll-over screen-1" id="question-time">
        <div class="question vcenter">
          <h4 class="blue-text stroke-text-whit two-tone">How time-consuming is the car buying process?</h4>
          <ul id="time-question" style="opacity: 0;">
            <li><a href="#0" class="bb-button answer-button orange-text response-1 unselected">1-6 hours</a></li>
            <li><a href="#0" class="bb-button answer-button orange-text response-2 unselected">7-12 hours</a></li>
            <li><a href="#0" class="bb-button answer-button orange-text response-3 unselected">13-19 hours</a></li>
            <li><a href="#0" class="bb-button answer-button orange-text response-4 unselected">19-24 hours</a></li>
            <li><a href="#0" class="bb-button answer-button orange-text response-5 unselected">25-30 hours</a></li>
          </ul>
          <a href="#0" id="leave-screen-1" class="button leave-screen" style="display: none;">
        </div>
          NEXT
        </a>
      </div>
    </div>
    <div id="screen-2" class="screen">
      <div class="frame" id="boringman">
        <div class="boringman-wrap vcenter">
          <h4 class="orange-text two-tone">The average time taken is 26 hours!</h4>
          <div class="canvas-container">
            <div class="puppet-overlay">
              <ul id="skip-options-left" class="skip-options vcenter">
                <li id="skip" class="skip-option">Skip this</li>
                <li id="miss" class="skip-option">Miss this</li>
                <li id="duck" class="skip-option">Duck out</li>
                <li id="take-off" class="skip-option">Take off</li>
                <li id="split" class="skip-option">Let's split</li>
                <li id="leave" class="skip-option">Leave this</li>
              </ul>
              <ul id="skip-options-right" class="skip-options vcenter">
                <li id="slip" class="skip-option">Slip away</li>
                <li id="withdraw" class="skip-option">Withdraw</li>
                <li id="pooh" class="skip-option">Pooh-Pooh it</li>
                <li id="cut" class="skip-option">Cut it off</li>
                <li id="hoof" class="skip-option">Let's Hoof it</li>
                <li id="bounce" class="skip-option">Let's bounce</li>
              </ul>
            </div>
            <div id="subs"></div>
            <canvas id="puppet" class="" width="640" height="360">
              Canvas not available
            </canvas>
          </div>
          <a href="#0" id="leave-screen-2" class="bb-button bb-skip leave-screen">A better way</a>
        </div>
      </div>
    </div>
    <div id="screen-3" class="screen">
      <div class="frame" id="aintnobody">
        <div class="aintnobody-wrap vcenter">
          <h4 class="green-text two-tone">26 hours?!?!</h4>
          <div class="ladies">
            <img class="aint aint-left" src="images/angtft.png" alt="">
            <img class="aint aint-right" src="images/angtft.png" alt="">
          </div>
          <h5 class="green-text two-tone">Ain't nobody got time for that</h5>
        </div>
      </div>
      <div class="frame" id="boast">
        <div class="boast-wrap vcenter">
          <h3 class="boast-1 orange-text two-tone">Buying Butler does it in</h3>
          <div class="boast-2">
            <a href="http://www.buyingbutler.com" target="_blank">
              <h4 class="boast-2a bb-wheel blue-text two-tone">4</h4>
            </a>
            <h3 class="boast-2b orange-text two-tone">hours...</h3>
            <div class="arrow-down screen-4-arrow left-arrow"></div>
            <div class="arrow-down screen-4-arrow right-arrow"></div>
          </div>
        </div>

      </div>
      <div class="frame screen-3" id="question-hobby">
        <div class="question vcenter">
          <h4 class="blue-text stroke-text-whit two-tone">So what will you do with 22 hours?</h4>
          <ul id="hobby-question">
            <li><a href="#0" class="bb-button answer-button orange-text response-1 unselected">Eat</a></li>
            <!-- <li><a href="#0" class="bb-button answer-button orange-text response-2 unselected">Exist</a></li> -->
            <li><a href="#0" class="bb-button answer-button orange-text response-3 unselected">Learn</a></li>
            <li><a href="#0" class="bb-button answer-button orange-text response-4 unselected">Exercise</a></li>
            <!-- <li><a href="#0" class="bb-button answer-button orange-text response-5 unselected">Travel</a></li> -->
          </ul>
          <a href="#0" id="leave-screen-3" class="button leave-screen" style="display: none;"></a>
        </div>
      </div>
    </div>
    <div id="screen-4" class="screen">
      <div class="frame" id="infographic">
      </div>
    </div>
  </div>
</body>
</html>
