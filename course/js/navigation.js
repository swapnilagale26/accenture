var showTrans = false;
var showMenu = false;
var muted = false;
var paused = true;
var currentAudio;
var xmlDoc;
var currentLessonNum = 0;
var currentPageNum = 0;
var totalPageNum = 0;
var totalLessonNum = 1;
var courseTitle;
var lessonTitle;
var pageTitle;
var isIE = false;
var isFF = false;
var isOP = false;
var isSafari = false;
var isChrome = false;
var length=0;
var isLms = false;
//LMS variables
var isLms = window.opener._isLms;
if(isLms=="true"){
	var lesson_location = window.opener.lesson_location;
	var suspend_data = window.opener.suspend_data;
}
var bookmark = 0;
var courseStatus;
var pageStatus = new Array();
///iphone|ipod|ipad/ detection::::::::::::::::::::
var standalone = window.navigator.standalone,
	userAgent = window.navigator.userAgent.toLowerCase(),
	safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|linux|ipad/.test( userAgent );
	

	//ios = true;
//alert(userAgent);
if( ios ) {
    if ( !standalone && safari ) {
		//alert("browser");
    } else if ( standalone && !safari ) {
		//alert("standalone");
    } else if ( !standalone && !safari ) {
		//alert("uiwebview");
    };
} else {
	//alert("not iOS");
};
//Broswer detection::::::::::::::::::::
if(userAgent.indexOf("firefox") > -1)
{
isFF = true;
//alert("isFF");
}
else if(userAgent.indexOf("opera") > -1)
{
isOP = true;
//alert("isOP");
}
else if(userAgent.indexOf("msie") > -1)
{
isIE = true;
//alert("isIE");
}
else if(userAgent.indexOf("chrome") > -1)
{
isChrome = true;
//alert("isChrome");
}
else if(userAgent.indexOf("safari") > -1)
{
isSafari = true;
//alert("isSafari");
}
//XML loading::::::::::::::::::::
function loadCourseMap()
		{			
			 xmlDoc=loadXMLString(courseMap);
			 if(xmlDoc){
			 	totalPageNum=xmlDoc.getElementsByTagName("page").length;
				//totalLessonNum = xmlDoc.getElementsByTagName("lesson").length;
			 }
			 //button variables
			 menuBtn=document.getElementById('menuBtn');
			 audioBtn=document.getElementById('audioBtn');
			 ttBtn=document.getElementById('ttBtn');
 			 helpBtn=document.getElementById('helpBtn');
			 replayBtn=document.getElementById('replayBtn');			 
			 playPaueBtn=document.getElementById('playPaueBtn');
			 backBtn=document.getElementById('backBtn');
			 nextBtn=document.getElementById('nextBtn');			 
	}
//Load page:::::::::::::::::::::
function loadPage(id){	
		enableAllBtns();
		//disableAllBtns();
		currentPageNum = Number(id);
		var currentFileName;
		var currentFileNameArray;
		var currentFileNum;
		currentFileName =  String(xmlDoc.getElementsByTagName("page")[currentPageNum].childNodes[0].nodeValue);
		currentFileNameArray = currentFileName.split(".");
		currentFileNum = currentFileNameArray[0];
		currentLessonNum = currentFileNum.slice(currentFileNum.length-5, currentFileNum.length-3);
		//alert(currentLessonNum);		
		myVar = xmlDoc.getElementsByTagName("page")[id].childNodes[0].nodeValue;
		showLessonPageTitle();
		showMenu = true;
		showMainMenu();
		//document.getElementById("introContainer").style.display='none';
		document.getElementById("pageContainer").src= myVar;
		if (currentPageNum<=8){
		document.getElementById("currentPageNum").innerHTML= "0"+Number(currentPageNum+1);
		}else{
			document.getElementById("currentPageNum").innerHTML= currentPageNum+1;
		}
		if (totalPageNum<=9){
			document.getElementById("totalPageNum").innerHTML= "0"+Number(totalPageNum);
		}else{
			document.getElementById("totalPageNum").innerHTML= totalPageNum;
		}
		playPaueBtn.className = 'pauseBtn';	
		paused=true;
		enableNext();
		enableBack();
		if (currentPageNum==0){
			disableBack();		
		}else if (currentPageNum==totalPageNum-1){			
			disableNext();
		}
		for (i=0; i<=totalPageNum; i++){
			$("#"+i).removeClass("menuPageTitleActive");			
		}
		$("#"+currentPageNum).addClass("menuPageTitleActive");
		pageStatus[currentPageNum] = 1;
		//alert(pageStatus);
		//==================  function calling to set values from course to LMS ======================//
		if(isLms=="true"){
			updateLMS();
		}
		
	}
//LessonTitle and Page title:::::::::::
function showLessonPageTitle(){
		
		courseTitle = xmlDoc.getElementsByTagName("course")[0].getAttribute("title");
		lessonTitle = xmlDoc.getElementsByTagName("lesson"+currentLessonNum)[0].getAttribute("title");
		pageTitle = xmlDoc.getElementsByTagName("page")[currentPageNum].getAttribute("title");
		document.getElementById("courseTitle").innerHTML = courseTitle;
		document.getElementById("lessonTitle").innerHTML = pageTitle;
		//$("#pageContainer")[0].document.getElementById("pageTitle").innerHTML = pageTitle;
		//alert($("#pageContainer")[0].document.getElementById("pageTitle"));
}
//Navigation::::::::::::::::::::
function enableAllBtns(){
	 menuBtn.addEventListener('click',showMainMenu,false);
	 menuBtn.addEventListener('mouseover',showTooltip,false);
	 menuBtn.addEventListener('mouseout',showTooltip,false);
	 audioBtn.addEventListener('click',audioControls,false);
	 audioBtn.addEventListener('mouseover',showTooltip,false);
	 audioBtn.addEventListener('mouseout',showTooltip,false);
	 ttBtn.addEventListener('click',showTranscript,false);
	 ttBtn.addEventListener('mouseover',showTooltip,false);
	 ttBtn.addEventListener('mouseout',showTooltip,false);	 
	 helpBtn.addEventListener('click',showHelp,false);
	 helpBtn.addEventListener('mouseover',showTooltip,false);
	 helpBtn.addEventListener('mouseout',showTooltip,false);	 	 
	 replayBtn.addEventListener('click',replayControls,false);	
	 replayBtn.addEventListener('mouseover',showTooltip,false);
	 replayBtn.addEventListener('mouseout',showTooltip,false); 
	 playPaueBtn.addEventListener('click',playPauseControls,false);
	 playPaueBtn.addEventListener('mouseover',showTooltip,false);
	 playPaueBtn.addEventListener('mouseout',showTooltip,false);
	 backBtn.addEventListener('click',loadPreviousPage,false);
	 backBtn.addEventListener('mouseover',showTooltip,false);
	 backBtn.addEventListener('mouseout',showTooltip,false);
	 nextBtn.addEventListener('click',loadNextPage,false);
	 nextBtn.addEventListener('mouseover',showTooltip,false);
	 nextBtn.addEventListener('mouseout',showTooltip,false);
}
function disableAllBtns(){
	menuBtn.removeEventListener('click',showMainMenu,false);
	menuBtn.removeEventListener('mouseover',showTooltip,false);
	menuBtn.removeEventListener('mouseout',showTooltip,false);
	audioBtn.removeEventListener('click',audioControls,false);
	audioBtn.removeEventListener('mouseover',showTooltip,false);
	audioBtn.removeEventListener('mouseout',showTooltip,false);
	ttBtn.removeEventListener('click',showTranscript,false);
	ttBtn.removeEventListener('mouseover',showTooltip,false);
	ttBtn.removeEventListener('mouseout',showTooltip,false);
	helpBtn.removeEventListener('click',showHelp,false);
	helpBtn.removeEventListener('mouseover',showTooltip,false);
	helpBtn.removeEventListener('mouseout',showTooltip,false);
	replayBtn.removeEventListener('click',replayControls,false);
	replayBtn.removeEventListener('mouseover',showTooltip,false);
	replayBtn.removeEventListener('mouseout',showTooltip,false);
	playPaueBtn.removeEventListener('click',playPauseControls,false);
	playPaueBtn.removeEventListener('mouseover',showTooltip,false);
	playPaueBtn.removeEventListener('mouseout',showTooltip,false);
	backBtn.removeEventListener('click',loadPreviousPage,false);
	backBtn.removeEventListener('mouseover',showTooltip,false);
	backBtn.removeEventListener('mouseout',showTooltip,false);
	nextBtn.removeEventListener('click',loadNextPage,false);
	nextBtn.removeEventListener('mouseover',showTooltip,false);
	nextBtn.removeEventListener('mouseout',showTooltip,false);
}

//Next page::::::::::::::::::::
function loadNextPage(){	
		if (currentPageNum>=totalPageNum-1){			
		}else{
		currentPageNum++;
		loadPage(currentPageNum);
		}
		
}
function enableNext(){
	nextBtn.className = 'nextBtn';
	nextBtn.addEventListener('click',loadNextPage,false);
}
function disableNext(){
	nextBtn.className = 'nextBtnDisabled';
	nextBtn.removeEventListener('click',loadNextPage,false);
}
//Previous page::::::::::::::::::::
function loadPreviousPage(){
	if (currentPageNum==0){		
	}else{		
		currentPageNum--;	
		loadPage(currentPageNum);
	}
}
function enableBack(){
	backBtn.className = 'backBtn';
	backBtn.addEventListener('click',loadPreviousPage,false);
}
function disableBack(){
	backBtn.className = 'backBtnDisabled';
	backBtn.removeEventListener('click',loadPreviousPage,false);
}	
//Audio controls::::::::::::::::::::
function audioControls () {
	if (muted==false){
		audioBtn.className = 'audioOffBtn';
		document.getElementById("audioBtnTooltip").innerHTML = 'Audio On';
		muted=true;	
	}else{
		audioBtn.className = 'audioBtn';
		document.getElementById("audioBtnTooltip").innerHTML = 'Audio Off';
		muted=false;
	}	
	currentAudio.muted = !currentAudio.muted;	

}
function playAudio(id){		
	currentAudio.pause();	
	currentAudio = id;
	//currentAudio.currentTime = 0;
	currentAudio.play();
	playPaueBtn.className = 'pauseBtn';			
	paused=true;
	currentAudio.addEventListener('ended',playPauseControls,false);
	if (muted){
		currentAudio.muted = !currentAudio.muted;
	}	
}
//Replay controls::::::::::::::::::::
function replayControls(){
	loadPage(currentPageNum);	
	playPaueBtn.className = 'pauseBtn';			
	paused=true;
}
//Play/Puase controls::::::::::::::::::::
function playPauseControls () {
	if (!currentAudio.ended){
		if (paused==false){
			playPaueBtn.className = 'pauseBtn';
			document.getElementById("playPaueBtnTooltip").innerHTML = 'Pause';			
			paused=true;
			currentAudio.play();
		}else{
			playPaueBtn.className = 'playBtn';
			document.getElementById("playPaueBtnTooltip").innerHTML = 'Play';			
			paused=false;
			currentAudio.pause();
		}	
	}else{
		playPaueBtn.className = 'pauseBtnDisabled';
		
	}
}
//Transcript controls::::::::::::::::::::
function showTranscript () {
	if (showTrans==false){
		ttBtn.className = 'ttOffBtn';	
		document.getElementById("ttBtnTooltip").innerHTML = 'Transcript Off';	
		document.getElementById("ttpane").style.visibility = 'visible';
		showTrans=true;	
		if (showMenu==true){
			menuBtn.className = 'menuBtn';		
			document.getElementById("menupane").style.display = 'none';
			showMenu=false;
		}
	}else{
		ttBtn.className = 'ttBtn';
		document.getElementById("ttBtnTooltip").innerHTML = 'Transcript On';		
		document.getElementById("ttpane").style.visibility = 'hidden';
		showTrans=false;
	}
}
function disablettBtn(){
	ttBtn.className = 'ttBtnDisabled';
	ttBtn.removeEventListener('click',showTranscript,false);
}
//Slider controls:::::::::::::::::::::
function updateSlider()
{
	space=length * currentAudio.currentTime/currentAudio.duration;
	if((space)<=length)
	{
		$("#resizebar").width(space);
		$( "#draggable" ).css("left",space+"px"); 

	}	
}
function sliderEnd()
{
	$("#resizebar").css({'width':'0px'});
	$("#resizebar").animate({'width':'385'},1000);
}
//Menu controls::::::::::::::::::::
function showMainMenu () {	
	if (showMenu==false){
		menuBtn.className = 'menuOnBtn';		
		document.getElementById("menupane").style.display = 'block';
		showMenu=true;
		if (showTrans==true){
			ttBtn.className = 'ttBtn';		
			document.getElementById("ttpane").style.visibility = 'hidden';
			showTrans=false;
		}
	}else{
		menuBtn.className = 'menuBtn';		
		document.getElementById("menupane").style.display = 'none';
		showMenu=false;
	}	
}
function showTooltip(ev){
	var btnName = ev.target.id+"Tooltip";
	if (btnName=="audioBtnTooltip"){
		if(muted==false){
			document.getElementById(btnName).innerHTML = 'Audio Off';
		}else{
			document.getElementById(btnName).innerHTML = 'Audio On';
		}
	}else if (btnName=="ttBtnTooltip"){
		if(showTrans==false){
			document.getElementById(btnName).innerHTML = 'Transcript On';
		}else{
			document.getElementById(btnName).innerHTML = 'Transcript Off';
		}
	}else if (btnName=="playPaueBtnTooltip"){
		if(paused==true){
			document.getElementById(btnName).innerHTML = 'Pause';			
		}else{
			document.getElementById(btnName).innerHTML = 'Play';
		}
	}else{
		btnName = ev.target.id+"Tooltip";
	}
	//alert(btnName);
	document.getElementById(btnName).style.display = 'block';
	if (ev.type=="mouseover"){		
		$("#"+btnName).animate({opacity:'1'},200);
	}else if (ev.type=="mouseout"){
		$("#"+btnName).animate({opacity:'0'},100);
	}	
}
function showLesson(currentLesson) {
	if ($("#lessonTitle"+currentLesson).hasClass("menuLessonTitleArrow")){
		$("#lessonTitle"+currentLesson).removeClass("menuLessonTitleArrow");
		$("#lessonTitle"+currentLesson).addClass("menuLessonTitleArrowActive");
	}else if ($("#lessonTitle"+currentLesson).hasClass("menuLessonTitleArrowActive")){
		$("#lessonTitle"+currentLesson).removeClass("menuLessonTitleArrowActive");
		$("#lessonTitle"+currentLesson).addClass("menuLessonTitleArrow");
	}
	$("#lesson"+currentLesson).slideToggle(300);
}
//Play button highlighting for IPad/IPhone ::::::::::::::::::::
function playHigh(){
	playPaueBtn.className = 'playBtnHigh';
	document.getElementById("playPaueBtnTooltip").innerHTML = 'Play';			
	document.getElementById("playPaueBtnTooltip").style.display = 'block';
	document.getElementById("playPaueBtnTooltip").style.opacity = '1';
	paused=false;
	currentAudio.pause();
}

//Help controls::::::::::::::::::::
function showHelp() {
window.open("help.html", "help","toolbar=0,directories=0,location=0,directories=0,status=0,menubar=0,fullscreen=0,scrollbars=0,width=976,height=531,resizable=no");
}

function exitCourse () {
	window.close();
}
//Function to set values from course to LMS::::::::::
function updateLMS(){
	bookmark = currentPageNum;	
	if(pageStatus.length==totalPageNum){
	   courseStatus = "completed";
	   }
	   else{
		courseStatus = "incomplete";
	  }
	setValuesFromCourse(bookmark, courseStatus, pageStatus);
}