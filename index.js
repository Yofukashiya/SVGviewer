const svgInput = document.getElementById("svgInput");
const previewContainer = document.getElementById("previewContainer");
const exportBtn = document.getElementById("exportBtn");

function loadSvg(svgCode) {
	previewContainer.innerHTML = "";
	if (!svgCode.trim()) {
		showErrorMessage("Enter SVG code to see preview");
		return;
	}

	try {
		const parser = new DOMParser();
		const doc = parser.parseFromString(svgCode, "image/svg+xml");
		const parserError = doc.querySelector("parsererror");
		if (parserError) {
			throw new Error("XML parsing error: " + parserError.textContent);
		}
		const svgElement = doc.querySelector("svg");
		if (!svgElement) {
			throw new Error("No valid SVG element found");
		}

		const container = document.createElement("div");
		container.className = "svg-container";
		container.innerHTML = svgCode;
		previewContainer.appendChild(container);
	} catch (error) {
		showErrorMessage("Invalid SVG code: " + error.message);
	}
}

function showErrorMessage(errorMessage) {
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message";
	errorDiv.textContent = errorMessage;
	previewContainer.appendChild(errorDiv);
}

function loadDefaultSVG() {
	const sampleSvg = `<svg xmlns="https://www.w3.org/2000/svg" width="160" height="190" viewBox="0 0 60 60"><defs><style>.cls-1{fill:#87e64b;}</style></defs><circle class="cls-1" cx="25.56" cy="61.15" r="2.86"/><path class="cls-1" d="M42,41.65l-16.13,1.73c-.3.03-.45-.34-.21-.53l15.78-12.29c1.02-.84,1.68-2.14,1.4-3.54-.28-2.14-2.05-3.54-4.29-3.26l-17.15,2.51c-.3.04-.46-.34-.22-.53l17-12.98c3.35-2.61,3.63-7.73.56-10.71-2.79-2.79-7.27-2.7-10.06.09L1.29,30.01c-1.02,1.12-1.49,2.61-1.21,4.19.47,2.52,2.98,4.19,5.5,3.73l14.77-3.01c.32-.07.49.36.22.54l-16.38,10.49c-2.05,1.3-2.98,3.63-2.33,5.96.65,3.07,3.73,4.84,6.71,4.1l24.49-6.03c.28-.07.48.25.3.47l-3.82,4.72c-1.02,1.3.65,3.07,2.05,2.05l12.58-10.34c2.24-1.86.75-5.5-2.14-5.22h-.03Z"/></svg>`;

	svgInput.value = sampleSvg;
	loadSvg(sampleSvg);
}

function exportSVG() {
	const blob = new Blob([svgInput.value], {
		type: "image/svg+xml",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "svg-viewer.svg";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

svgInput.addEventListener("input", function () {
	loadSvg(this.value);
});
svgInput.addEventListener("paste", function () {
	loadSvg(this.value);
});

exportBtn.addEventListener("click", exportSVG);

window.addEventListener("load", loadDefaultSVG);
