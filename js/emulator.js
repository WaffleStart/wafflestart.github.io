function uploadFile() 
        {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.gba'; // Restrict file selection to .gba files
        fileInput.onchange = function () 
        {
            let file = fileInput.files[0];
            if (file) 
            {
                const reader = new FileReader();
                reader.onload = function (e) 
                {
                    // Reset emulator with the uploaded file
                    EJS_player = '#game';
                    EJS_core = 'gba';
                    EJS_gameUrl = e.target.result; // Load the uploaded file as the new ROM
                    EJS_pathtodata = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/';
                    
                    // Remove and re-add the emulator loader script to reset
                    const existingScript = document.querySelector('script[src*="loader.js"]');
                    if (existingScript) {
                        existingScript.remove();
                    }
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/loader.js';
                    document.body.appendChild(script);

                    alert(`Loaded file: ${file.name}`);
                };
                reader.readAsDataURL(file); // Convert the file to a data URL
            }
        };
        fileInput.click(); // Trigger the file input dialog
        }

function loadGame(game) {
    // Set the game based on the button pressed
    EJS_player = '#game';
    EJS_core = 'gba';
    if (game === 'emerald') {
        EJS_gameUrl = 'roms/pokemon-emerald.gba'; // Pokémon Emerald ROM
    } else if (game === 'firered') {
        EJS_gameUrl = 'roms/pokemon-firered.gba'; // Pokémon FireRed ROM
    }
    EJS_pathtodata = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/';

    // Reload the emulator script
    loadEmulatorScript();

    alert(`Loaded Pokémon ${game.charAt(0).toUpperCase() + game.slice(1)}.`);
}

function loadEmulatorScript() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/loader.js';
    document.body.appendChild(script);
}
  