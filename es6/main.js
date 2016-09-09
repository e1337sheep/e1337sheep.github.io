'use strict'
let answers = {};
let didScroll = false;
let scrollWatchID = null;
$(document).ready(()=>{

  /*split two-tone text into spans*/
  //Used in conjunction with CSS .two-tone rules
  $('.two-tone').map( (x, i, a) => {
    i.innerHTML = i.innerHTML.split('')
      .map( x=> '<span content="'+x+'">'+x+'</span>')
      .reduce( (p,c) => p + c );
  });
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
    console.log(answers);
    if(answers.hobby == 1) infoName = "eat";
    else if(answers.hobby == 2) infoName = "exist";
    else if(answers.hobby == 3) infoName = "learn";
    else if(answers.hobby == 4) infoName = "sport";
    else if(answers.hobby == 5) infoName = "travel";
    else infoName = null;


    //FOR TESTING PURPOSES
    if(infoName != "sport"){
      console.log('You selected "' + infoName +
        '", which does not yet exist.  Switching to "sport"');
      infoName = "sport";
    }
    console.log('Loading "'+infoName+'" infographic');
    if(infoName){
      //Ajax load infographic from inforgraphic page
      $('#infographic').load('infog/'+infoName+'/index.html #wrapper > *',
        //change relative image sources to be correct from new location
        ()=> $('#infographic img').map( (x,i) =>
          i.src = 'infog/'+infoName+'/images/' + i.src.split('/').last())
      );

      //replace landing CSS with infographic CSS
      $('head link')[0].href = 'infog/'+ infoName +'/style.css';

      //Load javascript for Infographic
      $.getScript('infog/'+infoName+'/'+infoName+'.js');

      //Trash everything else
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
