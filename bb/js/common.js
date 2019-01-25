"use strict";var images=void 0,globStat=void 0,scaleFactor=void 0,fbShare=void 0,twShare=void 0,liShare=void 0,gpShare=void 0,colors=["rgba(200,0,0,1)","rgba(0,200,0,1)","rgba(0,0,200,1)","rgba(0,200,200,1)","rgba(200,200,0,1)","rgba(200,0,200,1)","rgba(255,100,100,1)"],renderScene=function renderScene(a,b){var d=function d(f,g){if(f.shadow){var j=f.scale*f.scale,k=j*f.scale;g.shadowColor="rgba(0,0,0,.7)",g.shadowBlur=20*j,g.shadowOffsetX=10*k,g.shadowOffsetY=10*k}};b.clearRect(0,0,640,360),a.elements.filter(function(f){return"background"===f.render&&!f.offScreen}).map(function(f){b.save(),d(f,b),f.draw(f,b,a),b.restore()}),a.elements.filter(function(f){return"main"===f.render&&!f.offScreen}).map(function(f){b.save(),d(f,b),f.draw(f,b,a),b.restore()}),a.elements.filter(function(f){return"caption"===f.render}).map(function(f){return f.draw(f,b,a)}),window.requestAnimationFrame(function(){return renderScene(a,b)})},initCanvasStatus=function initCanvasStatus(){var a={lastUpdate:+new Date,score:0,totalTime:22,time:22,currentGame:"none",gameStatus:"ready",elements:[]};return a.addElement=function(b){return a.elements[a.elements.push(b)-1]},a},PopupHandler=function PopupHandler(a){var b=500,d=500;a=a?a:window.event;var f=a.target?a.target:a.srcElement,g=Math.floor(((screen.availWidth||1024)-d)/2),j=Math.floor(((screen.availHeight||700)-b)/2),k=window.open(f.href,"social","width="+d+",height="+b+",left="+g+",top="+j+",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
return k&&(k.focus(),a.preventDefault&&a.preventDefault(),a.returnValue=!1),!!k},updateOGMeta=function updateOGMeta(a){$("head").append("<meta property=\"og:image\"     content=\""+a+"\" />    <meta property=\"og:image:width\" content=\"669\" />    <meta property=\"og:image:height\" content=\"379\" />  ")},updateSocialText=function updateSocialText(a){fbShare.description=twShare.text=liShare.summary=a,$("#fb-share").attr("href",fbShare.pre+"&app_id="+fbShare.app_id+"&redirect_uri="+fbShare.link+"&link="+fbShare.link+"&picture="+fbShare.picture+"&caption="+fbShare.caption+"&description="+fbShare.description),$("#tw-share").attr("href",twShare.pre+"&url="+twShare.url+"&hashtags="+twShare.hashtags+"&via="+twShare.via+"&text="+twShare.text),$("#li-share").attr("href",liShare.pre+"&mini="+liShare.mini+"&url="+liShare.url+"&source="+liShare.source+"&title="+liShare.title+"&summary="+liShare.summary),$("#gp-share").attr("href",gpShare.pre+"&url="+gpShare.url)},initFlyout=function initFlyout(a,b,d){var f=grta.createElement();return f.type="scoreFlyout",f.image=createFlyout(a),f.imgHeight=f.image.height,f.imgWidth=f.image.width,f.xpos=b,f.ypos=d,f.initialScale=1,TweenMax.to(f,1,{scale:1.5,opacity:0,xpos:"-=10",ypos:"-=10",onComplete:function onComplete(){return f.remove=!0}}),f},createFlyout=function createFlyout(a){var b=colors[Math.floor(Math.random()*colors.length)],d=document.createElement("canvas");d.width=60,d.height=30;var f=d.getContext("2d");return f.save(),f.fillStyle=b,f.strokeStyle="black",f.textAlign="center",f.font="30px Apercu",f.lineWidth=".5",f.fillText(a,30,30,d.width),f.strokeText(a,30,30,d.width),f.restore(),d},initCaption=function initCaption(a,b,d,f,g,j,k){var l=grta.createElement();return l.type="caption",l.render="caption",l.id=k||"none",l.image=drawCaption(a,b,d),l.imgHeight=l.image.height,l.imgWidth=l.image.width,l.xpos=f||100,l.ypos=g||100,l.rotation=j,l.rotationX=l.imgWidth/2,l.rotationY=l.imgHeight/2,l},drawCaption=function drawCaption(a,b,d){var f=document.createElement("canvas");f.width=b||300,f.height=d||100;var g=f.getContext("2d");return g.fillStyle="rgba(0,0,0,.5)",g.fillRect(0,0,f.width,f.height),g.fillStyle="rgba(255,255,255,1)",g.font="12px Apercu",grta.wrapText(g,a,2,12,f.width,20),f},initCaptionHTML=function initCaptionHTML(a,b,d,f,g,j,k){var l=grta.createElement();l.type="captionHTML",l.render="captionHTML",l.id=k||null,l.xpos=f||100,l.ypos=g||100,l.rotation=j,k=k?"id=\""+k+"\"":"";var m="transform: rotate("+l.rotation+"deg)",o="<div "+k+" class=\"caption\" style=\""+("width: "+b+"%; height: "+d+"%;"+("top: "+g+"%; left: "+f+"%;")+m+";\">")+a+"</div>";return $("#captions").append(o),l},initClock=function initClock(a,b){var d=grta.createElement();return d.type="clock",d.image=images.clock,d.xpos=a||0,d.ypos=b||0,d.initialScale=0.22,d.opacity=0,d.rotationX=d.image.width/2,d.rotationY=d.image.height/2,TweenMax.to(d,0.4,{opacity:1}),d.drawFace=d.draw,d.draw=function(f,g,j){g.save(),g.globalAlpha=f.opacity,g.translate(f.xpos,f.ypos),g.scale(f.trueScale(f),f.trueScale(f)),g.save(),g.translate(203,373),g.rotate(f.rotation*Math.PI/180),g.translate(-203,-373),g.drawImage(f.image,0,0),g.restore(),g.save(),g.fillStyle="rgba(0,0,0,.8)",g.translate(203,373),g.beginPath(),g.arc(0,0,10,0,2*Math.PI),g.fill(),g.beginPath(),g.lineWidth=14;var k=
j.time;g.rotate(6*(Math.PI/180)*k),g.moveTo(0,0),g.lineTo(0,-150),g.stroke(),g.restore(),g.restore()},d},initPreSpin=function initPreSpin(a){var b=grta.createElement();return b.type="preSpinner",b.image=createPreSpin(),b.imgWidth=b.image.width,b.imgHeight=b.image.height,b.initialScale=0.8,b.rotationX=b.imgWidth*b.initialScale/2,b.rotationY=b.imgHeight*b.initialScale/2,b.xpos=220,b.ypos=80,b.opacity=0,TweenMax.to(b,2,{opacity:1}),TweenMax.to(b,3,{rotation:360,ease:Linear.easeNone,repeat:-1}),b.finish=function(d,f){TweenMax.to(d,0.2,{opacity:0,onComplete:function onComplete(){TweenMax.killTweensOf(d),d.remove=!0,f&&TweenMax.to(f,0.2,{opacity:1})}})},b},createPreSpin=function createPreSpin(){var a=document.createElement("canvas");a.width=250,a.height=250;var b=a.getContext("2d");b.lineWidth=5,b.strokeStyle="green",b.beginPath(),b.moveTo(a.width/2,a.width/2);var d=0,f=0;return range(0,120).map(function(){d+=0.5,f+=2*Math.PI/50;var g=a.width/2+d*Math.cos(f),j=a.height/2+d*Math.sin(f);b.lineTo(g,j)}),b.stroke(),a},initShares=function initShares(a){fbShare={pre:"https://www.facebook.com/dialog/feed?",app_id:"1047735381986158",link:encodeURIComponent("https://e1337sheep.github.io/infog/"+a+"/index.html"),
picture:encodeURIComponent("https://e1337sheep.github.io/infog/"+a+"/images/"+a+".png"),caption:encodeURIComponent("Appears at bottom of feed link.  Simple description goes here"),description:encodeURIComponent("Dynamic content goes here, display my score!")},twShare={pre:"https://twitter.com/intent/tweet?",url:encodeURIComponent("https://e1337sheep.github.io/infog/"+a+"/index.html"),hashtags:"BuyingButler,CarBuying",via:"BuyingButler",text:encodeURIComponent("Dynamic content goes here, display my score!")},liShare={pre:"http://www.linkedin.com/shareArticle?",mini:"true",url:encodeURIComponent("https://e1337sheep.github.io/infog/"+a+"/index.html"),source:encodeURIComponent("Buying Butler"),title:encodeURIComponent("How much...?"),summary:encodeURIComponent("Dynamic content goes here, display my score!")},gpShare={pre:"https://plus.google.com/share?",url:encodeURIComponent("https://e1337sheep.github.io/infog/"+a+"/index.html"),desc:"A score could go here, also changed this now?"}},updateSchema=function updateSchema(a){var b=window.location.href.split("/");b[b.length-1]="infog/"+a+"/images/"+a+".png";var d=b.reduce(function(f,g){return f+"/"+g});$("#wrapper meta[itemprop=\"description\"]").attr("content",d)},range=function range(a,b){return Array.apply(0,Array(b)).map(function(d,f){return f+a})};
Array.prototype.last||(Array.prototype.last=function(a){return a?this[this.length-a-1]:this[this.length-1]}),Array.prototype.find||(Array.prototype.find=function(a){"use strict";if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var g,b=Object(this),d=b.length>>>0,f=arguments[1],j=0;j<d;j++)if(g=b[j],a.call(f,g,j,b))return g;return void 0});
