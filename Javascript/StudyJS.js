//I put everything in a try block because Chromebooks won't allow me to use inspect tool to hunt down errors >:(
try {
function MakeInactive(Button) {
	Button.onclick = null
	Button.style.opacity = 0
	Button.innerHTML = ""
}

function MakeActive(NewFuction, NewParameter,  Text, Title, ID) {
    Button = document.createElement("BUTTON")
	Button.onclick = function() {
		NewFuction(NewParameter)
	}
	Button.style.opacity = 1
	Button.innerHTML = Text
	Button.title = Title
    Button.id = ID
    workplace.appendChild(Button)
}

function TextCreateor(type, text) {
	var h = document.createElement(type);
    var t = document.createTextNode(text);
    h.append(t);
    return h;
}

//Todo, GET A RID OF THIS GOD FORSAKEN SYSTEM. IT'S SO BAD THIS TRASH CODE. I WILL BECOME BACK MY CERTIFICATION. I HOPE MY NEXT TIME IS A COW, ON A TRASH FARM IDIOT.

var AnswerList;
var QuestionList;
var AnswerListCopy; 
var QuestionListCopy;
var ChoosenQuestion;
var QuestionOrAnswers = 0
var workplace = document.getElementById("Workplace")


//Step 1: User must upload a question list to the website
document.getElementById("fileInput").addEventListener('change', function(event) {
	var file = event.target.files[0]
	var reader = new FileReader()
	reader.onload = function(e) {
		var fileContent = e.target.result
		ExtractListsFormFile(fileContent)
	}
	reader.readAsText(file)
})

//Step 2: Program displays the lists out and waits for the user to press the begin button
function ExtractListsFormFile(file) {
	console.log(file)
	file = file.replace("QuestionList =", "")
	file = file.replace("AnswerList =", "")
	console.log(file)
	var SplitList  = file.split("], ")
	QuestionList  = `${SplitList[0]}]`
	AnswerList = SplitList[1]
	AnswerList = JSON.parse(AnswerList)
	QuestionList = JSON.parse(QuestionList)
	Clear()
	SetUp("MainMenu")
}
//Step 3: Remove WorkPlace after upload
function Clear() {
	while (workplace.hasChildNodes()) {
		workplace.removeChild(workplace.firstChild);
	}
}


    
function ChangeQuestionList() {
    QuestionOrAnswers++
	switch(QuestionOrAnswers) {
	case 1:
		document.getElementById('Man').innerHTML = "QuestionList eqauls =  Answers then Questions"
		break;
	case 2:
		document.getElementById('Man').innerHTML = "QuestionList eqauls =  Questions then Answers and Questions then Answers"
		break;
	case 3:
		QuestionOrAnswers = 0
		document.getElementById('Man').innerHTML = "QuestionList eqauls =  Questions then Answers"
		break;
	}
}
    
function QuestionListAndAnswerListCreator(LoadType) {
    if (LoadType == 0) {
        QuestionListCopy = [...QuestionList]
        AnswerListCopy = [...AnswerList]
    }
    else if (LoadType == 1) {
        QuestionListCopy = [...AnswerList]
        AnswerListCopy = [...QuestionList]
    }
    else {
        QuestionListCopy = [...QuestionList, ...AnswerList]
        AnswerListCopy = [...AnswerList, ...QuestionList]
    }
}
function SetUp(Mode) {
	switch(Mode) {
		case "MainMenu":
            Clear()
			workplace.appendChild(TextCreateor("h2", "Choose Mode"))
			MakeActive(StartFlashCards, null, "Flashcards", ":3", null)
			MakeActive(ChangeQuestionList, null, `QuestionList eqauls =  Questions then answers`, "Changes the order of what will be presented to you. Picking Questions and Answers will double the length of the flashcards", "Man")
			break; 
        case "ShowActiveList":
            var ActiveList = document.createElement("p")
			ActiveList.innerHTML = `Flashcards remaining: ${QuestionListCopy.length} <br> <br> List of Flashcard Questions: <br> ${QuestionListCopy}`
			workplace.appendChild(ActiveList)
        break;
        //FlashCards
		case "FlashCards":
            Clear()
			workplace.appendChild(TextCreateor("h2", QuestionListCopy[ChoosenQuestion]))
			MakeActive(FlashCardShow, null, "Show Answer", "click this button to show the question's answer", null)
			break;
		case "AnswerFlashCard":
            y = workplace.getElementsByTagName("button")
            Array.from(y).forEach(button => button.remove());
            MakeActive(SetUp, "FlashCards", "Hide Answer", "Hides the answer form view")
            workplace.appendChild(TextCreateor("h2", AnswerListCopy[ChoosenQuestion]))
			MakeActive(FlashCardRemove, null, "I understand this flashcard", "Gives a new question and removes the current question out of the active list", null)
            MakeActive(NewFlashCard, null, "I still need more pracitce with this flashcard", "Gives a new question, but doesn't remove the current question out of the", null)
            SetUp("ShowActiveList")
			break;
        case "CompletedFlashCards":
            workplace.appendChild(TextCreateor("h2", "You have completed the flashcards!"))
            MakeActive(SetUp, "MainMenu", "Return to main menu", "Returns you back to the main menu to select a new gamemode", null)
	}
}


//GameModeIndex

//GameMode - 01- FlashCards

function StartFlashCards() {
	console.log("StartFlashCards ---")
    QuestionListAndAnswerListCreator(QuestionOrAnswers)
	Clear()
//    document.getElementById('DeBugHeader').innerHTML = QuestionListCopy
	NewFlashCard()
}

function FlashCardShow() {
    console.log("FlashCardShow ---")
    console.log(AnswerListCopy[ChoosenQuestion])
    SetUp("AnswerFlashCard")
}

function FlashCardRemove() {
    console.log("FlashCardRemvoe ---")
    Answer = AnswerListCopy[ChoosenQuestion]
    console.log(Answer)
    AnswerListCopy.splice(ChoosenQuestion, 1)
    console.log(AnswerListCopy)
    Question = QuestionListCopy[ChoosenQuestion]
    console.log(Question)
    QuestionListCopy.splice(ChoosenQuestion, 1) 
    console.log(QuestionListCopy)
//    document.getElementById('DeBugHeader').innerHTML = QuestionListCopy
    NewFlashCard()
}

function NewFlashCard() {
    console.log("NewFlashCard ---")
	Clear()
    	if (QuestionListCopy.length == 0) {
		SetUp("CompletedFlashCards")}
	else {
    a = Math.floor(Math.random() * QuestionListCopy.length)
	console.log(a)
	ChoosenQuestion = a 
	SetUp("FlashCards")
}}


} catch(error) {
	alert(`Fatal error: ${error.message}`)
}