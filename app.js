let date = new Date();
let year = date.getFullYear();

const calenderShell = document.createElement('div');
const calenderHeading = document.createElement('h1');
const calenderHeader = document.createElement('div');
const calenderYear = document.createElement('div');
const daysHeadingsGridContainer = document.createElement('div');
const daysBodyGridContainer = document.createElement('div');
const calenderBackButtonSpan = document.createElement('span');

const calenderYearDisplay = document.createElement('label');

let month = getMonths();

var daysInCalendarSelection;
let monthIndex;

var d;
var monthArray;

window.addEventListener('DOMContentLoaded', init)

function init() {
    document.title = "Javascript Calendar"
    
    calenderShell.classList.add("calenderShell");
    document.body.appendChild(calenderShell);

    calenderHeading.innerText = `${new Date().getUTCDate()} ${month} ${year}`;
    calenderShell.appendChild(calenderHeading);
    
    calenderHeader.classList.add("calender-top")
    calenderShell.appendChild(calenderHeader);

    monthIndex = getMonthIndex();

    daysInCalendarSelection = daysInMonth(monthIndex, year)

    createYearMonthHeader();
    buildDayHeadingGrid();
    buildDaysBody(daysInCalendarSelection);
}

function buildDayHeadingGrid() {
    for (i = 1; i <= 7; i++){
        const day = document.createElement(`days-div-${i}`);
        day.id = `days-div-${i}`;
        daysHeadingsGridContainer.appendChild(day);
    }
    daysHeadingsGridContainer.classList.add("days-grid-container");
    calenderShell.appendChild(daysHeadingsGridContainer);

    buildDaysHeadings();
}

function buildDaysBody(daysInCalendarSelection){
    daysBodyGridContainer.innerHTML = "";
    monthIndex = getMonthIndex(month);
    daysBodyGridContainer.classList.add("days-body-grid-container");

    let rowIndex = 1;
    dayCount = 1;

    var firstDay = new Date(year, monthIndex, 1).getDay();

    for (i = 1; i <= daysInCalendarSelection; i++){
        calenderShell.appendChild(daysBodyGridContainer);
        dayBtnMaker(`days-body-${i}`, i, dayCount, rowIndex, firstDay, getSelectedDayDetails);

        if (dayCount === (7 - firstDay)){
            firstDay = 0;
            dayCount = 0
            rowIndex++;
        }

        dayCount++;
    }
}

function getSelectedDayDetails(index) {
    calenderHeading.innerText = `${index} ${month} ${year}`
}

function createYearMonthHeader(){
    btnMaker('year-back-button', '<<', yearBackButtonPressed, 'calender-year-back-button');

    btnMaker('back-button', '<', monthBackButtonPressed, 'calender-back-button');

    lblMaker(calenderHeader, "year", year, "calender-years");
    lblMaker(calenderHeader, "month", month, "calender-months");

    btnMaker('month-forward-button', '>', monthForwardButtonPressed, 'calender-forward-button');
    btnMaker('year-forward-button', '>>', yearForwardButtonPressed, 'calender-year-forward-button');
}

function buildDaysHeadings() {
    document.getElementById("days-div-1").textContent = "Sun";
    document.getElementById("days-div-2").textContent = "Mon";
    document.getElementById("days-div-3").textContent = "Tue";
    document.getElementById("days-div-4").textContent = "Wed";
    document.getElementById("days-div-5").textContent = "Thu";
    document.getElementById("days-div-6").textContent = "Fri";
    document.getElementById("days-div-7").textContent = "Sat";
    
}

function getMonths() {
    d = new Date();
    monthArray = new Array();
    monthArray[0] = "January";
    monthArray[1] = "February";
    monthArray[2] = "March";
    monthArray[3] = "April";
    monthArray[4] = "May";
    monthArray[5] = "June";
    monthArray[6] = "July";
    monthArray[7] = "August";
    monthArray[8] = "September";
    monthArray[9] = "October";
    monthArray[10] = "November";
    monthArray[11] = "December";
    var n = monthArray[d.getMonth()];

    return n;
}

function getMonthIndex(month) {
    return monthArray.findIndex(x => x === month);
}

function daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
} 

function yearBackButtonPressed() {
    monthIndex = getMonthIndex(month) + 1;
    year--;

    daysInCalendarSelection = daysInMonth(monthIndex, year);

    document.getElementById("year").value = year;
    document.getElementById("year").textContent = year;

    buildDaysBody(daysInCalendarSelection)
}

function yearForwardButtonPressed() {
    monthIndex = getMonthIndex(month) + 1;
    year = year + 1;

    daysInCalendarSelection = daysInMonth(monthIndex, year);

    document.getElementById("year").value = year;
    document.getElementById("year").textContent = year;

    buildDaysBody(daysInCalendarSelection)
}

function monthBackButtonPressed() {
    
    if (monthIndex === 0) {
        month = monthArray[11];
    } else {
        month = monthArray[monthIndex - 1];
        monthIndex - 1;
    }
    
    if (month === "December"){
        yearBackButtonPressed();
        monthIndex = 12;
    }

    daysInCalendarSelection = daysInMonth(monthIndex, year);

    document.getElementById("month").value = month;
    document.getElementById("month").textContent = month;

    buildDaysBody(daysInCalendarSelection)
}

function monthForwardButtonPressed() {
    monthIndex = getMonthIndex(month);

    if (monthIndex === 11) {
        month = monthArray[0];
    } else {
        month = monthArray[monthIndex + 1];
        if (monthIndex == 0){
            monthIndex = 2;
        } else {
            // I have to add 2 here because my calender month starts from index 0, Date class months starts from 1 so 
            monthIndex = monthIndex + 2;
        }
        
    }
    
    if (month === "January"){
        yearForwardButtonPressed();
    }

    daysInCalendarSelection = daysInMonth(monthIndex, year);

    document.getElementById("month").value = month;
    document.getElementById("month").textContent = month;

    buildDaysBody(daysInCalendarSelection)
}

function lblMaker(HtmlElementToAppendTo, id, value, cssClass) {
    const label = document.createElement('label');
    label.id = id;
    label.classList.add(cssClass);
    label.textContent = value;
    HtmlElementToAppendTo.appendChild(label);
}

function btnMaker(id, value, myFunction, cssClass) {
    const button = document.createElement('button');
    button.id = id;
    button.setAttribute('type','button');
    button.classList.add(cssClass);
    button.val = value;
    button.textContent = value;
    button.addEventListener('click', myFunction)
    calenderHeader.appendChild(button);
}

function dayBtnMaker(id, value, columnIndex, rowIndex, offset, buttonFunction) {    
    button = document.createElement('button');
    button.setAttribute('type','button');
    button.id = id;
    button.style.cssText = `grid-row: ${rowIndex}; grid-column: ${columnIndex + offset}; `;
    button.classList.add('days-buttons')
    button.val = value;
    button.textContent = value;
    button.addEventListener('click', function(){
        buttonFunction(value)});
    daysBodyGridContainer.appendChild(button);
}