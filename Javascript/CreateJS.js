function DIE() {
    while(document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
}

function MakeInactive(Button) {
	Button.onclick = null
	Button.style.opacity = 0
	Button.innerHTML = ""
}

function MakeActive(Button, NewFuction, NewParameter,  Text, Title) {
	Button.onclick = function() {
		NewFuction(NewParameter)
	}
	Button.style.opacity = 1
	Button.innerHTML = Text
	Button.title = Title
}

var QuestionList = []
var AnswerList = []
var IndexDico = []

IDgiver = 0

function Create_Question() {
	var Q = (document.getElementById("Question").value)
    var A = (document.getElementById("Answer").value)
    var ToCreateANewListLimit = document.createElement("li")
	ToCreateANewListLimit.id = IDgiver
    ToCreateANewListLimit.appendChild(document.createTextNode(SetUpText(0, Q, A)))
    document.getElementById('Result').appendChild(ToCreateANewListLimit)
    QuestionList.push('"' + Q.toString() + '"')
    AnswerList.push('"' + A.toString() + '"')
	x = document.createElement("BUTTON")
	MakeActive(x, DeleteThis, IDgiver, "Delete", "Delete this term")
	document.getElementById(IDgiver).appendChild(x)
	y = document.createElement("BUTTON")
	MakeActive(y, EditThis, IDgiver, "Edit (DO NOT USE, DOES NOT WORK YET)", "Edit this term")
	document.getElementById(IDgiver).appendChild(y)
    IndexDico.push(IDgiver)
	IDgiver++;
}

function DeleteThis(ID) {
    Question = IndexDico.indexOf(ID)
	document.getElementById(ID).remove()
    QuestionList.splice(Question, 1)
    AnswerList.splice(Question, 1)
    IndexDico.splice(Question, 1)
}

function EditThis(ID) {
	SavedAs = document.getElementById(ID).innerHTML
}


function Download() {
    var DownList = ("QuestionList = [" + QuestionList + "], AnswerList = [" +  AnswerList + "]")
    document.getElementById('NO').innerHTML = DownList
    var DownloadBlob = new Blob([DownList], { type: "application/javascript"} )
    var a = document.createElement("a")
    a.href = URL.createObjectURL(DownloadBlob)
    a.download = "questions.js"
    a.click()
}

function SetUpText(LoadType, Q, A) {
	switch (LoadType) {
		case 0:
			return 	"Question: [" +  Q + "]  Answer: [" +  A + "]"
	} 
}


/* function downloadQuestions() {
    var resultstext = Questions.innerText;
    //What the  is a blob
    var blobtext = new Blob([resultstext], { type: "application/javascript" })
    var urldownloadQuestions = URL.createObjectURL(blobtext);
    var a = document.createElement("a");
    a.href = urldownloadQuestions;
    a.download = "questions.js";
    a.click();
} */