var audioGameOver=document.createElement('audio');
audioGameOver.setAttribute('src','assets/images/BigExplosion.wav');

var audioLost=document.createElement('audio');
audioLost.setAttribute('src','assets/images/sad trombone.wav');

var audioRight=document.createElement('audio');
audioRight.setAttribute('src','assets/images/applause.wav');

var audioWrong=document.createElement('audio');
audioWrong.setAttribute('src',"assets/images/BigExplosion.wav");

var audioStart=document.createElement('audio');
audioStart.setAttribute('src','assets/images/SnareDrum.wav');

var audioreStart=document.createElement('audio');
audioreStart.setAttribute('src','assets/images/SnareDrum.wav');
      
var audioTimer=document.createElement('audio');
audioTimer.setAttribute('src','assets/images/clock-ticking-4.wav');






var correct=0; 
var incorrect=0; 
var unanswered=0;  
var timer;  
var time;
var question; 
var questions=[ 
	{
		question: "In what year did the civil war end?", 
		choice1: "1798",
		choice2: "1801",
		choice3: "1864", 
		choice4: "1865",  
		triviaImage: "assets/images/treaty.jpe", 
		answer: 4,
		correctansw: "1865"
	},

	{
		question: "Who was the Commander of the Confederate Army?", 
		choice1:"Robert E. Lee", 
		choice2:"Abraham Lincoln",  
		choice3: "Robert Sherman",  
		choice4:"Ulysses Grant",  
		triviaImage: "assets/images/grant-lee-lincoln-sherman.jpe", 
		answer: 1,
		correctansw: "Robert E. Lee" 

	},   

	{
		question: "Where was the first battle of the war?",  
		choice1:"Gettysburg", 
		choice2:"Antietam",  
		choice3: "Charleston", 
		choice4:"Manassas", 
		triviaImage: "assets/images/cannon.jpe", 
		answer: 4,
		correctansw: "Manassas"
	},   

	{
		question: "Where was the treaty to end the war signed?", 
		choice1:"Richmond", 
		choice2:"Charleston",
		choice3: "Appomattox", 
		choice4:"Atlanta", 
		triviaImage: "assets/images/appomattox.jpe", 
		answer: 3,
		correctansw: "Appomattox"
	},

	{
		question: "Which general advised Grant that he could 'Make Georgia howl'?", 
		choice1:"Stonewall Jackson", 
		choice2: "William T. Sherman",		
		choice3: "Nathan B. Forrest", 
		choice4:"George B. McClellan",
		triviaImage: "assets/images/generals.jpe",
		answer: 2,
		correctansw: "William T. Sherman" 
	}  

]


function timerFunction(){
	console.log("enter timerFunction");
	if (question >= 0 && question < questions.length) { //are we on a valid question
		time--; 
		$(".timeCounter").show(); 
		$(".timeCounter").html('<h4>Seconds Remaining: ' + time +'s</h4>'); 
		audioTimer.play();
		if (time <=0){ 
			unanswered++; 
			nextQuestion(); 
		} 
	} 
};  

function gameOver(){
	audioGameOver.play();
	$(".timeCounter").hide(); 
	$(".triviaImage").hide(); 
	$(".answers").hide(); 
	$(".triviaQuestion").hide(); 
	$("#restartGame").show(); 
	$("#correct").show(); 
	$("#incorrect").show(); 
	$("#unanswered").show(); 

	if(correct ===1) {
		$("#correct").html('<h3>You got ' + correct + " Question(s) Right!!</h3>");
	}else{ 
		$("#correct").html('<h3>You got ' + correct + " Question(s) Right!</h3>"); 
	}
	if(incorrect ===1) {
		$("#incorrect").html('<h3>You got ' + incorrect + " Question(s) Wrong!</h3>");
	}else{ 
		$("#incorrect").html('<h3>You got ' + incorrect + " Question(s) Wrong!</h3>"); 
	} 

	if(unanswered===1){
		$("#unanswered").html('<h3>' + unanswered + ' Questions Unanswered!</h3>'); 
	}else {
		$("#unanswered").html('<h3>' + unanswered + ' Question(s) Unanswered!</h3>'); 
	}
audioGameOver.play();	
}; 

function checkAnswer(answer){
	var answertext = "That is incorrect. The correct answer is: ";
	var correctanswer = questions[question].correctansw;
	console.log(answertext);
	console.log(correctanswer);

	if (questions[question].answer===answer){
		correct++; 
		audioRight.play();
	}else {	
		audioWrong.play();
		incorrect++;				
		alert(answertext + correctanswer);
		console.log("That is incorrect.   The correct answer is:  ");
		console.log(questions[question].choice2);
	} 

	nextQuestion(); 
}

function showQuestion(){ 
	time=30; 
	$(".timeCounter").show(); 
	$(".timeCounter").html('<h4>Seconds Remaining: ' + time +'s</h4>');
	
	if (timer == null) {
		timer = setInterval(timerFunction, 1000);
	}else{
		clearInterval(timer); 
		timer= setInterval(timerFunction,  1000); 
	} 

	console.log(question);


	$(".triviaQuestion").html("<h2> " + questions[question].question + "</h2>"); 
	$(".triviaImage").attr( 'src', questions[question].triviaImage); 
	$(".triviaImage").show();
	$(".answers").show();
	$(".triviaQuestion").show();   
	$("#button1").text(questions[question].choice1); 
	$("#button2").text(questions[question].choice2); 
	$("#button3").text(questions[question].choice3); 
	$("#button4").text(questions[question].choice4);


}; 
function restartGame(){
/* 		audioStart.play(); */
		question=-1; 
		nextQuestion();
		correct=0; 
		incorrect=0; 
		unanswered=0;
		$("#restartGame").hide(); 
		$("#correct").hide(); 
		$("#incorrect").hide(); 
		$("#unanswered").hide(); 

} 

$(document).ready (function() {
	$("#button1").on("click", function(){ 
		checkAnswer(1); 
	}); 
	$("#button2").on("click", function(){ 
		checkAnswer(2); 
	}); 
	$("#button3").on("click", function(){ 
		checkAnswer(3); 
	}); 
	$("#button4").on("click", function(){ 
		checkAnswer(4); 
	}); 

	$('#restartGame').on("click", function(){

	restartGame();  
	}); 

	$('.triviaImage').hide(); 
	$('.answers').hide(); 
	$("#restartGame").hide(); 
	$('#startGame').on('click', function(){
	$('#startGame').hide(); 
	$('#gameDirections').hide();

		restartGame(); 
	});  
});

function nextQuestion(){
	question++;   
	if(question==questions.length){
		gameOver(); 
	} else {
		showQuestion();

	}
};
audioStart.play();

