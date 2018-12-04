'use strict';

let json = {
    title: "Bike Safety Quiz",
    showProgressBar: "bottom",
    showTimerPanel: "top",
    maxTimeToFinishPage: 10,
    maxTimeToFinish: 90,
    firstPageIsStarted: true,
    startSurveyText: "Start Quiz",
    pages: [
        {
            questions: [
                {
                    type: "html",
                    html: "You are about to be tested on Bike Safety Rules. <br/>You have 10 seconds for every page and 60 seconds for the whole survey.<br/>Please click on <b>'Start Quiz'</b> button when you are ready."
                }
            ]
        }, {
            questions: [
                {
                    type: "radiogroup",
                    name: "protectiveGear",
                    title: "Most US States require kids riding a bike to:",
                    choices: [
                        "Wear a bright colored baseball hat",
                        "Wear a well fitted helmet",
                        "Wear bike shoes",
                        "Wear sunglasses",
                        "None of the above"
                    ],
                    correctAnswer: "Wear a well fitted helmet"
                }
            ]
        }, {
            maxTimeToFinish: 15,
            questions: [
                {
                    type: "radiogroup",
                    name: "Passing",
                    title: "Passing a pedestrian or a slower moving bike:",
                    choicesOrder: "random",
                    choices: [                    
                        "Pass to their left after saying that you are passing", 
                        "Tell them to go faster",
                        "Pass to their right after saying that you are passing"
                    ],
                    correctAnswer: "Pass to their left after saying that you are passing"
                }
            ]
        }, {
            maxTimeToFinish: 15,
            questions: [
                {
                    type: "radiogroup",
                    name: "Intersection Rules",
                    title: "Approaching an intersection with a 4-way stop sign:",
                    choicesOrder: "random",
                    choices: [
                        "Speed up to cross the intersection to beat the other traffic",
                        "Slow down to check other traffic then speed up through the intersection",
                        "Break to a complete stop at the intersection and proceed with caution if no other traffic crossing"
                    ],                         
                    correctAnswer: "Break to a complete stop at the intersection and proceed with caution if no other traffic crossing"
                }
            ]
        }, {
            maxTimeToFinish: 10,
            questions: [
                {
                    type: "radiogroup",
                    name: "Parked Car",
                    title: "Dooring Incident: Passing a parked car on a 2-way busy road:",
                    choicesOrder: "random",
                    choices: [
                        "Pass close to the parked car to avoid the traffic in opposite direction",
                        "Pass in the middle of your lane after looking behind you for passing cars"
                    ],                         
                    correctAnswer: "Pass in the middle of your lane after looking behind you for passing cars"
                }
            ]
        }, {
            maxTimeToFinish: 10,
            questions: [
                {
                    type: "radiogroup",
                    name: "Windy Conditions",
                    title: "Riding on a busy road with moving cars and a sidewalk in windy and rainy conditions:",
                    choicesOrder: "random",
                    choices: [
                        "Ride with caution next to the sidewalk",
                        "Ride on the sidewalk to avoid the moving cars",
                        "Walk your bike on the sidewalk"
                    ],                         
                    correctAnswer: "Walk your bike on the sidewalk"
                }
            ]
        }, {
            maxTimeToFinish: 10,
            questions: [
                {
                    type: "radiogroup",
                    name: "Stop Sign",
                    title: "What does this sign indicate: ![stopSign](../images/stop.png)",
                    choicesOrder: "random",
                    choices: [
                        "Turn Right",
                        "Turn Left",
                        "Stopping"
                    ],                         
                    correctAnswer: "Stopping"
                }
            ]
        }, {
            maxTimeToFinish: 10,
            questions: [
                {
                    type: "radiogroup",
                    name: "Turning Right Sign",
                    title: "What does this sign indicate: ![rightSign](../images/right.png)",
                    choicesOrder: "random",
                    choices: [
                        "Turn Right",
                        "Turn Left",
                        "Stopping"
                    ],                         
                    correctAnswer: "Turn Right"
                }
            ]
        }, {
            maxTimeToFinish: 10,
            questions: [
                {
                    type: "radiogroup",
                    name: "Turning Left Sign",
                    title: "What does this sign indicate: ![leftSign](../images/left.png)",
                    choicesOrder: "random",
                    choices: [
                        "Turn Right",
                        "Turn Left",
                        "Stopping"
                    ],                         
                    correctAnswer: "Turn Left"
                }
            ]
        }
    ],
    completedHtml: "<h4>You have answered correctly <b>{correctedAnswers}</b> out of <b>{questionCount}</b> questions.</h4>"
};



window.survey = new Survey.Model(json);

//Create showdown mardown converter
let converter = new showdown.Converter();
survey
    .onTextMarkdown
    .add(function (survey, options) {
        //convert the mardown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
    });


// survey
//     .onComplete
//     .add(function (result) {
//         document
//             .querySelector('#surveyResult')
//             .innerHTML = "result: " + JSON.stringify(result.data);
//     });

$("#surveyElement").Survey({model: survey});