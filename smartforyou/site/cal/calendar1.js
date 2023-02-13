 //**********************************************************************
//* �t?�C�����F calendar.js
//* �����F �J����??�̏o��JavaScript
//*????calendar����Ăяo�����֐��FgetCalendarList�i�Y������J����??���j
//*�A	? isHoliday�i�j�����ǂ����𔻕ʂ���j�AsetStyle(�Y������X?�C����ݒ肷��)
//* Copyright(c)2009�N2��13��
//*
//* �쐬�ҁF ������
//**********************************************************************

 SUNDAY = 0;?//���j��
 MONDAY = 1;?//���j��
 SATURDAY = 6;?//�y�j��
 MONTH_MAX = 12; //12��
 DAY_MAX_ARRAY = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //����
 FEBRUARY  = 1; //2��
 LEAF_YEAR_100 = 100; //100�N
 LEAF_YEAR_400 = 400; //400�N
 LEAF_YEAR_INTERVAL = 4; //4�N
 WEEKDAYS  = 7; //1�T��
 HOLIDAYS_ARRAY = [["1","A"],["11"],["B"],["29"],["3","4","5"],[],["C"],[],["C","23"],["A"],["3","23"],["23","30","31"]]; //�j��
 HOLIDAY_STYLE = 0; //�j��
 WEEKDAY_STYLE = 1; //����
 SUNDAY_STYLE = 2; //���j��
 SATURDAY_STYLE = 3; //�y�j��
 OTHER_MONTH_STYLE = 4; //?�����錎�ł͂Ȃ�
 TODAY_STYLE = 5; //����
 
//**********************************************************************
//* �֐����FgetCalendarList
//* �����Fyyyy, mm 
//* �����F�N�ƌ�����͂����Ɠ�����DateObject��z��?���ɕԋp����
//*		?��j����(2008,5)�F2008�N5��
//*           �o�́F2008�N5��1��?31���܂ł̃f??Object�z��
//**********************************************************************
	function getCalendarList(yyyy, mm) {
		var _year = yyyy;
		var _mm = mm - 1;
		var calendarArray = new Array();
		//���͓��t��1��
		var inputStartDt = new Date(_year, _mm, 1);
		var startDt;
		//���͂��ꂽ�f??�̗j�����擾
	 	var yobi = inputStartDt.getDay();
	 	//���͂��ꂽ�f??�̌���1�������j���ł͂Ȃ��ꍇ
	 	if (yobi != SUNDAY) {
	 		var zenGetuMaxDay = 0;
	 		//1���̏ꍇ��12���̖��������߂�
	 		if (0 == inputStartDt.getMonth()) {
				zenGetuMaxDay = _getEndDay(_year - 1, MONTH_MAX - 1);
				startDt = new Date(_year - 1, MONTH_MAX - 1, zenGetuMaxDay - yobi + 1);
			}
			//1���̈ȊO��1�����O�̖��������߂�
			if (0 != inputStartDt.getMonth()) {		
				zenGetuMaxDay = _getEndDay(inputStartDt.getYear(), inputStartDt.getMonth() - 1);
				startDt = new Date(_year, inputStartDt.getMonth() - 1, zenGetuMaxDay - yobi + 1);		
			}
			for (var i = startDt.getDate(); i <= zenGetuMaxDay; i++) {
				var tempDate = new Date(_year, _mm - 1, i);
				calendarArray.push(tempDate);
			}
	 	}
	 	//����
		var touGetuMaxDay = _getEndDay(inputStartDt.getYear(), inputStartDt.getMonth());
		for (var i = inputStartDt.getDate(); i <= touGetuMaxDay; i++) {
			calendarArray.push(new Date(_year, _mm, i));
		}
		//����		
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
//* �֐����F_getEndDay
//* �����Fyear, month 
//* �����F��������ԋp����
//*		?��j���́F2008,0=>2008�N1���A2008,1=>2008�N2��
//*           �o�́F2008�N1���̖���=>31��ԋp����
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
//* �֐����FisHoliday
//* �����Fdate
//* �����F�Y��������t���j�����ǂ����𔻒f����
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
//* �֐����F_getBusinessHolidays
//* �����Fyyyy, mm 
//* �����F�Y������N���̏j����ԋp����
//**********************************************************************
	function _getBusinessHolidays(yyyy, mm) {
	
		var holidays = HOLIDAYS_ARRAY[mm - 1];
		var realHoliDays = _getRealHoliDays(yyyy, mm, holidays);
		_calculateAlternateDay(realHoliDays);
		return realHoliDays;
	}

//**********************************************************************
//* �֐����F_getRealHoliDays
//* �����Fyyyy, mm ,holidays
//* �����F�Y������N���̏j�����f??Object�����߂�
//**********************************************************************	
	function _getRealHoliDays(yyyy, mm, holidays) {
		var realHoliDays = new Array();
		for (var i in holidays) {
			var holiday = holidays[i];
			//�p?��?A�F�Y�����錎��2�T�ڂ̌��j�����j��
			if ("A" == holiday) {
				realHoliDays.push(getSiteiWeekDay(yyyy, mm, 2, MONDAY));
			//�p?��?B�F�t��
			} else if ("B" == holiday) {
				realHoliDays.push(new Date(yyyy, mm - 1, _getSpringDay(yyyy)));
			//�p?��?C�F�Y�����錎��3�T�ڂ̌��j�����j��		
			} else if ("C" == holiday) {
				realHoliDays.push(getSiteiWeekDay(yyyy, mm, 3, MONDAY));
			//�Y����������j��
			} else {
				realHoliDays.push(new Date(yyyy, mm - 1, holiday));
			}
		}
		//9���̏ꍇ�h�V�̓��ƏH������ѐΘA�x�̏ꍇ�O�A�x�ɂȂ�
		if (mm == 9) {
			if ((realHoliDays[1].getDate() - realHoliDays[0].getDate()) == 2) {
				realHoliDays.push(new Date(yyyy, mm - 1, realHoliDays[0].getDate() + 1));
			}
		}
		return realHoliDays;
	}
	
//**********************************************************************
//* �֐����F_calculateAlternateDays
//* �����FrealHoliDays
//* �����F�U�֋x�������߂�
//**********************************************************************
	function _calculateAlternateDay(realHoliDays) {
		for (var i = 0; i < realHoliDays.length; i++) {
 			var date = realHoliDays[i];
 			//�j�������j���̏ꍇ���̕������x�݂ɂȂ�
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
//* �֐����F_getBusinessHolidays
//* �����Fyyyy, mm, num, yobi
//* �����F�Y������N����num�����o�߂����j���̃f??Object�����߂�
//*		?��j����(2008,5,3,0)�F2008�N5����3�T�ڂ̓��j��
//*           �o�́F20080518�̃f??Object==>new Date(2008,5,18)
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
//* �֐����F_getSpringDay
//* �����Fyyyy
//* �����F�Y������N�̏t���̓����擾����
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
//* �֐����FsetStyle
//* �����Fobject, num(HOLIDAY = 0,WEEKDAY = 1,SUNDAY = 2,SATURDAY = 3,OTHER_MONTH = 4)
//* �����F�X?�C�����w�肷��
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