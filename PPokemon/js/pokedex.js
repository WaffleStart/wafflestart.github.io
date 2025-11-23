document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025"; 
    const pokemonList = document.getElementById("pokemon-list");
    const loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    loadingIndicator.textContent = "Loading Pokémon...";
    document.querySelector("table").after(loadingIndicator);

    let allPokemon = [];
    let displayedPokemon = []; 
    let currentSortColumn = null;
    let sortDirection = 1; 
    let isLoading = false;
    let scrollThrottle = false;
    let allItemsLoaded = false; 
    

    const itemsPerPage = 100;
    let currentPage = 0;


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


    function showLoading(show) {
        loadingIndicator.style.display = show ? "block" : "none";
        isLoading = show;
    }


    showLoading(true);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            const pokemonToFetch = data.results;
            

            fetchPokemonBatches(pokemonToFetch, 0);
        })
        .catch(error => {
            console.error("Error fetching Pokémon:", error);
            showLoading(false);
        });


    function fetchPokemonBatches(pokemonArray, startIndex, batchSize = 50) {
        if (startIndex >= pokemonArray.length) {

            displayedPokemon = [...allPokemon];
            loadMorePokemon(true); 
            showLoading(false);
            return;
        }

        const endIndex = Math.min(startIndex + batchSize, pokemonArray.length);
        const currentBatch = pokemonArray.slice(startIndex, endIndex);
        
        const promises = currentBatch.map(pokemon => 
            fetch(pokemon.url).then(res => res.json())
        );

        Promise.all(promises)
            .then(pokemonData => {

                allPokemon = [...allPokemon, ...pokemonData];
                

                loadingIndicator.textContent = `Loading Pokémon... (${allPokemon.length}/${pokemonArray.length})`;
                
               
                if (allPokemon.length >= itemsPerPage && pokemonList.children.length === 0) {
                    displayedPokemon = [...allPokemon];
                    loadMorePokemon(true);
                }
                

                fetchPokemonBatches(pokemonArray, endIndex, batchSize);
            })
            .catch(error => {
                console.error("Error fetching batch:", error);
               
                fetchPokemonBatches(pokemonArray, endIndex, batchSize);
            });
    }


    function displayPokemonPage(pokemonArray, page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = pokemonArray.slice(start, end);

        if (pageItems.length === 0) {
            allItemsLoaded = true;
            return false;
        }

        const fragment = document.createDocumentFragment(); 
        
        pageItems.forEach(pokemon => {
           
            if (document.querySelector(`tr[data-id="${pokemon.id}"]`)) {
                return;
            }
            
            const row = document.createElement("tr");
            row.dataset.id = pokemon.id; 

           
            const dexNumber = document.createElement("td");
            dexNumber.textContent = pokemon.id;
            row.appendChild(dexNumber);

           
            const spriteCell = document.createElement("td");
            const spriteLink = document.createElement("a");
            spriteLink.href = `pokemon-details.php?id=${pokemon.id}`;
            const sprite = document.createElement("img");
            sprite.loading = "lazy"; 
            sprite.src = pokemon.sprites.front_default;
            sprite.alt = pokemon.name;
            spriteLink.appendChild(sprite);
            spriteCell.appendChild(spriteLink);
            row.appendChild(spriteCell);

       
            const nameCell = document.createElement("td");
            const nameLink = document.createElement("a");
            nameLink.href = `pokemon-details.php?id=${pokemon.id}`;
            nameLink.textContent = capitalize(pokemon.name);
            nameLink.style.color = "#ffffff"; 
            nameLink.style.textDecoration = "none"; 
            nameLink.style.fontWeight = "bold"; 
            nameLink.addEventListener("mouseover", () => {
                nameLink.style.textDecoration = "underline"; 
                nameLink.style.color = "#ffcc00"; 
            });
            nameLink.addEventListener("mouseout", () => {
                nameLink.style.textDecoration = "none"; 
                nameLink.style.color = "#ffffff"; 
            });
            nameCell.appendChild(nameLink);
            row.appendChild(nameCell);

           
            const typeCell = document.createElement("td");
            typeCell.innerHTML = pokemon.types
                .map(t => `<span class="type-badge" style="background-color:${typeColors[t.type.name]};">${capitalize(t.type.name)}</span>`)
                .join(" ");
            row.appendChild(typeCell);

           
            const abilityCell = document.createElement("td");
            abilityCell.textContent = pokemon.abilities.map(a => capitalize(a.ability.name)).join(", ");
            row.appendChild(abilityCell);

            fragment.appendChild(row);
        });

        pokemonList.appendChild(fragment);
        
       
        if (end >= pokemonArray.length) {
            allItemsLoaded = true;
            
        
            const endMessage = document.createElement("div");
            endMessage.id = "end-message";
            endMessage.textContent = "All Pokémon loaded!";
            endMessage.style.textAlign = "center";
            endMessage.style.padding = "20px";
            endMessage.style.color = "#666";
            
    
            const existingMessage = document.getElementById("end-message");
            if (existingMessage) {
                existingMessage.remove();
            }
            
            document.querySelector("table").after(endMessage);
            return false;
        }
        
        return pageItems.length === itemsPerPage; 
    }


    function loadMorePokemon(reset = false) {
        if (reset) {
            pokemonList.innerHTML = ""; 
            currentPage = 0;
            allItemsLoaded = false;
            
    
            const endMessage = document.getElementById("end-message");
            if (endMessage) {
                endMessage.remove();
            }
        }

        if (allItemsLoaded) {
           
            return false;
        }

        if (currentPage * itemsPerPage < displayedPokemon.length) {
            const hasMoreItems = displayPokemonPage(displayedPokemon, currentPage);
            currentPage++;
            return hasMoreItems;
        }
        
 
        allItemsLoaded = true;
        return false;
    }


    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    function filterPokemon() {
        const query = document.getElementById("search").value.toLowerCase();
        
   
        displayedPokemon = allPokemon.filter(pokemon => 
            pokemon.name.toLowerCase().includes(query) || 
            pokemon.id.toString() === query ||
            pokemon.types.some(t => t.type.name.toLowerCase().includes(query)) ||
            pokemon.abilities.some(a => a.ability.name.toLowerCase().includes(query))
        );
        
   
        if (currentSortColumn) {
            applySorting();
        }
        
    
        loadMorePokemon(true);
    }

    function sortTable(columnIndex, headerElement) {
        if (currentSortColumn !== headerElement) {
            sortDirection = 1; 
        } else {
            sortDirection *= -1; 
        }

        currentSortColumn = headerElement;

    
        document.querySelectorAll("th").forEach(th => th.classList.remove("sorted-asc", "sorted-desc"));
        
 
        headerElement.classList.add(sortDirection === 1 ? "sorted-asc" : "sorted-desc");
        
        applySorting();
   
        loadMorePokemon(true);
    }
    

    function applySorting() {
        if (!currentSortColumn) return;
        
        const columnIndex = Array.from(currentSortColumn.parentElement.children).indexOf(currentSortColumn);
        
        displayedPokemon.sort((a, b) => {
            let valA, valB;
            
            switch (columnIndex) {
                case 0: 
                    valA = a.id;
                    valB = b.id;
                    break;
                case 2: 
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                    break;
                case 3: 
                    valA = a.types[0].type.name;
                    valB = b.types[0].type.name;
                    break;
                case 4:
                    valA = a.abilities[0].ability.name;
                    valB = b.abilities[0].ability.name;
                    break;
                default:
                    return 0;
            }

            return valA > valB ? sortDirection : valA < valB ? -sortDirection : 0;
        });
    }


    window.addEventListener("scroll", () => {

        if (isLoading || scrollThrottle || allItemsLoaded) return;
        
        const scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
        const scrollPosition = window.scrollY + window.innerHeight;
        const scrollBuffer = window.innerHeight * 1.5; 
        

        if (scrollHeight - scrollPosition < scrollBuffer) {

            scrollThrottle = true;
            

            if (!allItemsLoaded) {
                setTimeout(() => {
                    const hasMoreItems = loadMorePokemon();
                    

                    if (!hasMoreItems) {

                        allItemsLoaded = true;
                    }
                    

                    setTimeout(() => {
                        scrollThrottle = false;
                    }, 100);
                }, 10);
            } else {

                scrollThrottle = false;
            }
        }
    });


    window.addEventListener("resize", () => {

        if (!allItemsLoaded) {
            window.dispatchEvent(new Event('scroll'));
        }
    });


    function checkContentHeight() {
        if (document.body.clientHeight <= window.innerHeight && !isLoading && !allItemsLoaded) {
            loadMorePokemon();
            setTimeout(checkContentHeight, 100);
        }
    }
    

    setTimeout(checkContentHeight, 500);


    window.filterPokemon = filterPokemon;
    window.sortTable = sortTable;



function makeRowsClickable() {
   
    const rows = document.querySelectorAll('#pokemon-list tr');
    
    rows.forEach(row => {
    
        if (row.hasAttribute('data-clickable')) return;
        
      
        row.setAttribute('data-clickable', 'true');
        
    
        row.addEventListener('click', (event) => {
        
            if (event.target.tagName === 'A' || event.target.parentNode.tagName === 'A') {
                return;
            }
            
          
            const pokemonId = row.dataset.id;
            
            
            window.location.href = `pokemon-details.php?id=${pokemonId}`;
        });
    });
}


setInterval(makeRowsClickable, 1000); 
});