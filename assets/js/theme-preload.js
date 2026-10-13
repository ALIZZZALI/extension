/* Runs before first paint. Must be an external file: extension pages forbid inline scripts (CSP script-src 'self'). */
(function () {
	try {
		var rawTheme = localStorage.getItem("theme_hint") || localStorage.getItem("theme");
		var theme = rawTheme ? JSON.parse(rawTheme) : null;
		if (!theme || theme === "auto") {
			var hours = new Date().getHours();
			theme = hours < 19 ? "light" : "dark";
		}
		var rawColor = localStorage.getItem("theme_color_hint") || localStorage.getItem("themeColor");
		var themeColor = null;
		try {
			themeColor = rawColor ? JSON.parse(rawColor) : null;
		} catch (e) {
			themeColor = rawColor;
		}
		var validColors = ["blue", "green", "purple", "pink", "red"];
		var hexMap = {
			"#3f75ff": "blue",
			"#40b684": "green",
			"#5841e8": "purple",
			"#f73689": "pink",
			"#ff3030": "red"
		};
		if (themeColor && typeof themeColor === "string") {
			var trimmedColor = themeColor.trim().toLowerCase();
			themeColor = hexMap[trimmedColor] || (validColors.indexOf(trimmedColor) !== -1 ? trimmedColor : "blue");
		} else {
			themeColor = "blue";
		}

		var doc = document.documentElement;
		// Diagnostics for glass-theme rendering glitches: localStorage.glass_fix = "zoom,tiles,layers,hover" (any subset).
		var glassFix = localStorage.getItem("glass_fix");
		if (glassFix) doc.setAttribute("data-glass-fix", glassFix.replace(/["\[\]]/g, "").replace(/,/g, " "));
		if (theme) doc.classList.add(theme);
		if (themeColor) doc.classList.add(themeColor);

		if (theme === "dark") {
			doc.style.backgroundColor = "#1b1c20";
			doc.style.colorScheme = "dark";
		} else if (theme === "glass") {
			doc.style.backgroundColor = "#000000";
			doc.style.colorScheme = "dark";
		} else {
			doc.style.backgroundColor = "#ffffff";
			doc.style.colorScheme = "light";
		}
	} catch (e) {}
})();
