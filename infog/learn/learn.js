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
  console.log('learn.js running');
  //add meta tags to make social media work
  let metas = '<meta property="og:url"          content="http://e1337sheep.github.io/infog/learn/index.html" />\
               <meta property="og:type"         content="product" />\
               <meta property="og:title"        content="Buying Butler - How much...?" />\
               <meta property="og:description"  content="How much time will you save? [More description here]" />\
               <meta property="og:image"        content="http://e1337sheep.github.io/infog/learn/images/learn.png" />\
               <meta property="og:image:width"  content="669"/>\
               <meta property="og:image:height" content="379"/>\
               <meta itemprop="name"            content="Buying Butler">\
               <meta itemprop="description"     content="A score could go here?">\
               <meta itemprop="image"           content="https://e1337sheep.github.io/infog/learn/images/learn.png">\
  ';

  $('head').append(metas);
  //Facebook link creation
  let fbShare = {
    pre: "https://www.facebook.com/dialog/feed\?",
    app_id: "1047735381986158",
    link: encodeURIComponent("https://e1337sheep.github.io/infog/learn/index.html"),
    picture: encodeURIComponent("https://e1337sheep.github.io/infog/learn/images/learn.png"),
    caption: encodeURIComponent("Descripton has been added?"),
    description: encodeURIComponent("I scored something on something, get it!"),
  };
  $('#fb-share').attr('href', fbShare.pre
                              +"&app_id="+fbShare.app_id
                              +"&redirect_uri="+fbShare.link
                              +"&link="+fbShare.link
                              +"&picture="+fbShare.picture
                              +"&caption="+fbShare.caption
                              +"&description="+fbShare.description
  );
  //Twitter link creation
  let twShare = {
    pre: "https://twitter.com/intent/tweet\?",
    url: encodeURIComponent("https://e1337sheep.github.io/infog/learn/index.html"),
    hashtags: "BuyingButler,CarBuying",
    via: "BuyingButler",
    text: encodeURIComponent("I scored this and that"),
  }
  $('#tw-share').attr('href', twShare.pre
                              +"&url="+twShare.url
                              +"&hashtags="+twShare.hashtags
                              +"&via="+twShare.via
                              +"&text="+twShare.text
  );
  //LinkedIn link creation
  let liShare = {
    pre: "http://www.linkedin.com/shareArticle\?",
    mini: "true",
    url: encodeURIComponent("https://e1337sheep.github.io/infog/learn/index.html"),
    source: encodeURIComponent("Buying Butler"),
    title: encodeURIComponent("How much...?"),
    summary: encodeURIComponent("I scored something something?"),
  }
  $('#li-share').attr('href', liShare.pre
                             +"&mini="+liShare.mini
                             +"&url="+liShare.url
                             +"&source="+liShare.source
                             +"&title="+liShare.title
                             +"&summary="+liShare.summary
  )
  let gpShare = {
    pre: "https://plus.google.com/share\?",
    url: encodeURIComponent("https://e1337sheep.github.io/infog/learn/index.html")
  }
  $('#gp-share').attr('href', gpShare.pre
                              +"&url="+gpShare.url
  );

  //Extract unique images from fallback
  let imgSources = {};
  $('#wrapper img[id]').map( (i, x) => imgSources[grta.dashToCamel(x.id)] = x.src);
  grta.preLoadImages(imgSources, (img) => {
    images = img;
    //images.bungeeMan = grta.giveBorder(images.bungeeMan, 2, 'white');
    images.bird = grta.giveBorder(images.bird, 2, "white", false);

    let canvas = document.getElementById('learn');
    //Prevents repeat click selecting text in Chrome
    canvas.onselectstart = () => false;
    let ctx = canvas.getContext('2d');
    let status = initCanvasStatus();
    globStat = status;
    scaleFactor = grta.calcScale('learn');

    let startElements = [
      initEarth,
      initFalls,
      initNiagraTop,
      initNiagraBottom,
      initQuake,
      initMeteorStage,
      initTwisterStage,
      initBird,
      initAnteater,
      initStorm,
      initCloudBottom,
      initCloudTop,
      initEarthBoltStage,
      initTwister,
      initBatStage,
      initBat,
    ];
    startElements.map( x => status.addElement(x()) );

    let whales = [
      ()=>status.addElement(initWhale(400,210,400-10,210+80,400-20,210+130)),
      ()=>status.addElement(initWhale(420,210,420,210+100,420,210+130)),
      ()=>status.addElement(initWhale(440,210,440,210+110,440,210+130)),
      ()=>status.addElement(initWhale(460,210,460-20,210+120,460-30,210+130)),
      ()=>status.addElement(initWhale(480,210,480-10,210+120,480-20,210+130)),
      ()=>status.addElement(initWhale(500,210,500-10,210+120,500-20,210+130)),
      ()=>status.addElement(initWhale(520,210,520-10,210+120,520-20,210+130)),
      ()=>status.addElement(initWhale(540,210,540-10,210+120,540-20,210+130)),
      ()=>status.addElement(initWhale(560,213,560-20,213+120,560-40,213+130)),
      ()=>status.addElement(initWhale(580,213,580-20,213+120,580-40,213+130)),
    ];

    let cloudBolts = [
      {sx:150,sy:220,ex:150,ey:240,rot:60,d:0,s:1},
      {sx:190,sy:240,ex:210,ey:260,rot:20,d:.2, s:.9},
      {sx:190,sy:240,ex:190,ey:260,rot:60,d:.1, s:.8},
    ];
    cloudBolts.map( x =>
      status.addElement(initCloudBolt(x.sx, x.sy, x.ex, x.ey, x.rot, x.d, x.s)));

    let meteors = [
      ()=>status.addElement(initMeteor(640,0,-200,170,1,0,1)),
      ()=>status.addElement(initMeteor(640,0,-200,170,1,0,1)),
      ()=>status.addElement(initMeteor(640,50,-200,500,.5,-20,2)),
      ()=>status.addElement(initMeteor(640,50,-200,500,.5,-20,2)),
      ()=>status.addElement(initMeteor(640,100,-200,-150,.8,30,1.5)),
      ()=>status.addElement(initMeteor(640,100,-200,-150,.8,30,1.5)),
      ()=>status.addElement(initMeteor(640,-100,-200,300,.5,-10,2)),
    ];

    let earthBolts = [
      {sx:420, sy:240, ex:430, ey:230, rot:-90, d:0, speed:1},
      {sx:400, sy:200, ex:410, ey:200, rot:-75, d:.2, speed:1.1},
      {sx:390, sy:170, ex:410, ey:170, rot:-60, d:.1, speed:.8},
      {sx:380, sy:130, ex:400, ey:130, rot:-45, d:0, speed:.7},
      {sx:380, sy:100, ex:400, ey:105, rot:-30, d:.2, speed:1},
      {sx:390, sy:60, ex:410, ey:70, rot:-15, d:.1, speed:.7},
      {sx:420, sy:35, ex:430, ey:50, rot:-5, d:0, speed:1.1},
      {sx:460, sy:10, ex:470, ey:25, rot:10, d:0, speed:.8},
      {sx:500, sy:0, ex:510, ey:15, rot:20, d:.3, speed:.8},
      {sx:540, sy:-20, ex:540, ey:15, rot:35, d:0, speed:.7},
    ];
    earthBolts.map(x =>
      status.addElement(
        initEarthBolt(x.sx, x.sy, x.ex, x.ey, x.rot, x.d, x.speed)
      )
    );

    let bulbPos = [
      {x:320, y:0,},
      {x:295, y:0,},
      {x:270, y:0,},
      {x:245, y:0,},

      {x:330, y:30,},
      {x:305, y:30,},
      {x:280, y:30,},
      {x:255, y:30,},
      {x:230, y:30,},

      {x:320, y:60,},
      {x:295, y:60,},
      {x:270, y:60,},
      {x:245, y:60,},
      {x:220, y:60,},

      {x:330, y:90,},
      {x:305, y:90,},
      {x:280, y:90,},
      {x:255, y:90,},
      {x:230, y:90,},

      {x:320, y:120,},
      {x:295, y:120,},
      {x:270, y:120,},
      {x:245, y:120,},
      {x:220, y:120,},
    ];
    bulbPos.map(x=>status.addElement(initBulb(x.x, x.y)));

    let moths = [
      {x:-10, y:-10},
      {x:50, y:0},
      {x:150, y:0},
      {x:0, y:80},
      {x:40, y:120},
      {x:100, y:120},
      {x:150, y:100},
      {x:0, y:170},
      {x:80, y:170},
      {x:160, y:170},
      {x:220, y:200},
    ];
    moths.map(x=>status.addElement(initMoth(x.x,x.y)));
    //let ballStage = status.elements.find(x=>x.type==="ballStage");
    //ballStage.addBall(ballStage, status);

    //Add static captions
    let staticCaptions = [
      //{text: "You could moonwalk 27.5 miles",w:175, h:15, x:250, y:50, rot: 0},
    ];
    let staticCaptionsHTML = [
      //{text: "You could moonwalk 27.5 miles",w:30, h:6, x:38, y:13},
      //{text: "",w:30, h:6, x:38, y:13, rot:0},
      {text: "A bat will eat around 1,000 insects.  How many can you eat?"
        ,w:30, h:10, x:3, y:30, rot:0},
      {text: "In the world there will be 7,200 earthquakes and more than \
        18,000 thunderstorms",w:30, h:15, x:5, y:70, rot:0},
      {text: "30,000 ants will be gobbled up by a South American Giant \
        Anteater",w:23, h:15, x:38, y:82, rot:0},
      {text: "A hummingbird will consume half of their weight in food",
        w:27, h:10, x:42, y:47, rot:30},
      {text: "One Billion gallons of water will tumble over Niagra falls \
        (that's just under 28,000 blue whales!)",w:30, h:15, x:68, y:82, rot:0},
      {text: "20 million meteors will be visible in the sky",
        w:16, h:15, x:80, y:30, rot:0},
      {text: "The Earth will be hit by lightning more than 8.6 million times",
        w:30, h:10, x:55, y:20, rot:-55},
      {text: "A hurricane will release enough energy for six months of \
        electricity",w:32, h:10, x:35, y:12, rot:-20},

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
    window.setInterval( () =>
      whales[Math.floor(Math.random() * whales.length)](), 500);
    window.setInterval( ()=>
      meteors[Math.floor(Math.random() * meteors.length)](), 1000);





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

    $('#learn').click( event => {
      //console.log("Clicked! x:", event.offsetX*scaleFactor, "y:", event.offsetY*scaleFactor);
      status.elements.filter( x => x.clickable == true).map( x => {
        if(x.hasClicked(x, event)) x.on_click(x, event, status);
      });
    });
    //Test code for converting canvas to png (with background);
    $('#snap').click(event => {
      console.log("Take a picture");
      let camera = document.createElement('canvas');
      camera.width = 640;
      camera.height = 360;
      let cameraC = camera.getContext('2d');
      cameraC.fillStyle = "rgba(20,20,20,1)";
      cameraC.fillRect(0,0,640,360);
      cameraC.drawImage(canvas, 0,0);
      let grt = document.getElementById('captions');
      //console.log(grt);
      //console.log(window.getComputedStyle(grt));
      window.open(camera.toDataURL('image/png'));
    })
    //Calculate new scale factor for correct click detection
    //Also need to redraw captions after size change
    $(window).resize( event => {
      scaleFactor = grta.calcScale('learn');
      //console.log(scaleFactor);
    });
    //Fade up Infographic when it's ready;
    TweenMax.to('#learn', .8, {opacity: 1});

  });

});

//Bat and Moth
let initBatStage = () => {
  let batStage = grta.createElement();
  batStage.type = "batStage";
  batStage.draw = (obj, c, status) => {
    let elements = status.elements.filter(x=>x.render === "batStage");
    let bat = elements.find(x=>x.type === "bat");
    bat.draw(bat, c, status);
    elements.filter(x=>x.type==="moth").map(x=>x.draw(x,c,status));
  }
  return batStage;
}
let initBat = () => {
  let bat = grta.createElement();
  bat.type = "bat";
  bat.render = "batStage";
  bat.image = images.bat;
  bat.imgWidth = bat.image.width;
  bat.imgHeight = bat.image.height;
  bat.initialScale = .7;
  bat.rotationX = bat.imgWidth*bat.initialScale/2;
  bat.rotationY = bat.imgHeight*bat.initialScale/2;
  bat.rotation = 180;
  bat.xpos = 10;
  return bat;
}
//TODO Refactor
let initMoth = (x, y) => {
  let moth = grta.createElement();
  moth.type = "moth";
  moth.render = "batStage";
  let rand = Math.floor(Math.random() * 5)+1;
  moth.image = images["moth-"+rand];
  moth.imgWidth = moth.image.width;
  moth.imgHeight = moth.image.height;
  moth.initialScale = .25;
  moth.rotationX = moth.imgWidth*moth.initialScale/2;
  moth.rotationY = moth.imgHeight*moth.initialScale/2;
  let rand2 = Math.floor(Math.random() * 360);
  moth.rotation = rand2;
  moth.xpos = x || 0;
  moth.ypos = y || 0;

  TweenMax.to(moth, .1, {
    rotation: "+=4",
    ease:Linear.easeNone,
    repeat: -1,
    repeatDelay: Math.floor(Math.random() * 5)+1,
  });
  return moth;
}

//Twister
let initTwisterStage = () => {
  let tStage = grta.createElement();
  tStage.type = "tStage";
  tStage.draw = (obj, c, status) => {
    let elements = status.elements.filter( x => x.render === "tStage");
    let twister = elements.find(x => x.type === "twister");
    twister.draw(twister, c, status);
    elements.filter( x => x.type === "bulb")
    .map(x=>x.draw(x, c, status));
  }
  return tStage;
}
let initTwister = () => {
  let twister = grta.createElement();
  twister.type = "twister";
  twister.render = "tStage";
  twister.image = images.twister;
  twister.imgWidth = twister.image.width;
  twister.imgHeight = twister.image.height;
  twister.initialScale = .8;
  twister.rotation = 50;
  twister.xpos = 390;
  twister.ypos = -60;
  return twister;
}
let initBulb = (x, y) => {
  let bulb = grta.createElement();
  bulb.type = "bulb";
  bulb.render = "tStage";
  bulb.image = images.bulb;
  bulb.imgWidth = bulb.image.width;
  bulb.imgHeight = bulb.image.height;
  bulb.initialScale = .3;
  bulb.xpos = x || 0;
  bulb.ypos = y || 0;

  return bulb;
}
//Storm
let initQuake = () => {
  let quake = grta.createElement();
  quake.type = "quake";
  quake.image = images.earthquake;
  quake.imgWidth = quake.image.width;
  quake.imgHeight = quake.image.height;
  quake.initialScale = 0.25;
  quake.xpos = 0;
  quake.ypos = 360-quake.imgHeight*quake.initialScale;
  console.log("quake ypos =", quake.ypos);

  return quake;
}
let initStorm = () => {
  let storm = grta.createElement();
  storm.type = "stormStage";
  storm.draw = (obj, c, status) => {
    let elements =
      status.elements.filter( x => x.render === "stormStage");
    let cloudBot = elements.find( x => x.type === "cloudBottom");
    let cloudTop = elements.find( x => x.type === "cloudTop");

    cloudBot.draw(cloudBot, c, status);
    elements.filter( x => x.type === "cloudBolt")
      .map( x => x.draw(x, c, status));
    cloudTop.draw(cloudTop, c, status);
  }
  return storm;
}
let initCloudBottom = () => {
  let cloud = grta.createElement();
  cloud.type = "cloudBottom";
  cloud.render = "stormStage";
  cloud.image = images.cloudBottom;
  cloud.imgWidth = cloud.image.width;
  cloud.imgHeight = cloud.image.height;
  cloud.initialScale = .5;
  cloud.xpos = 100;
  cloud.ypos = 240;
  return cloud;
}
let initCloudTop = () => {
  let cloud = grta.createElement();
  cloud.type = "cloudTop";
  cloud.render = "stormStage";
  cloud.image = images.cloudTop;
  cloud.imgWidth = cloud.image.width;
  cloud.imgHeight = cloud.image.height;
  cloud.initialScale = .5;
  cloud.xpos = 100;
  cloud.ypos = 240;
  return cloud;
}
let initCloudBolt = (sx, sy, ex, ey, rot, d, speed) => {
  let bolt = grta.createElement();
  bolt.type = "cloudBolt";
  bolt.render = "stormStage";
  bolt.image = images.bolt;
  bolt.imgWidth = bolt.image.width;
  bolt.imgHeight = bolt.image.height;
  bolt.initialScale = .3;
  bolt.rotation = rot;
  bolt.xpos = sx;
  bolt.ypos = sy;

  TweenMax.to(bolt, speed, {
    xpos: ex, ypos: ey,
    ease: Power3.easeInOut,
    yoyo: true, repeat: -1,
    delay: d,
  });
  return bolt;
}

//Anteater
let initAnteater = () => {
  let eater = grta.createElement();
  eater.type = "eater";
  eater.image = images.anteater;
  eater.imgWidth = eater.image.width;
  eater.imgHeight = eater.image.height;
  eater.initialScale = .8;
  eater.xpos = 250;
  eater.ypos = 190;

  return eater;
}

//Hummingbird
let initBird = () => {
  let bird = grta.createElement();
  bird.type = "bird";
  bird.image = images.bird;
  bird.imgWidth = bird.image.width;
  bird.imgHeight = bird.image.height;
  bird.initialScale = .7;
  bird.xpos = 180;
  bird.ypos = 160;
  bird.rotation = -20;

  TweenMax.to(bird, .5, {ypos: "-=8",
                         ease: Quad.easeInOut,
                         yoyo: true,
                         repeat: -1});

  return bird;
}

//Earth Facts
let initEarth = () => {
  let earth = grta.createElement();
  earth.type = "earth";
  earth.image = images.earth;
  earth.imgWidth = earth.image.width;
  earth.imgHeight = earth.image.height;
  earth.initialScale = .9;
  earth.xpos = 445;
  earth.ypos = 30;
  return earth;
}
let initMeteorStage = () => {
  let mStage = grta.createElement();
  mStage.type = "mStage";
  mStage.draw = (obj, c, status) => {
    //console.log(status.elements.filter( x => x.render === "mStage"));
    status.elements.filter( x => x.render === "mStage")
      .map( x => x.draw(x, c, status));
  }
  return mStage;
}
let initMeteor = (sx, sy, ex, ey, scale, rot, speed) => {
  let met = grta.createElement();
  met.type = "meteor";
  met.render = "mStage";
  met.image = images.meteor;
  met.imgWidth = met.image.width;
  met.imgHeight = met.image.height;
  met.initialScale = .7;
  met.scale = scale;
  met.rotation = rot;
  met.xpos = sx;
  met.ypos = sy;
  TweenMax.to(met, speed, {xpos: ex, ypos: ey, onComplete: () => {
    met.remove = true;
  }})
  return met;
}
let initEarthBoltStage = () => {
  let bStage = grta.createElement();
  bStage.type = "boltStage";
  bStage.draw = (obj, c, status) => {
    //console.log(status.elements.filter( x => x.render === "bStage"));
    status.elements.filter( x => x.render === "bStage")
      .map( x => x.draw(x, c, status));
  }
  return bStage;
}
let initEarthBolt = (sx, sy, ex, ey, rot, d, speed) => {
  let bolt = grta.createElement();
  bolt.type = "earthBolt";
  bolt.render = "bStage";
  bolt.image = images.bolt;
  bolt.imgWidth = bolt.image.width;
  bolt.imgHeight = bolt.image.height;
  bolt.initialScale = .2;
  bolt.rotation = rot;
  bolt.xpos = sx;
  bolt.ypos = sy;

  TweenMax.to(bolt, speed, {
    xpos: ex, ypos: ey,
    ease: Power3.easeInOut,
    yoyo: true, repeat: -1,
    delay: d,
  });
  return bolt;
}
//Niagra Falls Fact
let initFalls = () => {
  let fall = grta.createElement();
  fall.type = "fallStage";
  fall.draw = (obj, c, status) => {
    let elements = status.elements
      .filter(x=>x.render === "fallStage");
    let fallTop = elements.find(x => x.type === "fallTop");
    fallTop.draw(fallTop, c, status);
    let whales = elements.filter(x => x.type ==="whale")
      .map(x=>x.draw(x, c, status));
    let fallBot = elements.find(x => x.type === "fallBottom");
    fallBot.draw(fallBot, c, status);
  }
  return fall;
}
let initNiagraTop = () => {
  let fall = grta.createElement();
  fall.type = "fallTop";
  fall.render = "fallStage";
  fall.image = images.niagraTop;
  fall.imgWidth = fall.image.width;
  fall.imgHeight = fall.image.height;
  fall.initialScale = .4;
  fall.xpos = 640-fall.imgWidth*fall.initialScale;
  fall.ypos = 360-fall.imgHeight*fall.initialScale;
  console.log(fall.type, "xpos/ypos", fall.xpos, fall.ypos);
  return fall;
}
let initNiagraBottom = () => {
  let fall = grta.createElement();
  fall.type = "fallBottom";
  fall.render = "fallStage";
  fall.image = images.niagraBottom;
  fall.imgWidth = fall.image.width;
  fall.imgHeight = fall.image.height;
  fall.initialScale = .4;
  fall.xpos = 640-fall.imgWidth*fall.initialScale;
  fall.ypos = 360-fall.imgHeight*fall.initialScale;
  console.log(fall.type, "xpos/ypos", fall.xpos, fall.ypos);
  return fall;
}
let initWhale = (sx, sy, fx, fy, ex, ey) => {
  let whale = grta.createElement();
  whale.type = "whale";
  whale.render = "fallStage";
  whale.image = images.whale;
  whale.imgWidth = whale.image.width;
  whale.imgHeight = whale.image.height;
  whale.initialScale = .25;
  whale.xpos = sx;
  whale.ypos = sy;
  whale.opacity = 0;
  let dive = new TimelineMax({onComplete: ()=> whale.remove = true});
  dive.to(whale, 0.5, {opacity: 1})
      .to(whale, 1, {xpos: fx, ypos: fy, ease:Linear.easeNone})
      .to(whale, 0.5, {opacity: 0, ypos: ey, ease:Power1.easeOut});
  return whale;
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
