function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6bhyA9YS4T9":
        Script1();
        break;
      case "6bcUFWvtTfM":
        Script2();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var point1 = player.GetVar("Results.ScorePercent");
var n = point1.toFixed(0);
player.SetVar("Results.ScorePercent", n);
}

function Script2()
{
  var player = GetPlayer();
var student_score = player.GetVar("point1");
var name = player.GetVar("Name5");
parent.score1=student_score;
parent.loadPage(4);

}

