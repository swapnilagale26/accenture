var totalTime;
var timeLeft;
var startTimer;
	
d0 = new Image(); d0.src = "../images/digital-numbers/0.png";
d1 = new Image(); d1.src = "../images/digital-numbers/1.png";
d2 = new Image(); d2.src = "../images/digital-numbers/2.png";
d3 = new Image(); d3.src = "../images/digital-numbers/3.png";
d4 = new Image(); d4.src = "../images/digital-numbers/4.png";
d5 = new Image(); d5.src = "../images/digital-numbers/5.png";
d6 = new Image(); d6.src = "../images/digital-numbers/6.png";
d7 = new Image(); d7.src = "../images/digital-numbers/7.png";
d8 = new Image(); d8.src = "../images/digital-numbers/8.png";
d9 = new Image(); d9.src = "../images/digital-numbers/9.png";
bkgd = new Image(); bkgd.src = "../images/digital-numbers/bkgd.gif";
	
function updateTime(){
	timeLeft = totalTime;
	var seconds = Math.floor(timeLeft / 1000);
	var minutes = Math.floor(seconds / 60);

	seconds %=  60;
	minutes %=  60;

	totalTime -=  1000;

	var dsec = seconds;
	var dmin = minutes;
		
	if (timeLeft<=180000){
		dsec = seconds;
		dmin = minutes;
		convert(dmin,dsec);
		$("#fail").fadeIn('fast');
		clearTimeout(startTimer);	
		return;
	}else{
		startTimer = setTimeout("updateTime()",1000);
	}
	convert(dmin,dsec);
}

function convert(m,s) {
	if (!document.images) return;
	if (m <= 9) {
		document.images.m1.src = d0.src;
		document.images.m2.src = eval("d"+m+".src");
	}
	else {
		document.images.m1.src = eval("d"+Math.floor(m/10)+".src");
		document.images.m2.src = eval("d"+(m%10)+".src");
	}
	if (s <= 9) {
		document.images.s1.src = d0.src;
		document.images.s2.src = eval("d"+s+".src");
	}
	else {
		document.images.s1.src = eval("d"+Math.floor(s/10)+".src");
		document.images.s2.src = eval("d"+(s%10)+".src");
	}
}