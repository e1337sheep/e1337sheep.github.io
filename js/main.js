'use strict'
//Global variable for testing PURPOSES
let globStat;
//Global variables for Intervals/Animation frames

//Global variable for answers to questions
let answers = {};
//Global variables for scroll effects
let didScroll = false;
let scrollWatchID = null;
//imageSources for The Boring Man
let imageSources = {
  head: "images/boringman-head-nogob.png",
  gob: "images/boringman-head-gob.png",
  body: "images/boringman-body-nohead-bw.png",
  rightArm: "images/boringman-arm-right.png",
  leftArm: "images/boringman-arm-left.png",
};
let images;
//speech for The Boring Man
//Each line delimited by "~"(tilde)
//"..."(3x fullstop) on its own to add a .5s pause
let spiel = "Welcome to Not Buying Butler~"+
            "the old fashioned way of buying a car~"+
            "I can say pretty much anything~"+
            "including your name Joe~"+
            "you're not left out either Steve Weston~"+
            "Is this not a little creepy?~"+
            "...~...";
            //", "+


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
    fadeScrollReplace('#screen-'+screenNum, '#screen-'+(screenNum+1), 0, 400, fadeCallbacks[screenNum]);
    clearInterval(scrollWatchID);
    scrollWatchID = setInterval(handleScroll[screenNum], 100);
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
    //clear scrollWatcher if no scroll events required
    clearInterval(scrollWatchID);
  },
  () => {
    //console.log('handleScroll for #screen-3');
    //clear scrollWatcher if no scroll events required
    clearInterval(scrollWatchID);
  },
  () => {
    //console.log('handleScroll for #screen-4');
    //clear scrollWatcher if no scroll events required
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

      //status.addElement(initRightArm());
      status.addElement(initBody());
      status.addElement(initHead());
      let head = status.elements.find(x=>x.type === "head");

      //let head = createHead(0);
      //ctx.drawImage(head, 0,0);

      window.requestAnimationFrame( ()=> renderScene(status, ctx) );

      let updateAttrs = [
        "xpos",
        "ypos",
        "scale",
        "opacity",
        "rotation",
      ]

      //let updateTimer = new DeltaTimer( (time) => {
      let updateTimer = new DeltaTimer( (time) => {
        status = grta.updateElements(status, updateAttrs, time);
      }, (1000/60));
      let startUpdates = updateTimer.start();

      //Format text into phrases and syllable objects
      //let phrases = spiel.split(", ");
      let phrases = spiel.split("~");
      //console.log("phrases", phrases);
      let syllables = phrases.map( x => syllablesInString(x) );
      console.log("syllables", syllables);

      //create HTML subtitle element and sort out timings for subtitles and mouth
      status.addElement(initSubtitle(phrases[0], 75));
      let gobLoop = true;
      let gob = puppetSpeak(syllables, head, "subtitle", phrases, gobLoop);
      if(!gobLoop)
        gob.append( new TweenMax("#subtitle", 1, {opacity: 0,}) );
    })
  },
  () => {
    TweenMax.to('#aintnobody', 1, {opacity: 0.1, delay: 2});
    TweenMax.fromTo('#boast', 1, {opacity: 0,
                                  scale: 2},
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
    } else $('#infographic').append('<div>We\'re Sorry!  The Infographic You Are Looking For Is In Another Castle');
  },
];

let fadeReplace = (o, n, d) => $(o).fadeOut(d, () => $(n).fadeIn(d));
let fadeScrollReplace = (o, n, s, d, callback) => $(o).fadeOut(d, () => {
  window.scrollTo(0,s);
  $(n).fadeIn(d, callback);
});

let isDisplayed = (selector) => $(selector).css('display') != "none";

if(!Array.prototype.last){
  Array.prototype.last = function(){
    return this[this.length - 1];
  }
}

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
        gob.append( new TweenMax(head, 0.1, {mouth: 100, ypos: "-=2"}) );
        gob.append( new TweenMax(head, 0.1, {mouth: 0, ypos: "+=2"}) );
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

let initHead = () => {
  let head = grta.createElement();
  head.type = "head";
  head.image = () => createHead(head.mouth);
  head.imgWidth = images.head.width;
  head.imgHeight = images.head.height;
  head.xpos = 250;
  head.ypos = 5;
  head.rotationX = 50;
  head.rotationY = 80;
  head.initialScale = .5;
  head.mouth = 0;
  head.rotation = -1;
  TweenMax.to(head, .3, {rotation: 1, ease: Linear.easeNone, yoyo: true, repeat: -1});
  head.draw = (obj, c, status) => {
    c.save();
      c.globalAlpha = obj.opacity;
      let rotX = (obj.xpos + obj.rotationX);
      let rotY = (obj.ypos + obj.rotationY);

      c.translate(rotX, rotY);
      c.rotate(obj.rotation * Math.PI/180);
      c.translate(-rotX, -rotY);

      c.scale(obj.trueScale(obj), obj.trueScale(obj));

      c.translate(obj.xpos/obj.trueScale(obj), obj.ypos/obj.trueScale(obj));
      c.drawImage(obj.image(), obj.frameOffset(obj), 0, obj.imgWidth, obj.imgHeight, 0,0,obj.imgWidth, obj.imgHeight);
    c.restore();
  }
  return head;
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

let initBody = () => {
  let body = grta.createElement();
  body.type = "body";
  body.image = images.body;
  body.imgWidth = body.image.width;
  body.imgHeight = body.image.height;
  body.initialScale = .4;
  body.xpos = 200;
  body.ypos = 140;

  return body;
}

let initRightArm = () => {
  let arm = grta.createElement();
  arm.type = "rightArm";

  let can = document.createElement('canvas');
  let c = can.getContext('2d');
  can.width = images.rightArm.width;
  can.height = images.rightArm.height;
  c.fillStyle = "rgba(255,0,255,1)";
  c.fillRect(0,0,can.width,can.height);
  c.drawImage(images.rightArm,0,0);
  arm.image = images.rightArm;
  //arm.image = can;
  arm.imgWidth = arm.image.width;
  arm.imgHeight = arm.image.height;
  arm.initialScale = .45;
  arm.xpos = 230;
  //arm.xpos = 150;
  arm.ypos = 170;
  arm.rotationX = 20;
  arm.rotationY = 0;
  arm.rotation = 10;
  TweenMax.to(arm, 4, {rotation: 90, ease:Linear.easeNone, yoyo: true, repeat: -1});


  return arm;
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
