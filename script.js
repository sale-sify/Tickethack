const departure = document.querySelector('.input-departure');
const arrival = document. querySelector('.input-arrival');
const date = document.querySelector('#date');
const btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', 
    function() {
        const urlTickets = `https://localhost:3001/${departure}/${arrival}/${date}`
         fetch(urlTickets)
                .then(response => response.json())
                .then((data) => {
            console.log(data.departure, data.arrival, data.date, data.price);
            const resDeparture = data.departure
            const resArrival = data.arrival
            const resDate = data.date /*Faire une fonction pour sortir l'heure*/
            const resPrice = data.price
            
            if (date.departure) {
                document.querySelector('right1').innerHTML+=`
                    <div>
                        <p>${resDeparture}</p>
                        <p>${resArrival}</p>
                        <p>${resPrice}</p>
                        <p>${resDate}</p>
                    </div>`
            } else {
                    document.querySelector('right1').innerHTML+=`
                    <div>
                        <img src="/Images/notfound.png" alt="No result image Tickethack">
                        <p>No result Found.</p>
                    </div>`
            }
                })
        document.querySelector('.right').style.display = 'none';
        document.querySelector('.right1').style.display = 'flex';    
    });