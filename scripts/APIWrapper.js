/*******************************************************************************
**
** FileName: APIWrapper.js
**
*******************************************************************************/

/*******************************************************************************
**
** Concurrent Technologies Corporation (CTC) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee does
** not utilize the software in a manner which is disparaging to CTC.
**
** This software is provided "AS IS," without a warranty of any kind.  ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED.  CTC AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL CTC  OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
** OR INABILITY TO USE SOFTWARE, EVEN IF CTC  HAS BEEN ADVISED OF THE POSSIBILITY
** OF SUCH DAMAGES.
**
*******************************************************************************/

/*******************************************************************************
** This file is part of the ADL Sample API Implementation intended to provide
** an elementary example of the concepts presented in the ADL Shareable
** Courseware Object Reference Model (SCORM).
**
** The purpose in wrapping the calls to the API is to (1) provide a 
** consistent means of finding the LMS API implementation within the window
** hierarchy and (2) to validate that the data being exchanged via the
** API conforms to the defined CMI data types.
** 
** This is just one possible example for implementing the API guidelines for
** runtime communication between an LMS and executable content components. 
** There are several other possible implementations.
**
** Usage: Executable course content can call the API Wrapper 
**		  functions as follows:
**
**		javascript:
**				var result = LMSInitialize();
**				if (result != true) {
**					//handle error
**				  }
**		
**		authorware
**				result := ReadURL("javascript:apiWrapper.LMSInitialize()", 100)
** 
******************************************************************************************/

var _Debug = false;  // set this to false to turn debugging off
// and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralException = 101; 
var _InvalidArgumentError = 201;
var _NotInitialized = 301;
var _NotImplementedError = 401;


// local variable definitions
var apiHandle = null;



/******************************************************************************************
**
** Function: LMSInitialize()
** Inputs:	None
** Return:	CMIBoolean true if the initialization was successful, or
**			CMIBoolean false if the initialization failed.
**
** Description:
** Initialize communication with LMS by calling the LMSInitialize 
** function which will be implemented by the LMS, if the LMS is 
** compliant with the SCORM.
**
******************************************************************************************/
function LMSInitialize() 
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSInitialize was not successful.");
      return false;
   }

   // call the LMSInitialize function that should be implemented by the API
   var emptyString = new String("");

   var initResult = api.LMSInitialize(emptyString);

   if (initResult.toString() != "1")
   {
      // LMSInitialize did not complete successfully.

      // Note: An assumption is made that if LMSInitialize returns a non-true
      //		 value, then and only then, an error was raised.

      // Note: Each function could define its own error handler, but we'll 
      // just implement a generic one in this example.
      var err = ErrorHandler();
   }

   return initResult;
   
} 

/******************************************************************************************
**
** Function LMSFinish()
** Inputs:	None
** Return:	None
**
** Description:
** Close communication with LMS by calling the LMSFinish 
** function which will be implemented by the LMS, if the LMS is 
** compliant with the SCORM.
**
******************************************************************************************/
function LMSFinish()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
   }
   else
   {
      // call the LMSInitialize function that should be implemented by the API
      var emptyString = new String("");
      api.LMSFinish(emptyString);
      var err = ErrorHandler();
   }   

   return;
   
} 

/******************************************************************************************
**
** Function LMSGetValue(name) 
** Inputs:	name - string representing the cmi data model defined category or 
**				   element (e.g. cmi.core.student_id)
** Return:	The value presently assigned by the LMS to the cmi data model 
**			element defined by the element or category identified by the name
**			input value.
**
** Description:	
** Wraps the call to the LMS LMSGetValue method
**
******************************************************************************************/
function LMSGetValue(name)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
      return null;
   }
   else
   {
      var value = api.LMSGetValue(name);
      var err = ErrorHandler();
      // if an error was encountered, then return null, 
      // else return the retrieved value
      if (err != _NoError)
      {
         return null;
      }
      else
      {
         return value.toString();
      }
   }   
}

/******************************************************************************************
**
** Function LMSSetValue(name, value) 
** Inputs:	name - string representing the cmi data model defined category or element
**			value - the value that the named element or category will be assigned
** Return:	None
**
** Description:
** Wraps the call to the LMS LMSSetValue method
**
******************************************************************************************/
function LMSSetValue(name, value) 
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
   }
   else
   {
      api.LMSSetValue(name, value);
      var err = ErrorHandler();
   }   

   return;
}

/******************************************************************************************
**
** Function LMSCommit() 
** Inputs:	None
** Return:	None
**
** Description:
** Call the LMSCommit function which will be implemented by the LMS, 
** if the LMS is compliant with the SCORM.
**
******************************************************************************************/
function LMSCommit()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
   }
   else
   {
      // call the LMSInitialize function that should be implemented by the API
      var emptyString = new String("");
      api.LMSCommit(emptyString);
      var err = ErrorHandler();
   }   

   return;
   
} 

/******************************************************************************************
**
** Function LMSGetLastError() 
** Inputs:	None
** Return:	The error code (integer format) that was set by the last LMS function call
**
** Description:
** Call the LMSGetLastError function which will be implemented by the LMS, 
** if the LMS is compliant with the SCORM.
**
******************************************************************************************/
function LMSGetLastError() 
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
      //since we can't get the error code from the LMS, return a general error
      return _GeneralError;
   }


   return api.LMSGetLastError().toString();
   
} 

/******************************************************************************************
**
** Function LMSGetErrorString(errorCode)
** Inputs:	errorCode - Error Code(integer format)
** Return:	The textual description that corresponds to the input error code 
**
** Description:
** Call the LMSGetErrorString function which will be implemented by the LMS, 
** if the LMS is compliant with the SCORM.
**
******************************************************************************************/
function LMSGetErrorString(errorCode) 
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
   }

   return api.LMSGetErrorString(errorCode).toString();
   
} 

/******************************************************************************************
**
** Function LMSGetDiagnostic(errorCode) 
** Inputs:	errorCode - Error Code(integer format), or null
** Return:	The vendor specific textual description that corresponds to the input error code 
**
** Description:
** Call the LMSGetDiagnostic function which will be implemented by the LMS, 
** if the LMS is compliant with the SCORM.
**
******************************************************************************************/
function LMSGetDiagnostic(errorCode) 
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
   }

   return api.LMSGetDiagnostic(errorCode).toString();
   
} 

/*******************************************************************************
**
** Function LMSIsInitialized() 
** Inputs:	none
** Return:	true if the LMS API is currently initialized, otherwise false 
**
** Description:
** Determines if the LMS API is currently initialized or not.
**
*******************************************************************************/
function LMSIsInitialized()
{
   // there is no direct method for determining if the LMS API is initialized
   // for example an LMSIsInitialized function defined on the API so we'll try
   // a simple LMSGetValue and trap for the LMS Not Initialized Error
   
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
      // no choice but to return false.
      return false;
   }
   else
   {
      var value = api.LMSGetValue("cmi.core.student_name");
      var errCode = api.LMSGetLastError().toString();
      if (errCode == _NotInitialized)
      {
         return false;
      }
      else
      {
         return true;
      }
   }   
}

/******************************************************************************************
** APIWrapper Private function implementations
** Note: This is javascript so there is no way to really prevent someone 
**	   from calling the other methods in this file, but they are really 
**	   intended to be private methods.  Only the methods above
**       are intended to be called directly by the learning 
**       content components.
******************************************************************************************/

/******************************************************************************************
**
** Function ErrorHandler()
** Inputs:	None
** Return:	The current value of the LMS Error Code
**
** Description:
** Determines if an error was encountered by the previous API call
** and if so, displays a message to the user.  If the error code
** has associated text it is displayed.  
**
** Side Effects: Displays an alert window with the appropriate error information
**
******************************************************************************************/
function ErrorHandler() 
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
      return;
   }

   // check for errors caused by or from the LMS
   var errCode = api.LMSGetLastError().toString();
   if (errCode != _NoError)
   {
      // an error was encountered so display the error description
      var errDescription = api.LMSGetErrorString(errCode);
      
      if (_Debug == true)
      {
         errDescription += "\n";
         errDescription += api.LMSGetDiagnostic(null);
         // by passing null to LMSGetDiagnostic, we get any available diagnostics
         // on the previous error.
      }

      alert(errDescription);
   }

   return errCode;
}

/******************************************************************************************
**
** Function getAPIHandle()
** Inputs:	None
** Return:	value contained by APIHandle
**
** Description:
** Returns the handle to API object if it was previously set, 
** otherwise it returns null
**
******************************************************************************************/
function getAPIHandle() 
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   } 

   return apiHandle;
}


/******************************************************************************************
**
** Function findAPI(win)
** Inputs:	win - a Window Object
** Return:	If an API object is found, it is returned, otherwise null is returned.
**
** Description:
** This function looks for an object named API in the supported window hierarchy, 
** 
******************************************************************************************/
var findAPITries;

function findAPI(win)
{
	// Check to see if the window (win) contains the API
	// if the window (win) does not contain the API and
	// the window (win) has a parent window and the parent window  
	// is not the same as the window (win)
	while ( (win.API == null) && (win.parent != null) && (win.parent != win) )
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


/******************************************************************************************
**
** Function getAPI()
** Inputs:	none
** Return:	If an API object is found, it is returned, otherwise null is returned.
**
** Description:
** This function looks for an object named API, first in the current window's hierarchy, 
**  and then, if necessary, in the current window's opener window hierarchy (if there is
**  an opener window).
******************************************************************************************/
	
function getAPI()
{
	// start by looking for the API in the current window
	var theAPI = findAPI(window);

	// if the API is null (could not be found in the current window)
	// and the current window has an opener window
	if ( (theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined") )
	{
		// try to find the API in the current window's opener
		theAPI = findAPI(window.opener);
	}
	
	// if the API has not been found
	if (theAPI == null)
	{
		// Alert the user that the API Adapter could not be found
		alert("Unable to find an API adapter - this is normal if viewing this course outside an LMS");
	}
	return theAPI;
}