let firstTime = true; // Flag to track if it's the first time playing the game
let cupNumber = 3; // Number of cups in the game
let probabilityOffset = 2; // Offset for the probability of adding a ball to a cup

let cupsContainer = document.getElementById("cups-container"); // Container element for the cups
let cupContainer; // Array to store the cup container elements

function shuffle() {
  const items = gsap.utils.toArray(".cup-container"); // Convert cup container elements into an array

  // Get the state of the cup containers
  const state = Flip.getState(items);
  
  // Do the actual shuffling of the cup containers
  for (let i = items.length; i >= 0; i--) {
    cupsContainer.appendChild(cupsContainer.children[Math.random() * i | 0]);
  }
  
  // Animate the change using the Flip library
  Flip.from(state, {
    absolute: true
  });
}

function createCups() {
  // Create cup containers
  for (let index = 0; index < cupNumber; index++) {
    cupsContainer.innerHTML += '<div class="cup-container"><div class="cup"><img src="resources/cup-img.png" alt="cup-img"></div></div>';
  }

  // Get cup elements and cup container elements
  const cups = document.getElementsByClassName("cup");
  cupContainer = document.getElementsByClassName("cup-container");

  let selected = false;

  let cupContainerArray = Array.from(cupContainer);

  if(!firstTime){
    // Add motion blur cups to existing cup containers
    for (let index = 0; index < cupContainerArray.length; index++) {
      cupContainerArray[index].innerHTML += '<div class="motion-blur-cup cup"><img src="resources/cup-img.png" alt="cup-img"></div>';
      cupContainerArray[index].innerHTML += '<div class="motion-blur-cup cup"><img src="resources/cup-img.png" alt="cup-img"></div>';
    }

    // Create a timeline for cup shuffling animation
    const totalIterations = Math.floor(Math.random() * 7) + 5;
    const cupShuffle = gsap.timeline({
      repeat: totalIterations,
      repeatDelay: 0.2,
    });
    
    // Remove motion blur cups after shuffling animation is completed
    cupShuffle.eventCallback("onComplete", () => {
      Array.from(document.getElementsByClassName("motion-blur-cup")).forEach(cup => cup.remove());
    });
    
    cupShuffle.call(shuffle); // Call the shuffle function
  }
  
  firstTime = false;

  // Add click event listener to each cup container
  cupContainerArray.forEach((element) => {
    element.addEventListener('click', () => {
      if (!selected) {
        // Add ball randomly to a cup container
        if (Math.floor(Math.random() * (cupNumber + probabilityOffset)) == 1) {
          element.innerHTML += '<div class="ball"><img src="resources/ball-img.png" alt="ball-img"></div>';
        }
        let cup = element.querySelector(".cup");
        cup.classList.add("cup-animation");
        selected = true;

        // Reset the game after 3 seconds
        setTimeout(() => {
          deleteCups();
          createCups();
        }, 3000);
      }
    });
  });
}

// Call the createCups function to start the game
createCups();


function deleteCups() {
  cupsContainer.innerHTML = '';
}
