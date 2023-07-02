var totalMoney = 0;
var betAmount = 0;

function openModal() {
  document.getElementById("myModal").style.display = "flex";
  document.getElementById("myModal").classList.add("modal-active");
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("myModal").classList.remove("modal-active");
}

function confirmMoney() {
  var moneyInput = document.getElementById("money-input");
  var dinero = parseInt(moneyInput.value);

  if (!isNaN(dinero) && dinero > 0) {
    totalMoney = dinero;
    betAmount = 0;
    updateBetAmount();
    console.log("Dinero ingresado:", totalMoney);
  }

  closeModal();
}

function updateBetAmount() {
  document.getElementById("bet-amount").textContent = "Apuesta: $" + betAmount;
}

  