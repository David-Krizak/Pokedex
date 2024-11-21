document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing game...");

    const guessInput = document.getElementById('guessInput');
    const result = document.getElementById('result');
    const championImage = document.getElementById('championImage');
    const guessButton = document.getElementById('guessButton');

    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json';
    const imageBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    console.log("Fetching data...");
    const response = await fetch(baseUrl);
    const data = await response.json();
    const champions = Object.values(data.data);
    console.log("Champions fetched:", champions);

    const randomChampion = champions[Math.floor(Math.random() * champions.length)];
    console.log("Random champion selected:", randomChampion);

    championImage.src = `${imageBaseUrl}${randomChampion.id}_0.jpg`;

    guessButton.addEventListener('click', () => {
        const userGuess = guessInput.value.trim().toLowerCase();

        if (userGuess === randomChampion.name.toLowerCase()) {
            result.textContent = `Točno! Pogodili ste ${randomChampion.name}!`;
            result.classList.add('bg-success', 'text-white', 'rounded');
            result.classList.remove('bg-danger');
        } else {
            result.textContent = 'Pokušajte ponovno!';
            result.classList.add('bg-danger', 'text-white', 'rounded');
            result.classList.remove('bg-success');
        }
    });
});
