function findAPI(win)
{
   // Check to see if the window (win) contains the API
   // if the window (win) does not contain the API and
   // the window (win) has a parent window and the parent window
   // is not the same as the window (win)
   while ( (win.API == null) &&
           (win.parent != null) &&
           (win.parent != win) )
   {
      // increment the number of findAPITries
      findAPITries++;

      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7)
      {
         alert("Error finding API -- too deeply nested.");
         return null;
      }

      // set the variable that represents the window being
      // being searched to be the parent of the current window
      // then search for the API again
      win = win.parent;
   }
   return win.API;
}


function getAPI()
{
   // start by looking for the API in the current window
   var theAPI = findAPI(window);

   // if the API is null (could not be found in the current window)
   // and the current window has an opener window
   if ( (theAPI == null) &&
        (window.opener != null) &&
        (typeof(window.opener) != "undefined") )
   {
      // try to find the API in the current window's opener
      theAPI = findAPI(window.opener);
   }
   // if the API has not been found
   if (theAPI == null)
   {
      // Alert the user that the API Adapter could not be found
      //alert("Unable to find an API adapter - this is normal if viewing this course outside an LMS");
   }
   return theAPI;
}

function GetTime(){
	var CurrentDate = new Date();
	var CurrentTime = CurrentDate.getHours() + ":" + CurrentDate.getMinutes() + ":" + CurrentDate.getSeconds();
	
	return CurrentTime;
}

// To Calculate Total Time Taken
function TimeTaken(){
	var CurrentTimeDiff = GetTimeDifference();
	var TotalSec = eval(CurrentTimeDiff)
	var Tmp;
	
	var eMinutes = Math.floor(parseInt(TotalSec) / 60);
	var eHours = Math.floor(parseInt(eMinutes) / 60);
	
	eMinutes = Math.floor(parseInt(eMinutes) % 60)
	Tmp = parseInt(TotalSec) % 60;

	if(parseInt(Tmp)<10){Tmp = "0" + Tmp;}
	if(parseInt(eMinutes)<10){eMinutes = "0" + eMinutes;}
	if(parseInt(eHours)<10){eHours = "0" + eHours;}
	
	var TotalTime = eHours + ":" + eMinutes + ":" + Tmp
	return TotalTime;
}

// To Calculate Time Difference
function GetTimeDifference()
{
	var StartSec = 0;
	var sArr = StartTime.toString().split(":");

	StartSec = StartSec + parseInt(sArr[2]) + ((parseInt(sArr[1])) * 60) + ((parseInt(sArr[0])) * 60 * 60);
	
	var EndSec = 0;
	var eArr = EndTime.toString().split(":");
	EndSec = EndSec + parseInt(eArr[2]) + ((parseInt(eArr[1])) * 60) + ((parseInt(eArr[0])) * 60 * 60)

	var TimeDiff = eval(EndSec) - eval(StartSec)
	
	return TimeDiff;
}

/*
// Set status
function sendAICC(maxchapter,score,status)
{
	API.LMSSetValue("cmi.core.lesson_location", maxchapter);
	API.LMSSetValue("cmi.core.score.raw", score);
	API.LMSSetValue("cmi.core.lesson_status", status);
	API.LMSCommit("");
	return void(0);
}
*/
function setValues(bookmark, courseStatus, suspendData)
{
	
	API.LMSSetValue("cmi.core.lesson_location", bookmark);
	API.LMSSetValue("cmi.core.lesson_status", courseStatus);
	API.LMSSetValue("cmi.suspend_data", suspendData);
	
	
	EndTime = GetTime();
	var TotalTime = TimeTaken();
	API.LMSSetValue("cmi.core.session_time", TotalTime);
	
	//Commit values
	API.LMSCommit("");
 // API.LMSFinish("");
}


/*function setValues(bookmark, raw, courseStatus, suspendData, studentId, studentName)
{
	//alert("setValues");
	//alert(bookmark+"; "+maxScore+"; "+ courseStatus+"; "+ studentId+"; "+ studentName);
  // Collect for total score
	API.LMSSetValue("cmi.core.lesson_location", bookmark);
	API.LMSSetValue("cmi.core.lesson_status", courseStatus);
	//API.LMSSetValue("cmi.core.student_id", studentId);
	//API.LMSSetValue("cmi.core.student_name", studentName);
	API.LMSSetValue("cmi.core.score.raw", raw);
	API.LMSSetValue("cmi.suspend_data", suspendData);
	
	
	EndTime = GetTime();
	var TotalTime = TimeTaken();
	API.LMSSetValue("cmi.core.session_time", TotalTime);
	//alert("totaltime : " + cmi.core.session_time)
	//API.LMSSetValue("cmi.core.session_time",currentSessionTime); //?
	//Commit values
	API.LMSCommit("");
 // API.LMSFinish("");
}*/

function exitAu()
{
	API.LMSCommit("");
	API.LMSFinish("");
	}
function truncateSpaces(input)
{
	string_to_truncate=input;
	string_to_truncate=truncate_leading_spaces(string_to_truncate);
	string_to_truncate=truncate_trailing_spaces(string_to_truncate);
	return string_to_truncate;
}
	
//Function to truncate Leading Spaces
function truncate_leading_spaces(thisstring)
{
		name_with_spaces=thisstring;
		length_of_name=name_with_spaces.length;
		j=0;
		for (i=0;i<length_of_name;i++)
		{
			get_character=name_with_spaces.charAt(i);
			if (get_character==" ")
				{
				j=j+1;
				continue;
				}
			else
				{
				i=length_of_name;
				}
		}
		if(j>0)
			{
			return name_with_spaces.substring(j,length_of_name);
			}
		else
			{
			return name_with_spaces;
			}
}

//Function to truncate Trailing Spaces
function truncate_trailing_spaces(thisstring)
{
		name_with_spaces=thisstring;
		length_of_name=name_with_spaces.length;
		j=0;
		for (i=length_of_name;i>0;i--)
		{
			get_character=name_with_spaces.charAt(i-1);
			if (get_character==" ")
				{
				j=j+1;
				continue;
				}
			else
				{
				i=0;
				}
		}
		if(j>0)
			{
			return name_with_spaces.substring(0,length_of_name-j);
			}
		else
			{
			return name_with_spaces;
			}
}