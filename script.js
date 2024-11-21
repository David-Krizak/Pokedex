document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing particles.js...");


    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 1000,
                },
            },
            color: { value: "#636363" },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000",
                },
            },
            opacity: {
                value: 0.5,
                random: true,
            },
            size: {
                value: 3,
                random: true,
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true,
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 1 } },
                bubble: {
                    distance: 400,
                    size: 80,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: { distance: 200, duration: 0.3 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
            },
        },
        retina_detect: true,
    });

    console.log("Pokretanje...");

    const guessInput = document.getElementById('guessInput');
    const championImage = document.getElementById('championImage');
    const guessButton = document.getElementById('guessButton');
    const newGameButton = document.getElementById('newGameButton');
    const giveUpButton = document.getElementById('giveUpButton');

    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json';
    const imageBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

    let randomChampion;


    async function loadNewChampion() {
        console.log("Dohvačamo championa");
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            const champions = Object.values(data.data);

            randomChampion = champions[Math.floor(Math.random() * champions.length)];
            console.log("Odabrani champ je:", randomChampion);


            championImage.src = `${imageBaseUrl}${randomChampion.id}_0.jpg`;
            guessInput.value = '';
        } catch (error) {
            console.error("Eerror ", error);
        }
    }


    await loadNewChampion();


    function notify(message, type) {
        $.notify(message, {
            className: type,
            position: 'top center',
            autoHideDelay: 2000, 
        });
    }


    guessButton.addEventListener('click', () => {
        const userGuess = guessInput.value.trim().toLowerCase();

        if (userGuess === randomChampion.name.toLowerCase()) {
            notify(`Točno! Pogodili ste ${randomChampion.name}!`, 'success');
        } else {
            notify('Pokušajte ponovno!', 'error');
        }
    });

    newGameButton.addEventListener('click', async () => {
        await loadNewChampion();
        notify('Nova igra započeta! Pokušajte pogoditi novog championa.', 'info');
    });


    giveUpButton.addEventListener('click', () => {
        notify(`Predali ste se! Champion je bio ${randomChampion.name}.`, 'warn');
    });
});
