$( document ).ready(function(){
	  $( 'html' ).mousemove(function( event ){ 
	    $( "div:first" ).text( "X: " + event.pageX ); 
	    $( "div:last" ).text( "Y: " + event.pageY );
      let centerX = $( 'body' ).width()/2;
      let centerY = $( 'body' ).height()/2;
      console.log(centerX, centerY);
      //$('p').css({"transform": "translate(" + (-(centerX + event.pageX)/50) + "%," + (-(centerY + event.pageY)/30) + "%)"});
      $('section').css({"transform": "translate(" + (-(centerX + event.pageX)/1000) + "%," + (-(centerY + event.pageY)/1000) + "%)"});
	  });
	});
