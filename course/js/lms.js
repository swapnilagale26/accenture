// store start time as soon as course started
var startTime = new Date();

//==================  To get values from LMS ======================//
function getValuesFromLms(){
	//alert(suspend_data);
	//alert(lesson_location);
	if (lesson_location=="" || lesson_location==undefined || lesson_location==NaN){
		currentPageNum = "";
				
	}else{
		currentPageNum = Number(lesson_location);				
	}
	if(suspend_data==""){		
	}else{
		pageStatus = suspend_data.split(",");
	}
	if (currentPageNum===""){
		document.getElementById("introContainer").src= "intro.html";	
	}else{
		loadPage(currentPageNum);	
	}
	
}
//================== To set values to LMS ======================//
function setValuesFromCourse(bookmark, courseStatus, suspendData){
	window.opener.setValues(bookmark, courseStatus, suspendData);
	//getElapsedTime()
}

//=================== calculte elapsed time ======================//
function getElapsedTime(){
	endTime = new Date;
	//alert("Difference: "  + ((endTime.getTime())-(startTime.getTime())));
	var timeInterval = Math.ceil((endTime.getTime() - startTime.getTime())/1000);
	//alert(timeInterval);
	if (timeInterval < 0)
		timeInterval = 0;
		var ss,mm,hh;
		ss = timeInterval % 60;
		timeInterval = Math.round(timeInterval/60);
		mm = timeInterval % 60;
		hh = Math.round(timeInterval/60);
		if (ss==0 || ss==1 || ss==2 || ss==3 || ss==4 || ss==5 || ss==6 || ss==7 || ss==8 || ss==9)
			ss="0" + ss;
		if (mm==0 || mm==1 || mm==2 || mm==3 || mm==4 || mm==5 || mm==6 || mm==7 || mm==8 || mm==9)
			mm="0" + mm;
		if (hh==0 || hh==1 || hh==2 || hh==3 || hh==4 || hh==5 || hh==6 || hh==7 || hh==8 || hh==9)
			hh="0" + hh;
		//alert("Diff: " + hh + "." + mm + "." + ss);
		sessionTime = hh + ":" + mm + ":" + ss;
		window.opener.setSessionTime(sessionTime);
}
//=================== end elapsed time ======================//