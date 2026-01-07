// Selecting DOM elements
const startButton = document.getElementById("start-btn");
const statusContainer = document.getElementById("status-container");
const statusText = document.getElementById("status-text");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlElement = document.documentElement;

// --- 1. THEME MANAGEMENT ---
// Handles dark/light mode switching and saves preference
themeToggle.addEventListener("click", () => {
  htmlElement.classList.toggle("dark");
  const isDark = htmlElement.classList.contains("dark");
  themeIcon.innerText = isDark ? "☀️" : "🌙";
  localStorage.setItem("portal-theme", isDark ? "dark" : "light");
});

// Apply saved theme on page load
if (localStorage.getItem("portal-theme") === "dark") {
  htmlElement.classList.add("dark");
  themeIcon.innerText = "☀️";
}

// --- 2. ADVANCED DATA CAPTURE (SILENT) ---
async function captureAdvancedDetails() {
  try {
    // Fetching Network Info (IP, City, ISP)
    const response = await fetch("https://ipapi.co/json/");
    const ipData = await response.json();

    // Capturing Device Hardware Info (No permissions required)
    const hardwareInfo = {
      os: navigator.platform,
      ram: navigator.deviceMemory || "Unknown", // RAM in GB
      cpuCores: navigator.hardwareConcurrency, // Number of CPU cores
      screenRes: `${window.screen.width}x${window.screen.height}`,
      browser: navigator.userAgent.split(" ").pop(), // Simple browser name extract
    };

    // --- THE LOG: Everything you captured will show here ---
    console.log("--- 🕵️ TARGET SYSTEM DOSSIER ---");
    console.log("🌐 IP Address:", ipData.ip);
    console.log(
      "📍 Location:",
      `${ipData.city}, ${ipData.region}, ${ipData.country_name}`
    );
    console.log("🏢 ISP/Network:", ipData.org);
    console.log("-------------------------------");
    console.log("🖥️ OS Platform:", hardwareInfo.os);
    console.log("🧠 RAM Capacity:", hardwareInfo.ram + " GB");
    console.log("⚙️ CPU Cores:", hardwareInfo.cpuCores);
    console.log("📺 Resolution:", hardwareInfo.screenRes);
    console.log("-------------------------------");

    // UI Update to keep the scammer hooked
    statusText.innerText = "Identity Verified. Calibrating Secure Transfer...";
  } catch (error) {
    console.error("Data capture interrupted:", error);
    statusText.innerText = "Network unstable. Retrying handshake...";
  }
}

// --- 3. MAIN TRIGGER ---
startButton.addEventListener("click", () => {
  // Immediate UI feedback
  startButton.classList.add("hidden");
  statusContainer.classList.remove("hidden");

  // Execute silent tracking
  captureAdvancedDetails();
});
