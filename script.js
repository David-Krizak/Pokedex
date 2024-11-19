document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing game...");

    const guessInput = document.getElementById('guessInput');
    const result = document.getElementById('result');
    const championImage = document.getElementById('championImage');
    const guessButton = document.querySelector('button');

    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json';
    const imageBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    console.log("dohvati podatke.");
    const response = await fetch(baseUrl);
    const data = await response.json();
    const champions = Object.values(data.data);
    console.log("Dohvacen data: ", champions);

    const randomChampion = champions[Math.floor(Math.random() * 168)]; // Zasad imamo samo 168 champa
    console.log("Random champ je: ", randomChampion);

    // svaki champ ima splashart a link za art je npr https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg 
    // Sufix _0 jer je to base image, sufix _1 je prvi skin _2 drugi itd... Ako champ ima vise od 1 skin
    championImage.src = `${imageBaseUrl}${randomChampion.id}_0.jpg`;
    console.log("Prikazan ", championImage.src);

    guessButton.addEventListener('click', () => {
        const userGuess = guessInput.value.trim().toLowerCase();
        console.log("User input:", userGuess);
    
        if (userGuess === randomChampion.name.toLowerCase()) {
            console.log("Correct guess:", randomChampion.name);
    
            result.textContent = `Točno! Pogodili ste  ${randomChampion.name}!`;
            result.classList.add('bg-success', 'text-white', 'rounded'); // dodaj klasu za bootstrap da se vidi na pozadini
            result.classList.remove('bg-danger');
        } else {
            console.log("Krivo, pravo ime je ", randomChampion.name);
    
            result.textContent = 'Pokušajte ponovno!';
            result.classList.add('bg-danger', 'text-white', 'rounded');  // dodaje klasu bootstrapu za fail 
            result.classList.remove('bg-success');
        }
    });
    
});
