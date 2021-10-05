var acAnimated = {currentSlide: 0};
acAnimated.randomNumber = function(min, max) {
	var num = min + Math.floor(Math.random() * (max - (min - 1)));
	return num;
}
acAnimated.Wall = function(wall) {
  var rows = wall.getAttribute("rows");
  var columns = wall.getAttribute("columns");
  var slides = wall.querySelectorAll(".slide");
  var closeButton = wall.querySelector("button.close-button");
  
  var timeline = new TimelineMax({});
  var currentRow = 0;
  var currentColumn = 0;
  for (var i=0; i<=slides.length-1; i++) {
    var slide = slides[i];
    slide.style.width = (100 / columns) + "%";
    slide.style.height = (100 / rows) + "%";
    
    slide.column = currentColumn;
    slide.row = currentRow;
    slide.className = slide.className + " slide_row_" + String(slide.row) + "_column_" + String(slide.column);
    slide.style.left = currentColumn * (100 / columns) + "%";
    slide.style.top = currentRow * (100 / rows) + "%";
    currentColumn += 1;
    if (currentColumn >= columns) {
      currentColumn = 0; 
      currentRow += 1;
    }
    
    timeline
    .add("slide_" + String(i + 1), acAnimated.randomNumber(0, 5) / 10)
    .to(slide, 0.5, {opacity: 1}, "slide_" + String(i + 1));
    
    slide.onclick = function() {
      var text = this.querySelector(".text");
      var timeline = new TimelineMax({});
      timeline
      .add("play_timeline", 0)
      .to(text, 0.5, {opacity: 1}, "play_timeline");
      
      //left
      for (var i=0; i<=this.column-1; i++) {
        var _slide = wall.querySelector(".slide_row_" + String(this.row) + "_column_" + String(i));
        timeline
        .to(_slide, 0.5, {left: String(0 - ((100 / columns) * (this.column - i))) + "%"}, "play_timeline");
      }
      //right
      for (var i=this.column+1; i<=columns-1; i++) {
        var _slide = wall.querySelector(".slide_row_" + String(this.row) + "_column_" + String(i));
        timeline
        .to(_slide, 0.5, {left: String(100 + ((100 / columns) * ((i - this.column) - 1))) + "%"}, "play_timeline");
      }
      //top
      for (var i=0; i<=this.row-1; i++) {
        for (var c=0; c<=columns-1; c++) {
          var _slide = wall.querySelector(".slide_row_" + String(i) + "_column_" + String(c));
          timeline
          .to(_slide, 0.5, {top: String(0 - ((100 / rows) * (this.row - i))) + "%"}, "play_timeline");
        }
      }
      //bottom
      for (var i=this.row+1; i<=rows-1; i++) {
        for (var c=0; c<=columns-1; c++) {
          var _slide = wall.querySelector(".slide_row_" + String(i) + "_column_" + String(c));
          timeline
          .to(_slide, 0.5, {top: String(100 + ((100 / rows) * ((i - this.row) - 1))) + "%"}, "play_timeline");
        }
      }
      
      timeline
      .to(closeButton, 0.5, {top: "5%", right: "5%"}, "play_timeline")
      .to(this, 0.5, {left: "0%", top: "0%", width: "100%", height: "100%"}, "play_timeline");
      
      closeButton.onclick = function() {
        var timeline = new TimelineMax({});  
        timeline
        .add("play_timeline", 0)
        .to(text, 0.5, {opacity: 0}, "play_timeline");
        
        for (var i=0; i<=slides.length-1; i++) {
          var _slide = slides[i]; 
          
          timeline
          .to(_slide, 0.5, {top: String((100 / rows) * _slide.row) + "%", left: String((100 / columns) * _slide.column) + "%", width: String(100 / columns) + "%", height: String(100 / rows) + "%"}, "play_timeline");
        }
        
        timeline
        .to(this, 0.5, {top: "-30%", right: "-30%"}, "play_timeline");
      }
    }
  }
}
acAnimated.Wall(document.body.querySelector(".wall"));