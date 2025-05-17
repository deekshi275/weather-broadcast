// Crop recommendation system without external API dependencies

// Comprehensive crop database with location-specific recommendations
const cropDatabase = {
    'tropical': {
        crops: [
            {
                name: 'Rice',
                description: 'Staple food crop that thrives in warm, wet conditions',
                requirements: 'High rainfall, warm temperatures (20-30°C)',
                suitability: 'high',
                plantingMonths: [6, 7, 8, 9],
                harvestingMonths: [11, 12, 1, 2]
            },
            {
                name: 'Banana',
                description: 'Tropical fruit that grows well in hot, humid climates',
                requirements: 'Warm temperatures, high humidity, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4, 5, 6],
                harvestingMonths: [9, 10, 11, 12]
            },
            {
                name: 'Cassava',
                description: 'Root crop that is drought-resistant',
                requirements: 'Warm temperatures, moderate rainfall',
                suitability: 'high',
                plantingMonths: [4, 5, 6],
                harvestingMonths: [10, 11, 12]
            },
            {
                name: 'Sugarcane',
                description: 'Tropical crop that needs warm weather',
                requirements: 'Hot climate, moderate to high rainfall',
                suitability: 'high',
                plantingMonths: [2, 3, 4, 5],
                harvestingMonths: [10, 11, 12, 1]
            },
            {
                name: 'Maize',
                description: 'Grows well in warm temperatures',
                requirements: 'Warm temperatures, moderate rainfall',
                suitability: 'high',
                plantingMonths: [3, 4, 5, 6],
                harvestingMonths: [7, 8, 9, 10]
            },
            {
                name: 'Taro',
                description: 'Root crop that grows in humid conditions',
                requirements: 'High humidity, warm temperatures',
                suitability: 'high',
                plantingMonths: [3, 4, 5, 6],
                harvestingMonths: [9, 10, 11, 12]
            }
        ]
    },
    'temperate': {
        crops: [
            {
                name: 'Wheat',
                description: 'Cool-season grain crop',
                requirements: 'Moderate temperatures (15-25°C), moderate rainfall',
                suitability: 'high',
                plantingMonths: [10, 11],
                harvestingMonths: [6, 7]
            },
            {
                name: 'Apples',
                description: 'Deciduous fruit tree',
                requirements: 'Cold winters, moderate summers, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4],
                harvestingMonths: [8, 9, 10]
            },
            {
                name: 'Potatoes',
                description: 'Versatile root vegetable',
                requirements: 'Cool to moderate temperatures, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4, 5],
                harvestingMonths: [8, 9, 10]
            },
            {
                name: 'Tomatoes',
                description: 'Popular vegetable crop',
                requirements: 'Moderate temperatures, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4, 5],
                harvestingMonths: [7, 8, 9]
            },
            {
                name: 'Oats',
                description: 'Cool-season grain',
                requirements: 'Cool climate, moderate rainfall',
                suitability: 'high',
                plantingMonths: [3, 4, 5],
                harvestingMonths: [7, 8, 9]
            },
            {
                name: 'Peas',
                description: 'Cool-season legume',
                requirements: 'Cool temperatures, well-drained soil',
                suitability: 'high',
                plantingMonths: [2, 3, 4],
                harvestingMonths: [5, 6, 7]
            }
        ]
    },
    'arid': {
        crops: [
            {
                name: 'Dates',
                description: 'Drought-resistant fruit tree',
                requirements: 'Hot, dry climate, minimal rainfall',
                suitability: 'high',
                plantingMonths: [2, 3, 4],
                harvestingMonths: [8, 9, 10]
            },
            {
                name: 'Millet',
                description: 'Drought-tolerant grain crop',
                requirements: 'Hot climate, low rainfall',
                suitability: 'high',
                plantingMonths: [5, 6, 7],
                harvestingMonths: [9, 10, 11]
            },
            {
                name: 'Sorghum',
                description: 'Heat and drought-resistant grain',
                requirements: 'Hot climate, minimal water needs',
                suitability: 'high',
                plantingMonths: [4, 5, 6],
                harvestingMonths: [8, 9, 10]
            },
            {
                name: 'Pomegranate',
                description: 'Drought-tolerant fruit tree',
                requirements: 'Hot climate, well-drained soil',
                suitability: 'high',
                plantingMonths: [2, 3, 4],
                harvestingMonths: [8, 9, 10]
            },
            {
                name: 'Olives',
                description: 'Drought-resistant tree crop',
                requirements: 'Mild winters, hot summers, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4, 5],
                harvestingMonths: [10, 11, 12]
            }
        ]
    },
    'mediterranean': {
        crops: [
            {
                name: 'Olives',
                description: 'Drought-resistant tree crop',
                requirements: 'Mild winters, hot summers, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4, 5],
                harvestingMonths: [10, 11, 12]
            },
            {
                name: 'Grapes',
                description: 'Versatile fruit for wine and table',
                requirements: 'Mild climate, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4],
                harvestingMonths: [8, 9, 10]
            },
            {
                name: 'Citrus',
                description: 'Various citrus fruits',
                requirements: 'Mild winters, hot summers, moderate rainfall',
                suitability: 'high',
                plantingMonths: [3, 4, 5],
                harvestingMonths: [11, 12, 1]
            },
            {
                name: 'Figs',
                description: 'Drought-tolerant fruit tree',
                requirements: 'Mild climate, well-drained soil',
                suitability: 'high',
                plantingMonths: [3, 4],
                harvestingMonths: [7, 8, 9]
            },
            {
                name: 'Almonds',
                description: 'Nut tree that thrives in Mediterranean climate',
                requirements: 'Mild winters, hot summers, well-drained soil',
                suitability: 'high',
                plantingMonths: [2, 3],
                harvestingMonths: [8, 9]
            }
        ]
    }
};

// Location to climate zone mapping
const locationClimateMap = {
    'india': 'tropical',
    'thailand': 'tropical',
    'brazil': 'tropical',
    'indonesia': 'tropical',
    'malaysia': 'tropical',
    'philippines': 'tropical',
    'usa': 'temperate',
    'canada': 'temperate',
    'france': 'temperate',
    'germany': 'temperate',
    'uk': 'temperate',
    'japan': 'temperate',
    'saudi arabia': 'arid',
    'egypt': 'arid',
    'australia': 'arid',
    'uae': 'arid',
    'qatar': 'arid',
    'kuwait': 'arid',
    'spain': 'mediterranean',
    'italy': 'mediterranean',
    'greece': 'mediterranean',
    'portugal': 'mediterranean',
    'morocco': 'mediterranean',
    'turkey': 'mediterranean'
};

// Indian cities and their climate zones
const indianCitiesClimateMap = {
    'mumbai': 'tropical',
    'delhi': 'temperate',
    'bangalore': 'tropical',
    'chennai': 'tropical',
    'kolkata': 'tropical',
    'hyderabad': 'tropical',
    'pune': 'tropical',
    'ahmedabad': 'arid',
    'jaipur': 'arid',
    'lucknow': 'temperate',
    'kanpur': 'temperate',
    'nagpur': 'tropical',
    'indore': 'tropical',
    'thane': 'tropical',
    'bhopal': 'tropical',
    'visakhapatnam': 'tropical',
    'patna': 'tropical',
    'vadodara': 'tropical',
    'ghaziabad': 'temperate',
    'ludhiana': 'temperate',
    'agra': 'temperate',
    'nashik': 'tropical',
    'faridabad': 'temperate',
    'aurangabad': 'tropical',
    'rajkot': 'arid',
    'meerut': 'temperate',
    'jabalpur': 'tropical',
    'srinagar': 'temperate',
    'amritsar': 'temperate',
    'vijayawada': 'tropical',
    'raipur': 'tropical',
    'kota': 'arid',
    'guwahati': 'tropical',
    'chandigarh': 'temperate',
    'thiruvananthapuram': 'tropical',
    'kochi': 'tropical',
    'dehradun': 'temperate',
    'shimla': 'temperate',
    'darjeeling': 'temperate',
    'shivamogga': 'tropical',
    'mysore': 'tropical',
    'mangalore': 'tropical',
    'hubli': 'tropical',
    'belgaum': 'tropical',
    'gulbarga': 'tropical',
    'davanagere': 'tropical',
    'bellary': 'tropical',
    'bijapur': 'tropical',
    'karwar': 'tropical',
    'udupi': 'tropical',
    'hassan': 'tropical',
    'tumkur': 'tropical',
    'kolar': 'tropical',
    'mandya': 'tropical',
    'hassan': 'tropical',
    'chikmagalur': 'tropical',
    'kodagu': 'tropical',
    'chamrajnagar': 'tropical',
    'mysore': 'tropical',
    'bangalore': 'tropical',
    'tumkur': 'tropical',
    'kolar': 'tropical',
    'mandya': 'tropical',
    'hassan': 'tropical',
    'chikmagalur': 'tropical',
    'kodagu': 'tropical',
    'chamrajnagar': 'tropical'
};

// Function to get month name from number
function getMonthName(monthNumber) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
}

// Function to get season based on month
function getSeason(month) {
    const monthNum = parseInt(month);
    if (monthNum >= 3 && monthNum <= 5) return 'Spring';
    if (monthNum >= 6 && monthNum <= 8) return 'Summer';
    if (monthNum >= 9 && monthNum <= 11) return 'Autumn';
    return 'Winter';
}

// Function to determine climate zone based on location
function getClimateZone(location) {
    // Check if it's an Indian city
    const locationLower = location.toLowerCase();
    if (indianCitiesClimateMap[locationLower]) {
        return indianCitiesClimateMap[locationLower];
    }
    
    // Check if it's a country
    if (locationClimateMap[locationLower]) {
        return locationClimateMap[locationLower];
    }
    
    // Check if location contains any country name
    for (const country in locationClimateMap) {
        if (locationLower.includes(country)) {
            return locationClimateMap[country];
        }
    }
    
    // Default to tropical if unknown
    return 'tropical';
}

// Function to get crop recommendations based on location and month
function getCropRecommendations(location, month) {
    const climateZone = getClimateZone(location);
    const monthNum = parseInt(month);
    const season = getSeason(month);
    
    // Get all crops for the climate zone
    const climateCrops = cropDatabase[climateZone].crops;
    
    // Filter crops based on planting and harvesting months
    const suitableCrops = climateCrops.filter(crop => {
        // Check if the month is in planting or harvesting months
        return crop.plantingMonths.includes(monthNum) || 
               crop.harvestingMonths.includes(monthNum);
    });
    
    // If no crops are suitable for the month, return all crops for the climate zone
    if (suitableCrops.length === 0) {
        return climateCrops.map(crop => ({
            name: crop.name,
            description: crop.description,
            requirements: crop.requirements,
            activity: 'Not in planting or harvesting season',
            suitability: crop.suitability
        }));
    }
    
    // Return suitable crops with activity information
    return suitableCrops.map(crop => {
        let activity = '';
        if (crop.plantingMonths.includes(monthNum)) {
            activity = 'Planting';
        } else if (crop.harvestingMonths.includes(monthNum)) {
            activity = 'Harvesting';
        }
        
        return {
            name: crop.name,
            description: crop.description,
            requirements: crop.requirements,
            activity: activity,
            suitability: crop.suitability
        };
    });
}

// Function to get Shivamogga-specific recommendations
function getShivamoggaRecommendations(month) {
    const monthNum = parseInt(month);
    
    // Based on Karnataka's climate and Shivamogga's agricultural patterns
    if (monthNum >= 6 && monthNum <= 9) { // Monsoon season
        return [
            {
                name: 'Rice',
                description: 'Main crop during monsoon season in Shivamogga',
                requirements: 'High rainfall, warm temperatures',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Sugarcane',
                description: 'Important cash crop in the region',
                requirements: 'Moderate to high rainfall, fertile soil',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Maize',
                description: 'Grown as a secondary crop',
                requirements: 'Well-drained soil, moderate rainfall',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Ragi (Finger Millet)',
                description: 'Traditional crop of the region',
                requirements: 'Moderate rainfall, well-drained soil',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Vegetables',
                description: 'Various vegetables including tomatoes, beans, and leafy greens',
                requirements: 'Moderate temperatures, well-drained soil',
                activity: 'Planting',
                suitability: 'high'
            }
        ];
    } else if (monthNum >= 10 && monthNum <= 12) { // Post-monsoon
        return [
            {
                name: 'Rice',
                description: 'Harvesting of Kharif rice',
                requirements: 'Dry weather for harvesting',
                activity: 'Harvesting',
                suitability: 'high'
            },
            {
                name: 'Ragi (Finger Millet)',
                description: 'Traditional crop of the region',
                requirements: 'Moderate rainfall, well-drained soil',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Vegetables',
                description: 'Various vegetables including tomatoes, beans, and leafy greens',
                requirements: 'Moderate temperatures, well-drained soil',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Coffee',
                description: 'Important plantation crop in Shivamogga',
                requirements: 'Cool climate, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            },
            {
                name: 'Pepper',
                description: 'Spice crop grown in the region',
                requirements: 'Moderate temperatures, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            }
        ];
    } else if (monthNum >= 1 && monthNum <= 3) { // Winter
        return [
            {
                name: 'Ragi (Finger Millet)',
                description: 'Winter crop in the region',
                requirements: 'Cool to moderate temperatures',
                activity: 'Growing',
                suitability: 'high'
            },
            {
                name: 'Vegetables',
                description: 'Winter vegetables including carrots, peas, and cauliflower',
                requirements: 'Cool temperatures, well-drained soil',
                activity: 'Growing',
                suitability: 'high'
            },
            {
                name: 'Coffee',
                description: 'Important plantation crop in Shivamogga',
                requirements: 'Cool climate, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            },
            {
                name: 'Pepper',
                description: 'Spice crop grown in the region',
                requirements: 'Moderate temperatures, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            },
            {
                name: 'Cardamom',
                description: 'Spice crop grown in the region',
                requirements: 'Cool climate, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            }
        ];
    } else { // Summer (April-May)
        return [
            {
                name: 'Ragi (Finger Millet)',
                description: 'Harvesting of winter crop',
                requirements: 'Dry weather for harvesting',
                activity: 'Harvesting',
                suitability: 'high'
            },
            {
                name: 'Vegetables',
                description: 'Summer vegetables including okra, brinjal, and gourds',
                requirements: 'Warm temperatures, irrigation',
                activity: 'Planting',
                suitability: 'high'
            },
            {
                name: 'Coffee',
                description: 'Important plantation crop in Shivamogga',
                requirements: 'Moderate temperatures, shade',
                activity: 'Maintenance',
                suitability: 'high'
            },
            {
                name: 'Pepper',
                description: 'Spice crop grown in the region',
                requirements: 'Moderate temperatures, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            },
            {
                name: 'Cardamom',
                description: 'Spice crop grown in the region',
                requirements: 'Cool climate, well-drained soil',
                activity: 'Maintenance',
                suitability: 'high'
            }
        ];
    }
}

// Function to get fallback recommendations
function getFallbackRecommendations(location, month) {
    // Shivamogga specific recommendations
    if (location.toLowerCase().includes('shivamogga') || location.toLowerCase().includes('shimoga')) {
        return getShivamoggaRecommendations(month);
    }
    
    // Default recommendations for other locations
    return [
        {
            name: 'Local Crops',
            description: 'Consult with local agricultural experts for specific recommendations',
            requirements: 'Varies by location and season',
            suitability: 'medium'
        }
    ];
}

// Function to display crops
function displayCrops(crops, location) {
    const resultsContainer = document.getElementById('results');
    
    crops.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';
        
        cropCard.innerHTML = `
            <h3>${crop.name}</h3>
            <p>${crop.description}</p>
            <p><strong>Requirements:</strong> ${crop.requirements}</p>
            ${crop.activity ? `<p><strong>Activity:</strong> ${crop.activity}</p>` : ''}
            <span class="suitability ${crop.suitability || 'high'}">Suitable for ${location}</span>
        `;
        resultsContainer.appendChild(cropCard);
    });
}

// Main function to get recommendations
function getRecommendations() {
    const locationInput = document.getElementById('location');
    const monthSelect = document.getElementById('month');
    const resultsContainer = document.getElementById('results');
    const loadingElement = document.getElementById('loading');
    
    const location = locationInput.value.trim();
    const selectedMonth = monthSelect.value;

    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    if (!selectedMonth) {
        alert('Please select a month');
        return;
    }

    // Show loading spinner
    loadingElement.style.display = 'block';

    try {
        // Get crop recommendations based on location and month
        let recommendedCrops;
        
        // Special handling for Shivamogga
        if (location.toLowerCase().includes('shivamogga') || location.toLowerCase().includes('shimoga')) {
            recommendedCrops = getShivamoggaRecommendations(selectedMonth);
        } else {
            recommendedCrops = getCropRecommendations(location, selectedMonth);
        }
        
        // Display month information
        const monthInfo = document.createElement('div');
        monthInfo.className = 'month-info';
        monthInfo.innerHTML = `
            <h2>Recommendations for ${getMonthName(parseInt(selectedMonth))} (${getSeason(selectedMonth)})</h2>
            <p>Climate Zone: ${getClimateZone(location)}</p>
        `;
        resultsContainer.appendChild(monthInfo);

        // Display recommendations
        if (recommendedCrops.length === 0) {
            const noResults = document.createElement('div');
            noResults.style.textAlign = 'center';
            noResults.style.color = '#666';
            noResults.innerHTML = `
                <p>No specific crops recommended for ${getMonthName(parseInt(selectedMonth))} in ${location}.</p>
                <p>Consider consulting with local agricultural experts for specific recommendations.</p>
            `;
            resultsContainer.appendChild(noResults);
        } else {
            displayCrops(recommendedCrops, location);
        }

        // Add location note
        const locationNote = document.createElement('div');
        locationNote.style.textAlign = 'center';
        locationNote.style.marginTop = '20px';
        locationNote.style.color = '#666';
        locationNote.innerHTML = `Recommendations for ${location} based on climate zone and season`;
        resultsContainer.appendChild(locationNote);

    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: #e74c3c;">
                <p>Error generating recommendations. Please try again later.</p>
                <p>Using fallback recommendations instead.</p>
            </div>
        `;
        
        // Use fallback recommendations
        const fallbackCrops = getFallbackRecommendations(location, selectedMonth);
        displayCrops(fallbackCrops, location);
    } finally {
        // Hide loading spinner
        loadingElement.style.display = 'none';
    }
}

// Add event listener for Enter key
document.getElementById('location').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getRecommendations();
    }
}); 