'use strict'
let Color = {
  manilla: "#fef6bf"
}
let colors = [
  "rgba(200,0,0,1)",//red
  "rgba(0,200,0,1)",//green
  "rgba(0,0,200,1)",//blue
  "rgba(0,200,200,1)",//cyan
  "rgba(200,200,0,1)",//yellow/mustard
  "rgba(200,0,200,1)",//purple/magenta
  "rgba(255,100,100,1)"//pink/salmon
];

let images;
let globStat;
let scaleFactor;
$(window).ready( ()=> {
  console.log('_template.js running');
  //Extract unique images from fallback
  let imgSources = {};
  $('#wrapper img[id]').map( (i, x) => imgSources[grta.dashToCamel(x.id)] = x.src);
  grta.preLoadImages(imgSources, (img) => {
    images = img;
    //images.bungeeMan = grta.giveBorder(images.bungeeMan, 2, 'white');
    let canvas = document.getElementById('_template');
    //Prevents repeat click selecting text in Chrome
    canvas.onselectstart = () => false;
    let ctx = canvas.getContext('2d');
    let status = initCanvasStatus();
    globStat = status;
    scaleFactor = grta.calcScale('_template');

    let startElements = [

    ];
    startElements.map( x => status.addElement(x()) );
    //let ballStage = status.elements.find(x=>x.type==="ballStage");
    //ballStage.addBall(ballStage, status);

    //Add static captions
    let staticCaptions = [
      //{text: "You could moonwalk 27.5 miles",w:175, h:15, x:250, y:50, rot: 0},
    ];
    let staticCaptionsHTML = [
      //{text: "You could moonwalk 27.5 miles",w:30, h:6, x:38, y:13},
    ];


    //Depricated
    //Code may be required when snapshotting canvas for social media
    /*
    staticCaptions.map(x=>{
      status.addElement(initCaption(x.text, x.w, x.h, x.x, x.y, x.rot));
    });
    */

    staticCaptionsHTML.map(x=>{
      status.addElement(initCaptionHTML(x.text, x.w, x.h, x.x, x.y, x.rot));
    });

    window.requestAnimationFrame( ()=> renderScene(status, ctx) );
    //window.setInterval( () => status.addElement(initWalker()), 2000);



    let updateAttrs = [
      "xpos",
      "ypos",
      "scale",
      "opacity",
      "rotation",
    ]

    //Bug Watch -- Changed "var" to "let"
    let updateTimer = new DeltaTimer( (time) => {
      status = grta.updateElements(status, updateAttrs, time);
    }, (1000/60));
    let startUpdates = updateTimer.start();

    $('#food').click( event => {
      //console.log("Clicked! x:", event.offsetX*scaleFactor, "y:", event.offsetY*scaleFactor);
      status.elements.filter( x => x.clickable == true).map( x => {
        if(x.hasClicked(x, event)) x.on_click(x, event, status);
      });
    });
    //Calculate new scale factor for correct click detection
    //Also need to redraw captions after size change
    $(window).resize( event => {
      scaleFactor = grta.calcScale('_template');
      //console.log(scaleFactor);
    });
    //Fade up Infographic when it's ready;
    TweenMax.to('#_template', .8, {opacity: 1});

  });

});

let renderScene = (status, ctx) => {
  ctx.clearRect(0,0,640,360);
  status.elements
    .filter(x=>x.render === "main")
    .map(x => {
      ctx.save();
      if(x.shadow){
        let scalesq = x.scale * x.scale;
        let scalecub = scalesq * x.scale;
        ctx.shadowColor = 'rgba(0,0,0,.7)';
        ctx.shadowBlur = scalesq * 20;
        ctx.shadowOffsetX = scalecub * 10;
        ctx.shadowOffsetY = scalecub * 10;
      }
      x.draw(x, ctx, status);
      ctx.restore();
    });
  status.elements.filter(x=>x.render === "caption")
        .map(x=>x.draw(x, ctx, status));
  window.requestAnimationFrame( ()=> renderScene(status, ctx) );
}

let initCanvasStatus = () => {
  let obj = ({
    lastUpdate: + new Date,
    score: 0,
    totalTime: 22,
    time: 22,
    currentGame: "none",
    gameStatus: "ready",
    elements: [],
  });
  obj.addElement = (element) => obj.elements.push(element);
  return obj;
}

let initFlyout = (text, x, y) => {
  let fly = grta.createElement();
  fly.type = "scoreFlyout";
  fly.image = createFlyout(text);
  fly.imgHeight = fly.image.height;
  fly.imgWidth = fly.image.width;
  fly.xpos = x;
  fly.ypos = y;
  fly.initialScale = 1;
  TweenMax.to(fly, 1, {
    scale: 1.5,
    opacity: 0,
    xpos: "-=10",
    ypos: "-=10",
    onComplete: ()=> fly.remove = true
  });
  return fly;
}
let createFlyout = (text) => {
  let color = colors[Math.floor(Math.random() * colors.length)];
  let fly = document.createElement('canvas');
  fly.width = 60;
  fly.height = 30;
  let c = fly.getContext('2d');
  c.save();
    c.fillStyle = color;
    c.strokeStyle = 'black';
    c.textAlign = "center";
    c.font = "30px Apercu";
    c.lineWidth = ".5";
    c.fillText(text, 30,30,fly.width);
    c.strokeText(text, 30, 30, fly.width);
  c.restore();
  return fly;
}

let initCaption = (text, w, h, x, y, rot, id) => {
  let cap = grta.createElement();
  cap.type = "caption";
  cap.render = "caption";
  cap.id = id || "none";
  cap.image = drawCaption(text, w, h);
  cap.imgHeight = cap.image.height;
  cap.imgWidth = cap.image.width;
  cap.xpos = x || 100;
  cap.ypos = y || 100;
  cap.rotation = rot;
  cap.rotationX = cap.imgWidth/2;
  cap.rotationY = cap.imgHeight/2;
  return cap;
}
let drawCaption = (text, w, h) => {
  let cap = document.createElement('canvas');
  cap.width = w || 300;
  cap.height = h || 100;
  let c = cap.getContext('2d');
  c.fillStyle = "rgba(0,0,0,.5)";
  c.fillRect(0,0,cap.width, cap.height);
  c.fillStyle = "rgba(255,255,255,1)";
  c.font = "12px Apercu";
  grta.wrapText(c, text, 2,12, cap.width, 20);
  return cap;
}
let initCaptionHTML = (text, w, h, x, y, rot, id) => {
  let cap = grta.createElement();
  cap.type = "captionHTML";
  cap.render = "captionHTML";
  cap.id = id || null;
  cap.xpos = x || 100;
  cap.ypos = y || 100;
  cap.rotation = rot;
  id = !id ? '' : 'id="'+id+'"';
  let transform = 'transform: rotate('+cap.rotation+'deg)';
  let pos = 'top: '+y+'%; left: '+x+'%';
  let size = 'width: '+w+'%; height: '+h+'%';
  let style = size + ';' + pos + ';' + transform + ';';
  let caption = '<div '+id+' class="caption" style="'+style+'">'+text+'</div>';
  $('#captions').append(caption);
  return cap;
}

let initClock = (x, y) => {
  let clock = grta.createElement();
  clock.type = "clock";
  clock.image = images.clock;
  clock.xpos = x || 0;
  clock.ypos = y || 0;
  clock.initialScale = 0.22;
  clock.opacity = 0;
  clock.rotationX = (clock.image.width/2);
  clock.rotationY = (clock.image.height/2);
  TweenMax.to(clock, 0.4, {opacity: 1});
  clock.drawFace = clock.draw;
  clock.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      c.translate(obj.xpos, obj.ypos);
      c.scale(obj.trueScale(obj), obj.trueScale(obj));
      c.save();
        c.translate(203, 373);
        c.rotate(obj.rotation * Math.PI/180);
        c.translate(-203, -373);
        c.drawImage(obj.image, 0,0);
      c.restore();
      c.save();
        c.fillStyle = "rgba(0,0,0,.8)";
        //translate to center of clock
        c.translate(203,373);
        //Dot in center of clock
        c.beginPath();
        c.arc(0,0,10,0, 2*Math.PI);
        c.fill();
        //draw hand
        c.beginPath();
        c.lineWidth = 14;
        let adjTime =
        //Uncomment this for "clicky" clock hands
        //Math.floor
        (status.time);
        c.rotate((Math.PI/180)*(360/60)*adjTime);
        c.moveTo(0,0);
        c.lineTo(0,-150);
        c.stroke();
      c.restore();
    c.restore();
  };
  return clock;
};

//Reference for single element clicker games
let initHand = () => {
  let hand = grta.createElement();
  hand.type = "hand";
  hand.image = images.hand;
  hand.imgWidth = hand.image.width;
  hand.imgHeight = hand.image.height;
  hand.gameID = "highFive";
  hand.captionID = 'high-five';
  hand.showCaption = true;
  hand.preCaption = "You could High Five 52,624 times. \
                     How many can you do in 22 seconds?";
  hand.postCaption = (obj) => "You did " + obj.score +
                              " High Fives.  Think you can do better?";
  hand.score = 0;
  hand.initialScale = 0.5;
  hand.xpos = 470;
  hand.ypos = 30;
  hand.rotationX = (hand.imgWidth/2)-70;
  hand.rotationY = (hand.imgHeight/2)-20;
  hand.rotation = 1;
  TweenMax.to(hand, 0.5, {rotation: -hand.rotation,
                          ease:Quad.easeInOut,
                          yoyo: true,
                          repeat: -1});
  hand.tween = TweenMax.to(hand, 7, {xpos: 200,
                                     yoyo: true,
                                     repeat: -1,
                                     ease: Quad.easeInOut,
                                     paused: true});
  hand.returnTween = TweenMax.to(hand, 3, {xpos: 470, paused: true});
  hand.clickable = true;
  hand.clickAreas = [[67,150,99,274],[96,138,195,260]];
  initCaptionHTML(hand.preCaption, 24, 18, 73, 25, 0, hand.captionID);
  hand.on_click = (obj, event, status) => {
    if(status.gameStatus === "started" &&
       status.currentGame === "highFive"){
         status.score += 1;
         status.addElement(initFlyout(status.score, obj.xpos+30, obj.ypos+65));
       }
    if(status.gameStatus === "ready"){
      console.log("High Five Game Started");
      status.currentGame = "highFive";
      status.gameStatus = "started";
      obj.tween.restart();
      //obj.showCaption = false;
      TweenMax.to('#'+obj.captionID, 0.4, {opacity: 0});
      status.addElement(initClock(300,160));
      status.score += 1;
      status.addElement(initFlyout(status.score, obj.xpos+30, obj.ypos+65));
    }
    TweenMax.to(obj, 0.05, {scale: 0.9, yoyo: true, repeat: 1});
  }
  hand.drawHand = hand.draw;
  hand.draw = (obj, c, status) => {
    obj.drawHand(obj, c, status);
    //Below can be removed after changing to HTML captions
    /*
    if(obj.showCaption){
      if(obj.score == 0)
        c.drawImage(drawCaption(obj.preCaption, 150, 75), 470,90);
      else
        {
          //c.drawImage(drawCaption(obj.postCaption(obj), 200, 40), 430, 200);
          c.drawImage(drawCaption(obj.postCaption(obj), 200, 40), 470, 90);
          //console.log("Caption?");
        }
    }
    */
  }
  return hand;
}
//Reference for multiple target clicker games and filling a grid with
//elements.
let initGolfBalls = () => {
  let balls = grta.createElement();
  balls.type = "ballStage";
  balls.gameID = "golfBallShoot";
  //Depricated
  //balls.showCaption = true;
  balls.captionID = 'golf-ball-shoot';
  balls.preCaption = "You could play 88 holes of golf.  \
                      How many balls can you hit"+
                     " in 22 seconds?";
  balls.postCaption = (obj) => "You hit " + obj.score +" balls in 22 seconds.  \
                                Can you do better?";
  balls.score = 0;
  balls.xpos = 420;
  balls.ypos = 180;
  //0=no ball 1=space 2=occupied
  balls.locations = [
    1,0,0,0,
    1,1,0,0,
    1,1,1,0,
    1,1,1,1,
    1,1,1,1,
  ];
  initCaptionHTML(balls.preCaption, 31.5, 15, 67, 55, 0, balls.captionID);
  balls.addBall = (obj, status) => {
    let ballAdded = false;
    obj.locations.map( (v,i,a) => {
      let stillExists = status.elements
        .filter(x=>x.type=="golf-ball"&&x.index==i).length;
      if(!stillExists && v==2) a[i] = 1;
      if(!ballAdded && v==1){
        let ball = initGolfBall();
        ball.xpos = obj.xpos+(Math.floor(i/4))*(ball.imgWidth * ball.initialScale);
        ball.ypos = obj.ypos+(i % 4)*(ball.imgHeight * ball.initialScale);
        ball.index = i;
        status.addElement(ball);
        ballAdded = true;
        a[i] = 2;
      }
    });
  }
  balls.draw = (obj, c, status) => {
    status.elements.filter(x=>x.render === "ballStage").map(x=>x.draw(x, c));
    //Alter so that only rendered when required (sharing image on social media)
    /*
    if(obj.showCaption){
      if(obj.score == 0)
        c.drawImage(drawCaption(obj.preCaption, 200, 60), 430,200);
      else
        c.drawImage(drawCaption(obj.postCaption(obj), 200, 40), 430, 200);
    }
    */
  }
  return balls;
}
//See above function
let initGolfBall = () => {
  let ball = grta.createElement();
  ball.type = "golf-ball";
  ball.render = "ballStage";
  ball.image = images.golfBall;
  ball.initialScale = 0.3;
  ball.imgHeight = ball.image.height;
  ball.imgWidth = ball.image.width;
  ball.rotationX = (ball.imgWidth/2)-51;
  ball.rotationY = (ball.imgHeight/2)-51;
  ball.tween = TweenMax.to(ball, 4, {rotation:360, ease: Power0.easeNone, repeat:-1});
  ball.opacity = 0;
  ball.opacityVel = +0.005;
  ball.on_opacityLimitHi = (obj) =>{
    obj.opacityVel = 0;
    return 1;
  }
  ball.clickable = true;
  ball.clickAreas.push([0,0,ball.imgWidth, ball.imgHeight]);
  ball.on_click = (obj, event, status) => {
    let game = status.elements.find(x=>x.gameID == "golfBallShoot");
    if(status.gameStatus  === "started" &&
       status.currentGame === "golfBallShoot") {
         status.score += 1;
         status.addElement(initFlyout(status.score, obj.xpos, obj.ypos));
       }
    if(status.gameStatus === "ready"){
      console.log("Starting Golf Game");
      status.currentGame = "golfBallShoot";
      status.gameStatus = "started";
      //game.showCaption = false;
      TweenMax.to('#'+game.captionID, 0.4, {opacity: 0});
      status.addElement(initClock(300, 160));
      status.score += 1;
      status.addElement(initFlyout(status.score, obj.xpos, obj.ypos));
    }
    obj.yposVel = -0.8;
    obj.yposFriction = +0.003;
    obj.xposVel = -0.2;
    obj.scaleVel = -0.002;
    obj.aliveLimit = 80;
  }
  ball.on_aliveLimit = (obj) => {
    obj.remove = true;
  }
  return ball;
}
//Reference for using sprite sheets
let initWalker = () => {
  let walker = grta.createElement();
  walker.image = images.walkerSpritesheet;
  walker.initialScale = 0.7;
  walker.isSprite = true;
  walker.frames = 13;
  walker.frameDelay = 100;
  walker.imgHeight = walker.image.height;
  walker.imgWidth = walker.image.width / walker.frames;
  walker.type = "walker";
  walker.render = "walkerStage",
  walker.xpos = 640;
  walker.xposLimits = [-images.walker.width, 640];
  walker.xposVel = -0.1;
  walker.on_xposLimitLo = (obj) => {
    obj.remove = true;
    return obj.xposLimits[0];
  }
  walker.ypos = 0;
  return walker;
}
