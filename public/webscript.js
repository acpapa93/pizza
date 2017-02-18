$(document).ready(function (){
   $(document).on("load", function(){
     $("#pizzaPics2, #pizzaPics3, #top2, top3").addClass("hidden");
  $("#pizzaPics1, #top1").addClass("visible");
});

//left Arrow
  $("#leftArrow").click(function(){
    //move everything and hide it all on click.
    $("#pizzaPics2, #top2, #top1, #pizzaPics1").animate({
      left: "-1000vw",
    }, 200, function(){
      //move it back and unhide it
    $("#pizzaPics2, #pizzaPics1, #top1, #top2").css(
      {left: "+100vw"});
  });
  $("#two, #one").toggleClass("inactive active");
  $("#pizzaPics2, #pizzaPics1, #top1, #top2").toggleClass("visible hidden");

  $("#pizzaPics1, #pizzaPics2").animate({
    left:"29vw",
  });
  $("#top1, #top2").animate({
    left:"50vw",
  });
});

//Right arrow
$("#rightArrow").click(function(){
  //move everything and hide it all on click.
  $("#pizzaPics2, #top2, #top1, #pizzaPics1").animate({
    left: "+1000vw",
  }, 200, function(){
    //move it back and unhide it
  $("#pizzaPics2, #pizzaPics1, #top1, #top2").css(
    {left: "-100vw"});

});
  $("#two, #one").toggleClass("inactive active");
  $("#pizzaPics2, #pizzaPics1, #top1, #top2").toggleClass("visible hidden");

  $("#pizzaPics1, #pizzaPics2").animate({
    left:"24vw",
  });
  $("#top1, #top2").animate({
    left:"45vw",
  });

  });
});
