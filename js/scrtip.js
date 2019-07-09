$(function() {
  "use strict";
  /*Activate default tab contents*/
  var leftPos, newWidth, $magicLine;

  $(".navbar-nav").append("<li id='magic-line'></li>");
  $magicLine = $("#magic-line");
  $magicLine
    .width($(".active").width())
    .css("left", $(".active a").position().left)
    .data("origLeft", $magicLine.position().left)
    .data("origWidth", $magicLine.width());

  $(".navbar-nav li a").click(function() {
    scrollTo($(this));
    
    var $this = $(this);
    $this
      .parent()
      .addClass("active")
      .siblings()
      .removeClass("active");
    $magicLine
      .data("origLeft", $this.position().left)
      .data("origWidth", $this.parent().width());

    return false;
  });

  /*Magicline hover animation*/
  $(".navbar-nav li")
    .find("a")
    .hover(
      function() {
        var $thisBar = $(this);
        leftPos = $thisBar.position().left;
        newWidth = $thisBar.parent().width();
        $magicLine.css({
          left: leftPos,
          width: newWidth
        });
      },
      function() {
        $magicLine.css({
          left: $magicLine.data("origLeft"),
          width: $magicLine.data("origWidth")
        });
      }
    );

  function scrollTo(element) {
    let cil = element.attr("href");
    let menu = $(".navbar");
    let rychlost = 2 * 1000;

    $("html, body")
      .stop()
      .animate({ scrollTop: $(cil).offset().top - menu.height() }, rychlost);
  }
});
