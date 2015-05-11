React.render(
    <Question />,
    document.getElementById("main-container")
);

$(document).ready(function () {
   $('.main-container').on("click", "img", function () {
       var src = $(this).attr("src");
       window.sf.viewImage(src);
   });
});