const rangeInput = document.getElementById("myRange");
const distanceSpan = document.getElementById("demo");
let animationFrameId;
let distance = 0;

function moveSlider() {
  distance = 0;
  animateSlider();
}

function animateSlider() {
  let printval = 0;
  printval += 1;
  distance += 1;
  rangeInput.value = distance;
  distanceSpan.textContent = distance;
  rangeInput.dispatchEvent(new Event("input"));

  if (distance < 100) {
    animationFrameId = requestAnimationFrame(animateSlider);
  }
}

const customErrorPopup = document.getElementById("customErrorPopup");
const customErrorMessage = document.getElementById("customErrorMessage");

function showCustomError(message) {
  customErrorMessage.innerText = message;
  customErrorPopup.style.display = "block";
}

function hideCustomError() {
  customErrorPopup.style.display = "none";
}

function stopSlider() {
  cancelAnimationFrame(animationFrameId);
  let targetDistance = distance + 15;

  if (targetDistance < 300) {
    showCustomError("Brakes Activated");
    return;
  }

  function animateEStop() {
    distance += 0.55;

    rangeInput.value = distance;
    distanceSpan.textContent = targetDistance;

    rangeInput.dispatchEvent(new Event("input"));

    if (distance < targetDistance) {
      animationFrameId = requestAnimationFrame(animateEStop);
    }
  }

  animateEStop();
}

function estopSlider() {
  cancelAnimationFrame(animationFrameId);

  let targetDistance = distance + 15;

  function animateEStop() {
    distance += 0.55;

    rangeInput.value = distance;
    distanceSpan.textContent = targetDistance;

    rangeInput.dispatchEvent(new Event("input"));

    if (distance < targetDistance) {
      animationFrameId = requestAnimationFrame(animateEStop);
    }
  }

  animateEStop();
}

document.querySelector(".button2").addEventListener("click", moveSlider);
document.querySelector(".button3").addEventListener("click", stopSlider);
document.querySelector(".button1").addEventListener("click", estopSlider);

// Getting Data From Server

document.addEventListener("DOMContentLoaded", function () {
  const limtemp = document.getElementById("lim_temp");
  const customErrorPopup = document.getElementById("customErrorPopup");
  const customErrorMessage = document.getElementById("customErrorMessage");

  function fetchSensorData() {
    fetch("http://192.168.4.1/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        limtemp.innerText = `${data.temperature_C.toFixed(2)}°C`; // Accessing the correct key
        if (data.temperature_C > 70) {
          showCustomError(
            "Emergency Stop.Temperature exceeds 70°C."
          );
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  function showCustomError(message) {
    customErrorMessage.innerText = message;
    customErrorPopup.style.display = "block";
  }

  function hideCustomError() {
    customErrorPopup.style.display = "none";
  }

  fetchSensorData();
  setInterval(fetchSensorData, 10); // Fetch every 10 seconds
});

// script.js

function updateDotStatus(dotId, status) {
  const dot = document.getElementById(dotId);
  switch (status) {
    case 'online':
      dot.style.backgroundColor = 'green';
      break;
    case 'online-no-data':
      dot.style.backgroundColor = 'orange';
      break;
    case 'offline':
      dot.style.backgroundColor = 'red';
      break;
    default:
      dot.style.backgroundColor = 'red'; // Default to red if status is unknown
  }
}

// Set initial status for dots (all offline)
updateDotStatus('dot1', 'online-no-data');
updateDotStatus('dot2', 'offline');
updateDotStatus('dot3', 'offline');
updateDotStatus('dot4', 'offline');
