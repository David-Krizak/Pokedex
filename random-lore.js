document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing Random Lore...");

    const loreText = document.getElementById('loreText');
    const loreImage = document.getElementById('loreImage');
    const champName = document.getElementById('champName');
    const extraText = document.getElementById('extraText');

    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json';
    const imageBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    const abilityUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion/';

    console.log("Fetching data...");
    const response = await fetch(baseUrl);
    const data = await response.json();
    const champions = Object.values(data.data);

    const randomChampion = champions[Math.floor(Math.random() * champions.length)];
    console.log("Random champion selected:", randomChampion);

    // Update page title and content
    document.title = `${randomChampion.name} - Random Lore`;
    champName.textContent = `${randomChampion.name} - ${randomChampion.title}`;
    loreImage.src = `${imageBaseUrl}${randomChampion.id}_0.jpg`;
    loreText.textContent = randomChampion.blurb;
});
