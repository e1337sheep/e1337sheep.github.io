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
//let globStat;
let scaleFactor;
$(window).ready( ()=> {
  console.log('food.js running');
  //Extract unique images from fallback
  let imgSources = {};
  $('#wrapper img[id]').map( (i, x) => imgSources[grta.dashToCamel(x.id)] = x.src);
  grta.preLoadImages(imgSources, (img) => {
    images = img;
    //images.bungeeMan = grta.giveBorder(images.bungeeMan, 2, 'white');
    let canvas = document.getElementById('food');
    //Prevents repeat click selecting text in Chrome
    canvas.onselectstart = () => false;
    let ctx = canvas.getContext('2d');
    let status = initCanvasStatus();
    globStat = status;
    scaleFactor = grta.calcScale('food');

    let startElements = [
      initPizza,
      initBottles,
      initGrapes,
      initBowls,
      initJellies,
      initChopsticks,
      initIceCreamToss,
    ];
    startElements.map( x => status.addElement(x()) );

    //let ballStage = status.elements.find(x=>x.type==="ballStage");
    //ballStage.addBall(ballStage, status);

    let jellyStage = status.elements.find(x=>x.type==="jellyStage");
    jellyStage.addJelly(jellyStage, status);

    let bottleStage = status.elements.find(x=>x.type==="bottleStage");
    bottleStage.addBottle(bottleStage, status);

    let grapes = [
      {func: initWhiteGrape, x: 160, y: -60, rot: 0},
      {func: initRedGrape, x: 150, y: -10, rot: 0},
      {func: initWhiteGrape, x: 230, y: -80, rot: 0},
      {func: initRedGrape, x: 350, y: -20, rot: 0},
      {func: initWhiteGrape, x: 400, y: -80, rot: 0},
      {func: initRedGrape, x: 520, y: 10, rot: 0},
      {func: initRedGrape, x: 540, y: -10, rot: 0},
    ];
    grapes.map(x=>status.addElement(x.func(x.x, x.y, x.rot)));

    let hands = [
      {x: -10, y: 220, rot: 50},
      {x: 510, y: 100, rot: -100},
    ];
    hands.map(x=>status.addElement(initHands(x.x, x.y, x.rot)));

    //Add static captions
    let staticCaptions = [
      //{text: "You could moonwalk 27.5 miles",w:175, h:15, x:250, y:50, rot: 0},
    ];
    let staticCaptionsHTML = [
      //{text: "You could moonwalk 27.5 miles",w:30, h:6, x:38, y:13},
      {text: "You could eat 96,360 grapes",w:30, h:6, x:50, y: 5},
      {text: "British people will have drunk over 4,000,000 bottles of wine",
        w:30, h:11, x:60, y: 60},
      {text: "You could throw and catch 33,000 scoops of ice-cream",w:20, h:15, x:3, y: 70},
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
    window.setInterval( () => jellyStage.addJelly(jellyStage, status), 1000);
    window.setInterval( () => bottleStage.addBottle(bottleStage, status), 10);
    window.setInterval( () => status.addElement(initIceCream()), 1000);



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
      scaleFactor = grta.calcScale('food');
      //console.log(scaleFactor);
    });
    //Fade up Infographic when it's ready;
    TweenMax.to('#food', .8, {opacity: 1});

  });

});
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

let initPizza = () => {
  let pizza = grta.createElement();
  pizza.type = "pizza";
  pizza.image = images.pizzaGaps;
  pizza.imgWidth = pizza.image.width;
  pizza.imgHeight = pizza.image.height;
  pizza.gameID = "pizza";
  pizza.captionID = "pizzaCap";
  pizza.preCaption = "You could make 6910 pizzas.  \
                      How many can you make in 22 seconds?";
  pizza.postCaption = (obj) => "You made " + obj.score + " pizzas.  \
                                Is that the best you've got?";
  pizza.score = 0;
  pizza.initialScale = .5;
  pizza.xpos = 0;
  pizza.ypos = 0;
  initCaptionHTML(pizza.preCaption, 24, 15, 2.7, 20, 0, pizza.captionID);

  pizza.drawPizza = pizza.draw;
  pizza.draw = (obj, c, status) => {
    obj.drawPizza(obj, c, status);
    status.elements
      .filter(x => x.render === "pizza")
      .map( x => x.draw(x, c, status) );
  }

  pizza.clickable = true;
  pizza.clickAreas.push([34,33,34+312,33+309]);
  pizza.on_click = (obj, event, status) => {
    if(status.gameStatus === "ready"){
      console.log("Pizza Game Started");
      status.elements.filter(x=>x.type==="topping").map(x=>x.opacity=0);
      let toppings = [
        {x:37,y:40, scale: .5},
        {x:57, y:27, scale:.5},
        {x:88, y:22, scale:.5},
        {x:115, y:33, scale:.5},
        {x:140, y:57, scale:.5},
        {x:147, y:88, scale:.5},
        {x:20, y:71, scale:.5},
        {x:82, y:43, scale:.53},
        {x:59, y:57, scale:.53},
        {x:117, y:67, scale:.5},
        {x:43, y:80, scale:.5},
        {x:85, y:87, scale:.5},
        {x:115, y:96, scale:.52},
        {x:23, y:106, scale:.5},
        {x:65, y:113, scale:.5},
        {x:99, y:113, scale:.53},
        {x:132, y:118, scale:.52},
        {x:49, y:140, scale:.50},
        {x:76, y:149, scale:.50},
        {x:109, y:140, scale:.50},
      ];
      if(!status.elements.filter(x=>x.type==="topping").length)
        toppings.map(x => status.addElement(initTopping(x.x, x.y, x.scale)));
      status.currentGame = "pizza";
      status.gameStatus = "started";
      status.subScore = 0;
      TweenMax.to('#'+obj.captionID, 0.4, {opacity: 0});
      status.addElement(initClock(300,160));
      initCaptionHTML("Click the Gaps to place toppings",
                      24,10,
                      2.7,30,
                      0,"pizzaRules");
      TweenMax.to("#pizzaRules", 0.4, {opacity: 0, delay: 2, onComplete:()=>{
        status.elements.find(x=>x.type==="captionHTML"&&x.id==="pizzaRules");
        $('#pizzaRules').remove();
      }});
    }
  }
  return pizza;
}
let initTopping = (x, y, scale) => {
  let top = grta.createElement();
  top.type = "topping";
  top.render = "pizza";
  top.image = images.pepperoniSmall;
  top.initialScale = scale;
  top.imgWidth = top.image.width;
  top.imgHeight = top.image.height;
  top.xpos = x;
  top.ypos = y;
  top.opacity = 0;
  top.scale = 1;
  top.clickable = true;
  top.clickAreas.push([2,2,45,45]);

  top.on_click = (obj, event, status) => {
    if(obj.opacity===0) status.subScore += 1;
    TweenMax.fromTo(obj, 0.2, {opacity: 0, scale: 2},{opacity: 1, scale: 1});
    if(status.subScore >= 20){
      status.subScore = 0;
      status.score += 1;
      status.addElement(initFlyout(status.score, obj.xpos, obj.ypos));
      let game = status.elements.find(x=>x.gameID==="pizza");
      let allToppings = status.elements.filter(x=>x.type==="topping");
      let gameStage = [game].concat(allToppings);
      TweenMax.to(gameStage, 0.2, {xpos: "-=200", onComplete: () => {
        status.elements.filter(x=>x.type==="topping").map(x=>x.opacity=0);
        TweenMax.to(gameStage, 0.2, {xpos: "+=200"});
      }});
    }
  }
  return top;
}

let initGrapes = () => {
  let grapes = grta.createElement();
  grapes.type = "grapeStage";
  grapes.xpos = 0;
  grapes.ypos = 0;

  grapes.draw = (obj, ctx, status) => {
    status.elements.filter(x=>x.render === grapes.type).map(x=>x.draw(x, ctx));
  };
  return grapes;
}
let initRedGrape = (x,y,rot,flip) => {
  let grape = grta.createElement();
  grape.type = "redGrapes";
  grape.render = "grapeStage";
  grape.image = images.grapesRed;
  grape.imgWidth = grape.image.width;
  grape.imgHeight = grape.image.height;
  grape.initialScale = .25;
  grape.xpos = x || 0;
  grape.ypos = y || 0;
  grape.rotation = rot || 0;
  grape.scale = flip ? -1 : 1;
  return grape;
}
let initWhiteGrape = (x,y,rot) => {
  let grape = grta.createElement();
  grape.type = "whiteGrapes";
  grape.render = "grapeStage";
  grape.image = images.grapesWhite;
  grape.imgWidth = grape.image.width;
  grape.imgHeight = grape.image.height;
  grape.initialScale = .7;
  grape.xpos = x || 0;
  grape.ypos = y || 0;
  grape.rotation = rot || 0;
  return grape;
}

let initChopsticks = () => {
  let sticks = grta.createElement();
  sticks.type = "sticks";
  sticks.image = images.chopsticks;
  sticks.imgWidth = sticks.image.width;
  sticks.imgHeight = sticks.image.height;
  sticks.initialScale = .25;
  sticks.xpos = 100;
  sticks.ypos = 100;
  sticks.rotationX = sticks.imgWidth/4;
  sticks.rotationY = sticks.imgHeight/4;
  sticks.rotation = -90;
  return sticks;
}

let initIceCreamToss = () => {
  let toss = grta.createElement();
  toss.type = "iceCreamStage";
  toss.draw = (obj, c, status) => {
    status.elements.filter(x=>x.render==="iceCreamStage"&&x.type==="icecream")
      .map(x=>x.draw(x, c));
    status.elements.filter(x=>x.render==="iceCreamStage"&&x.type==="hands")
      .map(x=>x.draw(x, c));
  }
  return toss;
}
let initIceCream = () => {
  let ice = grta.createElement();
  ice.type = "icecream";
  ice.render = "iceCreamStage";
  let flavours = [
    images.iceCreamChoc,
    images.iceCreamPink,
    images.iceCreamMint,
  ];

  let r = Math.floor(Math.random() * 3);
  ice.image = flavours[r];
  ice.imgWidth = ice.image.width;
  ice.imgHeight = ice.image.height;
  ice.initialScale = .3;
  ice.xpos = 0;
  ice.ypos = 300;
  TweenMax.to(ice, 1, {xpos: 685, rotation: -180});
  TweenMax.to(ice, 1, {ypos: 150, ease:Circ.easeOut, onComplete: () => ice.remove = true});

  return ice;
}
let initHands = (x, y, rot) => {
  let hands = grta.createElement();
  hands.type = "hands";
  hands.render = "iceCreamStage";

  let h = document.createElement('canvas');
  h.width = images.handLeft.width * 1.5;
  h.height = images.handLeft.height;
  let hc = h.getContext('2d');
  hc.drawImage(images.handLeft, 0,0);
  hc.scale(-1, 1);
  hc.drawImage(images.handLeft, -images.handLeft.width*1.5 ,0);
  hands.image = h;

  hands.imgWidth = hands.image.width;
  hands.imgHeight = hands.image.height;
  hands.initialScale = .7;
  hands.xpos = x;
  hands.ypos = y;
  hands.rotationX = hands.imgWidth/4;
  hands.rotationY = hands.imgHeight/4;
  hands.rotation = rot;
  return hands;
}

let initBottles = () => {
  let bottles = grta.createElement();
  bottles.type = "bottleStage";
  bottles.xpos = 270;
  bottles.ypos = 100;
  bottles.locations = [
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
    1,1,1,
  ];
  bottles.addBottle = (obj, status) => {
    let bottleAdded = false;
    obj.locations.map( (v,i,a) => {
      let stillExists = status.elements
        .filter(x=>x.type=="bottle"&&x.index==i).length;
      if(!stillExists && v==2) a[i] = 1;
      if(!bottleAdded && v==1){
        let bottle = initBottle();
        bottle.xpos = obj.xpos+(Math.floor(i/3))*(bottle.imgWidth * bottle.initialScale);
        bottle.ypos = obj.ypos+(i%3)*(bottle.imgHeight * bottle.initialScale);
        bottle.index = i;
        //let jiggle = +5;
        //if(bottle.index%2) jiggle *= -1;
        //TweenMax.to(bottle, 1, {ypos: "+="+jiggle, ease: Quad.easeInOut, yoyo: true, repeat: -1});
        status.addElement(bottle);
        bottleAdded = true;
        a[i] = 2;
      }
    });
  }
  bottles.draw = (obj, c, status) => {
    status.elements.filter(x=>x.render === "bottleStage").map(x=>x.draw(x, c));
  }

  return bottles;
}
let initBottle = () => {
  let bottle = grta.createElement();
  bottle.type = "bottle";
  bottle.render = "bottleStage";
  bottle.shadow = false;
  bottle.image = images.wineBottle;
  bottle.imgWidth = bottle.image.width;
  bottle.imgHeight = bottle.image.height;
  bottle.initialScale = 0.25;
  bottle.opacity = 0;
  TweenMax.to(bottle, 0.4, {opacity: 1});

  return bottle;
}


let initBowls = () => {
  let bowl = grta.createElement();
  bowl.type = "bowl";
  bowl.image = images.bowlEmpty;
  bowl.imgWidth = bowl.image.width;
  bowl.imgHeight = bowl.image.height;
  bowl.initialScale = .4;
  bowl.xpos = 43;
  bowl.ypos = 326;
  bowl.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      let rotX = (obj.xpos + obj.rotationX);
      let rotY = (obj.ypos + obj.rotationY);

      c.translate(rotX, rotY);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-rotX, -rotY);

      c.scale(obj.trueScale(obj), obj.trueScale(obj));

      c.translate(obj.xpos/obj.trueScale(obj), obj.ypos/obj.trueScale(obj));
      [1,2,3,4,5,6].map(x=>{
        c.drawImage(obj.image, obj.frameOffset(obj), 0, obj.imgWidth, obj.imgHeight, obj.imgWidth * x ,0,obj.imgWidth, obj.imgHeight);
      })
    c.restore();
  }

  return bowl;
}

let initJellies = () => {
  let jellies = grta.createElement();
  jellies.type = "jellyStage";
  jellies.gameID = "eatJelly";
  jellies.captionID = "eat-jelly";
  jellies.preCaption = "You could eat 8,751kg of jelly with chopsticks.  \
                        How much can you eat in 22 seconds?";
  jellies.postCaption = obj => "You ate " + obj.score +
                               " bowls of jelly in 22 seconds.  \
                                Hungry for more?";
  jellies.score = 0;
  jellies.xpos = 150;
  jellies.ypos = 300;
  jellies.locations = [1,1,1,1,1];
  initCaptionHTML(jellies.preCaption, 41,12,45,85,0,jellies.captionID);
  jellies.addJelly = (obj, status) => {
    let jellyAdded = false;
    obj.locations.map((v,i,a) => {
      let stillExists = status.elements
        .filter(x=> x.type=="jelly-bowl" && x.index==i).length;
      if(!stillExists && v==2) a[i] = 1;
      if(!jellyAdded && v==1){
        let jelly = initJelly();
        jelly.xpos = obj.xpos+i*((jelly.imgWidth * jelly.initialScale)+18);
        jelly.ypos = obj.ypos;
        jelly.index = i;
        status.addElement(jelly);
        jellyAdded = true;
        a[i] = 2;
      }
    });
  };
  jellies.on_gameEnd = (status) => {
    status.elements
      .filter(x=> x.type === "jelly-bowl")
      .map(x=>{
        x.clickable = false;
        TweenMax.to(x, 0.4, {opacity: 0, onComplete: () => x.remove = true});
      })
  }
  jellies.draw = (obj, c, status) => {
    status.elements.filter(x=>x.render === "jellyStage").map(x=>x.draw(x, c));
  }
  return jellies;
}
let initJelly = () => {
  let jelly = grta.createElement();
  jelly.type = "jelly-bowl";
  jelly.render = "jellyStage";
  jelly.image = images.jelly;
  jelly.shadow = false;
  jelly.imageBites = 0;
  jelly.images = {jelly: images.jelly,
                  bowl: images.bowlEmpty,
                  sticks: images.chopsticks};
  jelly.initialScale = .35;
  jelly.imgHeight = jelly.image.height;
  jelly.imgWidth = jelly.image.width;
  jelly.opacity = 0;
  TweenMax.to(jelly, .4, {opacity: 1});
  jelly.bites = 0;
  jelly.biteLimit = 4;
  jelly.clickable = true;
  jelly.clickAreas.push([0,0, jelly.imgWidth, jelly.imgHeight]);
  jelly.on_click = (obj, event, status) => {
    let game = status.elements.find(x=>x.gameID == "eatJelly");
    if(status.gameStatus === "started" &&
       status.currentGame === "eatJelly"){
         obj.bites += 1;
         if(obj.bites >= obj.biteLimit) {
           status.score += 1;
           status.addElement(initFlyout(status.score, obj.xpos, obj.ypos));
           obj.clickable = false;
           TweenMax.to(obj, 0.3, {opacity: 0, onComplete: () => obj.remove = true});
         };
       }

    if(status.gameStatus === "ready"){
      console.log("Starting Jelly Game");
      status.currentGame = "eatJelly";
      status.gameStatus = "started";
      TweenMax.to('#'+game.captionID, 0.4, {opacity: 0});
      status.addElement(initClock(300,160));
      obj.bites += 1;
    }

  }
  jelly.drawJelly = jelly.draw;
  jelly.draw = (obj, c, status) => {
    if(obj.bites > obj.imageBites){
      let j = document.createElement('canvas');
      let jc = j.getContext('2d');
      jc.width = obj.imgWidth;
      jc.height = obj.imgHeight;
      jc.drawImage(obj.image, obj.frameOffset(obj), 0, obj.imgWidth, obj.imgHeight, 0,0,obj.imgWidth, obj.imgHeight);
      jc.globalCompositeOperation = "destination-out";
      jc.beginPath();
        jc.arc(obj.bites*obj.imgWidth/4, obj.imgHeight/3, obj.imgWidth/4 , 0, 2*Math.PI);
      jc.fill();
      obj.image = j;
    }
    obj.drawJelly(obj, c, status);
  }

  return jelly;
}


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
