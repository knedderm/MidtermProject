
window.onload = function() {
    function timeday(){
        setInterval(function() {
            var date = new Date();
            var displayDate = date.toLocaleDateString();
            var displayTime = date.toLocaleTimeString();

            // Update the date and time elements
            document.getElementById('date').textContent = `${displayDate}`;
            document.getElementById('time').textContent = `${displayTime}`;
        }, 1000); // Update every second (1000 milliseconds)
    }

    function openclose(){
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const currentHour = currentDate.getHours();
    
        // Define your business hours (adjust as needed)
        const openingHour = 8.5; // 8:30 AM
        const closingHour = 15; // 3:00 PM
    
        if (currentDay >= 1 && currentDay <= 5) {
            // Monday to Thursday
            if (currentHour >= openingHour && currentHour <= closingHour) {
                document.getElementById('status').textContent = 'Open';
            } else {
                document.getElementById('status').textContent = 'Closed';
            }
        } else {
            // Saturday and Sunday
            document.getElementById('status').textContent = 'Closed';
        }
    }

    timeday();
    openclose();
};

fetch("./data.json")
.then(response => response.json())
.then(data => loadData(data));


function loadData(data) {
    var CardStock = document.querySelector(".col");
  
    for (var i = 0; i < data.stocks.length; i++) {
      let ticker = data.stocks[i].ticker;
      let openPrice = data.stocks[i].results[0].o;
      let highPrice = data.stocks[i].results[0].h;
      let lowPrice = data.stocks[i].results[0].l;
      let closePrice = data.stocks[i].results[0].c;
      let logo = data.stocks[i].logo_url;
      let percentage = ((closePrice - openPrice) / openPrice) * 100; // Calculate percentage change
      const percentageValue = parseFloat(percentage.toFixed(2));
  
      // Create a new stock card element
      const AddStockCard = document.createElement('div');
      AddStockCard.classList.add('card-body');
  
      // Create the percentage element
      const percentageElement = document.createElement('span');
      percentageElement.classList.add('percentage');
      percentageElement.textContent = `${percentageValue}%`;
  
      // Determine whether the percentage is positive or negative
      if (percentageValue > 0) {
        percentageElement.classList.add('positive');
      } else if (percentageValue < 0) {
        percentageElement.classList.add('negative');
      }
  
      // Create the card body content
      const cardBodyContent = `
        <div class="card shadow-sm" style="border-width: 5px; border-color: orange; margin: 15px;">

        <img src="${logo}" style="width: 100px; height: auto; float: left; margin-right: 10px; margin-left: 5px; margin-top: 5px">
        <p style="text-align: center; font-size: 26px; word-spacing: 8px">
          <strong>${ticker}</strong> Open: ${openPrice} High: ${highPrice} Low: ${lowPrice} Close: ${closePrice} Change: ${percentageElement.outerHTML}
        </p>
        </div>
      `;
  
      // Set the content to the AddStockCard element
      AddStockCard.innerHTML = cardBodyContent;
  
      // Append the stock card to the CardStock element
      CardStock.appendChild(AddStockCard);
    }
  }