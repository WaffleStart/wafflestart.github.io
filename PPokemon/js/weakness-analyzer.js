
 
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

 
function displayResults(results) {
 
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
    
 
    const weaknessesDiv = document.getElementById('weaknesses');
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
    
 
    const resistancesDiv = document.getElementById('resistances');
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
    
 
    const immunitiesDiv = document.getElementById('immunities');
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
    
 
    const typeDisplayDiv = document.getElementById('type-display');
    typeDisplayDiv.innerHTML = '';
    
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
}

 
document.addEventListener('DOMContentLoaded', function() {
    const primaryTypeSelect = document.getElementById('primary-type');
    const secondaryTypeSelect = document.getElementById('secondary-type');
    
    function updateAnalysis() {
        const primaryType = primaryTypeSelect.value;
        const secondaryType = secondaryTypeSelect.value === primaryType ? '' : secondaryTypeSelect.value;
        
        if (primaryType) {
            const results = calculateTypeEffectiveness(primaryType, secondaryType);
            displayResults(results);
        } else {
 
            document.getElementById('weaknesses').innerHTML = '<p>Select a type to see weaknesses</p>';
            document.getElementById('resistances').innerHTML = '<p>Select a type to see resistances</p>';
            document.getElementById('immunities').innerHTML = '<p>Select a type to see immunities</p>';
            document.getElementById('type-display').innerHTML = '<p>Select at least one type</p>';
        }
    }
    
    primaryTypeSelect.addEventListener('change', function() {
 
        if (this.value === secondaryTypeSelect.value) {
            secondaryTypeSelect.value = '';
        }
        updateAnalysis();
    });
    
    secondaryTypeSelect.addEventListener('change', function() {
 
        if (this.value === primaryTypeSelect.value && this.value !== '') {
            this.value = '';
        }
        updateAnalysis();
    });
});