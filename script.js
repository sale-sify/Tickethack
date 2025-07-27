
const btnSearch = document.querySelector('button');



    
btnSearch.addEventListener('mouseover', 
    function() {
        this.style.boxShadow = 'inset 3px 3px 2px #515353,inset 3px 3px 5px rgba(0,0,0,0.3)';
        this.style.background = 'rgb(100, 196, 148)'            
    }

);
btnSearch.addEventListener('mouseleave', 
    function() {
        this.style.boxShadow = '0 0px 0 #515353, 0 0px 0px rgba(0,0,0,0.3)';
        this.style.background = 'rgb(48, 194, 121)'
    }

);




btnSearch.addEventListener('click', 
    function() {
        let departure = document.getElementById('input-departure').value;
        let arrival = document.getElementById('input-arrival').value;
        function formatedCityName (city) {
            return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        };
        departure = formatedCityName(departure);
        arrival = formatedCityName(arrival);
        const date = document.getElementById('date').value;
        
        if (departure.length < 1 || arrival.length < 1) {
            alert('Information missing, please fill the cases "Departure" and "Arrival"');
        } else {
        const urlTickets = `http://localhost:3001/search/${departure}/${arrival}/${date}`
         fetch(urlTickets)
                .then(response => response.json())
                .then((data) => {
                    const resultsContainer = document.querySelector('.right1');
                    resultsContainer.innerHTML = '';

                    if (data.tickets && data.tickets.length > 0) {
                        for (let i = 0; i < data.tickets.length; i++) {
                            const ticket = data.tickets[i];

                            const resDate = (dateString) => {
                                const d = new Date(dateString);
                                const hours = String(d.getHours()).padStart(2, '0');
                                const minutes = String(d.getMinutes()).padStart(2, '0');
                                return `${hours}:${minutes}`;
                            }; 

                            document.querySelector('.right1').innerHTML+=`
                                    <div class="result-line">
                                        <p><span class="res-departure">${ticket.departure}</span> > <span id="res-arrival">${ticket.arrival}</span></p>
                                        <p class="res-time">${resDate(ticket.date)}</p>
                                        <p class="res-price"><span>${ticket.price}</span>€</p>  
                                    </div>`;
                            
                        };
                        document.querySelector('.right1').style.display = 'flex';
                        document.querySelector('.right').style.display = 'none';
                        document.querySelector('.right2').style.display = 'none';
                    } else {
                        document.querySelector('.right1').style.display = 'none';
                        document.querySelector('.right').style.display = 'none';
                        document.querySelector('.right2').style.display = 'flex';
                    };
                })
                .catch(err => {
                    console.error(err);
                    alert("An error occurred while fetching tickets.");
        });
    }
});

    

   