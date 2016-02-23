/**
 * Created by arun on 22/2/16.
 */
// When we click on the LI

$('document').load(function(){
  console.log("meh");
  $("li").click(function(){
    console.log("1");
    // If this isn't already active
    if (!$(this).hasClass("active")) {
      console.log("2");
      // Remove the class from anything that is active
      $("li.active").removeClass("active");
      console.log("1");
      // And make this active
      $(this).addClass("active");
    }
  });
});
