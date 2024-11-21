document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing game...");

    const guessInput = document.getElementById('guessInput');
    const championImage = document.getElementById('championImage');
    const guessButton = document.getElementById('guessButton');
    const newGameButton = document.getElementById('newGameButton');
    const giveUpButton = document.getElementById('giveUpButton');

    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json';
    const imageBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    let randomChampion;

    // Function to fetch a random champion
    async function loadNewChampion() {
        console.log("Fetching data...");
        const response = await fetch(baseUrl);
        const data = await response.json();
        const champions = Object.values(data.data);
        console.log("Champions fetched:", champions);

        randomChampion = champions[Math.floor(Math.random() * champions.length)];
        console.log("Random champion selected:", randomChampion);

        championImage.src = `${imageBaseUrl}${randomChampion.id}_0.jpg`;
        guessInput.value = '';
    }

    // Initialize the game with a random champion
    await loadNewChampion();

    // Guess Button
    guessButton.addEventListener('click', () => {
        const userGuess = guessInput.value.trim().toLowerCase();

        if (userGuess === randomChampion.name.toLowerCase()) {
            $.notify(`Točno! Pogodili ste ${randomChampion.name}!`, {
                className: 'success',
                position: 'top center',
            });
        } else {
            $.notify('Pokušajte ponovno!', {
                className: 'error',
                position: 'top center',
            });
        }
    });

    // New Game Button
    newGameButton.addEventListener('click', async () => {
        await loadNewChampion(); // No Notify.js here
        console.log("New champion loaded.");
    });

    // Give Up Button
    giveUpButton.addEventListener('click', () => {
        $.notify(`Predali ste se! Champion je bio ${randomChampion.name}.`, {
            className: 'warn',
            position: 'top center',
        });
    });
});
