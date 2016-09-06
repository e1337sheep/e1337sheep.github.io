'use strict'
//a comment
function DeltaTimer(render, interval) {
    var timeout;
    var lastTime;

    this.start = start;
    this.stop = stop;

    function start() {
        timeout = setTimeout(loop, 0);
        lastTime = + new Date;
        return lastTime;
    }

    function stop() {
        clearTimeout(timeout);
        return lastTime;
    }

    function loop() {
        var thisTime = + new Date;
        var deltaTime = thisTime - lastTime;
        var delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}

let grta = {
  calcScale: (id) => {
    let intendedWidth = document.getElementById(id).width;
    let actualWidth = $('#'+id).width();
    let scaleFactor = intendedWidth / actualWidth;
    return scaleFactor;
  },

  createGameStatus: () => {
    let obj = ({
      lastUpdate: + new Date,
      score: 0,
      totalTime: 30,
      time: 30,
      //gameStatus can be "gameOver", "started", "ready"
      gameStatus: "ready",
      elements: [],
    });
    obj.addElement = (element) => obj.elements.push(element);
    return obj;
  },

  updateElements: (status, attrs, time) => {
    let timePassed = time - status.lastUpdate;

    if(status.gameStatus === "started") {
      status.time -= timePassed/1000;
      if(status.time <= 0) {
        status.gameStatus = "gameOver";
        let game = status.elements.find(x=>x.gameID === status.currentGame);
        game.on_gameEnd(status);
        game.score = status.score;
        game.showCaption = true;
        status.currentGame = "none";
        let clock = status.elements.find(x=>x.type === "clock");
        clock.rotation = -5
        TweenMax.to(clock, 0.01, {rotation:5, ease:Power0.easeNone, yoyo: true, repeat: -1 });
        TweenMax.to(clock, 0.4, {delay: 5, opacity: 0, onComplete: ()=> {
          clock.remove = true;
          status.time = status.totalTime;
          status.gameStatus = "ready";
          if(game.tween) game.tween.pause();
        }});
        $('#'+game.captionID).html(game.postCaption(game));
        TweenMax.to('#'+game.captionID, 0.4, {opacity: 1,});
        status.score = 0;
      }
    }

    let elements = status.elements.map( x => {
      // map thru attr passed to update, check Hi/Lo limits and update according
      // to Velocity
      attrs.map( attr => {
        x[attr] += x[attr+"Vel"] * timePassed;
        if(x[attr] < x[attr+"Limits"][0]) x[attr] = x["on_"+attr+"LimitLo"](x);
        else if(x[attr] > x[attr+"Limits"][1]) x[attr] = x["on_"+attr+"LimitHi"](x);

        if(x[attr+"Vel"] === 0) x["on_"+attr+"VelZero"](x);

        if(x[attr+"Friction"] && x[attr+"Vel"] != 0) {
          x[attr+"Vel"] += x[attr+"Friction"] * timePassed;
          //Check if Vel has gone out of bounds due to friction by checking if
          //the sign of the Vel and Friction are the same
          if(!x["frictionHalt"]&&Math.sign(x[attr+"Vel"]) == Math.sign(x[attr+"Friction"])) x[attr+"Vel"] = 0;
        }
      })
      if(x.aliveLimit) x.alive = x.alive > x.aliveLimit ? x.on_aliveLimit(x) : x.alive += 1;
      if(x.isSprite) x.currentFrame = Math.floor( (time / x.frameDelay) % x.frames );

      return x;
    });
    //Copy new element array into status minus elements flagged for removal
    status.elements = elements.filter( x => x.remove != true);
    status.lastUpdate = time;
    return status;
  },

  // dashToCamel :: String -> String
  dashToCamel: (s) => s.replace(/-([a-z])/g,  g => g[1].toUpperCase()),

  // preLoadImages :: {name:filename} -> function -> IO
  preLoadImages: (sources, callback) => {
    let keys = Object.keys(sources);
    let loaded = {};
    let images = {};
    keys.map( key => {
      loaded[key] = false;
      images[key] = new Image();
      images[key].onload = () => {
        loaded[key] = true;
        if(Object.keys(loaded).reduce((p, k) => p && loaded[k])) callback(images);
      };
      images[key].src = sources[key];
    });
  },

  wrapText: (ctx, text, x, y, maxWidth, lineHeight) => {
    let words = text.split(' ');
    let line = '';
    words.map((v,i,a)=>{
      let testLine = line + words[i] + ' ';
      let metric = ctx.measureText(testLine);
      let testWidth = metric.width;
      if(testWidth > maxWidth && i > 0){
        ctx.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else line = testLine;
    });
    ctx.fillText(line, x, y);
  },

  //  giveBorder :: Image -> borderWidth -> color -> justBorder-> Image
  giveBorder: (img, borderWidth, color, justBorder) => {
    var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1];
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    dArr.map( (v,i,a) => {
      if(i%2){
        ctx.drawImage(img, a[i]*borderWidth, a[i+1]*borderWidth);
      }
    });
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    if(!justBorder) ctx.drawImage(img, 0, 0);
    return canvas;
  },

  //TODO Resize canvas accordingly to accomadate stick
  giveStick: (img, sLength, sWidth, sX, sY, sAngle, sColor) => {
    let canvas = document.createElement('canvas');
    let opp = Math.sin(sAngle*Math.PI/180)*sLength;
    let adj = Math.cos(sAngle*Math.PI/180)*sLength;

    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.save();
      ctx.translate(sX, sY);
      ctx.rotate(sAngle * Math.PI/180);
      ctx.lineWidth = sWidth;
      ctx.strokeStyle = sColor;
      ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(sLength, 0);
      ctx.stroke();
    ctx.restore();
    ctx.drawImage(img, 0,0);
    return canvas;
  },

  createElement: () => {
    //For functions that need to change internal values, pass a reference to
    //itself, i.e. obj.internalFunction(obj);
    //To flag element for destruction, set obj.remove = true
    //If using Friction remember to flip friction sign when changing direction
    let obj = ({
      type: "",
      render: "main",
      shadow: false,
      frictionHalt: true,
      image: null,
      imgHeight: null,
      imgWidth: null,
      trueHeight: (obj) => obj.imgHeight * obj.trueScale,
      trueWidth: (obj) => obj.imgWidth * obj.trueScale,
      isSprite: false,
      frames: 1,
      frameDelay: 100,
      currentFrame: 0,
      frameOffset: (obj) => obj.currentFrame * obj.imgWidth,
      //xpos
      xpos: 0,
      xposVel: 0,
      xposFriction: 0,
      xposLimits: [-9999, 9999],
      on_xposLimitLo: (obj) => {
        return obj.xposLimits[0];
      },
      on_xposLimitHi: (obj) => {
        return obj.xposLimits[1]
      },
      on_xposVelZero: (obj) => {
        return obj.xpos;
      },
      //ypos
      ypos: 0,
      yposVel: 0,
      yposFriction: 0,
      yposLimits: [-9999, 9999],
      on_yposLimitLo: (obj) => {
        return obj.yposLimits[0];
      },
      on_yposLimitHi: (obj) => {
        return obj.yposLimits[1];
      },
      on_yposVelZero: (obj) => {
        return obj.ypos;
      },
      //rotation
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      rotationVel: 0,
      rotationLimits: [-360,360],
      rotationFriction: 0,
      on_rotationLimitLo: (obj) => {
        return obj.rotationLimits[0];
      },
      on_rotationLimitHi: (obj) => {
        return obj.rotationLimits[1];
      },
      on_rotationVelZero: (obj) => {
        return obj.rotation;
      },
      //scale
      initialScale: 1,
      scale: 1,
      scaleX: 0,
      scaleY: 0,
      trueScale: (obj) => obj.initialScale * obj.scale,
      scaleVel: 0,
      scaleLimits: [0,2],
      scaleFriction: 0,
      on_scaleLimitLo: (obj) => {
        return obj.scaleLimits[0];
      },
      on_scaleLimitHi: (obj) => {
        return obj.scaleLimits[1];
      },
      on_scaleVelZero: (obj) => {
        return obj.scale;
      },
      //opacity
      opacity: 1,
      opacityVel: 0,
      opacityLimits: [0,1],
      opacityFriction: 0,
      on_opacityLimitLo: (obj) => {
        return obj.opacityLimits[0];
      },
      on_opacityLimitHi: (obj) => {
        return obj.opacityLimits[1];
      },
      on_opacityVelZero: (obj) => {
        return obj.opacity;
      },
      alive: 0,
      aliveLimit: 0,
      on_aliveLimit: (obj) => {
        return obj.aliveLimit;
      },
      clickable: false,
      clickAreas: [],
      hasClicked: (obj, event) => {
        let clicked = false;
        obj.clickAreas.map( x => {
          //Adjust event for canvas scale and click-bounds for clickable scale
          if((event.offsetX*scaleFactor) > ((x[0]*obj.trueScale(obj))+obj.xpos) &&
             (event.offsetX*scaleFactor) < ((x[2]*obj.trueScale(obj))+obj.xpos) &&
             (event.offsetY*scaleFactor) > ((x[1]*obj.trueScale(obj))+obj.ypos) &&
             (event.offsetY*scaleFactor) < ((x[3]*obj.trueScale(obj))+obj.ypos)) clicked = true;
        });
        return clicked;
      },
      on_click: (obj, event) => {},
      on_gameEnd: () => {},
      // draw :: selfRef -> context -> status -> IO
      draw: (obj, c, status) => {
        c.save();
          c.globalAlpha = obj.opacity;
          let rotX = (obj.xpos + obj.rotationX);
          let rotY = (obj.ypos + obj.rotationY);

          c.translate(rotX, rotY);
          c.rotate(obj.rotation * Math.PI/180);
          c.translate(-rotX, -rotY);

          c.scale(obj.trueScale(obj), obj.trueScale(obj));

          c.translate(obj.xpos/obj.trueScale(obj), obj.ypos/obj.trueScale(obj));
          c.drawImage(obj.image, obj.frameOffset(obj), 0, obj.imgWidth, obj.imgHeight, 0,0,obj.imgWidth, obj.imgHeight);
        c.restore();
      }
    })

    return obj;
  }
}
