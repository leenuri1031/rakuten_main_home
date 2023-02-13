 //**********************************************************************
//* フ?イル名： calendar.js
//* 説明： カレン??の出力JavaScript
//*????calendarから呼び出される関数：getCalendarList（該当するカレン??情報）
//*、	? isHoliday（祝日かどうかを判別する）、setStyle(該当するス?イルを設定する)
//* Copyright(c)2009年2月13日
//*
//* 作成者： 崔宙瑚
//**********************************************************************

 SUNDAY = 0;?//日曜日
 MONDAY = 1;?//月曜日
 SATURDAY = 6;?//土曜日
 MONTH_MAX = 12; //12月
 DAY_MAX_ARRAY = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //末日
 FEBRUARY  = 1; //2月
 LEAF_YEAR_100 = 100; //100年
 LEAF_YEAR_400 = 400; //400年
 LEAF_YEAR_INTERVAL = 4; //4年
 WEEKDAYS  = 7; //1週間
 HOLIDAYS_ARRAY = [["1","A"],["11"],["B"],["29"],["3","4","5"],[],["C"],[],["C","23"],["A"],["3","23"],["23","30","31"]]; //祝日
 HOLIDAY_STYLE = 0; //祝日
 WEEKDAY_STYLE = 1; //平日
 SUNDAY_STYLE = 2; //日曜日
 SATURDAY_STYLE = 3; //土曜日
 OTHER_MONTH_STYLE = 4; //?示する月ではない
 TODAY_STYLE = 5; //今日
 
//**********************************************************************
//* 関数名：getCalendarList
//* 引数：yyyy, mm 
//* 説明：年と月を入力されると当月のDateObjectを配列?式に返却する
//*		?例）入力(2008,5)：2008年5月
//*           出力：2008年5月1日?31日までのデ??Object配列
//**********************************************************************
	function getCalendarList(yyyy, mm) {
		var _year = yyyy;
		var _mm = mm - 1;
		var calendarArray = new Array();
		//入力日付の1日
		var inputStartDt = new Date(_year, _mm, 1);
		var startDt;
		//入力されたデ??の曜日を取得
	 	var yobi = inputStartDt.getDay();
	 	//入力されたデ??の月の1日が日曜日ではない場合
	 	if (yobi != SUNDAY) {
	 		var zenGetuMaxDay = 0;
	 		//1月の場合は12月の末日を求める
	 		if (0 == inputStartDt.getMonth()) {
				zenGetuMaxDay = _getEndDay(_year - 1, MONTH_MAX - 1);
				startDt = new Date(_year - 1, MONTH_MAX - 1, zenGetuMaxDay - yobi + 1);
			}
			//1月の以外は1ヶ月前の末日を求める
			if (0 != inputStartDt.getMonth()) {		
				zenGetuMaxDay = _getEndDay(inputStartDt.getYear(), inputStartDt.getMonth() - 1);
				startDt = new Date(_year, inputStartDt.getMonth() - 1, zenGetuMaxDay - yobi + 1);		
			}
			for (var i = startDt.getDate(); i <= zenGetuMaxDay; i++) {
				var tempDate = new Date(_year, _mm - 1, i);
				calendarArray.push(tempDate);
			}
	 	}
	 	//当月
		var touGetuMaxDay = _getEndDay(inputStartDt.getYear(), inputStartDt.getMonth());
		for (var i = inputStartDt.getDate(); i <= touGetuMaxDay; i++) {
			calendarArray.push(new Date(_year, _mm, i));
		}
		//次月		
		_mm = _mm + 1;
		if (_mm == 12) {
			_year++;
			_mm = 0;
		}
		var nextMonthStartDt = new Date(_year, _mm, 1);
		var nextMonthDay = nextMonthStartDt.getDay();
		if (SUNDAY != nextMonthDay) {
			for (var i = 1;; i++) {
				var tempDate = new Date( nextMonthStartDt.getYear(), nextMonthStartDt.getMonth(), i);
				if (tempDate.getDay() == SUNDAY) break;	
				calendarArray.push(tempDate);
			}
		}
		return calendarArray;
	 }
//**********************************************************************
//* 関数名：_getEndDay
//* 引数：year, month 
//* 説明：月末日を返却する
//*		?例）入力：2008,0=>2008年1月、2008,1=>2008年2月
//*           出力：2008年1月の末日=>31を返却する
//**********************************************************************	  
	 function _getEndDay(year, month) {
		
		var endDay = DAY_MAX_ARRAY[month];
		
		if (month == FEBRUARY) {
			if (year % LEAF_YEAR_400 == 0) endDay++;
			else if (year % LEAF_YEAR_INTERVAL == 0 && year % LEAF_YEAR_100 != 0) endDay++;
		}
		return endDay;
	}
//**********************************************************************
//* 関数名：isHoliday
//* 引数：date
//* 説明：該当する日付が祝日かどうかを判断する
//**********************************************************************
	function isHoliday(date) {
		if (date.getDay() == SUNDAY) return false;
			var holidays = _getBusinessHolidays(date.getYear(), date.getMonth() + 1);
		for (var i in holidays) {
			var holiday = holidays[i];		
			if(date.getDate() == holiday.getDate()) {
				return true;
			}
		}
		return false;
	}
	
//**********************************************************************
//* 関数名：_getBusinessHolidays
//* 引数：yyyy, mm 
//* 説明：該当する年月の祝日を返却する
//**********************************************************************
	function _getBusinessHolidays(yyyy, mm) {
	
		var holidays = HOLIDAYS_ARRAY[mm - 1];
		var realHoliDays = _getRealHoliDays(yyyy, mm, holidays);
		_calculateAlternateDay(realHoliDays);
		return realHoliDays;
	}

//**********************************************************************
//* 関数名：_getRealHoliDays
//* 引数：yyyy, mm ,holidays
//* 説明：該当する年月の祝日をデ??Objectを求める
//**********************************************************************	
	function _getRealHoliDays(yyyy, mm, holidays) {
		var realHoliDays = new Array();
		for (var i in holidays) {
			var holiday = holidays[i];
			//パ?ン?A：該当する月の2週目の月曜日が祝日
			if ("A" == holiday) {
				realHoliDays.push(getSiteiWeekDay(yyyy, mm, 2, MONDAY));
			//パ?ン?B：春分
			} else if ("B" == holiday) {
				realHoliDays.push(new Date(yyyy, mm - 1, _getSpringDay(yyyy)));
			//パ?ン?C：該当する月の3週目の月曜日が祝日		
			} else if ("C" == holiday) {
				realHoliDays.push(getSiteiWeekDay(yyyy, mm, 3, MONDAY));
			//該当する日が祝日
			} else {
				realHoliDays.push(new Date(yyyy, mm - 1, holiday));
			}
		}
		//9月の場合敬老の日と秋分が飛び石連休の場合三連休になる
		if (mm == 9) {
			if ((realHoliDays[1].getDate() - realHoliDays[0].getDate()) == 2) {
				realHoliDays.push(new Date(yyyy, mm - 1, realHoliDays[0].getDate() + 1));
			}
		}
		return realHoliDays;
	}
	
//**********************************************************************
//* 関数名：_calculateAlternateDays
//* 引数：realHoliDays
//* 説明：振替休日を求める
//**********************************************************************
	function _calculateAlternateDay(realHoliDays) {
		for (var i = 0; i < realHoliDays.length; i++) {
 			var date = realHoliDays[i];
 			//祝日が日曜日の場合次の平日が休みになる
 			if (SUNDAY == date.getDay()) {
 				var alternateDay = date.getDate() + 1;
				for (var j = i + 1; j < realHoliDays.length; j++) {
					var holiDay = realHoliDays[j];
					if (holiDay.getDate() == alternateDay) {
						alternateDay++;
					}
				}
				realHoliDays.push(new Date(date.getYear(), date.getMonth(), alternateDay));
 			}
		}
	}

//**********************************************************************
//* 関数名：_getBusinessHolidays
//* 引数：yyyy, mm, num, yobi
//* 説明：該当する年月のnumだけ経過した曜日のデ??Objectを求める
//*		?例）入力(2008,5,3,0)：2008年5月の3週目の日曜日
//*           出力：20080518のデ??Object==>new Date(2008,5,18)
//**********************************************************************	
	function getSiteiWeekDay(yyyy, mm, num, yobi) {	
		var firstDay = new Date(yyyy, mm - 1, 1);
		var firstDayYobi = firstDay.getDay();
		var addWeekDays = 0;		
		if (yobi < firstDayYobi) {
			addWeekDays = WEEKDAYS;
		}			
		var purPoseDay = (WEEKDAYS * (num - 1)) + (yobi + addWeekDays - firstDayYobi) + 1;		
		return new Date(yyyy, mm - 1, purPoseDay);
	}
//**********************************************************************
//* 関数名：_getSpringDay
//* 引数：yyyy
//* 説明：該当する年の春分の日を取得する
//**********************************************************************	
	function _getSpringDay(yyyy) {
		
		var str_yyyy = new String(yyyy);
	    var num1 = str_yyyy.substring(2,3);
	    var num2 = str_yyyy.substring(3,4);	  
	    var day;  
		if (num1 % 2 == 0) {	
			switch (num2) {
			case "0":
			case "1":
			case "4":
			case "5":
			case "8":
			case "9":
			 	day = 20;
			 	break;
			case "2":
			case "3":
			case "6":
			case "7": 
				day = 21;
			 	break;
			}								
		} else {			
			switch (num2) {
			case "0":
			case "1":
			case "4":
			case "5":
			case "8":
			case "9":			
			 	day = 21;
			 	break;
			case "2":
			case "3":
			case "6":
			case "7":		 
				day = 20;
			 	break;
			}	 
		}	
		return day;
	}
//**********************************************************************
//* 関数名：setStyle
//* 引数：object, num(HOLIDAY = 0,WEEKDAY = 1,SUNDAY = 2,SATURDAY = 3,OTHER_MONTH = 4)
//* 説明：ス?イルを指定する
//**********************************************************************		 
	function setStyle(object, num) {
		switch (num) {
			case HOLIDAY_STYLE:
				object.style.backgroundColor = "white";
				object.style.color = "#830000";
				object.style.height = "12pt";
				object.style.textAlign = "center";
				object.style.cursor = "default";
				object.style.fontSize = "8pt";
				break;
			case WEEKDAY_STYLE:
				object.style.backgroundColor = "white";
				object.style.color = "#ffffff";
				object.style.height = "12pt";
				object.style.textAlign = "center";
				object.style.cursor = "default";
				object.style.fontSize = "8pt";
				break;
			case SUNDAY_STYLE:
				object.style.backgroundColor = "white";
				object.style.color = "#830000";
				object.style.height = "12pt";
				object.style.textAlign = "center";
				object.style.cursor = "default";	
				object.style.fontSize = "8pt";			
				break;			
			case SATURDAY_STYLE:
				object.style.backgroundColor = "white";
				object.style.color = "#001677";
				object.style.height = "12pt";
				object.style.textAlign = "center";
				object.style.cursor = "default";		
				object.style.fontSize = "8pt";		
				break;			
			case OTHER_MONTH_STYLE:
				object.style.backgroundColor = "white";
				object.style.color = "#666666";
				object.style.height = "12pt";
				object.style.textAlign = "center";
				object.style.cursor = "default";	
				object.style.fontSize = "8pt";			
				break;	
			case TODAY_STYLE:
				object.style.backgroundColor = "#52321d";
				object.style.color = "#ffffff";
				object.style.height = "12pt";
				object.style.textAlign = "center";
				object.style.cursor = "pointer";
				object.style.fontSize = "8pt";
				break;		
		}		
		
	 }	