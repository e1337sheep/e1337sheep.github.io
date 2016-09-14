//functions required for stand-alone infographics
//These are present in the main.js of the site, and are not required to be
//loaded if accessing infographics via Ajax.

let images;
let globStat;

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
  ctx.clearRect(0,0,640,360);
  status.elements
    .filter(x=>x.render === "background" && !x.offScreen)
    .map(x => {
      ctx.save();
      checkShadow(x, ctx);
      x.draw(x, ctx, status);
      ctx.restore();
    });
  status.elements
    .filter(x=>x.render === "main" && !x.offScreen)
    .map(x => {
      ctx.save();
      checkShadow(x, ctx);
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
  obj.addElement = (element) => obj.elements[obj.elements.push(element)-1];
  return obj;
}
