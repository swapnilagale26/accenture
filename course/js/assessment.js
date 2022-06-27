function init()
{
	parent.disableNext();
	parent.disableBack();
	parent.disablettBtn();

	$("#question").animate({'opacity':'1','margin-left':'70px'},500);
	$("#icon").animate({'opacity':'1','margin-left':'22px'},500);
	window.setTimeout(function()
	{
		$("#options").fadeIn(500);
		$("#instruction").animate({'opacity':'1','margin-left':'70px'},500);
		$("#submit").fadeIn(500);
	},500);
}

function select(id)
{
if(lock==0)
{
	if(multiple==true)
	{
		
		temp="#options div#c" + id + " div div"
		$(temp).toggleClass("selected");
		$("#options div#c" + id).toggleClass("disablediv");
		if($(temp).hasClass("selected"))
		{
			clickflag[id-1]=1;
		}
		else
		{
			clickflag[id-1]=0;
		}
		
	}
	else
	{
		for(i=0;i<option;i++)
		{
			temp="#options div#c" + (i+1) + " div div"
			$(temp).removeClass("selected");
			$("#options div#c" + (i+1)).removeClass("disablediv");
			clickflag[i]=0;
		}
		clickflag[id-1]=1;
		temp="#options div#c" + id + " div div"
		$(temp).addClass("selected");
		$("#options div#c" + id).addClass("disablediv");
		
	}
	$("#submit").removeClass("enablebutton");
	submit=0;
	for(i=0;i<option;i++)
	{
		if(clickflag[i]==1)
		{
			$("#submit").addClass("enablebutton");
			submit=1;
		}	
	}
}
}

function checkAnswer()
{
	if(submit==1)
	{
		lock=1;
		$("#options>div").addClass("cursordefault");
		parent.enableNext();
		temp=true;
		if(multiple==true)
		{
			for(i=0;i<option;i++)
			{
				if(clickflag[i]==1 && correctanswer[i]==0)
				{
					temp=false;
				}
				if(correctanswer[i]==1 && clickflag[i]==0)
				{
					temp=false;
				}
			}
		}
		else
		{
			for(i=0;i<option;i++)
			{
				if(clickflag[i]==1 && correctanswer[i]==0)
				{
					temp=false;
				}
			}
		}
		displayfeedback(temp);
		$("#instruction").css({'display':'none'});
		$("#submit").css({'display':'none'});
		/*$("#feedback").css({'display':'block'});
		$("#feedback").animate({'margin-left':'67px'},500);*/
		$("#feedback").fadeIn(500);
		$("#feedback div").html(s);
		$(".right").css({'opacity':'1'});
	}
}