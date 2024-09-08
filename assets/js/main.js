// Theme switcher
const HSThemeAppearance = {
	init() {
		const defaultTheme = "default";
		let theme = localStorage.getItem("hs_theme") || defaultTheme;

		if (document.querySelector("html").classList.contains("dark")) return;
		this.setAppearance(theme);
	},
	_resetStylesOnLoad() {
		const $resetStyles = document.createElement("style");
		$resetStyles.innerText = `*{transition: unset !important;}`;
		$resetStyles.setAttribute("data-hs-appearance-onload-styles", "");
		document.head.appendChild($resetStyles);
		return $resetStyles;
	},
	setAppearance(theme, saveInStore = true, dispatchEvent = true) {
		const $resetStylesEl = this._resetStylesOnLoad();

		if (saveInStore) {
			localStorage.setItem("hs_theme", theme);
		}

		if (theme === "auto") {
			theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";
		}

		document.querySelector("html").classList.remove("dark");
		document.querySelector("html").classList.remove("default");
		document.querySelector("html").classList.remove("auto");

		document.querySelector("html").classList.add(this.getOriginalAppearance());

		setTimeout(() => {
			$resetStylesEl.remove();
		});

		if (dispatchEvent) {
			window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: theme }));
		}
	},
	getAppearance() {
		let theme = this.getOriginalAppearance();
		if (theme === "auto") {
			theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";
		}
		return theme;
	},
	getOriginalAppearance() {
		const defaultTheme = "default";
		return localStorage.getItem("hs_theme") || defaultTheme;
	},
};
HSThemeAppearance.init();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
	if (HSThemeAppearance.getOriginalAppearance() === "auto") {
		HSThemeAppearance.setAppearance("auto", false);
	}
});

window.addEventListener("load", () => {
	const $clickableThemes = document.querySelectorAll("[data-hs-theme-click-value]");
	const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");

	$clickableThemes.forEach(($item) => {
		$item.addEventListener("click", () =>
			HSThemeAppearance.setAppearance(
				$item.getAttribute("data-hs-theme-click-value"),
				true,
				$item
			)
		);
	});

	$switchableThemes.forEach(($item) => {
		$item.addEventListener("change", (e) => {
			HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");
		});

		$item.checked = HSThemeAppearance.getAppearance() === "dark";
	});

	window.addEventListener("on-hs-appearance-change", (e) => {
		$switchableThemes.forEach(($item) => {
			$item.checked = e.detail === "dark";
		});
	});
});

// Image/video popup
const venobox = new VenoBox({
	selector: ".project-gallery-link",
	fitView: false,
	onPostOpen: function () {
		document.querySelector("body").style.overflowY = "hidden";
	},
	onPreClose: function () {
		document.querySelector("body").style.overflowY = "auto";
	},
});

// Review carousel
const reviewCarousel = new Swiper(".review-carousel", {
	// Default parameters
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	navigation: {
		nextEl: ".review-carousel-button-next",
		prevEl: ".review-carousel-button-prev",
	},
	breakpoints: {
		1: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
	},
});

// Blog carousel
const blogCarousel = new Swiper(".blog-carousel", {
	// Default parameters
	slidesPerView: 1,
	spaceBetween: 24,
	loop: true,
	navigation: {
		nextEl: ".blog-carousel-button-next",
		prevEl: ".blog-carousel-button-prev",
	},
	breakpoints: {
		1: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
	},
});

// INITIALIZATION OF CLIPBOARD
(function () {
	window.addEventListener("load", () => {
		const $clipboards = document.querySelectorAll(".js-clipboard");
		$clipboards.forEach((el) => {
			const isToggleTooltip =
				HSStaticMethods.getClassProperty(el, "--is-toggle-tooltip") === "false"
					? false
					: true;
			const clipboard = new ClipboardJS(el, {
				text: (trigger) => {
					const clipboardText = trigger.dataset.clipboardText;

					if (clipboardText) return clipboardText;

					const clipboardTarget = trigger.dataset.clipboardTarget;
					const $element = document.querySelector(clipboardTarget);

					if (
						$element.tagName === "SELECT" ||
						$element.tagName === "INPUT" ||
						$element.tagName === "TEXTAREA"
					)
						return $element.value;
					else return $element.textContent;
				},
			});
			clipboard.on("success", () => {
				const $default = el.querySelector(".js-clipboard-default");
				const $success = el.querySelector(".js-clipboard-success");
				const $successText = el.querySelector(".js-clipboard-success-text");
				const successText = el.dataset.clipboardSuccessText || "";
				const tooltip = el.closest(".hs-tooltip");
				const $tooltip = HSTooltip.getInstance(tooltip, true);
				let oldSuccessText;

				if ($successText) {
					oldSuccessText = $successText.textContent;
					$successText.textContent = successText;
				}
				if ($default && $success) {
					$default.style.display = "none";
					$success.style.display = "block";
				}
				if (tooltip && isToggleTooltip) HSTooltip.show(tooltip);
				if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();

				setTimeout(function () {
					if ($successText && oldSuccessText) $successText.textContent = oldSuccessText;
					if (tooltip && isToggleTooltip) HSTooltip.hide(tooltip);
					if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();
					if ($default && $success) {
						$success.style.display = "";
						$default.style.display = "";
					}
				}, 800);
			});
		});
	});
})();

// Move elements on cursor move
(function () {
	// Select the element you want to move
	const elements = document.querySelectorAll(".move-with-cursor");

	elements.forEach((element) => {
		// Add event listener for mousemove event
		document.addEventListener("mousemove", moveElement);

		// Event listener function
		function moveElement(event) {
			// Get the mouse coordinates
			const mouseX = event.clientX;
			const mouseY = event.clientY;

			// Update the position of the element with smooth animation
			element.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
			element.style.transform = `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px) rotate(${
				(mouseX + mouseY) * 0.01
			}deg)`;
		}
	});
})();

// 8. Contact form
const form = document.querySelector("#contact-form");

if (form) {
	const formStatus = form.querySelector(".status");

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		let formData = new FormData(form);

		let xhr = new XMLHttpRequest();
		xhr.open("POST", form.action);
		xhr.onload = function () {
			if (xhr.status === 200) {
				formStatus.classList.remove("hidden");
				formStatus.classList.remove("alert-danger");
				formStatus.classList.add("alert-success");
				formStatus.textContent = xhr.responseText;
				form.reset();
				setTimeout(() => {
					formStatus.classList.add("hidden");
				}, 6000);
			} else {
				formStatus.classList.remove("hidden");
				formStatus.classList.remove("alert-success");
				formStatus.classList.add("alert-danger");
				if (xhr.responseText !== "") {
					formStatus.textContent = xhr.responseText;
				} else {
					formStatus.textContent =
						"Oops! An error occurred and your message could not be sent.";
				}
				setTimeout(() => {
					formStatus.classList.add("hidden");
				}, 6000);
			}
		};
		xhr.send(formData);
	});
}
