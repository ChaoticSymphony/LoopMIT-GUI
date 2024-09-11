document.addEventListener("DOMContentLoaded", function () {
  const limtemp = document.getElementById("lim_temp");

  function fetchSensorData() {
    fetch("http://192.168.4.1/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        limtemp.innerText = `${data.temperature_C.toFixed(2)}°C`;
        if (data.temperature_C > 70) {
          showCustomError("Emergency Stop. Temperature exceeds 70°C.");
        }
      })
      .catch((error) => {
        console.error("Error fetching sensor data", error);
      });
  }

  fetchSensorData(); // Call the function once on page load
  setInterval(fetchSensorData, 2000); // Fetch every 2 seconds
});

// Function to show custom error message
function showCustomError(message) {
  const customErrorPopup = document.getElementById("customErrorPopup");
  const customErrorMessage = document.getElementById("customErrorMessage");

  customErrorMessage.innerText = message;
  customErrorPopup.style.display = "block";
}

// Function to hide custom error message
function hideCustomError() {
  const customErrorPopup = document.getElementById("customErrorPopup");
  customErrorPopup.style.display = "none";
}

// Slider Control Functions
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

function stopSlider() {
  cancelAnimationFrame(animationFrameId);
  let targetDistance = distance + 15;

  if (targetDistance < 300) {
    // showCustomError("Brakes Activated");
    // return;
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

// Relay Control Functions
document.querySelector('.button2').addEventListener('click', function() {
  fetch('http://192.168.1.184/relay_on')
      .then(response => response.text())
      .then(data => console.log('Relay ON:', data))
      .catch(error => console.error('Error:', error));
});

document.querySelector('.button3').addEventListener('click', function() {
  fetch('http://192.168.1.184/relay_off')
      .then(response => response.text())
      .then(data => console.log('Relay OFF:', data))
      .catch(error => console.error('Error:', error));
});

// Dot Status Update Functions
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
