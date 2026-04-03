const slideImage = document.getElementById("slideImage");
const slideCounter = document.getElementById("slideCounter");
const slideCaption = document.getElementById("slideCaption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dotsContainer");
const addToBagButtons = document.querySelectorAll(".shirt-meta button");
const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("orderForm");
const orderProductName = document.getElementById("orderProductName");
const orderProductPrice = document.getElementById("orderProductPrice");
const orderEmailInput = document.getElementById("orderEmail");
const orderPhoneInput = document.getElementById("orderPhone");
const orderLocationInput = document.getElementById("orderLocation");
const orderFormStatus = document.getElementById("orderFormStatus");
const orderSubmitBtn = document.getElementById("orderSubmitBtn");
const closeOrderModalButtons = document.querySelectorAll("[data-close-order-modal]");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const eventLabel = document.querySelector(".event-label");
const eventTitle = document.querySelector(".event-title");
const eventMeta = document.querySelector(".event-meta");
const countdownEl = document.querySelector(".countdown");
const introSplash = document.getElementById("introSplash");

function forceScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

forceScrollToTop();
window.addEventListener("load", forceScrollToTop);
window.addEventListener("pageshow", forceScrollToTop);

function playIntroSplash() {
  if (!introSplash) {
    document.body.classList.remove("page-loading");
    return;
  }

  setTimeout(() => {
    introSplash.classList.add("exit");
    document.body.classList.remove("page-loading");

    setTimeout(() => {
      introSplash.remove();
    }, 900);
  }, 5000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", playIntroSplash);
} else {
  playIntroSplash();
}

const imageBasePath = "assets/slide/Zero Fold/";
const imageFiles = [
  "IMG_1511.jpg",
  "IMG_1534.jpg",
  "IMG_1554.jpg",
  "IMG_1590.jpg",
  "IMG_1614.jpg",
  "IMG_1645.jpg",
  "IMG_1658.jpg",
  "IMG_1674.jpg",
  "IMG_1678.jpg",
  "IMG_1680.jpg",
  "IMG_1681.jpg",
  "IMG_1717.jpg",
  "IMG_1720.jpg",
  "IMG_1735.jpg",
  "IMG_1750.jpg",
  "IMG_1779.jpg",
  "IMG_1789.jpg",
  "IMG_1794.jpg",
  "IMG_1819.jpg",
  "IMG_1830.jpg",
  "IMG_1835.jpg",
  "IMG_1848.jpg",
  "IMG_1868.jpg",
  "IMG_1881.jpg",
  "IMG_1893.jpg",
  "IMG_1905.jpg",
  "IMG_1912.jpg",
  "IMG_1919.jpg",
  "IMG_1926.jpg",
  "IMG_1932.jpg",
  "IMG_1970.jpg",
  "IMG_1977.jpg",
  "IMG_1979.jpg",
  "IMG_1988.jpg",
  "IMG_1989.jpg",
  "IMG_1999.jpg",
  "IMG_2000.jpg",
  "IMG_2008.jpg",
  "IMG_2009.jpg",
  "IMG_2010.jpg",
  "IMG_2037.jpg",
  "IMG_2051.jpg",
  "IMG_2054.jpg",
  "IMG_2060.jpg",
  "IMG_2065.jpg",
  "IMG_2079.jpg",
  "IMG_2080.jpg",
  "IMG_2082.jpg",
  "IMG_2083.jpg",
  "IMG_2085.jpg",
  "IMG_2086.jpg",
  "IMG_2087.jpg",
  "IMG_2095.jpg",
  "IMG_2112.jpg",
  "IMG_2126.jpg",
  "IMG_2131.jpg",
  "IMG_2137.jpg",
  "IMG_2140.jpg",
  "IMG_2149.jpg",
  "IMG_2158.jpg",
  "IMG_2160.jpg",
  "IMG_2167.jpg",
  "IMG_2172.jpg",
  "IMG_2188.jpg",
  "IMG_2189.jpg",
  "IMG_2195.jpg",
  "IMG_2197.jpg",
  "IMG_2208.jpg",
  "IMG_2218.jpg",
  "IMG_2238.jpg",
  "IMG_2251.jpg",
  "IMG_2253.jpg",
  "IMG_2256.jpg",
  "IMG_2258.jpg",
  "IMG_2263.jpg",
  "IMG_2270.jpg",
  "IMG_2275.jpg",
  "IMG_2292.jpg",
  "IMG_2302.jpg",
  "IMG_2322.jpg",
  "IMG_2328.jpg",
  "IMG_2330.jpg",
  "IMG_2337.jpg",
  "IMG_2344.jpg",
  "IMG_2351.jpg",
  "IMG_2354.jpg",
  "IMG_2355.jpg",
  "IMG_2358.jpg",
  "IMG_2362.jpg",
  "IMG_2364.jpg",
  "IMG_2369.jpg",
  "IMG_2375.jpg",
  "IMG_2376.jpg",
  "IMG_2378.jpg",
  "IMG_2385.jpg",
  "IMG_2406.jpg",
  "IMG_2408.jpg",
  "IMG_2417.jpg",
  "IMG_2442.jpg",
  "IMG_2445.jpg"
];

const images = imageFiles.map((name) => imageBasePath + encodeURIComponent(name));

let currentIndex = 0;
let selectedProductName = "";
let selectedProductPrice = "";
const orderEndpoint = window.ZF_ORDER_ENDPOINT || "";
const directOrderEmailEndpoint = "https://formsubmit.co/ajax/zerofold91@gmail.com";

function getTomorrowAtEight() {
  const next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(8, 0, 0, 0);
  return next;
}

const eventDate = getTomorrowAtEight();
let countdownIntervalId = null;
let eventClosedShown = false;

function padTime(value) {
  return String(value).padStart(2, "0");
}

function hydrateUpcomingEventMeta() {
  if (!eventMeta) {
    return;
  }

  const dateText = eventDate.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });

  eventMeta.textContent = "Adweso, Bluestreet | " + dateText + " at 8:00 AM";
}

function showEventClosedState() {
  if (eventClosedShown) {
    return;
  }

  if (eventLabel) {
    eventLabel.textContent = "Status";
  }
  if (eventTitle) {
    eventTitle.textContent = "Event Closed";
  }
  if (eventMeta) {
    eventMeta.textContent = "Thank you for showing up. Next release lands on a new date. See you soon.";
  }
  if (countdownEl) {
    countdownEl.setAttribute("hidden", "");
  }

  eventClosedShown = true;
}

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  const now = new Date();
  const remaining = eventDate - now;

  if (remaining <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    showEventClosedState();
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
    }
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = padTime(days);
  hoursEl.textContent = padTime(hours);
  minutesEl.textContent = padTime(minutes);
  secondsEl.textContent = padTime(seconds);
}

function createDots() {
  dotsContainer.innerHTML = "";
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) {
      dot.classList.add("active");
    }
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function showSlide(index) {
  if (images.length === 0) {
    slideImage.removeAttribute("src");
    slideCounter.textContent = "0 / 0";
    slideCaption.textContent = "No images found";
    return;
  }

  currentIndex = (index + images.length) % images.length;
  slideImage.classList.remove("loaded");
  slideImage.src = images[currentIndex];
  slideImage.onload = () => slideImage.classList.add("loaded");
  slideCounter.textContent = (currentIndex + 1) + " / " + images.length;
  slideCaption.textContent = "Look " + (currentIndex + 1);
  updateDots();
}

function setOrderStatus(message, state) {
  if (!orderFormStatus) {
    return;
  }

  orderFormStatus.textContent = message;
  orderFormStatus.classList.remove("success", "error");
  if (state) {
    orderFormStatus.classList.add(state);
  }
}

function setOrderSubmitting(isSubmitting) {
  if (!orderSubmitBtn) {
    return;
  }

  orderSubmitBtn.disabled = isSubmitting;
  orderSubmitBtn.textContent = isSubmitting ? "Sending..." : "Send Order";
}

function buildOrderMailto(productName, productPrice, customerEmail, customerPhone, customerLocation) {
  const orderEmail = "zerofold91@gmail.com";
  const subject = "Order Request - " + productName;
  const body = [
    "Hello Zero Fold,",
    "",
    "I would like to order:",
    "Product: " + productName,
    "Price: " + productPrice,
    "Quantity: 1",
    "",
    "Customer details:",
    "Email: " + customerEmail,
    "Phone: " + customerPhone,
    "Location: " + customerLocation,
    "",
    "Thank you."
  ].join("\n");

  return "mailto:" + orderEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

async function sendOrderViaFormSubmit(productName, productPrice, customerEmail, customerPhone, customerLocation) {
  const formData = new FormData();
  formData.append("_subject", "Order Request - " + productName);
  formData.append("_captcha", "false");
  formData.append("Product", productName);
  formData.append("Price", productPrice);
  formData.append("Customer Email", customerEmail);
  formData.append("Customer Phone", customerPhone);
  formData.append("Customer Location", customerLocation);

  const response = await fetch(directOrderEmailEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || data.error || "Direct email delivery failed.");
  }
}

function openOrderModal(productName, productPrice) {
  if (!orderModal || !orderForm) {
    return;
  }

  selectedProductName = productName;
  selectedProductPrice = productPrice;
  if (orderProductName) {
    orderProductName.textContent = productName;
  }
  if (orderProductPrice) {
    orderProductPrice.textContent = productPrice;
  }

  orderForm.reset();
  setOrderStatus("", "");
  setOrderSubmitting(false);
  orderModal.hidden = false;
  orderModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (orderEmailInput) {
    orderEmailInput.focus();
  }
}

function closeOrderModal() {
  if (!orderModal) {
    return;
  }

  orderModal.hidden = true;
  orderModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function initOrderModal() {
  if (!orderModal || !orderForm) {
    return;
  }

  closeOrderModalButtons.forEach((button) => {
    button.addEventListener("click", closeOrderModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !orderModal.hidden) {
      closeOrderModal();
    }
  });

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!orderForm.reportValidity()) {
      return;
    }

    const customerEmail = orderEmailInput?.value.trim() || "";
    const customerPhone = orderPhoneInput?.value.trim() || "";
    const customerLocation = orderLocationInput?.value.trim() || "";

    setOrderSubmitting(true);
    setOrderStatus("Sending your order...", "");

    const productName = selectedProductName || "Zero Fold Item";
    const productPrice = selectedProductPrice || "Price on request";

    const submitWithFallbacks = async () => {
      const hasFirebaseEndpoint = orderEndpoint && !orderEndpoint.includes("YOUR_PROJECT_ID");

      if (hasFirebaseEndpoint) {
        try {
          const response = await fetch(orderEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              productName,
              productPrice,
              customerEmail,
              customerPhone,
              customerLocation
            })
          });

          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(data.error || "Failed to send order via server.");
          }

          return;
        } catch (_) {
          // Fall through to direct email delivery service.
        }
      }

      await sendOrderViaFormSubmit(productName, productPrice, customerEmail, customerPhone, customerLocation);
    };

    submitWithFallbacks()
      .then(() => {
        setOrderStatus("Order sent successfully. We will contact you soon.", "success");
        setTimeout(() => {
          closeOrderModal();
        }, 1000);
      })
      .catch(() => {
        setOrderStatus("Delivery service unavailable right now. Opening your email app as backup...", "error");
        window.location.href = buildOrderMailto(
          productName,
          productPrice,
          customerEmail,
          customerPhone,
          customerLocation
        );
      })
      .finally(() => {
        setOrderSubmitting(false);
      });
  });
}

function initEmailOrders() {
  addToBagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".shirt-card");
      const productName = card?.querySelector("h3")?.textContent?.trim() || "Zero Fold Item";
      const productPrice = card?.querySelector(".shirt-meta span")?.textContent?.trim() || "Price on request";
      openOrderModal(productName, productPrice);
    });
  });
}

prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));

createDots();
showSlide(0);

setInterval(() => {
  showSlide(currentIndex + 1);
}, 3800);

hydrateUpcomingEventMeta();
updateCountdown();
countdownIntervalId = setInterval(updateCountdown, 1000);
initOrderModal();
initEmailOrders();
