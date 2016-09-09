'use strict'
//Global variable for testing PURPOSES
let globStat;
//Global variable for answers to questions
let answers = {};
//Global variables for scroll effects
let didScroll = false;
let scrollWatchID = null;
//imageSources for The Boring Man
let imageSources = {
  head: "images/boringman-head-nogob.png",
  gob: "images/boringman-head-gob.png",
  missHair: "images/boringman-head-miss.png",
  withdrawHair: "images/boringman-head-withdraw2.png",
  cutNose: "images/boringman-head-cutnose.png",
  beak: "images/boringman-head-beak.png",

  body: "images/boringman-body-nohead-bw.png",
  bodyMiss: "images/boringman-body-miss.png",
  bodyLeave: "images/boringman-body-leaves.png",
  bodyDuck: "images/boringman-body-duck.png",
  bodyTakeOff: "images/boringman-body-rocket.png",
  bodyWithdraw: "images/boringman-body-withdraw.png",
  bodyPooh: "images/boringman-body-pooh.png",
  bodyCut: "images/boringman-body-operation.png",
  bodyHoof: "images/boringman-body-centaur.png",
  bodyBounce: "images/boringman-body-pogo.png",
  bodyNoLegs: "images/boringman-body-nolegs.png",
  bodyFallTop: "images/boringman-body-falling-top.png",
  bodyLegs: "images/boringman-legs.png",
  bodySkip: "images/boringman-body-skip.png",

  rocketFire: "images/boringman-body-rocket-fire.png",
  banana: "images/banana.png",
};
let images;
//speech for The Boring Man
//Each line delimited by "~"(tilde)
//"..."(3x fullstop) on its own to add a .5s pause
let spiel = "Welcome to Not Buying Butler~"+
            "the old fashioned way of buying a car~"+
            "I can say pretty much anything~"+
            "all this text is evaluated procedurally~"+
            "to count syllables and move my mouth accordingly.~"+
            "Creepy, yes?~"+
            "...~...";
$(document).ready(()=>{
  /*split two-tone text into spans*/
  //Used in conjunction with CSS .two-tone rules
  $('.two-tone').map( (x, i, a) =>
    i.innerHTML = i.innerHTML.split('')
      .map( x=> '<span content="'+x+'">'+x+'</span>')
      .reduce( (p,c) => p + c )
  );

  //Handle Scroll without killing performance by only executing scroll changes
  //at intervals
  $(window).scroll( () => didScroll = true );
  scrollWatchID = setInterval(handleScroll[0], 100);

  //Show arrow after a period of time to guide user to scroll down
  TweenMax.to('.screen-1-arrow', 1, {opacity: 1, delay: 5})
  TweenMax.to('.screen-1-arrow', 2, {bottom: "2.5em",
                                     ease: Quad.easeInOut,
                                     yoyo: true,
                                     repeat: -1});

  //Log answers clicked and progess to next screen
  $(".answer-button").click( event => {
    let quest = $(event.target).closest('ul').attr('id').split("-")[0];
    let answer = (parseInt($(event.target)
      .attr('class')
      .split(" ")
      .find(x=>!x.indexOf('response'))
      .split("-")[1]));
    answers[quest] = answer;
    let screenNum = $(event.target)
      .closest('.frame')
      .attr('class')
      .split(" ")
      .find(x=>!x.indexOf("screen"))
      .split("-")[1];
    $("#leave-screen-"+screenNum).click();
  })
  //Check visiable screens and apply scroll handlers if required
  $(".leave-screen").click((event)=>{
    let screenNum = parseInt($(event.target).attr('id').split('-')[2]);
    fadeScrollReplace('#screen-'+screenNum, '#screen-'+(screenNum+1),
                      0, 400, fadeCallbacks[screenNum]);
    clearInterval(scrollWatchID);
    scrollWatchID = setInterval(handleScroll[screenNum], 100);
    if(globStat) cancelAnimationFrame(globStat.animID);
    TweenMax.killAll();
  });
});

// handleScroll :: Int -> IO
let handleScroll = [
  () => {
    //console.log('handleScroll for #screen-1');
    if(didScroll){
      if($(window).scrollTop() >= window.innerHeight)
        //$('#time-question').fadeIn(400);
        TweenMax.to('#time-question', 1, {opacity: 1});
      didScroll = false;
    }
  },
  () => {
    //console.log('handleScroll for #screen-2');
    //clear scrollWatcher if no longer scroll events required
    clearInterval(scrollWatchID);
  },
  () => {
    //console.log('handleScroll for #screen-3');
    //clear scrollWatcher if no longer scroll events required
    clearInterval(scrollWatchID);
  },
  () => {
    //console.log('handleScroll for #screen-4');
    //clear scrollWatcher if no longer scroll events required
    clearInterval(scrollWatchID);
  }
];

let fadeCallbacks = [
  () => {

  },
  () => {
    console.log("Boring man");
    grta.preLoadImages(imageSources, (img)=>{
      images = img;
      console.log("images pre loaded");
      let status = initCanvasStatus();
      globStat = status;

      let canvas = document.getElementById('puppet');
      let ctx = canvas.getContext('2d');
      let man = status.addElement(initBoringman());

      //TODO Change delay to 26 seconds
      //currently shorter for testing puerposes
      TweenMax.to(".bb-skip", 0.5, {
        opacity: 0.8,
        scale: 1,
        ease: Linear.easeNone,
        delay: 1,
        display: "inline-block",
      });

      let clearStage = () => {
        status.elements
          .filter(x => x.type==="boringmanProp")
          .map(x => x.remove = true);
        tweens.map(x => x.kill());
        tweens = [];
      }
      let skipOptions = {
        miss: () => {
          man.offScreen = false;
          man.positions.headFunc = createHeadMiss;
          man.positions.headOffsetX = 180;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 0;
          man.positions.headScale = 0.5;
          man.positions.bodyFunc = createBodyMiss;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 135;
          man.positions.bodyScale = 1;
          man.positions.headFirst = false;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 0.6;
          man.xpos = 230;
          man.ypos = 5;
        },
        leave: () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 390;
          man.positions.headOffsetY = 60;
          man.positions.headRot = 0;
          man.positions.headScale = 0.5;
          man.positions.bodyFunc = createBodyLeave;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 0;
          man.positions.bodyScale = .8;
          man.positions.headFirst = true;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1;
          man.xpos = 80;
          man.ypos = 5;
        },
        duck: () => {
          man.offScreen = false;
          man.positions.headFunc = createHeadBeak;
          man.positions.headOffsetX = 390;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 0;
          man.positions.headScale = 0.5;
          man.positions.bodyFunc = createBodyDuck;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 470;
          man.positions.bodyScale = .3;
          man.positions.headFirst = false;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1;
          man.xpos = 80;
          man.ypos = 5;
        },
        "take-off": () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 520;
          man.positions.headOffsetY = -750;
          man.positions.headRot = 57;
          man.positions.headScale = 0.4;
          man.positions.bodyFunc = createBodyTakeOff;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 0;
          man.positions.bodyScale = .7;
          man.positions.headFirst = true;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1;
          man.xpos = 80;
          man.ypos = 5;
          let fire = status.addElement(initRocketFire());
          tweens.push(TweenMax.to(fire, 0.5, {opacity: 1, delay: 0.2}));
          tweens.push(TweenMax.to(fire, 1, {xpos:"-=10", ypos:"+=10",
                                            ease:Quad.easeInOut,
                                            yoyo:true,
                                            repeat: -1}));
          tweens.push(TweenMax.to(man, 2,
            {ypos:"+=10", ease: Quad.easeInOut, yoyo: true, repeat: -1}));
        },
        withdraw: () => {
          man.offScreen = false;
          man.positions.headFunc = createHeadWithdraw;
          man.positions.headOffsetX = 250;
          man.positions.headOffsetY = 20;
          man.positions.headRot = 0;
          man.positions.headScale = 0.35;
          man.positions.bodyFunc = createBodyWithdraw;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 80;
          man.positions.bodyScale = .5;
          man.positions.headFirst = false;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1.1;
          man.xpos = 180;
          man.ypos = 0;
        },
        pooh: () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 285;
          man.positions.headOffsetY = 130;
          man.positions.headRot = 0;
          man.positions.headScale = 0.28;
          man.positions.bodyFunc = createBodyPooh;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 0;
          man.positions.bodyScale = 1.1;
          man.positions.headFirst = true;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1.1;
          man.xpos = 200;
          man.ypos = 0;
        },
        cut: () => {
          man.offScreen = false;
          man.positions.headFunc = createHeadCut;
          man.positions.headOffsetX = 235;
          man.positions.headOffsetY = 115;
          man.positions.headRot = 0;
          man.positions.headScale = 0.28;
          man.positions.bodyFunc = createBodyCut;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 0;
          man.positions.bodyScale = .5;
          man.positions.headFirst = true;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1.1;
          man.xpos = 220;
          man.ypos = 0;
        },
        hoof: () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 355;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 15;
          man.positions.headScale = 0.35;
          man.positions.bodyFunc = createBodyHoof;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 220;
          man.positions.bodyScale = .55;
          man.positions.headFirst = false;
          man.rotationX = 300;
          man.rotationY = 300;
          man.rotation = 0;
          man.scale = 1;
          man.xpos = 180;
          man.ypos = -20;
          tweens.push(TweenMax.to(man, 1.5, {rotation: 5,
                                             yoyo: true,
                                             repeat: -1}));
        },
        bounce: () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 105;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 0;
          man.positions.headScale = 0.35;
          man.positions.bodyFunc = createBodyBounce;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 150;
          man.positions.bodyScale = .6;
          man.positions.headFirst = false;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = .6;
          man.xpos = 0;
          man.ypos = 0;
          tweens.push(TweenMax.to(man, 4, {xpos:553,
                                          ease:Linear.easeNone,
                                          yoyo: true,
                                          repeat: -1}));
          tweens.push(TweenMax.to(man, .6, {ypos:155,
                                            ease:Quad.easeIn,
                                            yoyo: true,
                                            repeat: -1}));
        },
        slip: () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 280;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 0;
          man.positions.headScale = 0.3;
          man.positions.bodyFunc = createBodyWalk;
          man.positions.bodyOffsetX = 60;
          man.positions.bodyOffsetY = 125;
          man.positions.bodyScale = .65;
          man.positions.headFirst = false;
          man.rotationX = 100;
          man.rotationY = 100;
          man.rotation = -1;
          man.scale = 1;
          man.xpos = 450;
          man.ypos = 20;
          let slip = status.addElement(initBanana());
          tweens.push(TweenMax.to(slip, 0.5, {opacity: 1, delay: 0.2}));
          tweens.push(TweenMax.to(man, 0.3, {
            rotation: 1,
            ease:Power0.easeInOut,
            yoyo: true,
            repeat: -1
          }));
          tweens.push(TweenMax.to(man, 2, {
            xpos: 100,
            ease:Quad.easeIn,
            onComplete: () => {
              tweens.map(x => x.kill());
              man.positions.bodyFunc = createBodyFall;
              man.positions.bodyOffsetX = 0;
              man.positions.bodyOffsetY = 15;
              tweens.push(TweenMax.to(man, 0.5,
                {ypos:0, xpos:150, rotation:90, onComplete: () => tweens.push(
                  TweenMax.to(man, 0.5, {ypos: 190, ease:Bounce.easeOut,
                    onComplete: () => {
                      man.positions.bodyFunc = createBodyWalk;
                      man.positions.bodyOffsetX = 60;
                      man.positions.bodyOffsetY = 125;
                    }
                  })
                )}
              ));
            }
          }))
        },
        skip: () => {
          man.offScreen = false;
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 520;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 0;
          man.positions.headScale = 0.4;
          man.positions.bodyFunc = createBodySkip;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 160;
          man.positions.bodyScale = .65;
          man.positions.headFirst = false;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1;
          man.xpos = 70;
          man.ypos = 20;
          let rope = status.addElement(initRope());
          tweens.push(TweenMax.to(rope, 0.2, {opacity: 1, delay: 0.2}));
          tweens.push(TweenMax.to(rope, .7,
            {pos: 800, yoyo: true,
             ease:Power1.easeInOut, repeat: -1,
             onRepeat: () => {
               if(rope.render === "main") rope.render = "background";
               else rope.render = "main";
             }
           }));
          tweens.push(TweenMax.to(rope, .7, {ypos:-20, yoyo: true, repeat: -1}));
          tweens.push(TweenMax.to(man, .7, {ypos: 0, yoyo: true, repeat: -1}));
        },
        split: () => {
          man.positions.headFunc = createHead;
          man.positions.headOffsetX = 150;
          man.positions.headOffsetY = 0;
          man.positions.headRot = 0;
          man.positions.headScale = 0.5;
          man.positions.bodyFunc = createBody;
          man.positions.bodyOffsetX = 0;
          man.positions.bodyOffsetY = 250;
          man.positions.bodyScale = .5;
          man.positions.headFirst = false;
          man.rotationX = 0;
          man.rotationY = 0;
          man.rotation = 0;
          man.scale = 1;
          man.xpos = 200;
          man.ypos = 5;
          let left = status.addElement(initLeftSplit(man));
          let right = status.addElement(initRightSplit(man));
          setTimeout( () => {
            left.opacity = right.opacity = 1;
            man.offScreen = true;
            }, 200);
          tweens.push(TweenMax.to(left, 1, {rotation: -20, delay: 0.4}));
          tweens.push(TweenMax.to(right, 1, {rotation: 20, delay: 0.4}));
        },
      };
      let tweens = [];
      $('.skip-option').click( (event) => {
        console.log("skip option clicked:", $(event.target).attr('id'));
        clearStage();
        let targetID = $(event.target).attr('id');
        TweenMax.to(man, 0.2, {slideY: "+=360", onComplete: () => {
          skipOptions[targetID]();
          TweenMax.to(man, 0.2, {slideY: "-=360"});
        }});
      });

      status.animID = window.requestAnimationFrame( () =>
        renderScene(status, ctx) );

      let updateAttrs = [
        "xpos",
        "ypos",
        "scale",
        "opacity",
        "rotation",
      ]

      let updateTimer = new DeltaTimer( (time) => {
        status = grta.updateElements(status, updateAttrs, time);
      }, (1000/60));
      let startUpdates = updateTimer.start();
      //Format text into phrases and syllable objects
      let phrases = spiel.split("~");
      let syllables = phrases.map( x => syllablesInString(x) );
      //create HTML subtitle element, sort out timings for subtitles and mouth
      status.addElement(initSubtitle(phrases[0], 75));
      //for testing
      let gobLoop = true;
      let gob = puppetSpeak(syllables, man, "subtitle", phrases, gobLoop);
      //for testing
      if(!gobLoop)
        gob.append( new TweenMax("#subtitle", 1, {opacity: 0,}) );
    })
  },
  () => {
    TweenMax.to('#aintnobody', 1, {opacity: 0.1, delay: 2});
    TweenMax.fromTo('#boast', 1, {opacity: 0, scale: 2},
                                 {opacity: 1,
                                  scale: 1,
                                  ease: Bounce.easeOut,
                                  delay: 2}
    );
    TweenMax.to('.screen-4-arrow', 1, {opacity: 1, delay: 4})
    TweenMax.to('.screen-4-arrow', 2, {bottom: "2.5em",
                                       ease: Quad.easeInOut,
                                       yoyo: true,
                                       repeat: -1});
  },
  () => {
    //Evaluate answers.hobby to get correct infographic
    let infoName;
    console.log("answers", answers);
    if(answers.hobby == 1) infoName = "food";
    else if(answers.hobby == 2) infoName = "exist";
    else if(answers.hobby == 3) infoName = "learn";
    else if(answers.hobby == 4) infoName = "sport";
    else if(answers.hobby == 5) infoName = "travel";
    else infoName = null;

    //FOR TESTING PURPOSES
    if(infoName != "sport" && infoName != "food"){
      console.log('You selected "' + infoName +
        '", which does not yet exist.  Switching to "sport"');
      infoName = "sport";
    }
    console.log('Loading "'+infoName+'" infographic');

    if(infoName){
      //Ajax load infographic from inforgraphic page
      $('#infographic').load('infog/'+infoName+'/index.html #wrapper > *',
        //change relative image sources to be correct from new location
        //TODO - try and do this before adding the content to the DOM
        ()=> $('#infographic img').map( (x,i) =>
          i.src = 'infog/'+infoName+'/images/' + i.src.split('/').last())
      );
      //replace landing CSS with infographic CSS
      $('head link')[0].href = 'infog/'+ infoName +'/style.css';
      //Load javascript for Infographic
      $.getScript('infog/'+infoName+'/'+infoName+'.js');
      //Trash everything no longer required
      [1,2,3].map( x => $('#screen-'+x).remove());
      //uses global reference to status to clear out elements no longer
      //required.
      globStat.elements = [];
    } else $('#infographic').append('<div>We\'re Sorry!  The Infographic You \
                                     Are Looking For Is In Another Castle');
  },
];

let fadeReplace = (o, n, d) => $(o).fadeOut(d, () => $(n).fadeIn(d));
let fadeScrollReplace = (o, n, s, d, callback) => $(o).fadeOut(d, () => {
  window.scrollTo(0,s);
  $(n).fadeIn(d, callback);
});
let isDisplayed = (selector) => $(selector).css('display') != "none";
let renderScene = (status, ctx) => {
  let checkShadow = (x, ctx) => {
    if(x.shadow){
      let scalesq = x.scale * x.scale;
      let scalecub = scalesq * x.scale;
      ctx.shadowColor = 'rgba(0,0,0,.7)';
      ctx.shadowBlur = scalesq * 20;
      ctx.shadowOffsetX = scalecub * 10;
      ctx.shadowOffsetY = scalecub * 10;
    }
  }
  let render = (x, ctx, status) => {
    ctx.save();
    checkShadow(x, ctx);
    x.draw(x, ctx, status);
    ctx.restore();
  }
  ctx.clearRect(0,0,640,360);
  status.elements
    .filter(x=>x.render === "background" && !x.offScreen)
    .map(x => render(x, ctx, status));
  status.elements
    .filter(x=>x.render === "main" && !x.offScreen)
    .map(x => render(x, ctx, status));
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
  obj.addElement = (element) => obj.elements[obj.elements.push(element)-1];
  return obj;
}

let initSubtitle = (s, y) => {
  let sub = grta.createElement();
  sub.type = "subtitle";
  sub.render = "subHTML";
  sub.id = "subtitle";
  createSubtitle(s, y, sub.id);
  return sub;
}
let createSubtitle = (s, y, id) => {
  let hid = !id ? '' : 'id="'+id+'"';
  let pos = 'top: '+y+'%;';
  let style = pos + ';' + "opacity: 0;";
  let sub = '<div '+hid+' class="subtitle" style="'+style+'">'+s+'</div>';
  $('#subs').append(sub);
  TweenMax.to("#"+id, 1, {opacity: 1});
}
let editSubtitle = (id, s) => $("#"+id).html(s);

// puppetSpeak :: [[Obj]] -> Obj -> String -> [Strings] -> Bool -> Timeline IO
let puppetSpeak = (syl, head, subID, phrases, loop) => {
  let repeat = 0;
  if(loop) repeat = -1;
  let gob = new TimelineMax({repeat: repeat});
  syl.map( (x,i,a) => {
    x.map( (x) => {
      if(phrases[i]==="...") gob.append( new TweenMax(head, 0.5, {}) );
      else range(1, x.count).map( x => {
        gob.append( new TweenMax(head, 0.1, {mouth: 100, headBobY: "-=2"}) );
        gob.append( new TweenMax(head, 0.1, {mouth: 0, headBobY: "+=2"}) );
      });
      gob.append( new TweenMax(head, 0, {delay: 0.1}) );
    });
    gob.append( new TweenMax(head, 0, {delay: 0.1,
      onComplete: ()=>{
        //If reached end of phrases, don't try to get next one
        if(i != a.length-1) editSubtitle(subID, phrases[i+1]);
        //If looping, get first phrase
        else if(loop) editSubtitle(subID, phrases[0]);
      }
    }));
  });
  return gob;
}

let createHead = (mouthPos) => {
  let head = document.createElement('canvas');
  head.width = images.head.width;
  head.height = images.head.height;
  let c = head.getContext('2d');
  //Rect for inside of mouth
  c.fillRect(74, 204 ,43, 37);
  c.drawImage(images.head, 0,0);
  c.translate(0,38/100*mouthPos);
  c.drawImage(images.gob, 74,204);
  return head;
}
let createHeadMiss = (mouthPos) => {
  let head = document.createElement('canvas');
  let oHead = createHead(mouthPos);
  let hair = images.missHair;
  let scale = .35;
  head.width = hair.width*scale;
  head.height = oHead.height;
  let c = head.getContext('2d');
  c.drawImage(oHead,28,0);
  c.scale(scale, scale);
  c.drawImage(hair,0,0);
  return head;
}
let createHeadWithdraw = (mouthPos) => {
  let head = document.createElement('canvas');
  let oHead = createHead(mouthPos);
  let hair = images.withdrawHair;
  let scale = 1.5;
  head.width = hair.width*scale;
  head.height = oHead.height*1.5;
  let c = head.getContext('2d');
  c.drawImage(oHead,15,80);
  c.scale(scale, scale);
  c.drawImage(hair,0,0);
  return head;
}

let createHeadCut = (mouthPos) => {
  let head = document.createElement('canvas');
  let oHead = createHead(mouthPos);
  head.width = oHead.width;
  head.height = oHead.height;
  let c = head.getContext('2d');
  c.drawImage(oHead, 0,0);
  c.drawImage(images.cutNose, 0,0);
  return head;
}
let createHeadBeak = (mouthPos) => {
  let head = document.createElement('canvas');
  let oHead = createHead(mouthPos);
  head.width = oHead.width;
  head.height = oHead.height;
  let c = head.getContext('2d');
  c.drawImage(oHead, 0,0);
  c.drawImage(images.beak, 0,0);
  return head;
}

let createBody = () => images.body;
let createBodyMiss = () => images.bodyMiss;
let createBodyLeave = () => images.bodyLeave;
let createBodyDuck = () => images.bodyDuck;
let createBodyTakeOff = () => images.bodyTakeOff;
let createBodyWithdraw = () => images.bodyWithdraw;
let createBodyPooh = () => images.bodyPooh;
let createBodyCut = () => images.bodyCut;
let createBodyHoof = () => images.bodyHoof;
let createBodyBounce = () => images.bodyBounce;
let createBodySkip = () => images.bodySkip;
let createBodyWalk = () => {
  if(!images.bodyWalk){
    let body = document.createElement('canvas');
    let bodyTop = images.bodyNoLegs;
    let bodyLegs = images.bodyLegs;
    body.width = Math.max(bodyTop.width, bodyLegs.width);
    body.height = bodyTop.height + bodyLegs.height;
    let c = body.getContext('2d');
    c.drawImage(bodyLegs,0,135);
    c.scale(0.8,0.8);
    c.drawImage(bodyTop, 33,0);
    return images.bodyWalk = body;
  } else return images.bodyWalk;
}
let createBodyFall = () => {
  if(!images.bodyFall){
    let body = document.createElement('canvas');
    let bodyTop = images.bodyFallTop;
    let bodyLegs = images.bodyLegs;
    body.width = Math.max(bodyTop.width, bodyLegs.width);
    body.height = bodyTop.height + bodyLegs.height;
    let c = body.getContext('2d');
    c.drawImage(bodyLegs,60,245);
    //c.scale(0.8,0.8);
    c.drawImage(bodyTop, 0,0);
    return images.bodyFall = body;
  } else return images.bodyFall;
}

let initRocketFire = () => {
  let fire = grta.createElement();
  fire.type = "boringmanProp";
  fire.render = "background";
  fire.image = images.rocketFire;
  fire.imgWidth = fire.image.width;
  fire.imgHeight = fire.image.height;
  fire.initialScale = 1;
  fire.xpos = 0;
  fire.ypos = 120;
  fire.opacity = 0;
  return fire;
}
let initBanana = () => {
  let slip = grta.createElement();
  slip.type = "boringmanProp";
  slip.render = "background";
  slip.image = images.banana;
  slip.imgWidth = slip.image.width;
  slip.imgHeight = slip.image.height;
  slip.initialScale = .5;
  slip.xpos = 110;
  slip.ypos = 315;
  slip.opacity = 0;
  return slip;
}
let initRope = () => {
  let rope = grta.createElement();
  rope.type = "boringmanProp";
  rope.render = "main";
  rope.image = () => createRope(rope.pos);
  rope.imgWidth = () => rope.image.width;
  rope.imgHeight = () => rope.image.height;
  rope.pos = -230;
  rope.xpos = 0;
  rope.ypos = 0;
  rope.opacity = 0;

  rope.slideY = 0;

  rope.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      //console.log(obj.ypos);
      let rotX = (obj.xpos + obj.rotationX);
      let rotY = (obj.ypos + obj.rotationY);

      c.translate(rotX, rotY);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-rotX, -rotY);

      c.scale(obj.trueScale(obj), obj.trueScale(obj));

      c.translate(obj.xpos/obj.trueScale(obj),
                  obj.ypos+obj.slideY/obj.trueScale(obj));
      c.drawImage(obj.image(),0,0);
    c.restore();
  }

  return rope;
}
let createRope = (ropePos) => {
  let rope = document.createElement('canvas');
  rope.width = 640;
  rope.height = 400;
  let c = rope.getContext('2d');
  //let sX = 73;
  let sX = 70;
  let sY = 237;
  //let eX = 568;
  let eX = 571;
  let eY = sY;
  let cX = ((eX - sX)/2)+sX;
  let cY = ropePos;
  c.strokeStyle = "#AAA";
  c.lineWidth = 7;
  c.lineCap = "round";
  c.beginPath();
    c.moveTo(sX, sY);
    c.quadraticCurveTo(cX, cY, eX, eY);
  c.stroke();

  return rope;
}
let initBoringman = () =>{
  let man = grta.createElement();
  man.type = "boringman";
  man.image = () => createBoringman(man.mouth,
                                    man.positions,
                                    man.headBobY,
                                    man.slideY);
  man.imgWidth = () => man.image.width;
  man.imgHeight = () => man.image.height;
  man.xpos =  200;
  man.ypos =  5;
  man.rotationX = 0;
  man.rotationY = 0;
  man.rotation = 0;
  man.scale = 1;
  man.mouth = 0;
  man.positions = {
    headFunc: createHead,
    headOffsetX: 150,
    headOffsetY: 0,
    headRot: 0,
    headScale: .5,
    bodyFunc: createBody,
    bodyOffsetX: 0,
    bodyOffsetY: 250,
    bodyScale: .5,
    headFirst: false
  }
  man.headBobY = 0;
  man.slideY = 0;
  man.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      let rotX = (obj.xpos + obj.rotationX);
      let rotY = (obj.ypos + obj.rotationY);

      c.translate(rotX, rotY);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-rotX, -rotY);

      c.scale(obj.trueScale(obj), obj.trueScale(obj));

      c.translate(obj.xpos/obj.trueScale(obj),
                  obj.ypos+obj.slideY/obj.trueScale(obj));
      c.drawImage(obj.image(),0,0);
    c.restore();
  }
  return man
}

// createBoringman :: Int -> {} -> Int -> Bool -> Canvas
let createBoringman = (mouthPos, pos, headBobY, slideY) => {
  let man = document.createElement('canvas');
  let head = pos.headFunc(mouthPos);
  let headCenter = [head.width/2, head.height/4];
  let body = pos.bodyFunc();
  man.width = Math.max(head.width, body.width);
  man.height = head.height + body.height;
  let c = man.getContext('2d');

  let drawBody = () => {
    c.save();
      c.scale(pos.bodyScale, pos.bodyScale);
      c.drawImage(body, pos.bodyOffsetX, pos.bodyOffsetY);
    c.restore();
  }
  let drawHead = () => {
    c.save();
      c.rotate(pos.headRot*Math.PI/180);
      c.scale(pos.headScale, pos.headScale);
      c.drawImage(head, pos.headOffsetX, pos.headOffsetY+headBobY);
    c.restore();
  }
  if(pos.headFirst){drawHead();drawBody();}
  else{drawBody();drawHead();}
  return man;
}

let initLeftSplit = (bman) => {
  let left = grta.createElement();
  left.type = "boringmanProp";
  left.image = () => createLeftSplit(bman);
  left.imgWidth = () => bman.imgWidth();
  left.imgHeight = () => bman.imgHeight();
  left.initialScale = 1;
  left.xpos = bman.xpos;
  left.ypos = bman.ypos;
  left.rotationX = 128;
  left.rotationY = 500;
  left.opacity = 0;

  left.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      let rotX = (obj.xpos + obj.rotationX);
      let rotY = (obj.ypos + obj.rotationY);

      c.translate(rotX, rotY);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-rotX, -rotY);

      c.scale(obj.trueScale(obj), obj.trueScale(obj));

      c.translate(obj.xpos/obj.trueScale(obj),
                  obj.ypos+obj.slideY/obj.trueScale(obj));
      c.drawImage(obj.image(),0,0);
    c.restore();
  }
  return left;
}
let createLeftSplit = (bman) => {
  let left = document.createElement('canvas');
  let man = bman.image();
  left.width = man.width/4;
  left.height = man.height;
  let c = left.getContext('2d');
  //c.strokeRect(0,0,left.width, left.height);
  c.drawImage(bman.image(),
              0,0,
              man.width/4, man.height,
              0,0,
              left.width, left.height);

  return left;
}
let initRightSplit = (bman) => {
  let right = grta.createElement();
  right.type = "boringmanProp";
  right.image = () => createRightSplit(bman);
  right.imgWidth = () => bman.imgWidth();
  right.imgHeight = () => bman.imgHeight();
  right.initialScale = 1;
  right.xpos = bman.xpos + 128;
  right.ypos = bman.ypos;
  right.rotationY = 500;
  right.opacity = 0;


  right.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      let rotX = (obj.xpos + obj.rotationX);
      let rotY = (obj.ypos + obj.rotationY);

      c.translate(rotX, rotY);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-rotX, -rotY);

      c.scale(obj.trueScale(obj), obj.trueScale(obj));
      c.translate(obj.xpos/obj.trueScale(obj),
                  obj.ypos+obj.slideY/obj.trueScale(obj));
      c.drawImage(obj.image(),0,0);
    c.restore();
  }
  return right;
}
let createRightSplit = (bman) => {
  let right = document.createElement('canvas');
  let man = bman.image();
  right.width = man.width/4;
  right.height = man.height;
  let c = right.getContext('2d');
  //c.strokeRect(0,0,right.width, right.height);
  c.drawImage(bman.image(),
              man.width/4, 0,
              man.width/4, man.height,
              0,0,
              right.width, right.height);

  return right;
}

// syllablesInWord :: String -> Int
let syllablesInWord = w => {
  if(w.length <= 3) return 1;
  return w.toLowerCase()
  .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  .replace(/^y/, '')
  .match(/[aeiouy]{1,2}/g)
  .length;
}

// syllablesInString :: String -> [{word, syllables}]
let syllablesInString = s =>
  s.split(/\s+|\n/)
    .filter(x=>x!="")
    .map( x => ({word: x, count: syllablesInWord(x)}));

// range :: Int -> Int -> [Int]
let range = (s, c) => Array.apply(0, Array(c)).map( (x, i) => i + s);
//If Array.prototype.last does not exist, make it so
if(!Array.prototype.last){
  Array.prototype.last = function(){
    return this[this.length - 1];
  }
}
