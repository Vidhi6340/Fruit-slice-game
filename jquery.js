var playing = false;
var score;
var trialsLeft;
var fruits = ['orange','strawberry','watermelon'];
var step;
var action;  //used for setInterval
$(function(){
	
	//click on start reset button
	$("#startreset").click(function(){
		//we are playing
		if(playing == true){
			
		     //reload the page
			 location.reload();
		   }else{
			   
			   //we are not playing
			   playing = true;   //game initiated
			   //set score to 0
			   score = 0;
			   $("#scorevalue").html(score);
			   
			   //show trials left box
			   $("#trialsLeft").show();
			   trialsLeft = 3;
			   addHearts();
			   
			   //hide gameover box
			   $("#gameover").hide();
			   
			   //change button text to reset game
			   $("#startreset").html("Reset Game");
			   
			   //start sending fruit
			   startAction();
			   
		   }
	});

$("#fruit1").mouseover(function(){
	score++;
	$("#scorevalue").html(score);  //updating ther score
//	document.getElementById("slicesound").play();
	$("#slicesound")[0].play();  //play sound
	
	//make fruit stop going down
	clearInterval(action);
	
	//hide the fruit
	$("#fruit1").hide("explode",500);  //slicing the fruit
	
	//send new fruit
	setTimeout(startAction,500);
});
//slice a fruit 
       //play sound in the background
       //explode fruit


//functions
function addHearts(){
	$("#trialsLeft").empty();
	for(i = 0; i<trialsLeft;i++){
				   $("#trialsLeft").append('<img src="images/heart.png" class="life">');
			   }
}

function startAction(){
	//generating a fruit
	$("#fruit1").show();
	chooseFruit();  //choose a random fruit
	$("#fruit1").css({'left' : Math.round(Math.random()*550) , 'top' : -50});   //random position
	
	//generate a random step
	step = Math.round(5*Math.random())+1; //change step;
	
	//move fruit down by 1 step
	action = setInterval(function(){
		$("#fruit1").css('top', $("#fruit1").position().top + step);
		
		//check if the fruit is too low
		if($("#fruit1").position().top > $("#fruitsContainer").height()){
			//check if any trials left
			if(trialsLeft >1){
			   //generating a fruit
	$("#fruit1").show();
	chooseFruit();  //choose a random fruit
	$("#fruit1").css({'left' : Math.round(Math.random()*550) , 'top' : -50});   //random position
	
	//generate a random step
	step = Math.round(5*Math.random())+1; //change step;
	
				//reduce trials by 1
				trialsLeft--;
				
				//populate trialsLeft box
				addHearts();
			   }else{
				   //gameover
				   playing=false; //we are not playing anymore
				   $("#startreset").html("Start Game"); //change html to start game
				   $("#gameover").show();
				   $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
				   $("#trialsLeft").hide();
				   stopAction();
			   }
		}
	},10);
}

//generate a random fruit
function chooseFruit(){
	$("#fruit1").attr('src' ,'images/'+ fruits[Math.round(Math.random()*3)] +'.png' );
}

//stop dropping fruit
function stopAction(){
	clearInterval(action);
	$("#fruit1").hide();
}
	
});