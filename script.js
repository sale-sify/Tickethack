const departure = document.querySelector('.input-departure');
const arrival = document. querySelector('.input-arrival');
const date = document.querySelector('#date');
const btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', 
    function() {
        const urlTickets = `http://localhost:3001/${departure}/${arrival}/${date}`
         fetch(urlTickets)
                .then(response => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            
                            console.log(data[i].departure, data[i].arrival, data[i].date, data[i].price);

                            const resDeparture = data[i].departure;
                            const resArrival = data[i].arrival;

                            const resDate = function time (date) {
                                date = new Date(data[i].date);
                                return date.getHours
                            }; 

                            const resPrice = data[i].price;

                            document.querySelector('right1').innerHTML+=`
                                        <div>
                                            <p>${resDeparture} > ${resArrival}</p>
                                            <p>${resDate}</p>
                                            <p>${resPrice}</p>  
                                        </div>`;
                        } 
                    } else {
                        document.querySelector('right1').innerHTML+=`
                            <div>
                                <img src="/Images/notfound.png" alt="No result image Tickethack">
                                <p>No result Found.</p>
                            </div>`;
                    };
            document.querySelector('.right').style.display = 'none';
            document.querySelector('.right1').style.display = 'flex';
            document.querySelector('.right1 > div').style.display = 'flex';    
        });
    });

   