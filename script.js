$(document).ready(function() {
    $("#top").hide();
        $("#title").fadeIn().queue(function() {
            setTimeout(function(){$("#title").dequeue();
          }, 1000);
        });
        $("#title").fadeOut();
        $("#top").fadeIn();
});
