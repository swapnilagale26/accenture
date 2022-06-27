var totalquestions=1;
var correctAnswer = [1,0,0,0];
var userAnswer = [0,0,0,0];
function optionSelected(){
	for (q=1;q<=totalquestions;q++){
		var thequestion =eval("document.myquiz.question"+q);
	for (c=0;c<thequestion.length;c++){
			if (thequestion[c].checked==true){
				userAnswer[thequestion[c].value] = 1;
			}else{
				userAnswer[thequestion[c].value] = 0;
			}
		}
	}
	var count = 0;
		for (var j=0; j<userAnswer.length; j++)
		{
			if (userAnswer[j] == 0)
			{
				count++;
				if (count == userAnswer.length)
				{
					document.getElementById("submitBtn").disabled = true;
					document.getElementById("submitBtn").style.cursor = 'default';
					document.getElementById("resetBtn").disabled = true;
					document.getElementById("resetBtn").style.cursor = 'default';
				}
				else
				{
					document.getElementById("submitBtn").disabled = false;
					document.getElementById("submitBtn").style.cursor = 'pointer';
					document.getElementById("resetBtn").disabled = false;
					document.getElementById("resetBtn").style.cursor = 'pointer';
				}
			}

		}
}
function checkAnswer() {
	document.getElementById("submitBtn").style.display = 'none';
	document.getElementById("resetBtn").style.display = 'none';
	for (q=1;q<=totalquestions;q++){
		var thequestion =eval("document.myquiz.question"+q);
	for (c=0;c<thequestion.length;c++){
		document.getElementById("option"+c).disabled=true;
		}
	}
	for (var i=0; i<correctAnswer.length; i++)
	{
		if (correctAnswer[i] == 1)
		{
			document.getElementById("tickMark"+i).style.display = 'block';
		}
	}
		
	if (String(userAnswer)==String(correctAnswer)){
		document.getElementById("correct").style.display = 'block';
		parent.document.getElementById("transcript").innerHTML = "<p>That's right. The advantage of adopting e-learning is that quality information is distributed steadily across dissimilar sites at a lower cost than other means.</p>";			
			parent.playAudio(audio2);
	}else{
		document.getElementById("incorrect").style.display = 'block';
		parent.document.getElementById("transcript").innerHTML = "<p>That's incorrect. The advantage of adopting e-learning is that quality information is distributed steadily across dissimilar sites at a lower cost than other means.</p>";
			parent.playAudio(audio3);
	}
}
function resetAll(){
	userAnswer = [0,0,0,0];
	document.myquiz.reset();
	document.getElementById("submitBtn").disabled = true;
	document.getElementById("submitBtn").style.cursor = 'default';
	document.getElementById("resetBtn").disabled = true;
	document.getElementById("resetBtn").style.cursor = 'default';
}