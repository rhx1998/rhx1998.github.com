document.write("<span id = 'clock'></span>");
var nowDate,theDate,theDay,theYear,theMonth,theHour,theMin,theSec,timeValue;
function ShowDateTime(){
	weeks = new Array("日","一","二","三","四","五","六");
	nowDate = new Date();
	theDate = nowDate.getDate();
	theDay = weeks[nowDate.getDay()];
	theYear = nowDate.getYear()+1900;
	theMonth = nowDate.getMonth()+1;
	theHour = nowDate.getHours();
	theMin = nowDate.getMinutes(); if(theMin < 10) theMin = "0" + theMin;
	theSec = nowDate.getSeconds(); if(theSec < 10) theSec = "0" + theSec;
	timeValue = theYear + "年" + theMonth + "月" + theDate + "日" + "星期" + theDay + " " +theHour + ":" + theMin + ":" + theSec;
	clock.innerHTML = timeValue;
	setTimeout("ShowDateTime()", 1000);
}
ShowDateTime();