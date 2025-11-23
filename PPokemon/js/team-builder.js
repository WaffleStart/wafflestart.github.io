 
const typeEffectiveness = {
    normal: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1
    },
    fire: {
        normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1
    },
    water: {
        normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1
    },
    electric: {
        normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1
    },
    grass: {
        normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1
    },
    ice: {
        normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1
    },
    fighting: {
        normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2, fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5
    },
    poison: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1, fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2
    },
    ground: {
        normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1, fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1
    },
    flying: {
        normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1
    },
    psychic: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1
    },
    bug: {
        normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1, fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5
    },
    rock: {
        normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1
    },
    ghost: {
        normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1
    },
    dragon: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0
    },
    dark: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5
    },
    steel: {
        normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2
    },
    fairy: {
        normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1
    }
};

 
function calculateTypeEffectiveness(primaryType, secondaryType) {
    const types = Object.keys(typeEffectiveness);
    const results = {};
    
 
    types.forEach(attackingType => {
        let multiplier = 1;
        
 
        if (primaryType && typeEffectiveness[attackingType][primaryType] !== undefined) {
            multiplier *= typeEffectiveness[attackingType][primaryType];
        }
        
 
        if (secondaryType && typeEffectiveness[attackingType][secondaryType] !== undefined) {
            multiplier *= typeEffectiveness[attackingType][secondaryType];
        }
        
        results[attackingType] = multiplier;
    });
    
    return results;
}

 
function displayPokemonEffectiveness(pokemonRow, results) {
 
    const weaknesses4x = [];
    const weaknesses2x = [];
    const normal1x = [];
    const resistances05x = [];
    const resistances025x = [];
    const immunities0x = [];
    
 
    Object.entries(results).forEach(([type, multiplier]) => {
        if (multiplier === 0) {
            immunities0x.push(type);
        } else if (multiplier === 0.25) {
            resistances025x.push(type);
        } else if (multiplier === 0.5) {
            resistances05x.push(type);
        } else if (multiplier === 1) {
            normal1x.push(type);
        } else if (multiplier === 2) {
            weaknesses2x.push(type);
        } else if (multiplier === 4) {
            weaknesses4x.push(type);
        }
    });
    
 
    const weaknessesDiv = pokemonRow.querySelector('.weaknesses');
    weaknessesDiv.innerHTML = '';
    
    if (weaknesses4x.length === 0 && weaknesses2x.length === 0) {
        weaknessesDiv.innerHTML = '<p>No weaknesses!</p>';
    } else {
        if (weaknesses4x.length > 0) {
            const weak4xDiv = document.createElement('div');
            weak4xDiv.className = 'effectiveness-group';
            weak4xDiv.innerHTML = '<span class="multiplier multiplier-4x">4×</span>';
            
            weaknesses4x.forEach(type => {
                const badge = document.createElement('span');
                badge.className = `type-badge ${type}`;
                badge.textContent = type;
                weak4xDiv.appendChild(badge);
            });
            
            weaknessesDiv.appendChild(weak4xDiv);
        }
        
        if (weaknesses2x.length > 0) {
            const weak2xDiv = document.createElement('div');
            weak2xDiv.className = 'effectiveness-group';
            weak2xDiv.innerHTML = '<span class="multiplier multiplier-2x">2×</span>';
            
            weaknesses2x.forEach(type => {
                const badge = document.createElement('span');
                badge.className = `type-badge ${type}`;
                badge.textContent = type;
                weak2xDiv.appendChild(badge);
            });
            
            weaknessesDiv.appendChild(weak2xDiv);
        }
    }
    
 
    const resistancesDiv = pokemonRow.querySelector('.resistances');
    resistancesDiv.innerHTML = '';
    
    if (resistances05x.length === 0 && resistances025x.length === 0) {
        resistancesDiv.innerHTML = '<p>No resistances!</p>';
    } else {
        if (resistances05x.length > 0) {
            const resist05xDiv = document.createElement('div');
            resist05xDiv.className = 'effectiveness-group';
            resist05xDiv.innerHTML = '<span class="multiplier multiplier-05x">½×</span>';
            
            resistances05x.forEach(type => {
                const badge = document.createElement('span');
                badge.className = `type-badge ${type}`;
                badge.textContent = type;
                resist05xDiv.appendChild(badge);
            });
            
            resistancesDiv.appendChild(resist05xDiv);
        }
        
        if (resistances025x.length > 0) {
            const resist025xDiv = document.createElement('div');
            resist025xDiv.className = 'effectiveness-group';
            resist025xDiv.innerHTML = '<span class="multiplier multiplier-025x">¼×</span>';
            
            resistances025x.forEach(type => {
                const badge = document.createElement('span');
                badge.className = `type-badge ${type}`;
                badge.textContent = type;
                resist025xDiv.appendChild(badge);
            });
            
            resistancesDiv.appendChild(resist025xDiv);
        }
    }
    
 
    const immunitiesDiv = pokemonRow.querySelector('.immunities');
    immunitiesDiv.innerHTML = '';
    
    if (immunities0x.length === 0) {
        immunitiesDiv.innerHTML = '<p>No immunities!</p>';
    } else {
        const immune0xDiv = document.createElement('div');
        immune0xDiv.className = 'effectiveness-group';
        immune0xDiv.innerHTML = '<span class="multiplier multiplier-0x">0×</span>';
        
        immunities0x.forEach(type => {
            const badge = document.createElement('span');
            badge.className = `type-badge ${type}`;
            badge.textContent = type;
            immune0xDiv.appendChild(badge);
        });
        
        immunitiesDiv.appendChild(immune0xDiv);
    }
    
 
    const typeDisplayDiv = pokemonRow.querySelector('.type-display');
    typeDisplayDiv.innerHTML = '';
    
    const primaryType = pokemonRow.querySelector('.primary-type').value;
    const secondaryType = pokemonRow.querySelector('.secondary-type').value;
    
    if (primaryType) {
        const primaryBadge = document.createElement('span');
        primaryBadge.className = `type-badge ${primaryType}`;
        primaryBadge.textContent = primaryType;
        typeDisplayDiv.appendChild(primaryBadge);
        
        if (secondaryType) {
            const secondaryBadge = document.createElement('span');
            secondaryBadge.className = `type-badge ${secondaryType}`;
            secondaryBadge.textContent = secondaryType;
            typeDisplayDiv.appendChild(secondaryBadge);
        }
    } else {
        typeDisplayDiv.innerHTML = '<p>Select at least one type</p>';
    }
    
    return {
        weaknesses: { '4x': weaknesses4x, '2x': weaknesses2x },
        resistances: { '0.5x': resistances05x, '0.25x': resistances025x },
        immunities: immunities0x
    };
}

 
function updatePokemonAnalysis(pokemonRow) {
    const primaryType = pokemonRow.querySelector('.primary-type').value;
    const secondaryType = pokemonRow.querySelector('.secondary-type').value === primaryType ? '' : pokemonRow.querySelector('.secondary-type').value;
    
    if (primaryType) {
        const results = calculateTypeEffectiveness(primaryType, secondaryType);
        return displayPokemonEffectiveness(pokemonRow, results);
    } else {
 
        pokemonRow.querySelector('.weaknesses').innerHTML = '<p>Select a type to see weaknesses</p>';
        pokemonRow.querySelector('.resistances').innerHTML = '<p>Select a type to see resistances</p>';
        pokemonRow.querySelector('.immunities').innerHTML = '<p>Select a type to see immunities</p>';
        pokemonRow.querySelector('.type-display').innerHTML = '<p>Select at least one type</p>';
        return null;
    }
}

 
function createTypeBadges(typesArray, parentElement) {
    typesArray.forEach(type => {
        const badge = document.createElement('span');
        badge.className = `type-badge ${type}`;
        badge.textContent = type;
        parentElement.appendChild(badge);
    });
}

 
function analyzeTeam() {
    const teamMembers = document.querySelectorAll('.pokemon-row');
    const teamSummary = document.getElementById('team-summary');
    const teamWeaknesses = document.getElementById('team-weaknesses');
    const teamResistances = document.getElementById('team-resistances');
    const teamImmunities = document.getElementById('team-immunities');
    const teamRating = document.getElementById('team-rating');
    
 
    teamWeaknesses.innerHTML = '';
    teamResistances.innerHTML = '';
    teamImmunities.innerHTML = '';
    teamRating.innerHTML = '';
    
 
    const allTypes = Object.keys(typeEffectiveness);
    const teamAnalysis = {
        weaknessCount: {},
        resistanceCount: {},
        immunityCount: {}
    };
    
 
    allTypes.forEach(type => {
        teamAnalysis.weaknessCount[type] = 0;
        teamAnalysis.resistanceCount[type] = 0;
        teamAnalysis.immunityCount[type] = 0;
    });
    
 
    let validPokemonCount = 0;
    teamMembers.forEach(pokemonRow => {
        const analysis = updatePokemonAnalysis(pokemonRow);
        
        if (analysis) {
            validPokemonCount++;
            
 
            analysis.weaknesses['4x'].forEach(type => teamAnalysis.weaknessCount[type] += 2);
            analysis.weaknesses['2x'].forEach(type => teamAnalysis.weaknessCount[type] += 1);
            
 
            analysis.resistances['0.5x'].forEach(type => teamAnalysis.resistanceCount[type] += 1);
            analysis.resistances['0.25x'].forEach(type => teamAnalysis.resistanceCount[type] += 2);
            
 
            analysis.immunities.forEach(type => teamAnalysis.immunityCount[type] += 1);
        }
    });
    
 
    if (validPokemonCount === 0) {
        teamSummary.style.display = 'none';
        return;
    }
    
 
    teamSummary.style.display = 'block';
    
 
    const sortedWeaknesses = Object.entries(teamAnalysis.weaknessCount)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
    const sortedResistances = Object.entries(teamAnalysis.resistanceCount)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
    const sortedImmunities = Object.entries(teamAnalysis.immunityCount)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
 
    if (sortedWeaknesses.length === 0) {
        teamWeaknesses.innerHTML = '<p>No team weaknesses! (Extremely rare)</p>';
    } else {
        sortedWeaknesses.forEach(([type, count]) => {
            const weaknessDiv = document.createElement('div');
            weaknessDiv.className = 'team-type-item';
            
            const badge = document.createElement('span');
            badge.className = `type-badge ${type}`;
            badge.textContent = type;
            
            const countBadge = document.createElement('span');
            countBadge.className = 'count-badge weakness-count';
            countBadge.textContent = count;
            
            weaknessDiv.appendChild(badge);
            weaknessDiv.appendChild(countBadge);
            teamWeaknesses.appendChild(weaknessDiv);
        });
    }
    
 
    if (sortedResistances.length === 0) {
        teamResistances.innerHTML = '<p>No team resistances! (Extremely rare)</p>';
    } else {
        sortedResistances.forEach(([type, count]) => {
            const resistanceDiv = document.createElement('div');
            resistanceDiv.className = 'team-type-item';
            
            const badge = document.createElement('span');
            badge.className = `type-badge ${type}`;
            badge.textContent = type;
            
            const countBadge = document.createElement('span');
            countBadge.className = 'count-badge resistance-count';
            countBadge.textContent = count;
            
            resistanceDiv.appendChild(badge);
            resistanceDiv.appendChild(countBadge);
            teamResistances.appendChild(resistanceDiv);
        });
    }
    
 
    if (sortedImmunities.length === 0) {
        teamImmunities.innerHTML = '<p>No team immunities!</p>';
    } else {
        sortedImmunities.forEach(([type, count]) => {
            const immunityDiv = document.createElement('div');
            immunityDiv.className = 'team-type-item';
            
            const badge = document.createElement('span');
            badge.className = `type-badge ${type}`;
            badge.textContent = type;
            
            const countBadge = document.createElement('span');
            countBadge.className = 'count-badge immunity-count';
            countBadge.textContent = count;
            
            immunityDiv.appendChild(badge);
            immunityDiv.appendChild(countBadge);
            teamImmunities.appendChild(immunityDiv);
        });
    }
    
 
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'team-rating-result';
    
 
    const teamSize = validPokemonCount;
    const maxWeakness = sortedWeaknesses.length > 0 ? sortedWeaknesses[0][1] : 0;
    const weaknessTypes = sortedWeaknesses.length;
    const resistanceTypes = sortedResistances.length;
    const immunityTypes = sortedImmunities.length;
    
    const coverageScore = (resistanceTypes + immunityTypes * 2) - weaknessTypes;
    const balanceScore = maxWeakness <= teamSize ? 1 : -1;
    
    let ratingText = '';
    let ratingClass = '';
    
    if (coverageScore >= 10 && balanceScore > 0) {
        ratingText = 'Exceptional';
        ratingClass = 'rating-exceptional';
    } else if (coverageScore >= 5 && balanceScore > 0) {
        ratingText = 'Very Good';
        ratingClass = 'rating-very-good';
    } else if (coverageScore >= 0) {
        ratingText = 'Decent';
        ratingClass = 'rating-decent';
    } else if (coverageScore >= -5) {
        ratingText = 'Below Average';
        ratingClass = 'rating-below-average';
    } else {
        ratingText = 'Poor';
        ratingClass = 'rating-poor';
    }
    
    ratingDiv.innerHTML = `<h3>Team Rating: <span class="${ratingClass}">${ratingText}</span></h3>`;
    
 
    const ratingDetails = document.createElement('div');
    ratingDetails.className = 'rating-details';
    
 
    if (maxWeakness > teamSize) {
        const problemsDiv = document.createElement('div');
        problemsDiv.className = 'team-problems';
        problemsDiv.innerHTML = `<p>Team Issues: Too many Pokémon (${maxWeakness}/${teamSize}) are weak to the same type.</p>`;
        ratingDetails.appendChild(problemsDiv);
    }
    
 
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'team-suggestions';
    
    if (weaknessTypes > 0) {
        const topWeaknesses = sortedWeaknesses.slice(0, 3);
        suggestionsDiv.innerHTML = '<p>Consider adding Pokémon that resist or are immune to: ';
        suggestionsDiv.innerHTML += topWeaknesses.map(([type]) => `<span class="type-badge ${type}">${type}</span>`).join(', ');
        suggestionsDiv.innerHTML += '</p>';
    }
    
    ratingDetails.appendChild(suggestionsDiv);
    ratingDiv.appendChild(ratingDetails);
    teamRating.appendChild(ratingDiv);
}

 
function createPokemonRow() {
    const template = document.querySelector('.pokemon-row').cloneNode(true);
    
 
    template.querySelector('.primary-type').value = '';
    template.querySelector('.secondary-type').value = '';
    template.querySelector('.weaknesses').innerHTML = '<p>Select type(s)</p>';
    template.querySelector('.resistances').innerHTML = '<p>Select type(s)</p>';
    template.querySelector('.immunities').innerHTML = '<p>Select type(s)</p>';
    template.querySelector('.type-display').innerHTML = '';
    
 
    const primaryTypeSelect = template.querySelector('.primary-type');
    const secondaryTypeSelect = template.querySelector('.secondary-type');
    
    primaryTypeSelect.addEventListener('change', function() {
        if (this.value === secondaryTypeSelect.value) {
            secondaryTypeSelect.value = '';
        }
        updatePokemonAnalysis(template);
    });
    
    secondaryTypeSelect.addEventListener('change', function() {
        if (this.value === primaryTypeSelect.value && this.value !== '') {
            this.value = '';
        }
        updatePokemonAnalysis(template);
    });
    
 
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-pokemon';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        template.remove();
    });
    
    template.querySelector('.pokemon-info').appendChild(removeButton);
    
    return template;
}

 
document.addEventListener('DOMContentLoaded', function() {
 
    const firstRow = document.querySelector('.pokemon-row');
    const primaryTypeSelect = firstRow.querySelector('.primary-type');
    const secondaryTypeSelect = firstRow.querySelector('.secondary-type');
    
    primaryTypeSelect.addEventListener('change', function() {
        if (this.value === secondaryTypeSelect.value) {
            secondaryTypeSelect.value = '';
        }
        updatePokemonAnalysis(firstRow);
    });
    
    secondaryTypeSelect.addEventListener('change', function() {
        if (this.value === primaryTypeSelect.value && this.value !== '') {
            this.value = '';
        }
        updatePokemonAnalysis(firstRow);
    });
    
 
    document.getElementById('add-pokemon').addEventListener('click', function() {
        const teamMembersDiv = document.getElementById('team-members');
        const memberCount = teamMembersDiv.children.length;

        if (memberCount < 6) {
            const newRow = createPokemonRow();
            document.getElementById('team-members').appendChild(newRow);

        }
        else{
            alert('Maximum of 6 team members reached!');
        }
    });
    
 
    document.getElementById('analyze-team').addEventListener('click', analyzeTeam);
    
 
    document.getElementById('clear-team').addEventListener('click', function() {
 
        const firstRow = document.querySelector('.pokemon-row');
        firstRow.querySelector('.primary-type').value = '';
        firstRow.querySelector('.secondary-type').value = '';
        firstRow.querySelector('.weaknesses').innerHTML = '<p>Select type(s)</p>';
        firstRow.querySelector('.resistances').innerHTML = '<p>Select type(s)</p>';
        firstRow.querySelector('.immunities').innerHTML = '<p>Select type(s)</p>';
        firstRow.querySelector('.type-display').innerHTML = '';
        
 
        const otherRows = document.querySelectorAll('.pokemon-row:not(:first-child)');
        otherRows.forEach(row => row.remove());
        
 
        document.getElementById('team-summary').style.display = 'none';
    });
});