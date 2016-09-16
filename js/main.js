"use strict";
var answers={},didScroll=!1,scrollWatchID=null,imageSources={head:"images/boringman-head-nogob.png",gob:"images/boringman-head-gob.png",missHair:"images/boringman-head-miss.png",withdrawHair:"images/boringman-head-withdraw2.png",cutNose:"images/boringman-head-cutnose.png",beak:"images/boringman-head-beak.png",
body:"images/boringman-body-nohead-bw.png",bodyMiss:"images/boringman-body-miss.png",bodyLeave:"images/boringman-body-leaves.png",bodyDuck:"images/boringman-body-duck.png",bodyTakeOff:"images/boringman-body-rocket.png",bodyWithdraw:"images/boringman-body-withdraw.png",bodyPooh:"images/boringman-body-pooh.png",bodyCut:"images/boringman-body-operation.png",bodyHoof:"images/boringman-body-centaur.png",bodyBounce:"images/boringman-body-pogo.png",bodyNoLegs:"images/boringman-body-nolegs.png",bodyFallTop:"images/boringman-body-falling-top.png",bodyLegs:"images/boringman-legs.png",bodySkip:"images/boringman-body-skip.png",
rocketFire:"images/boringman-body-rocket-fire.png",banana:"images/banana.png"},heads=[],spiel2="Welcome to Not Buying Butler~the old fashioned way of buying a car~I can say pretty much anything~including your name Joe~you're not left out either Steve Weston~Is this not a little creepy?~...~...",spiel="Blah blah blah Buy blah Car blah blah blah~blah quick blah time limit blah deal blah engine~blah blah blah machine blah fast blah comfort blah~power blah blah drive blah feel blah quality blah~blah buy blah light blah feel bluh fun blah blah blah~blah control blah cheap blah special blah deal~blah blah blah cost blah blah sales target blah favour~blah time limit blah blah blah~...";
$(document).ready(function(){$(".two-tone").map(function(b,e,f){return e.innerHTML=e.innerHTML.split("").map(function(g){return"<span content=\""+g+"\">"+g+"</span>"}).reduce(function(g,h){return g+h})}),$(window).scroll(function(){return didScroll=!0}),scrollWatchID=setInterval(handleScroll[0],100),TweenMax.to(".screen-1-arrow",1,{opacity:1,delay:5}),TweenMax.to(".screen-1-arrow",2,{bottom:"2.5em",ease:Quad.easeInOut,yoyo:!0,repeat:-1}),$(".answer-button").click(function(b){var e=$(b.target),f=e.closest("ul").attr("id").split("-")[0],g=parseInt(e.attr("class").split(" ").find(function(j){return!j.indexOf("response")}).split("-")[1]);answers[f]=g;var h=e.closest(".frame").attr("class").split(" ").find(function(j){return!j.indexOf("screen")}).split("-")[1];
"time"===f?(5==answers.time?e.html("correct"):e.html("wrong"),TweenMax.to(e,1,{transform:"scale(1.5, 1.5)",ease:Linear.easeNone,onComplete:function onComplete(){$("#leave-screen-"+h).click()}})):$("#leave-screen-"+h).click()}),$(".leave-screen").click(function(b){var e=parseInt($(b.target).attr("id").split("-")[2]);fadeScrollReplace("#screen-"+e,"#screen-"+(e+1),0,400,fadeCallbacks[e]),clearInterval(scrollWatchID),scrollWatchID=setInterval(handleScroll[e],100),globStat&&cancelAnimationFrame(globStat.animID),TweenMax.killAll()})});
var handleScroll=[function(){didScroll&&($(window).scrollTop()>=window.innerHeight&&TweenMax.to("#time-question",1,{opacity:1}),didScroll=!1)},function(){clearInterval(scrollWatchID)},function(){clearInterval(scrollWatchID)},function(){clearInterval(scrollWatchID)}],fadeCallbacks=[function(){},function(){
var b=document.getElementById("puppet"),e=b.getContext("2d"),f=initCanvasStatus();globStat=f,f.animID=window.requestAnimationFrame(function(){return renderScene(f,e)});
var g=f.addElement(initPreSpin());grta.preLoadImages(imageSources,function(h){images=h;var j=f.addElement(initBoringman());j.opacity=0,TweenMax.to(".bb-skip",0.5,{opacity:0.8,scale:1,ease:Linear.easeNone,delay:20,display:"inline-block"});
var k=function k(){f.elements.filter(function(B){return"boringmanProp"===B.type}).map(function(B){return B.remove=!0}),m.map(function(B){return B.kill()}),m=[]},l={miss:function miss(){j.offScreen=!1,j.positions.headFunc=createHeadMiss,j.positions.headOffsetX=180,j.positions.headOffsetY=0,j.positions.headRot=0,j.positions.headScale=0.5,j.positions.bodyFunc=createBodyMiss,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=135,j.positions.bodyScale=1,j.positions.headFirst=!1,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=0.6,j.xpos=230,j.ypos=5},leave:function leave(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=390,j.positions.headOffsetY=60,j.positions.headRot=0,j.positions.headScale=0.5,j.positions.bodyFunc=createBodyLeave,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=0,j.positions.bodyScale=0.8,j.positions.headFirst=!0,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1,j.xpos=80,j.ypos=5},duck:function duck(){j.offScreen=!1,j.positions.headFunc=createHeadBeak,j.positions.headOffsetX=390,j.positions.headOffsetY=0,j.positions.headRot=0,j.positions.headScale=0.5,j.positions.bodyFunc=createBodyDuck,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=470,j.positions.bodyScale=0.3,j.positions.headFirst=!1,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1,j.xpos=80,j.ypos=5},"take-off":function takeOff(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=520,j.positions.headOffsetY=-750,j.positions.headRot=57,j.positions.headScale=0.4,j.positions.bodyFunc=createBodyTakeOff,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=0,j.positions.bodyScale=0.7,j.positions.headFirst=!0,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1,j.xpos=80,j.ypos=5;var B=f.addElement(initRocketFire());m.push(TweenMax.to(B,0.5,{opacity:1,delay:0.2})),m.push(TweenMax.to(B,1,{xpos:"-=10",ypos:"+=10",ease:Quad.easeInOut,yoyo:!0,repeat:-1})),m.push(TweenMax.to(j,2,{ypos:"+=10",ease:Quad.easeInOut,yoyo:!0,repeat:-1}))},withdraw:function withdraw(){j.offScreen=!1,j.positions.headFunc=createHeadWithdraw,j.positions.headOffsetX=250,j.positions.headOffsetY=20,j.positions.headRot=0,j.positions.headScale=0.35,j.positions.bodyFunc=createBodyWithdraw,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=80,j.positions.bodyScale=0.5,j.positions.headFirst=!1,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1.1,j.xpos=180,j.ypos=0},pooh:function pooh(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=285,j.positions.headOffsetY=130,j.positions.headRot=0,j.positions.headScale=0.28,j.positions.bodyFunc=createBodyPooh,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=0,j.positions.bodyScale=1.1,j.positions.headFirst=!0,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1.1,j.xpos=200,j.ypos=0},cut:function cut(){j.offScreen=!1,j.positions.headFunc=createHeadCut,j.positions.headOffsetX=235,j.positions.headOffsetY=115,j.positions.headRot=0,j.positions.headScale=0.28,j.positions.bodyFunc=createBodyCut,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=0,j.positions.bodyScale=0.5,j.positions.headFirst=!0,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1.1,j.xpos=220,j.ypos=0},hoof:function hoof(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=355,j.positions.headOffsetY=0,j.positions.headRot=15,j.positions.headScale=0.35,j.positions.bodyFunc=createBodyHoof,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=220,j.positions.bodyScale=0.55,j.positions.headFirst=!1,j.rotationX=300,j.rotationY=300,j.rotation=0,j.scale=1,j.xpos=180,j.ypos=-20,m.push(TweenMax.to(j,1.5,{rotation:5,yoyo:!0,repeat:-1}))},bounce:function bounce(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=105,j.positions.headOffsetY=0,j.positions.headRot=0,j.positions.headScale=0.35,j.positions.bodyFunc=createBodyBounce,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=150,j.positions.bodyScale=0.6,j.positions.headFirst=!1,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=0.6,j.xpos=0,j.ypos=0,m.push(TweenMax.to(j,4,{xpos:553,ease:Linear.easeNone,yoyo:!0,repeat:-1})),m.push(TweenMax.to(j,0.6,{ypos:155,ease:Quad.easeIn,yoyo:!0,repeat:-1}))},slip:function slip(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=280,j.positions.headOffsetY=0,j.positions.headRot=0,j.positions.headScale=0.3,j.positions.bodyFunc=createBodyWalk,j.positions.bodyOffsetX=60,j.positions.bodyOffsetY=125,j.positions.bodyScale=0.65,j.positions.headFirst=!1,j.rotationX=100,j.rotationY=100,j.rotation=-1,j.scale=1,j.xpos=450,j.ypos=20;var B=f.addElement(initBanana());
m.push(TweenMax.to(B,0.5,{opacity:1,delay:0.2})),m.push(TweenMax.to(j,0.3,{rotation:1,ease:Power0.easeInOut,yoyo:!0,repeat:-1})),m.push(TweenMax.to(j,2,{xpos:100,ease:Quad.easeIn,onComplete:function onComplete(){m.map(function(C){return C.kill()}),j.positions.bodyFunc=createBodyFall,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=15,m.push(TweenMax.to(j,0.5,{ypos:0,xpos:150,rotation:90,onComplete:function onComplete(){return m.push(TweenMax.to(j,0.5,{ypos:190,ease:Bounce.easeOut,onComplete:function onComplete(){j.positions.bodyFunc=createBodyWalk,j.positions.bodyOffsetX=60,j.positions.bodyOffsetY=125}}))}}))}}))},skip:function skip(){j.offScreen=!1,j.positions.headFunc=createHead,j.positions.headOffsetX=520,j.positions.headOffsetY=0,j.positions.headRot=0,j.positions.headScale=0.4,j.positions.bodyFunc=createBodySkip,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=160,j.positions.bodyScale=0.65,j.positions.headFirst=!1,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1,j.xpos=70,j.ypos=20;var B=f.addElement(initRope());m.push(TweenMax.to(B,0.2,{opacity:1,delay:0.2})),m.push(TweenMax.to(B,0.7,{pos:800,yoyo:!0,ease:Power1.easeInOut,repeat:-1,onRepeat:function onRepeat(){B.render="main"===B.render?"background":"main"}})),m.push(TweenMax.to(B,0.7,{ypos:-20,yoyo:!0,repeat:-1})),m.push(TweenMax.to(j,0.7,{ypos:0,yoyo:!0,repeat:-1}))},split:function split(){j.positions.headFunc=createHead,j.positions.headOffsetX=150,j.positions.headOffsetY=0,j.positions.headRot=0,j.positions.headScale=0.5,j.positions.bodyFunc=createBody,j.positions.bodyOffsetX=0,j.positions.bodyOffsetY=250,j.positions.bodyScale=0.5,j.positions.headFirst=!1,j.rotationX=0,j.rotationY=0,j.rotation=0,j.scale=1,j.xpos=200,j.ypos=5;var B=f.addElement(initLeftSplit(j)),C=f.addElement(initRightSplit(j));setTimeout(function(){B.opacity=C.opacity=1,j.offScreen=!0},200),m.push(TweenMax.to(B,1,{rotation:-20,delay:0.4})),m.push(TweenMax.to(C,1,{rotation:20,delay:0.4}))}},m=[];$(".skip-option").click(function(B){k();var C=$(B.target).attr("id");TweenMax.to(j,0.2,{slideY:"+=360",onComplete:function onComplete(){l[C](),TweenMax.to(j,0.2,{slideY:"-=360"})}})}),g.finish(g,j),TweenMax.to(".puppet-overlay",0.2,{opacity:1});var q=["xpos","ypos","scale","opacity","rotation"],r=new DeltaTimer(function(B){f=grta.updateElements(f,q,B)},1000/60);
r.start();
var u=spiel.split("~"),v=u.map(function(B){return syllablesInString(B)});
f.addElement(initSubtitle(u[0],75));
var z=!0,A=puppetSpeak(v,j,"subtitle",u,z)})},function(){TweenMax.to("#aintnobody",1,{opacity:0.1,delay:2}),TweenMax.fromTo("#boast",1,{opacity:0,scale:2},{opacity:1,scale:1,ease:Bounce.easeOut,delay:2}),TweenMax.to(".screen-4-arrow",1,{opacity:1,delay:4}),TweenMax.to(".screen-4-arrow",2,{bottom:"2.5em",ease:Quad.easeInOut,yoyo:!0,repeat:-1})},function(){//Evaluate answers.hobby to get correct infographic
var b=void 0;b=1==answers.hobby?"food":2==answers.hobby?"exist":3==answers.hobby?"learn":4==answers.hobby?"sport":5==answers.hobby?"travel":null,console.log("Loading \""+b+"\" infographic"),b?($("#infographic").load("infog/"+b+"/index.html #wrapper > *",
function(){$("#infographic img").map(function(e,f){return f.src="infog/"+b+"/images/"+f.src.split("/").last()})}),$("head link")[0].href="infog/"+b+"/style.css",$(document).ajaxStop(function(){$("#infog-links a").map(function(e,f){var g=$(f).attr("href").split("/").last(1);$(f).attr("href","infog/"+g+"/")})}),$.getScript("infog/"+b+"/"+b+".js"),[1,2,3].map(function(e){return $("#screen-"+e).remove()}),globStat.elements=[]):$("#infographic").append("<div>We're Sorry!  The Infographic You                                      Are Looking For Is In Another Castle")}],fadeReplace=function fadeReplace(b,e,f){return $(b).fadeOut(f,function(){return $(e).fadeIn(f)})},fadeScrollReplace=function fadeScrollReplace(b,e,f,g,h){return $(b).fadeOut(g,function(){window.scrollTo(0,f),$(e).fadeIn(g,h)})},isDisplayed=function isDisplayed(b){return"none"!=$(b).css("display")},initSubtitle=function initSubtitle(b,e){var f=grta.createElement();return f.type="subtitle",f.render="subHTML",f.id="subtitle",createSubtitle(b,e,f.id),f},createSubtitle=function createSubtitle(b,e,f){var g=f?"id=\""+f+"\"":"";$("#subs").append("<div "+g+" class=\"subtitle\" style=\""+("top: "+e+"%;;opacity: 0;\">")+b+"</div>"),TweenMax.to("#"+f,1,{opacity:1})},editSubtitle=function editSubtitle(b,e){return $("#"+b).html(e)},puppetSpeak=function puppetSpeak(b,e,f,g,h){var j=new TimelineMax({repeat:h?-1:0});return b.map(function(k,l,m){k.map(function(q){"..."===g[l]?j.append(new TweenMax(e,0.5,{})):range(1,q.count).map(function(r){j.append(new TweenMax(e,0.1,{mouth:100,headBobY:"-=2"})),j.append(new TweenMax(e,0.1,{mouth:0,headBobY:"+=2"}))}),j.append(new TweenMax(e,0,{delay:0.1}))}),j.append(new TweenMax(e,0,{delay:0.1,onComplete:function onComplete(){l==m.length-1?h&&editSubtitle(f,g[0]):editSubtitle(f,g[l+1])}}))}),j},createHead=function createHead(b){if(b=Math.floor(b),heads[b])return heads[b];var e=document.createElement("canvas");e.width=images.head.width,e.height=images.head.height;var f=e.getContext("2d");
return f.fillRect(74,204,43,37),f.drawImage(images.head,0,0),f.translate(0,38/100*b),f.drawImage(images.gob,74,204),heads[b]=e,e},createHeadMiss=function createHeadMiss(b){var e=document.createElement("canvas"),f=createHead(b),g=images.missHair,h=0.35;e.width=g.width*h,e.height=f.height;var j=e.getContext("2d");return j.drawImage(f,28,0),j.scale(h,h),j.drawImage(g,0,0),e},createHeadWithdraw=function createHeadWithdraw(b){var e=document.createElement("canvas"),f=createHead(b),g=images.withdrawHair,h=1.5;e.width=g.width*h,e.height=1.5*f.height;var j=e.getContext("2d");return j.drawImage(f,15,80),j.scale(h,h),j.drawImage(g,0,0),e},createHeadCut=function createHeadCut(b){var e=document.createElement("canvas"),f=createHead(b);e.width=f.width,e.height=f.height;var g=e.getContext("2d");return g.drawImage(f,0,0),g.drawImage(images.cutNose,0,0),e},createHeadBeak=function createHeadBeak(b){var e=document.createElement("canvas"),f=createHead(b);e.width=f.width,e.height=f.height;var g=e.getContext("2d");return g.drawImage(f,0,0),g.drawImage(images.beak,0,0),e},createBody=function createBody(){return images.body},createBodyMiss=function createBodyMiss(){return images.bodyMiss},createBodyLeave=function createBodyLeave(){return images.bodyLeave},createBodyDuck=function createBodyDuck(){return images.bodyDuck},createBodyTakeOff=function createBodyTakeOff(){return images.bodyTakeOff},createBodyWithdraw=function createBodyWithdraw(){return images.bodyWithdraw},createBodyPooh=function createBodyPooh(){return images.bodyPooh},createBodyCut=function createBodyCut(){return images.bodyCut},createBodyHoof=function createBodyHoof(){return images.bodyHoof},createBodyBounce=function createBodyBounce(){return images.bodyBounce},createBodySkip=function createBodySkip(){return images.bodySkip},createBodyWalk=function createBodyWalk(){if(!images.bodyWalk){var b=document.createElement("canvas"),e=images.bodyNoLegs,f=images.bodyLegs;b.width=Math.max(e.width,f.width),b.height=e.height+f.height;var g=b.getContext("2d");return g.drawImage(f,0,135),g.scale(0.8,0.8),g.drawImage(e,33,0),images.bodyWalk=b}return images.bodyWalk},createBodyFall=function createBodyFall(){if(!images.bodyFall){var b=document.createElement("canvas"),e=images.bodyFallTop,f=images.bodyLegs;b.width=Math.max(e.width,f.width),b.height=e.height+f.height;var g=b.getContext("2d");return g.drawImage(f,60,245),g.drawImage(e,0,0),images.bodyFall=b}return images.bodyFall},initRocketFire=function initRocketFire(){var b=grta.createElement();return b.type="boringmanProp",b.render="background",b.image=images.rocketFire,b.imgWidth=b.image.width,b.imgHeight=b.image.height,b.initialScale=1,b.xpos=0,b.ypos=120,b.opacity=0,b},initBanana=function initBanana(){var b=grta.createElement();return b.type="boringmanProp",b.render="background",b.image=images.banana,b.imgWidth=b.image.width,b.imgHeight=b.image.height,b.initialScale=0.5,b.xpos=110,b.ypos=315,b.opacity=0,b},initRope=function initRope(){var b=grta.createElement();return b.type="boringmanProp",b.render="main",b.image=function(){return createRope(b.pos)},b.imgWidth=function(){return b.image.width},b.imgHeight=function(){return b.image.height},b.pos=-230,b.xpos=0,b.ypos=0,b.opacity=0,b.slideY=0,b.draw=function(e,f,g){f.save(),f.globalAlpha=e.opacity;var h=e.xpos+e.rotationX,j=e.ypos+e.rotationY;f.translate(h,j),f.rotate(e.rotation*Math.PI/180),f.translate(-h,-j),f.scale(e.trueScale(e),e.trueScale(e)),f.translate(e.xpos/e.trueScale(e),e.ypos+e.slideY/e.trueScale(e)),f.drawImage(e.image(),0,0),f.restore()},b},createRope=function createRope(b){var e=document.createElement("canvas");e.width=640,e.height=400;var f=e.getContext("2d"),g=70,h=237,j=571;return f.strokeStyle="#AAA",f.lineWidth=7,f.lineCap="round",f.beginPath(),f.moveTo(g,h),f.quadraticCurveTo((j-g)/2+g,b,j,h),f.stroke(),e},initBoringman=function initBoringman(){var b=grta.createElement();return b.type="boringman",b.image=function(){return createBoringman(b.mouth,b.positions,b.headBobY,b.slideY)},b.imgWidth=function(){return b.image.width},b.imgHeight=function(){return b.image.height},b.xpos=200,b.ypos=5,b.rotationX=0,b.rotationY=0,b.rotation=0,b.scale=1,b.mouth=0,b.positions={headFunc:createHead,headOffsetX:150,headOffsetY:0,headRot:0,headScale:0.5,bodyFunc:createBody,bodyOffsetX:0,bodyOffsetY:250,bodyScale:0.5,headFirst:!1},b.headBobY=0,b.slideY=0,b.draw=function(e,f,g){f.save(),f.globalAlpha=e.opacity;var h=e.xpos+e.rotationX,j=e.ypos+e.rotationY;f.translate(h,j),f.rotate(e.rotation*Math.PI/180),f.translate(-h,-j),f.scale(e.trueScale(e),e.trueScale(e)),f.translate(e.xpos/e.trueScale(e),e.ypos+e.slideY/e.trueScale(e)),f.drawImage(e.image(),0,0),f.restore()},b},createBoringman=function createBoringman(b,e,f,g){var h=document.createElement("canvas"),j=e.headFunc(b);[j.width/2,j.height/4];var k=e.bodyFunc();h.width=Math.max(j.width,k.width),h.height=j.height+k.height;var l=h.getContext("2d"),m=function m(){l.save(),l.scale(e.bodyScale,e.bodyScale),l.drawImage(k,e.bodyOffsetX,e.bodyOffsetY),l.restore()},q=function q(){l.save(),l.rotate(e.headRot*Math.PI/180),l.scale(e.headScale,e.headScale),l.drawImage(j,e.headOffsetX,e.headOffsetY+f),l.restore()};return e.headFirst?(q(),m()):(m(),q()),h},initLeftSplit=function initLeftSplit(b){var e=grta.createElement();return e.type="boringmanProp",e.image=function(){return createLeftSplit(b)},e.imgWidth=function(){return b.imgWidth()},e.imgHeight=function(){return b.imgHeight()},e.initialScale=1,e.xpos=b.xpos,e.ypos=b.ypos,e.rotationX=128,e.rotationY=500,e.opacity=0,e.draw=function(f,g,h){g.save(),g.globalAlpha=f.opacity;var j=f.xpos+f.rotationX,k=f.ypos+f.rotationY;g.translate(j,k),g.rotate(f.rotation*Math.PI/180),g.translate(-j,-k),g.scale(f.trueScale(f),f.trueScale(f)),g.translate(f.xpos/f.trueScale(f),f.ypos+f.slideY/f.trueScale(f)),g.drawImage(f.image(),0,0),g.restore()},e},createLeftSplit=function createLeftSplit(b){var e=document.createElement("canvas"),f=b.image();e.width=f.width/4,e.height=f.height;var g=e.getContext("2d");return g.drawImage(b.image(),0,0,f.width/4,f.height,0,0,e.width,e.height),e},initRightSplit=function initRightSplit(b){var e=grta.createElement();return e.type="boringmanProp",e.image=function(){return createRightSplit(b)},e.imgWidth=function(){return b.imgWidth()},e.imgHeight=function(){return b.imgHeight()},e.initialScale=1,e.xpos=b.xpos+128,e.ypos=b.ypos,e.rotationY=500,e.opacity=0,e.draw=function(f,g,h){g.save(),g.globalAlpha=f.opacity;var j=f.xpos+f.rotationX,k=f.ypos+f.rotationY;g.translate(j,k),g.rotate(f.rotation*Math.PI/180),g.translate(-j,-k),g.scale(f.trueScale(f),f.trueScale(f)),g.translate(f.xpos/f.trueScale(f),f.ypos+f.slideY/f.trueScale(f)),g.drawImage(f.image(),0,0),g.restore()},e},createRightSplit=function createRightSplit(b){var e=document.createElement("canvas"),f=b.image();e.width=f.width/4,e.height=f.height;var g=e.getContext("2d");return g.drawImage(b.image(),f.width/4,0,f.width/4,f.height,0,0,e.width,e.height),e},syllablesInWord=function syllablesInWord(b){return 3>=b.length?1:b.toLowerCase().replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"").match(/[aeiouy]{1,2}/g).length},syllablesInString=function syllablesInString(b){return b.split(/\s+|\n/).filter(function(e){return""!=e}).map(function(e){return{word:e,count:syllablesInWord(e)}})};
