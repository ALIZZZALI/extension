/* eslint-disable no-undef */
function applyPreloadBg(bgData) {
	if (bgData?.image?.mainImage) {
		const imageUrl = bgData.image.mainImage;
		document.documentElement.style.backgroundImage = `url(${imageUrl})`;
		document.documentElement.style.backgroundSize = "cover";
		document.documentElement.style.backgroundPosition = "bottom";
		document.documentElement.style.backgroundRepeat = "no-repeat";
		document.documentElement.style.height = "100vh";
	}
}

try {
	const rawLocal = localStorage.getItem("background-data");
	if (rawLocal) {
		applyPreloadBg(JSON.parse(rawLocal));
	}
} catch (e) {}

if (typeof chrome !== "undefined" && chrome?.storage?.local) {
	chrome.storage.local.get("background-data", function (data) {
		if (data?.["background-data"]) {
			applyPreloadBg(data["background-data"]);
		}
	});
}