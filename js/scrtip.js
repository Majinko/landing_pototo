$(function() {
  "use strict";
  /*Activate default tab contents*/
  var leftPos, newWidth, $magicLine;

  $(".navbar-nav").append("<li id='magic-line'></li>");
  $magicLine = $("#magic-line");
  handlePositionMagicLine();

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
    let target = element.attr("href");
    let menu = $(".navbar");
    let speed = 2 * 1000;

    $("html, body")
      .stop()
      .animate({ scrollTop: $(target).offset().top - menu.height() }, speed);
  }

  function handlePositionMagicLine() {
    $magicLine
      .width($(".navbar-nav .active").width())
      .css("left", $(".active a").position().left)
      .data("origLeft", $magicLine.position().left)
      .data("origWidth", $magicLine.width());
  }

  //$(document).on("scroll", onScroll);

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".navbar-nav a").each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".ul li").removeClass("active");
        currLink.parent().addClass("active");

        handlePositionMagicLine();

      } else {
        currLink.parent().removeClass("active");
      }
    });
  }
});
