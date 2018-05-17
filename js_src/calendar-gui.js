var lunarCalendarGui = (function() {

	/**
	 * Hiển thị một tháng bất kỳ.
	 * @param mm Tháng
	 * @param yy Năm
	 */
	function printMonth(mm, yy) {
		// Lấy ra danh sách các ngày âm lịch của tháng
		var dayList = CalendarCore.getMonth(mm, yy);
		if (dayList.length == 0) {
			return;
		}

		/*
		dayList.forEach((e) => {
			console.log(JSON.stringify(e));
		});*/

		// Ngày đầu tiên
		var ld1 = dayList[0];

		// Số các ô trống phía đầu
		var emptyCells = (ld1.jd + 1) % 7;
		
		// Hiển thị tháng năm và các nút PREV và NEXT
		var res = '<table class="thang-header">\n';
		res += "<thead>\n";
		res += ('<tr><th class="navi navi-l">' + getPrevMonthLink(mm, yy) + '</th>\n');
		res += ('<th colspan="5" class="tenthang">' + CalendarCore.MONTH_NAMES[mm] + '<span class="nam">' + yy + '</span></th>\n');
		res += ('<th class="navi navi-r">' + getNextMonthLink(mm, yy) + '</th></tr>\n');
		res += '</thead>\n';
		res += '</table>\n';

		// Hiển thị các ngày trong tuần
		res += ('<table class="thang">\n');
		res += ('<tbody>\n');
		res += ('<tr>\n');
		for (var j = 0; j < 7; j++) {
			res += ('<td class=ngaytuan>' + CalendarCore.DAYNAMES[j] + '</td>\n');
		}
		res += ('<\/tr>\n');
		
		// Hiển thị lần lượt các ngày trong tháng
		// Một tháng có thể có nhiều nhất 6 tuần
		for (var i = 0; i < 6; i++) {
			res += ("<tr>\n");
			for (var j = 0; j < 7; j++) {
				var k = 7 * i + j;

				// Nếu là thuộc tháng trước hoặc tháng sau rồi
				if (k < emptyCells || k >= emptyCells + dayList.length) {
					res += printEmptyCell();
				} else {
					// Ngày trong tháng
					var date = k - emptyCells + 1;
					res += printCell(dayList[k - emptyCells], date, mm, yy);
				}
			}
			res += "</tr>\n";
		}
		res += '</tbody>\n';
		res += '</table>\n';
		return res;
	}

	/**
	 * Hiển thị link chuyển về tháng trước.
	 * @param mm Tháng hiện tại
	 * @param yy Năm hiện tại
	 */
	function getPrevMonthLink(mm, yy) {
		return "";

		var mm1 = mm > 1 ? mm - 1 : 12;
		var yy1 = mm > 1 ? yy : yy - 1;
		return '<a href="" onclick="gotoMonth(' + yy1 + ', ' + mm1 + '); return false;">'
				+ '&#10094;</a>'; //<span class="fa fa-chevron-left"></span>
	}

	/**
	 * Hiển thị link chuyển sang tháng sau.
	 * @param mm Tháng hiện tại
	 * @param yy Năm hiện tại
	 */
	function getNextMonthLink(mm, yy) {
		return "";

		var mm1 = mm < 12 ? mm + 1 : 1;
		var yy1 = mm < 12 ? yy : yy + 1;
		return '<a href="#" onclick="gotoMonth(' + yy1 + ', ' + mm1 + '); return false;">'
				+ '&#10095;</a>'; // <span class="fa fa-chevron-right"></span>
	}

	/**
	 * Hiển thị cell trống.
	 */
	function printEmptyCell() {
		return '<td>&nbsp;</td>\n';
	}

	/**
	 * Hiển thị cell bình thường.
	 * @param lunarDate Đối tượng ngày âm lịch
	 * @param solarDate Ngày dương lịch
	 * @param solarMonth Tháng dương lịch
	 * @param solarYear Năm dương lịch
	 */
	function printCell(lunarDate, solarDate, solarMonth, solarYear) {
		// Class CSS mặc định chung của cả cell
		var cellClass = "ngaythang";

		// Ngày hôm nay
		var today = new Date();
		if (solarDate == today.getDate()
				&& solarMonth == today.getMonth() + 1
				&& solarYear == today.getFullYear()) {
			cellClass += " homnay";
		}

		// Kiểm tra xem ngày đó có sự kiện gì hay không
		var event = "";
		data.forEach(function(e) {
			var hasEvent = false;
			if (e.isLunar) {
				if (e.isAnnual) {
					if (lunarDate.day == e.dateOfMonth && lunarDate.month == e.month) {
						hasEvent = true;
					}
				} else {
					if (lunarDate.day == e.dateOfMonth && lunarDate.month == e.month && lunarDate.year == e.year) {
						hasEvent = true;
					}
				}
			} else {
				if (e.isAnnual) {
					if (solarDate == e.dateOfMonth && solarMonth == e.month) {
						hasEvent = true;
					}
				} else {
					if (solarDate == e.dateOfMonth && solarMonth == e.month && solarYear == e.year) {
						hasEvent = true;
					}
				}
			}

			if (hasEvent) {
				cellClass += " event";
				event = e.note;
			}
		});
		
		// Highlight thứ Bảy và CN
		// Class của ngày dương
		var solarClass;
		var dow = (lunarDate.jd + 1) % 7;
		if (dow == 0) {
			solarClass = "cn";
		} else if (dow == 6) {
			solarClass = "t7";	
		} else {
			solarClass = "t2t6";
		}

		// Class của ngày âm
		var lunarClass;
		if (lunarDate.leap == 1) {
			lunarClass = "am2";
		} else {
			lunarClass = "am";
		}

		// Ngày âm lịch
		// Khi đầu tháng (đầu tháng âm hoặc dương) thì hiển thị thêm cả tháng
		var lunar;
		if (solarDate == 1 || lunarDate.day == 1) {
			lunar = lunarDate.day + "/" + lunarDate.month;
		} else {
			lunar = lunarDate.day;
		}

		// Xâu HTML kết quả
		var res = "";
		res += ('<td class="' + cellClass + '"');
		if (event) {
			var msg = event;

			// Số ngày còn lại
			var oneDay = 24 * 60 * 60 * 1000;
			var toDate = new Date(solarYear + '-' + solarMonth + '-' + solarDate);
			var dateDiff = Math.ceil( ( toDate.getTime() - today.getTime() ) / oneDay );
			if (dateDiff > 0) {
				msg += "<br />Còn " + dateDiff + " ngày";
			}
			res += (' title="' + event + '" onclick="noti.info(\'' + msg + '\')"');
		}
		res += ('>'
				+ '<div class="' + solarClass + '">' + solarDate + '</div>'
				+ '<div class="' + lunarClass + '">' + lunar + '</div>'
				+ '</td>\n');
		return res;
	}

	return {
		printMonth
	}
})();
