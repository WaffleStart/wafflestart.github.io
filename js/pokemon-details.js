 
document.addEventListener("DOMContentLoaded", () => {
    const pokemonSection = document.getElementById("pokemon-details");
    const pokemonId = pokemonSection.dataset.pokemonId;
    const loadingIndicator = document.getElementById("loading-indicator");
    const pokemonInfo = document.getElementById("pokemon-info");
    const errorContainer = document.getElementById("error-container");
    
 
    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
    };
    
 
    function capitalize(str) {
        if (!str) return '';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    function showError(message) {
        errorContainer.textContent = message || "Error loading Pokémon. Redirecting to Pokédex...";
        errorContainer.classList.remove("hidden");
        loadingIndicator.style.display = "none";
        setTimeout(() => {
            window.location.href = "pokedex.html";
        }, 3000);
    }
    
    function convertHeightToImperial(decimeters) {
        const totalInches = decimeters * 3.937;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return `${feet}'${inches}"`;
    }
    
    function convertWeightToImperial(hectograms) {
        const pounds = Math.round(hectograms / 4.536);
        return `${pounds} lbs`;
    }
    
    function getStatColor(value) {
        if (value < 50) return "#ff5959";
        if (value < 80) return "#ffa659";
        if (value < 100) return "#ffdd59";
        if (value < 120) return "#a0db8e";
        return "#59ff59";
    }
    
    function formatMethod(method) {
        switch(method) {
            case "level-up": return "Level Up";
            case "machine": return "TM/HM";
            case "egg": return "Breeding";
            case "tutor": return "Move Tutor";
            default: return capitalize(method.replace('-', ' '));
        }
    }
    
    function formatStatName(statName) {
        switch(statName) {
            case "hp": return "HP";
            case "attack": return "Attack";
            case "defense": return "Defense";
            case "special-attack": return "Sp. Atk";
            case "special-defense": return "Sp. Def";
            case "speed": return "Speed";
            default: return capitalize(statName);
        }
    }
    
 
    const API_CACHE = {};
    
    async function fetchAPI(url) {
        if (API_CACHE[url]) {
            return API_CACHE[url];
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            API_CACHE[url] = data;
            return data;
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        }
    }
    
 
    async function renderPokemonDetails() {
        try {
 
            const pokemon = await fetchAPI(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            
 
            loadingIndicator.style.display = "none";
            pokemonInfo.classList.remove("hidden");
            
 
            document.title = `${capitalize(pokemon.name)} | Pokédex`;
            
 
            document.getElementById("pokemon-id").textContent = pokemon.id;
            document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
            
 
            const typesContainer = document.getElementById("pokemon-types");
            typesContainer.innerHTML = '';
            pokemon.types.forEach(typeInfo => {
                const typeName = typeInfo.type.name;
                const typeElement = document.createElement("span");
                typeElement.classList.add("type-badge");
                typeElement.style.backgroundColor = typeColors[typeName];
                typeElement.textContent = capitalize(typeName);
                typesContainer.appendChild(typeElement);
            });
            
 
            if (pokemon.sprites.front_default) {
                document.getElementById("sprite-front-default").src = pokemon.sprites.front_default;
            }
            if (pokemon.sprites.front_shiny) {
                document.getElementById("sprite-front-shiny").src = pokemon.sprites.front_shiny;
            }
            
 
            let heightInMeters = pokemon.height / 10;
            let weightInKg = pokemon.weight / 10;
            document.getElementById("pokemon-height").innerHTML = `${heightInMeters} m <span class="imperial">(${convertHeightToImperial(pokemon.height)})</span>`;
            document.getElementById("pokemon-weight").innerHTML = `${weightInKg} kg <span class="imperial">(${convertWeightToImperial(pokemon.weight)})</span>`;
            
 
            const statsContainer = document.getElementById("stats-container");
            statsContainer.innerHTML = '';
            let totalStats = 0;
            
            pokemon.stats.forEach(statInfo => {
                const statName = statInfo.stat.name;
                const baseStat = statInfo.base_stat;
                totalStats += baseStat;
                
                const statItem = document.createElement("div");
                statItem.classList.add("stat-item");
                
                const statNameElement = document.createElement("div");
                statNameElement.classList.add("stat-name");
                statNameElement.textContent = formatStatName(statName);
                
                const statBarContainer = document.createElement("div");
                statBarContainer.classList.add("stat-bar-container");
                
                const statBar = document.createElement("div");
                statBar.classList.add("stat-bar");
                const barWidth = Math.min(100, (baseStat / 255) * 100);
                statBar.style.width = `${barWidth}%`;
                statBar.style.backgroundColor = getStatColor(baseStat);
                
                const statValue = document.createElement("div");
                statValue.classList.add("stat-value");
                statValue.textContent = baseStat;
                
                statBarContainer.appendChild(statBar);
                statItem.appendChild(statNameElement);
                statItem.appendChild(statBarContainer);
                statItem.appendChild(statValue);
                statsContainer.appendChild(statItem);
            });
            
            document.getElementById("stats-total-value").textContent = totalStats;
            
 
            const abilitiesList = document.getElementById("abilities-list");
            abilitiesList.innerHTML = '';
            pokemon.abilities.forEach(abilityInfo => {
                const abilityItem = document.createElement("li");
                let abilityName = capitalize(abilityInfo.ability.name);
                if (abilityInfo.is_hidden) {
                    abilityItem.classList.add("hidden-ability");
                    abilityName += " (Hidden)";
                }
                abilityItem.textContent = abilityName;
                abilityItem.setAttribute("data-ability-url", abilityInfo.ability.url);
                
 
                const abilityContainer = document.createElement("div");
                abilityContainer.classList.add("ability-container");
                
 
                abilityContainer.appendChild(abilityItem);
                
 
                const descriptionContainer = document.createElement("div");
                descriptionContainer.classList.add("ability-description");
                descriptionContainer.classList.add("hidden");
                descriptionContainer.setAttribute("id", `ability-desc-${abilityInfo.ability.name}`);
                
 
                abilityContainer.appendChild(descriptionContainer);
                
 
                abilityItem.addEventListener("click", loadAbilityDescription);
                
 
                abilitiesList.appendChild(abilityContainer);
            });
            
 

 
const movesList = document.getElementById("moves-list");
movesList.innerHTML = '';

 
const moves = pokemon.moves.flatMap(moveInfo => {
    return moveInfo.version_group_details
        .filter(detail => detail.version_group.name === "scarlet-violet") 
        .map(detail => ({
            name: moveInfo.move.name,
            method: detail.move_learn_method.name,
            level: detail.level_learned_at
        }));
});

 
moves.sort((a, b) => {
    if (a.method === "level-up" && b.method === "level-up") {
        return a.level - b.level;
    } else if (a.method === "level-up") {
        return -1;
    } else if (b.method === "level-up") {
        return 1;
    } else {
        return a.name.localeCompare(b.name);
    }
});

 
moves.forEach(move => {
    const moveRow = document.createElement("tr");
    
    const nameCell = document.createElement("td");
    nameCell.textContent = capitalize(move.name);
    
    const levelCell = document.createElement("td");
    levelCell.textContent = move.method === "level-up" ? move.level : "-";
    
    const methodCell = document.createElement("td");
    methodCell.textContent = formatMethod(move.method);
    
    moveRow.appendChild(nameCell);
    moveRow.appendChild(levelCell);
    moveRow.appendChild(methodCell);
    movesList.appendChild(moveRow);
});
 
            document.getElementById("move-search").addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = movesList.querySelectorAll("tr");
                
                rows.forEach(row => {
                    const moveName = row.cells[0].textContent.toLowerCase();

                    if (moveName.includes(searchTerm)) {
                        row.style.display = "";
                    } else {
                        row.style.display = "none";
                    }
                });
            });
            
 
            const prevPokemon = document.getElementById("prev-pokemon");
            const nextPokemon = document.getElementById("next-pokemon");
            const maxPokemon = 1025;
            
            prevPokemon.href = `pokemon-details.html?id=${pokemon.id > 1 ? pokemon.id - 1 : maxPokemon}`;
            nextPokemon.href = `pokemon-details.html?id=${pokemon.id < maxPokemon ? pokemon.id + 1 : 1}`;
            
        } catch (error) {
            console.error("Error rendering Pokemon details:", error);
            showError("Failed to load Pokémon data. Please try again later.");
        }
    }
    
 
    async function loadAbilityDescription() {
        const abilityUrl = this.getAttribute("data-ability-url");
        const abilityName = this.textContent.toLowerCase().replace(' (hidden)', '').replace(/\s+/g, '-');
        const descContainer = this.parentNode.querySelector(`.ability-description`);
        
 
        if (descContainer.innerHTML !== '' && !descContainer.classList.contains('hidden')) {
            descContainer.classList.add('hidden');
            return;
        }
        
        try {
 
            descContainer.innerHTML = 'Loading ability details...';
            descContainer.classList.remove('hidden');
            
 
            const abilityData = await fetchAPI(abilityUrl);
            
 
            const englishEntry = abilityData.effect_entries.find(entry => entry.language.name === "en");
            const description = englishEntry ? englishEntry.effect : "No description available.";
            
 
            descContainer.innerHTML = `
                <strong>${capitalize(abilityData.name)}</strong>
                <p>${description}</p>
            `;
            
        } catch (error) {
            console.error("Error loading ability description:", error);
            descContainer.innerHTML = 'Failed to load ability details.';
        }
    }
    
 
    
 
    renderPokemonDetails();
});