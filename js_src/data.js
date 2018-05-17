// Danh sách các ngày
var data = [
	{ date: "30/06/2018", isLunar: false, note: "Bàn giao SafeNet" },
	{ date: "01/01", isLunar: true, isAnnual: true, note: "Tết Nguyên đán" },
	{ date: "16/10", isLunar: false, isAnnual: true, note: "Sinh nhật Dương" },
	
	{ date: "15/01", isLunar: true, isAnnual: true, note: "Rằm tháng Riêng" },
	{ date: "01/02", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/02", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/03", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/03", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/04", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/04", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/05", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/05", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/06", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/06", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/07", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/07", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/08", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/08", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/09", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/09", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/10", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/10", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/11", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/11", isLunar: true, isAnnual: true, note: "Rằm" },
	{ date: "01/12", isLunar: true, isAnnual: true, note: "Mồng Một Âm" },
	{ date: "15/12", isLunar: true, isAnnual: true, note: "Rằm" },
	
	{ date: "10/03", isLunar: true, isAnnual: true, note: "Giỗ tổ Hùng Vương" },
	
	{ date: "30/04", isLunar: false, isAnnual: true, note: "Giải phóng miền Nam, thống nhất đất nước" },
	{ date: "01/05", isLunar: false, isAnnual: true, note: "Quốc tế lao động" },
	{ date: "02/09", isLunar: false, isAnnual: true, note: "Quốc khánh" }
];

data.forEach(function(e) {
	var a = e.date.split("/");
	if (a[0].startsWith("0")) {
		a[0] = a[0].substring(1);
	}
	if (a[1].startsWith("0")) {
		a[1] = a[1].substring(1);
	}

	e.dateOfMonth = parseInt(a[0]);
	e.month = parseInt(a[1]);
	if (a.length >= 3) {
		e.year = parseInt(a[2]);
	} else {
		e.year = null;
	}
});
