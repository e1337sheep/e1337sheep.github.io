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

//let images;
//If Ajaxed from another page, images will already be defined
//Check if images exists before trying to decalre
//if(!images) let images;
//let globStat;
let scaleFactor;
$(window).ready( ()=> {
  //console.log('sport.js running');
  //Extract unique images from fallback
  let imgSources = {};
  $('#wrapper img[id]').map( (i, x) => imgSources[grta.dashToCamel(x.id)] = x.src);
  grta.preLoadImages(imgSources, (img) => {
    images = img;
    images.bungeeMan = grta.giveBorder(images.bungeeMan, 2, 'white');
    let canvas = document.getElementById('sport');
    //Prevents repeat click selecting text in Chrome
    canvas.onselectstart = () => false;
    let ctx = canvas.getContext('2d');
    let status = initCanvasStatus();
    globStat = status;
    scaleFactor = grta.calcScale('sport');

    let startElements = [
      initSea,
      initFadeFish,
      initKayak,
      initWalker,
      initWalkers,
      initHoopBack,
      initBasketball,
      initHoopFront,
      initRunner,
      initBungeeMan,
      initHand,
      initGolfBalls,
    ];
    startElements.map( x => status.addElement(x()) );
    let ballStage = status.elements.find(x=>x.type==="ballStage");
    ballStage.addBall(ballStage, status);

    //Add static captions
    let staticCaptions = [
      {text: "You could moonwalk 27.5 miles",w:175, h:15, x:250, y:50, rot: 0},
      {text: "You could score 9516 three pointers",w:140, h:40, x:30, y:60, rot: 0},
      {text: "You could bungee-jump 94 times",w:205, h:15, x:5, y:150, rot: 0},
      {text: "You could swim the English Channel 3 times",w:284, h:15, x:5, y:315, rot: 10},
      {text: "You could kayak 210 miles", w:188, h:15, x:310, y:315},
      {text: "You could run 157 miles", w:188, h:15, x:250, y:150},
    ];
    let staticCaptionsHTML = [
      {text: "You could moonwalk 27.5 miles",w:30, h:6, x:38, y:13},
      {text: "You could score 9516 three pointers",w:20, h:10, x:4, y:16},
      {text: "You could bungee-jump 94 times",w:31, h:6, x:1, y:40},
      {text: "You could swim the English Channel 3 times",w:40, h:6, x:1, y:86, rot: 10},
      {text: "You could kayak 210 miles", w:25, h:6, x:47.5, y:86},
      {text: "You could run 157 miles", w:22, h:6, x:38.5, y:41},
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
    window.setInterval( () => status.addElement(initWalker()), 2000);
    window.setInterval( () => status.addElement(initFadeFish()), 3000);
    window.setInterval( () => ballStage.addBall(ballStage, status), 250 );

    let updateAttrs = [
      "xpos",
      "ypos",
      "scale",
      "opacity",
      "rotation",
    ]

    var updateTimer = new DeltaTimer( (time) => {
      status = grta.updateElements(status, updateAttrs, time);
    }, (1000/60));
    var startUpdates = updateTimer.start();

    $('#sport').click( event => {
      //console.log("Clicked! x:", event.offsetX*scaleFactor, "y:", event.offsetY*scaleFactor);
      status.elements.filter( x => x.clickable == true).map( x => {
        if(x.hasClicked(x, event)) x.on_click(x, event, status);
      });
    });
    //Calculate new scale factor for correct click detection
    //Also need to redraw captions after size change
    $(window).resize( event => {
      scaleFactor = grta.calcScale('sport');
      console.log(scaleFactor);
    });
    //Fade up Infographic when it's ready;
    TweenMax.to('#sport', .8, {opacity: 1});

  });

});
/*
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
*/
let initRunner = () => {
  let man = grta.createElement();
  man.type = "runningMan";
  man.image = images.runnerMan;
  man.imgWidth = man.image.width;
  man.imgHeight = man.image.height;
  man.xpos = 200;
  man.ypos = 60;
  man.initialScale = 0.7;
  return man;
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

let initKayak = () => {
  let kayak = grta.createElement();
  kayak.type = "kayak";
  kayak.image = images.kayakPic;
  kayak.initialScale = 0.7;
  kayak.imgHeight = kayak.image.height;
  kayak.imgWidth = kayak.image.width;
  kayak.xpos = 640 - kayak.imgWidth * kayak.initialScale - 80;
  kayak.ypos = 360 - kayak.imgHeight * kayak.initialScale + 4;
  return kayak;
}

let initSea = () => {
  let sea = grta.createElement();
  sea.image = images.doverCalais;
  sea.initialScale = 1;
  sea.imgHeight = sea.image.height;
  sea.imgWidth = sea.image.width;
  sea.type = "sea";
  sea.xpos = 0;
  sea.ypos = 360 - sea.imgHeight * sea.initialScale;
  sea.drawBack = sea.draw;
  sea.draw = (obj, c, status) => {
    obj.drawBack(obj, c, status);
    status.elements.filter( x => x.render === "fishStage" )
      .map ( x => x.draw(x, c) );
  }
  return sea;
}

let initCutoutSea = () => {
  let sea = grta.createElement();
  sea.image = images.doverCalais;
  sea.images = {top: images.doverCalaisTop, bottom: images.doverCalaisBot};
  sea.imgHeight = sea.image.height;
  sea.imgWidth = sea.image.width;
  sea.type = "sea";
  sea.xpos = 0;
  sea.ypos = 360 - sea.imgHeight;
  sea.drawBack = sea.draw;
  sea.drawBackground = (obj, c, status) => {
    c.save();
      c.translate(obj.xpos, obj.ypos);
      c.drawImage(obj.images.bottom, 0, 0);
    c.restore();
  }
  sea.drawForeground = (obj, c, status) => {
    c.save();
      c.translate(obj.xpos, obj.ypos);
      c.drawImage(obj.images.top, 0, 0);
    c.restore();
  }
  sea.draw = (obj, c, status) => {
    obj.drawBackground(obj, c, status);
    status.elements.filter( x => x.render === "fishStage" )
      .map ( x => x.draw(x, c) );
    obj.drawForeground(obj, c, status);
  }
  return sea;
}

let initPaperFish = () => {
  let fish = grta.createElement();
  fish.type = "fish";
  fish.image = images.fish;
  fish.imgHeight = fish.image.height;
  fish.imgWidth = fish.image.width;
  fish.xpos = 50;
  fish.ypos = 282;
  fish.xposVel = +0.01;
  fish.yposVel = +0.002;
  fish.xposLimits = [fish.xpos, 170];
  fish.scale = 0.4;
  fish.rotation = 11.5;
  fish.render = "fishStage";

  let paper = document.createElement('canvas');
  let xOffset = 6;
  let yOffset = 6;
  paper.width = (fish.imgWidth + xOffset);
  paper.height = (fish.imgHeight + yOffset);
  let c = paper.getContext('2d');
  c.fillStyle = Color.manilla;
  c.fillRect(0,0,paper.width, paper.height);
  fish.images = {paper: paper, fish: fish.image};

  fish.on_xposLimitHi = (obj) => {
    obj.remove = true;
    return obj.xposLimits[1];
  }

  fish.drawFish = fish.draw;
  fish.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      c.translate(obj.xpos, obj.ypos);
      c.translate(obj.imgWidth/2, obj.imgHeight/2);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-obj.imgWidth/2, -obj.imgHeight/2);
      c.scale(obj.trueScale(obj), obj.trueScale(obj));
      c.drawImage(obj.images.paper, 0, 0);
      c.drawImage(obj.image, obj.frameOffset(obj), 0, obj.imgWidth, obj.imgHeight, 0,0,obj.imgWidth, obj.imgHeight);
    c.restore();
  }
  return fish;
}

let initFadeFish = () => {
  let fish = grta.createElement();
  fish.type = "fish";
  fish.image = images.fish;
  fish.imgHeight = fish.image.height;
  fish.imgWidth = fish.image.width;
  fish.xpos = 80;
  fish.ypos = 280;
  fish.xposVel = +0.01;
  fish.yposVel = +0.002;
  fish.xposLimits = [75, 145];
  fish.scale = 0.4;
  fish.rotation = 13;
  fish.opacity = 0;
  fish.opacityVel = +0.005;
  fish.render = "fishStage";
  fish.on_xposLimitHi = (obj) => {
    let oldLimit = obj.xposLimits[1];
    obj.xposLimits = [75, 160];
    obj.opacityVel = -0.005;
    return oldLimit;
  }
  fish.on_opacityLimitHi = (obj) => {
    obj.opacityVel = 0;
    return obj.opacityLimits[1];
  }
  fish.on_opacityLimitLo = (obj) => {
    obj.yposVel = 0;
    obj.xposVel = 0;
    obj.remove = true;
  }
  return fish;
}

let initWalkers = () => {
  let walkers = grta.createElement();
  walkers.type = "walkerStage";
  walkers.xpos = 0;
  walkers.ypos = 0;
  walkers.draw = (obj, c, status) => {
    status.elements.filter( x => x.render === "walkerStage")
      .map( x => x.draw(x, c) );
  }
  return walkers;
}

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

let initBungeeMan = () => {
  let bman = grta.createElement();
  bman.type = "bungeeMan";
  bman.image = images.bungeeMan;
  bman.shadow = true;
  bman.imgHeight = bman.image.height;
  bman.imgWidth = bman.image.width;
  bman.xpos = 0;
  bman.ypos = 120;
  bman.initialScale = .5;
  bman.scale = 0.05;
  bman.clickable = true;
  bman.clickAreas = [[0,0,bman.imgWidth, bman.imgHeight]];
  bman.rotationX = (bman.imgWidth/2);
  bman.rotationY = (bman.imgHeight/2);
  bman.on_click = (obj, event, status) =>{
    TweenMax.to(obj, 2, {rotation: 360, onComplete: ()=> obj.rotation = 0});
  }
  bman.tween = TweenMax.to(bman, 2, {scale: 2,
                                     ease: Quad.easeInOut,
                                     yoyo: true,
                                     repeat: -1});
  return bman;
}

let initHoopBack = () => {
  let hoopBack = grta.createElement();
  hoopBack.image = images.hoopBack;
  hoopBack.imgHeight = hoopBack.image.height;
  hoopBack.imgWidth = hoopBack.image.width;
  hoopBack.xpos = 0;
  hoopBack.ypos = 0;
  hoopBack.initialScale = .4;
  return hoopBack;
}
let initHoopFront = () => {
  let hoopFront = grta.createElement();
  hoopFront.image = images.hoopFront;
  hoopFront.imgHeight = hoopFront.image.height;
  hoopFront.imgWidth = hoopFront.image.width;
  hoopFront.xpos = 0;
  hoopFront.ypos = 0;
  hoopFront.initialScale = .4;
  return hoopFront;
}
let initBasketball = () => {
  let ball = grta.createElement();
  ball.image = images.basketball;
  ball.imgHeight = ball.image.height;
  ball.imgWidth = ball.image.width;
  ball.xpos = 70;
  ball.ypos = 10;
  ball.initialScale = .8;
  //Use of magic numbers to fix rotation issues
  ball.rotationX = (ball.imgWidth/2)-9;
  ball.rotationY = (ball.imgHeight/2)-9;
  ball.tween = TweenMax.to(ball, 10, {rotation: 360,
                                      ease: Power0.easeNone,
                                      repeat: -1});
  return ball;
}
