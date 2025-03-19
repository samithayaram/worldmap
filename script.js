let selectedCountry = null;
        
// Fetch and display country details in the details panel
async function showCountryDetails() {
    document.getElementById("imageGallery").innerHTML = "";
    if (!selectedCountry) return;
    const url = `https://restcountries.com/v3.1/name/${selectedCountry}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Country not found");
        const data = await res.json();
        const countryData = data[0];
        
        // Create the HTML structure for the country details card
        const detailsPanel = document.getElementById("detailsContent");
        detailsPanel.textContent="";
        detailsPanel.innerHTML = `
        
        <div class="country-card">
                <div class="card-header">
                    <h2>${countryData.name.common}</h2>
                    <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common}">
                </div>
                <div class="details">
                    <p class="capital"><strong>Capital:</strong> ${countryData.capital ? countryData.capital[0] : 'N/A'}</p>
                    <p class="population"><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
                    <p class="region"><strong>Region:</strong> ${countryData.region}</p>
                    <p class="subregion"><strong>subregion:</strong> ${countryData.subregion}</p>
                    <p class="languages"><strong>Languages:</strong> ${Object.values(countryData.languages || {}).join(', ')}</p>
                </div>
            </div>
        
        `;
        
        // Open the details panel
        document.getElementById("detailsPanel").classList.add("open");
    } catch (error) {
        console.error(error);
        document.getElementById("detailsContent").innerHTML = "<p>Country data could not be loaded.</p>";
    }
}

// Fetch and display images related to the country
async function showFamousPlaces() {
    if (!selectedCountry) return;
    const accessKey = 'nqqN5PrwcgdzEng3auwnBrYtZrzfFv7lSFFmyDMnBCE';
    const url = `https://api.unsplash.com/search/photos?query=${selectedCountry}&client_id=${accessKey}&per_page=30`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        
        const imageGallery = document.getElementById("imageGallery");
        imageGallery.innerHTML = ""; // Clear previous images
        
        data.results.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.urls.regular;
            img.alt = photo.description || 'Country Image';
            imageGallery.appendChild(img);
        });

        document.getElementById("detailsContent").innerHTML = "";

        // Open the details panel
        document.getElementById("detailsPanel").classList.add("open");
    } catch (error) {
        console.error('Error fetching images:', error);
        document.getElementById("imageGallery").innerHTML = "<p>Images could not be loaded.</p>";
    }
}

// Fetch and display festivals for the selected country
function showFestivals() {
    document.getElementById("imageGallery").innerHTML = "";
    console.log(selectedCountry);
    
    if (!selectedCountry) return;

    const countryFestivals = datas.countries.find(
        country => country.name.toLowerCase() === selectedCountry.toLowerCase()
    );

    const detailsPanel = document.getElementById("detailsContent");

    if (!countryFestivals || !countryFestivals.festivals || countryFestivals.festivals.length === 0) {
        // Fallback message when there are no festivals
        detailsPanel.innerHTML = `
            <h2>${selectedCountry} Festivals</h2>
            <p>No festivals available for ${selectedCountry}.</p>
        `;
    } else {
        // Display festivals if they exist
        detailsPanel.innerHTML = `
            <h2>${selectedCountry} Festivals</h2>
            <div class="festival-list">
                ${countryFestivals.festivals
                    .map(
                        festival => `
                    <div class="festival-card">
                        
                        <h3>${festival.name}</h3>
                        <p>${festival.description}</p>
                        <p><strong>Date:</strong> ${festival.date}</p>
                    </div>
                `
                    )
                    .join('')}
            </div>
        `;
    }

    document.getElementById("detailsPanel").classList.add("open");
}


//  Fetch and display sports for the selected country
function showSports() {
    document.getElementById("imageGallery").innerHTML = "";
    if (!selectedCountry) return;

    const countrysports = sports.countries.find(
        country => country.name.toLowerCase() === selectedCountry.toLowerCase()
    );

    const detailsPanel = document.getElementById("detailsContent");

    if (!countrysports || !countrysports.nationalSport) {
        // Fallback message when there are no sports
        detailsPanel.innerHTML = `
            <h2>${selectedCountry} National Sports</h2>
            <p>No national sports available for ${selectedCountry}.</p>
        `;
    } else {
        // Display sports if they exist
        detailsPanel.innerHTML = `
            <h2>${selectedCountry} National Sports</h2>
            <div class="festival-list">
                <div class="festival-card">
                    <img src="${countrysports.image}" alt="${countrysports.name}">
                    <h3>${countrysports.name}</h3>
                    <p><strong>National Sport:</strong> ${countrysports.nationalSport}</p>
                    <h4>${countrysports.description}</h4>
                </div>
            </div>
        `;
    }

    document.getElementById("detailsPanel").classList.add("open");
}



// Populate options in the sidebar
function populateOptions() {
    const options = document.getElementById("options");
    options.innerHTML = ""; // Clear previous options

    const countryDetailsOption = document.createElement("div");
    countryDetailsOption.classList.add("option");
    countryDetailsOption.innerHTML =`<i class="fa-solid fa-globe"></i> Country Details`;
    countryDetailsOption.addEventListener("click", showCountryDetails);
    options.appendChild(countryDetailsOption);

    const famousPlacesOption = document.createElement("div");
    famousPlacesOption.classList.add("option");
    famousPlacesOption.innerHTML =`<i class="fa-solid fa-location-dot"></i> Famous Places`;
    famousPlacesOption.addEventListener("click", showFamousPlaces);
    options.appendChild(famousPlacesOption);

    const festivalOption = document.createElement("div");
    festivalOption.classList.add("option");
    festivalOption.innerHTML =`<i class="fa-solid fa-snowflake"></i> Festivals`;
    festivalOption.addEventListener("click", showFestivals);
    options.appendChild(festivalOption);


    const sportsOption = document.createElement("div");
    sportsOption.classList.add("option");
    sportsOption.innerHTML =`<i class="fa-solid fa-football"></i> Sports`;
    sportsOption.addEventListener("click", showSports);
    options.appendChild(sportsOption);

    // const sportsOption2 = document.createElement("div");
    // sportsOption2.classList.add("option");
    // sportsOption2.innerHTML =`<i class="fa-solid fa-cloud"></i> Weather`;
    // sportsOption2.addEventListener("click", showWeather);
    // options.appendChild(sportsOption2);


}
 


// Close the details panel
document.querySelector(".closeDetails").addEventListener("click", function() {
    document.getElementById("detailsPanel").classList.remove("open");
});

// Add event listeners to the map paths
document.querySelectorAll(".allPaths").forEach(e => {
    e.addEventListener("mouseover", function() {
        window.onmousemove = function(j) {
            const x = j.clientX;
            const y = j.clientY;
            const nameDiv = document.getElementById("name");

            // Move tooltip slightly to the right of the cursor
            nameDiv.style.transform = `translate(${x + 15}px, ${y}px)`;
        };
        
        e.style.fill = "aqua";
        document.getElementById("namep").innerText = e.id;
        document.getElementById("name").style.opacity = 1;
    });

    e.addEventListener("mouseleave", function() {
        e.style.fill = "#ececec";
        document.getElementById("name").style.opacity = 0;
        window.onmousemove = null; // Stop tracking mouse movement
    });

    e.addEventListener("click", function() {
        selectedCountry = e.id; // Set the selected country
        populateOptions(); // Populate sidebar options
        document.getElementById("sidePanel").classList.add("open");
    });
});


// Close the sidebar
document.getElementById("closeButton").addEventListener("click", function() {
    document.getElementById("sidePanel").classList.remove("open");
});


// Fetch weather details


// const weatherApiKey = "5afa4206abf5802c12aab782fc9a3eb3";
// const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const weatherIcon = document.querySelector(".weather-icon");

// // Fetch and display weather data for the selected country
// async function showWeather() {
//     document.getElementById("imageGallery").innerHTML = "";
// if (!selectedCountry) return;

// // Use the selected country's name as the default city
// const city = selectedCountry;

// const response = await fetch(weatherApiUrl + city + `&appid=${weatherApiKey}`);
// if (response.status === 404) {
//     document.querySelector(".weather-info").innerHTML = `<p>Weather data not available for ${selectedCountry}.</p>`;
// } else {
//     const data = await response.json();
//     const detailsPanel = document.getElementById("detailsContent");
    


// detailsPanel.innerHTML = `
//   <h2>${selectedCountry} Weather</h2>
//   <div class="festival-list">
//       <div class="festival-card">
          
//           <h3>${data.name}</h3>
//           <div class= "pic">
//           <img src="${getWeatherIcon(data.weather[0].main)}" alt="${data.weather[0].main}"></div>
//           <p><strong>Temperature</strong> ${Math.round(data.main.temp)}°C</p>
//           <p><strong>Humadity</strong> ${data.main.humidity }%</p>
//           <p><strong>Wind</strong> ${data.wind.speed} km/h</p>
        
          
          
//       </div>
//   </div>
// `;

// // Helper function to determine the weather icon
// function getWeatherIcon(weatherCondition) {
// switch (weatherCondition) {
// case "Clouds":
//     return "images/cloud.png";
// case "Clear":
//     return "images/clear.png";
// case "Rain":
//     return "images/rain.png";
// case "Drizzle":
//     return "images/drizzle.png";
// case "Mist":
//     return "images/mist.png";
// default:
//     return "images/weather-default.png"; // Fallback for unknown conditions
// }
// }
  
// // Show the weather panel
// document.getElementById("detailsPanel").classList.add("open");
// }
// }


// ---------------------------------------Festivals---------------------------------------

const datas = {
    countries: [
    
    {
    name: "Afghanistan",
    festivals: [
    {
    name: "Nowruz",
    description:
    "The Afghan New Year, celebrated on the first day of spring with feasts, music, and traditions.",
    date: "March 21",
    image_url: "https://www.aljazeera.com/wp-content/uploads/2024/03/AFP__20240320__34LU6MR__v2__Preview__SyriaKurdsNowruz-1710999889.jpg?fit=1170%2C780&quality=80",
    },
    {
    name: "Eid al-Fitr",
    description:
    "A major Islamic festival marking the end of Ramadan, celebrated with prayers, family gatherings, and feasts.",
    date: "Varies (Islamic calendar)",
    image_url: "https://www.aljazeera.com/wp-content/uploads/2024/04/AFP__20230421__33DL38J__v1__HighRes__TurkeyReligionIslamEid-1712214656.jpg?w=770&resize=770%2C524&quality=80",
    },
    {
    name: "Jashn-e-Dehqan",
    description:
    "A farmers' festival marking the beginning of the agricultural season with traditional dances and songs.",
    date: "March",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEffI1Rjzs7VNb8YMr5DTQgw4VBMwy661a2g&s",
    },
    ],
    },
    {
    name: "Albania",
    festivals: [
    {
    name: "Nowruz",
    description:
    "Celebration of the Persian New Year, marked with traditional food, dances, and music.",
    date: "March 20-21",
    image_url: "https://www.aljazeera.com/wp-content/uploads/2024/03/AFP__20240320__34LU6MR__v2__Preview__SyriaKurdsNowruz-1710999889.jpg?fit=1170%2C780&quality=80",
    },
    {
    name: "Independence Day",
    description:
    "A national holiday marking the declaration of Albania's independence from the Ottoman Empire, celebrated with parades and ceremonies.",
    date: "November 28",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGqrHIl3p-rgQL_DL64UEGwb3dDGB9OnIvOQ&s",
    },
    {
    name: "Bajrami i Madhe (Eid al-Fitr)",
    description:
    "The celebration marking the end of Ramadan, with prayers, feasts, and family gatherings.",
    date: "Varies (Islamic calendar)",
    image_url: "https://upload.wikimedia.org/wikipedia/https://upload.wikimedia.org/wikipedia/commons/a/a0/Eid_al-Fitr_prayer%2C_Suleymaniye_Mosque%2C_Istanbul_-_Aug_30%2C_2011.jpg/5/5f/Eid_al_Fitr_celebration_in_Albania.jpg",
    },
    {
    name: "Gjirokastër Folk Festival",
    description:
    "A traditional folk music and dance festival held in Gjirokastër, showcasing Albania's cultural heritage.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Gjirokast%C3%ABr_Festival.jphttps://euronews.al/en/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-25-at-09.44.40.jpegg",
    },
    ],
    }
    ,
    {
    name: "Algeria",
    festivals: [
    {
    name: "Independence Day",
    description: "Celebrates Algeria's independence from France, with parades and national celebrations.",
    date: "July 5",
    image_url: "https://media.istockphoto.com/id/2181116111/photo/3d-flag-of-albania-3d-shiny-waving-flag-ribbon-isolated-on-sky-blue-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=IPikP1GD7RVfsjcr73tV8qjQJ1wgRvN_OAG-k_Xfr-c="
    },
    {
    name: "Mawlid al-Nabi",
    description: "The celebration of the Prophet Muhammad's birthday, marked with prayers and feasts.",
    date: "Varies (Islamic calendar)",
    image_url: "https://media.istockphoto.com/id/1981747373/vector/artistry-allah-name-in-islamic-calligraphy-wallpaper-with-light-effect.jpg?s=612x612&w=0&k=20&c=AuMDGAe86I12gxjfqKDDxjZvOSrtCK0Z_V7wHMKUfFI="
    }
    ]
    },
    {
    name: "Andorra",
    festivals: [
    {
    name: "Our Lady of Meritxell",
    description: "Celebrates the patron saint of Andorra with religious services and cultural events.",
    date: "September 8",
    image_url: "https://media.istockphoto.com/id/1224862273/photo/old-basilica-of-meritxell.jpg?s=612x612&w=0&k=20&c=mRu8um9rmj98jOWNCbc9To8GeTasIXkj3dvRtBenLmw="
    },
    {
    name: "Andorra la Vella Carnival",
    description: "A lively carnival with parades, costumes, and street celebrations.",
    date: "February",
    image_url: "https://media.istockphoto.com/id/1819167756/vector/constitution-day-in-andorra-background-design-in-colorful-traditional-style-with-typography.jpg?s=612x612&w=0&k=20&c=vuDS2Is5NnGeZxKdd1M8qmdZaFahdMFSjerQM2SGZW4="
    }
    ]
    },
    {
    name: "Angola",
    festivals: [
    {
    name: "Independence Day",
    description: "Celebrates Angola's independence from Portugal with festivities and cultural displays.",
    date: "November 11",
    image_url: "https://media.istockphoto.com/id/1146404996/photo/angola-and-eritrea-flag-waving-in-the-wind-against-white-cloudy-blue-sky-together-diplomacy.jpg?s=612x612&w=0&k=20&c=RbEAH4ySWe1Gsxws3CM-qOsPW3AkcVlAXii_IOhl8Lc="
    },
    {
    name: "Festa de Nossa Senhora da Muxima",
    description: "A religious festival dedicated to the Virgin Mary, featuring processions and celebrations.",
    date: "August 15",
    image_url: "https://media.vaticannews.va/media/content/dam-archive/vaticannews/multimedia/2019/09/02/PEREGRINOS%20NO%20SANTUARIO%20DA%20MUXIMA.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg"
    }
    ]
    },
    {
    name: "Antigua and Barbuda",
    festivals: [
    {
    name: "Antigua Carnival",
    description: "A vibrant carnival featuring music, dancing, and parades, celebrating the island's cultural heritage.",
    date: "July-August",
    image_url: "https://media.istockphoto.com/id/1010872118/photo/parade-of-cartoon-characters-in-guatemala.jpg?s=612x612&w=0&k=20&c=u9dy7YW0dv5dCQb_14wq3M0UWUi_3H-4Y5C35RJDbs4="
    },
    {
    name: "Independence Day",
    description: "Marks Antigua and Barbuda's independence from Britain with ceremonies and celebrations.",
    date: "November 1",
    image_url: "https://media.istockphoto.com/id/1184030160/photo/unique-national-flag-of-antigua-and-barbuda-with-sea-and-sunrise-on-wooden-stick-nad-water.jpg?s=612x612&w=0&k=20&c=cANdN2WXL-jrAdKGMWG2TJeXB6uuny8AYdYV0SELUpI="
    }
    ]
    },
    {
    name: "Argentina",
    festivals: [
    {
    name: "Carnival",
    description: "A vibrant festival marked with parades, music, and dancing, especially in Buenos Aires and Gualeguaychú.",
    date: "February-March",
    image_url: "https://media.istockphoto.com/id/494195898/photo/bolivian-carnival-in-buenos-aires.jpg?s=612x612&w=0&k=20&c=QNPRQUkdrcnNj3wVgTYUQxY7bkBSlMqNBBZjMQBdDrk="
    },
    {
    name: "Feria de Mataderos",
    description: "A traditional festival celebrating Argentine gaucho culture with folkloric music, dancing, and food.",
    date: "March",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAZFfhjNUP713hIxA3ncqptTcnzQ4GRJ-X7g&s"
    }
    ]
    },
    {
    name: "Armenia",
    festivals: [
    {
    name: "Vardavar",
    description: "An ancient Armenian festival, celebrated by splashing water on friends and family.",
    date: "July",
    image_url: "https://media.istockphoto.com/id/1333782300/photo/people-celebrate-armenian-vardavar-in-moscow-city.jpg?s=612x612&w=0&k=20&c=8nh4bZog0Rro1_IOiiP3cB-Pnuutrxf6OrU18Vvm_-M="
    },
    {
    name: "Independence Day",
    description: "Marks Armenia's independence from the Soviet Union with parades and cultural events.",
    date: "September 21",
    image_url: "https://media.istockphoto.com/id/1270498535/vector/armenia-independence-day-calligraphy-hand-lettering-with-airplanes-and-air-show-armenian.jpg?s=612x612&w=0&k=20&c=F9x4ISkUGoYCN5qs2doF1wyizZb2VM1npVNOQdqzSBE="
    }
    ]
    },
    {
    name: "Australia",
    festivals: [
    {
    name: "Australia Day",
    description: "Celebrates the founding of modern Australia with fireworks, parades, and barbecues.",
    date: "January 26",
    image_url: "https://media.istockphoto.com/id/182745366/photo/australian-flag-march.jpg?s=612x612&w=0&k=20&c=R7w6i664O9p3e7rZdD3BFhI-61rlsI3wcpWyco-zyb4="
    },
    {
    name: "Melbourne Cup",
    description: "A famous horse race in Melbourne with fashion, food, and festivities.",
    date: "First Tuesday of November",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mM4q87Gj7JDL7usK_v5RzLEijaWchdUHpQ&s"
    }
    ]
    },
    {
    name: "Austria",
    festivals: [
    {
    name: "Vienna Opera Ball",
    description: "A glamorous annual event held at the Vienna State Opera, featuring a grand ball.",
    date: "February",
    image_url: "https://media.istockphoto.com/id/1321661181/photo/the-giant-ferris-wheel-the-wiener-riesenrad-it-was-the-worlds-tallest-extant-ferris-wheel.jpg?s=612x612&w=0&k=20&c=CiXGIsGkoBGBC66ricdIK4vB7agxScpdHGUTHd6VyIw="
    },
    {
    name: "Alpine Ski World Cup",
    description: "A prestigious winter sports event held in Austria, attracting skiers from around the world.",
    date: "December-January",
    image_url: "https://media.istockphoto.com/id/1179119523/photo/dynamic-professional-skier-during-super-g-skiing-race.jpg?s=612x612&w=0&k=20&c=uTMHv2SSejNOXMJ6ohhzBsxMMIjoULhgO-0QyKvboNI="
    }
    ]
    },
    {
    name: "Austrian Empire",
    festivals: [
    {
    name: "Imperial Court Masquerade",
    description: "A historical masquerade ball, once held at the imperial court in Vienna.",
    date: "Varies",
    image_url: "https://media.istockphoto.com/id/1058668766/photo/princes-and-her-knights-running-through-castle-courtyard.jpg?s=612x612&w=0&k=20&c=L_sedobhzjsx_0febCsbRs_lx-7nNRojlsf4RNPGA3M="
    }
    ]
    },
    {
    name: "Azerbaijan",
    festivals: [
    {
    name: "Novruz Bayram",
    description: "Celebrates the Persian New Year, marked by cooking, feasting, and traditional dances.",
    date: "March 20-21",
    image_url: "https://media.istockphoto.com/id/1467939852/vector/postcard-with-novruz-holiday-novruz-bayram-background-template-spring-flowers-painted-eggs.jpg?s=612x612&w=0&k=20&c=CFoQ4MtZ-Lc5yDQ1tD-d7ILGGYfd3a4vhtaDPylSJok="
    },
    {
    name: "Gurban Bayram",
    description: "The Muslim festival of sacrifice, celebrated with prayers and meals.",
    date: "Varies (Islamic calendar)",
    image_url: "https://media.istockphoto.com/id/2077463676/photo/dessert-with-syrup-named-kalburabast%C4%B1-or-kalburabasti-bayram-%C5%9Fekeri-or-sekeri.jpg?s=612x612&w=0&k=20&c=8BUgZumyQpuCd23uRTNhfD7dBLj1fiKUCr3zuzr_COI="
    }
    ]
    }, {
    name: "Baden",
    festivals: [
    {
    name: "Baden Wine Festival",
    description: "Celebrates the wine culture of the region, featuring wine tastings and traditional music.",
    date: "July-August",
    image_url: "https://c8.alamy.com/comp/BR8PT8/wine-and-harvest-festival-sasbachwalden-baden-wurttemberg-germany-BR8PT8.jpg"
    },
    {
    name: "Baden Christmas Market",
    description: "A traditional Christmas market featuring local crafts, food, and holiday lights.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFkjvkuqpJbblkHsFphk-Brp0lMjAjae0oHQ&s"
    }
    ]
    },
    {
    name: "Bahamas",
    festivals: [
    {
    name: "Junkanoo",
    description: "A vibrant festival with colorful parades, dancing, and music celebrating Bahamian culture.",
    date: "December 26 and January 1",
    image_url: "https://media.istockphoto.com/id/509540307/photo/junkanoo-festival-in-the-bahamas.jpg?s=612x612&w=0&k=20&c=J3qZK6ShROeW8CriQReSy7pPYFwUJZ1wY_PdGJSCQ4Q="
    },
    {
    name: "Bahamas Carnival",
    description: "A lively event celebrating Bahamian music, dance, and heritage, with parades and performances.",
    date: "May",
    image_url: "https://media.istockphoto.com/id/1075050300/photo/junkanoo-performers-dressed-in-traditional-costumes-at-a-festival-playing-a-trumpet-in.jpg?s=612x612&w=0&k=20&c=BsScgR8S3ErByhvuK-GnfAPvjfyOquELGWgp3m3yj0M="
    }
    ]
    },
    {
    name: "Bahrain",
    festivals: [
    {
    name: "Bahrain International Music Festival",
    description: "A festival featuring performances by international and local musicians, celebrating the arts.",
    date: "October",
    image_url: "https://media.istockphoto.com/id/1196876333/photo/new-years-eve-2020-in-bahrain.jpg?s=612x612&w=0&k=20&c=3e7W9kOiqRfH9bqwgQuiP6yHoSQsIn2hU1PJ7NJot0g="
    },
    {
    name: "National Day",
    description: "Celebrates Bahrain's independence and the anniversary of King Hamad's ascension to the throne.",
    date: "December 16",
    image_url: "https://media.istockphoto.com/id/1076016076/photo/bahrain-flag-waving-cloudy-sky-background-realistic-3d-illustration.jpg?s=612x612&w=0&k=20&c=7DIxsj_KsW6txMdHuAG0qsxh1-5gduOqc4s_1xX6NGs="
    }
    ]
    },
    {
    name: "Bangladesh",
    festivals: [
    {
    name: "Pohela Boishakh",
    description: "Bengali New Year celebrated with traditional food, colorful clothing, and cultural performances.",
    date: "April 14",
    image_url: "https://media.istockphoto.com/id/941086854/photo/brazier-plank.jpg?s=612x612&w=0&k=20&c=4vfI17vRExaKMFzR6Xtqsb_fGmv9GHfkwbjeKJVwgac="
    },
    {
    name: "Eid al-Fitr",
    description: "Celebrates the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "Varies (Islamic calendar)",
    image_url: "https://media.istockphoto.com/id/1241248965/photo/ramadan-lantern-by-the-open-window-beautiful-greeting-card-with-copy-space-for-ramadan-and.jpg?s=612x612&w=0&k=20&c=_ONi4TEkIzioO2UhRst9XspMPmsEpnG90-GcKSowgto="
    }
    ]
    },
    {
    name: "Barbados",
    festivals: [
    {
    name: "Crop Over Festival",
    description: "A summer festival celebrating the end of the sugar cane harvest with parades and musical events.",
    date: "July-August",
    image_url: "https://media.istockphoto.com/id/1344658236/photo/stack-of-multicolored-fall-pumpkins-squash-and-gourds-vegetables-shot-from-directly-above-for.jpg?s=612x612&w=0&k=20&c=vz-Zm7mDsFItSYjL6ly6HO5gQBsWPOxtiCVmCZEuVF4="
    },
    {
    name: "Independence Day",
    description: "Marks Barbados' independence from Britain with parades, celebrations, and national pride.",
    date: "November 30",
    image_url: "https://media.istockphoto.com/id/1060006676/photo/barbados-barbadian-flag-textile-cloth-fabric-waving-on-the-top-sunrise-mist-fog.jpg?s=612x612&w=0&k=20&c=gvpMxBxR42_mO6a0T6xzuvtKpFUXritw8T_oCW13zNk="
    }
    ]
    },
    {
    name: "Bavaria",
    festivals: [
    {
    name: "Oktoberfest",
    description: "A world-famous beer festival held in Munich, celebrating Bavarian culture with beer, food, and folk music.",
    date: "September-October",
    image_url: "https://media.istockphoto.com/id/1078390306/photo/beertent-hacker-pschorr-oktoberfest-2018-munich-bavaria.jpg?s=612x612&w=0&k=20&c=KYln7EoJFLQ3h1qAfPzZmnj6g4JTczi4O8oO-a7DRIA="
    },
    {
    name: "Bavarian Christmas Markets",
    description: "Traditional Christmas markets with handcrafted goods, food, and festive decorations across Bavaria.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBm8Q-yhKPFWNTp4A_EmmuPGw2HvKMNfY3g&s"
    }
    ]
    },
    {
    name: "Belarus",
    festivals: [
    {
    name: "Kupalle Night",
    description: "A Slavic celebration of summer solstice with bonfires, dancing, and singing.",
    date: "June 24",
    image_url: "https://media.istockphoto.com/id/1391002513/photo/close-up-shot-of-a-kupala-wreath-in-girls-hands-on-the-river.jpg?s=612x612&w=0&k=20&c=K_NMQeFG3em6EcnKWmWNMnb4LqrSQgFDfodj0NUsqzM="
    },
    {
    name: "Independence Day",
    description: "Commemorates Belarus' independence from the Soviet Union with military parades and fireworks.",
    date: "July 3",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHAEGzp6FaIdNT9NQdzLtUNTO_MxweyNyEQ&s"
    }
    ]
    },
    {
    name: "Belgium",
    festivals: [
    {
    name: "Brussels Flower Carpet",
    description: "A biennial event where the Grand Place in Brussels is covered with a large flower carpet.",
    date: "August",
    image_url: "https://media.istockphoto.com/id/486079044/photo/flower-carpet-gathered-on-the-grand-place-square-in-brussels.jpg?s=612x612&w=0&k=20&c=HvGw_JIELWrc0vQtTcW8KYza8x2Xhuvkst1CV2ZbnvQ="
    },
    {
    name: "Gentse Feesten",
    description: "A ten-day cultural festival in Ghent, featuring music, theater, and street performances.",
    date: "July",
    image_url: "https://media.istockphoto.com/id/2161406565/photo/courtyard-of-neues-rathaus-munich-germany.jpg?s=612x612&w=0&k=20&c=BVvS9qLyweMWSu0HukSH3Dqi8LYTXXD57ONGNKqwZzY="
    }
    ]
    },
    {
    name: "Belize",
    festivals: [
    {
    name: "Belize Carnival",
    description: "A lively parade celebrating Belizean culture with music, costumes, and dancing.",
    date: "September",
    image_url: "https://media.istockphoto.com/id/1193116778/vector/mexico-travel.jpg?s=612x612&w=0&k=20&c=upwjCS_2hJ8KRoXR1PYF_5OUIJSZ2vhBpgYlLw4yICw="
    },
    {
    name: "Independence Day",
    description: "Marks Belize's independence from the United Kingdom with parades and national celebrations.",
    date: "September 21",
    image_url: "https://media.istockphoto.com/id/1076021204/photo/belize-flag-waving-cloudy-sky-background-realistic.jpg?s=612x612&w=0&k=20&c=gX0eIzO2Sq8LasLFkIzeRY2YIeNMYMjaDYNlksWqEwY="
    }
    ]
    },
    {
    name: "Benin",
    festivals: [
    {
    name: "Voodoo Festival",
    description: "Celebrates the traditional Voodoo religion with rituals, dances, and ceremonies.",
    date: "January 10",
    image_url: "https://media.istockphoto.com/id/458543377/photo/voodoo-festival.jpg?s=612x612&w=0&k=20&c=IUREkiHkER_7MIEG1_SMvfXE8C7_LI0KSmMnMV_5IwU="
    },
    {
    name: "Independence Day",
    description: "Marks Benin's independence from France with parades and national celebrations.",
    date: "August 1",
    image_url: "https://media.istockphoto.com/id/1060023466/photo/benin-beninese-flag-textile-cloth-fabric-waving-on-the-top-sunrise-mist-fog.jpg?s=612x612&w=0&k=20&c=uduPlHdX_5sacsnX23UWdKdGTFYGevb5QIKRVi7-BxE="
    }
    ]
    },
    {
    name: "Bolivia",
    festivals: [
    {
    name: "Oruro Carnival",
    description: "A UNESCO-listed event featuring traditional dances, music, and colorful costumes.",
    date: "February-March",
    image_url: "https://media.istockphoto.com/id/682786686/photo/tinkus-dance-group-at-the-oruro-carnival.jpg?s=612x612&w=0&k=20&c=SZTIoSCt7RocjVF5YwRlM77uJieRZ5mFCvozsP8_SXo="
    },
    {
    name: "Dia de la Virgen de Guadalupe",
    description: "A religious festival in honor of the Virgin of Guadalupe, with parades and celebrations.",
    date: "December 12",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhQNn710e8xNLudgjCJXuKXC0MAXn4DOdsQ&s"
    }
    ]
    },
    {
    name: "Bosnia and Herzegovina",
    festivals: [
    {
    name: "Sarajevo Film Festival",
    description: "A major film festival in the Balkans that features international and regional films.",
    date: "August",
    image_url: "https://media.istockphoto.com/id/885947462/photo/night-view-of-sebilj-fountain-and-baskarsija-square-in-sarajevo.jpg?s=612x612&w=0&k=20&c=_f9vPV23s17cPyMa4k3772GVZtYUNsgEtYbIFI0c2LE="
    },
    {
    name: "Bazar Festival",
    description: "A cultural festival celebrating traditional Bosnian arts, crafts, and food.",
    date: "July",
    image_url: "https://gadgetsmagazine.com.ph/wp-content/uploads/2018/11/Thousands-of-visitors-and-various-exhibitors-hailing-last-year%E2%80%99s-WBF.jpg"
    }
    ]
    },
    {
    name: "Botswana",
    festivals: [
    {
    name: "Daundu Festival",
    description: "A celebration of the traditional music and dance of Botswana's ethnic groups.",
    date: "August",
    image_url: "https://media.istockphoto.com/id/1842137273/photo/girls-performing-at-surajkund-craft-fair.jpg?s=612x612&w=0&k=20&c=RHuwWMthx66WXuNw_wddvnuzjTLwZ-1DOtxtanppGAs="
    },
    {
    name: "Botswana Independence Day",
    description: "Marks Botswana's independence from the United Kingdom with parades and national pride.",
    date: "September 30",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0UXaHfi5BFzlXKMWLa7xxVEqukCcbGbXRXw&s"
    }
    ]
    },
    {
    name: "Brazil",
    festivals: [
    {
    name: "Carnival",
    description: "A world-famous celebration with samba music, elaborate parades, and vibrant costumes.",
    date: "February-March",
    image_url: "https://media.istockphoto.com/id/471517281/photo/carnival-in-rio-de-janeiro-2013.jpg?s=612x612&w=0&k=20&c=JSym34OM7-HMMZqTBKpZ0hqYOAbTEIUQC-jGZpoo0MI="
    },
    {
    name: "Festa Junina",
    description: "A traditional festival celebrating rural life with food, music, and dances.",
    date: "June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjnrCTYHKdX3G6Az6P8nJc0AaRSfeijX6TTw&s"
    }
    ]
    },
    {
    name: "Brunei",
    festivals: [
    {
    name: "Hari Raya Aidilfitri",
    description: "A celebration marking the end of Ramadan, with prayers, feasts, and family gatherings.",
    date: "Varies (Islamic calendar)",
    image_url: "https://media.istockphoto.com/id/1226422353/photo/eid-at-delhi-jama-masjid.jpg?s=612x612&w=0&k=20&c=6XpFRzyqzxHAhFC0SxCgM9qQmic_U4VcZ1Rv8U1aBBg="
    },
    {
    name: "Brunei National Day",
    description: "Commemorates Brunei's independence and its royal heritage with parades and public events.",
    date: "February 23",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTDQIDUIP8fac1quGCyTWCvTiSWk12tlVB3Q&s"
    }
    ]
    },
    {
    name: "Brunswick and Lüneburg",
    festivals: [
    {
    name: "Schützenfest",
    description: "A traditional marksmen’s festival in Brunswick, with parades, target shooting, and carnival games.",
    date: "July",
    image_url: "https://media.istockphoto.com/id/471771574/photo/schutzenfest-ferris-wheel-at-night-hannover-germany.jpg?s=612x612&w=0&k=20&c=1_XebflXQasLN6gomozZdaDdKD1cNItKRxu4Ysl_v4s="
    },
    {
    name: "Lüneburg Christmas Market",
    description: "A festive market with local crafts, food, and traditional decorations in Lüneburg.",
    date: "December",
    image_url: "https://media.istockphoto.com/id/526531955/photo/l%C3%BCneburg-christmas-market.jpg?s=612x612&w=0&k=20&c=iIVVHxD2RxFsPXsD_NGjGaGWqP0P9dO2Ama8lnsfvV8="
    }
    ]
    },
    {
    name: "Bulgaria",
    festivals: [
    {
    name: "Rose Festival",
    description: "Celebrates the rose harvest in the Valley of Roses with traditional music, dancing, and rose-related products.",
    date: "June",
    image_url: "https://media.istockphoto.com/id/478114252/photo/rose-picking-festival.jpg?s=612x612&w=0&k=20&c=LrrerZWp2HPuHcVvhJnplbYykCncgBNMPYR3O5ctZdM="
    },
    {
    name: "Kukeri Festival",
    description: "A festival where participants wear traditional masks and costumes to scare away evil spirits.",
    date: "February-March",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9GXZSJ4TD9GWDOCjffOzY51kQYh5cDbI6w&s"
    }
    ]
    },
    {
    name: "Burkina Faso",
    festivals: [
    {
    name: "FESPACO",
    description: "The Pan-African Film and Television Festival of Ouagadougou, celebrating African cinema.",
    date: "February",
    image_url: "https://media.istockphoto.com/id/496359874/photo/ouagadougou-burkina-faso-roundabout-of-the-cineastes.jpg?s=612x612&w=0&k=20&c=n7Y29LKyo3y-aUfFVMYsNsOne0nI8Q4ypV2VSTlioh8="
    },
    {
    name: "Naba Kango Festival",
    description: "A cultural festival showcasing traditional dance, music, and folklore from various regions of Burkina Faso.",
    date: "August",
    image_url: "https://media.istockphoto.com/id/1389113250/photo/big-scenes-of-historic-drama-stories-of-elephant-duel-war.jpg?s=612x612&w=0&k=20&c=XNGjIRwy3cQ3ERlDwEDGarBOH0ARf_x_obiedXcf9zM="
    }
    ]
    },
    {
    name: "Burma (Myanmar)",
    festivals: [
    {
    name: "Thingyan",
    description: "The Burmese New Year Water Festival, with water fights and traditional dances.",
    date: "April",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_BMlQPlp-mwwnjc0uQexekhMnPnrVw5vLRw&s"
    },
    {
    name: "Buddha Jayanti",
    description: "Celebration of the birth, enlightenment, and death of Buddha, with prayers and processions.",
    date: "April-May",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfebg-5h3x9uQighjXv--MXEu1caahXRTbFA&s"
    }
    ]
    },
    {
    name: "Burundi",
    festivals: [
    {
    name: "Umuganuro Festival",
    description: "A harvest festival in Burundi celebrating agriculture and culture with music, dance, and food.",
    date: "August",
    image_url: "https://media.istockphoto.com/id/1162837124/photo/liverpool-samba-in-the-city-street-parade.jpg?s=612x612&w=0&k=20&c=JkDzltxrHFRTk2pGY1PkSunjvG9shhr6S_MLzH9ojPw="
    },
    {
    name: "Independence Day",
    description: "Commemorates Burundi's independence from Belgium with national celebrations and parades.",
    date: "July 1",
    image_url: ""
    }
    ]
    },
    {
    name: "Cabo Verde",
    festivals: [
    {
    name: "Festa de São João",
    description: "Celebrates Saint John's Day with traditional music, dance, and food.",
    date: "June 24",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScti5keE1DyPnNhHbd-28pANucPz1BVyOuTw&s"
    },
    {
    name: "Grogue Festival",
    description: "A festival celebrating Cabo Verde's national drink, grogue, with music and cultural performances.",
    date: "March",
    image_url: "https://res.cloudinary.com/simpleview/image/upload/v1677269134/clients/fresnoca/Rogue_Festival_Performers_549884d9-d1ba-4ef9-a973-d0f292994cd3.jpg"
    }
    ]
    },
    {
    name: "Cambodia",
    festivals: [
    {
    name: "Khmer New Year",
    description: "Celebrates the Cambodian New Year with family gatherings, traditional dances, and religious ceremonies.",
    date: "April 13-15",
    image_url: "https://stc-bucket.sgp1.cdn.digitaloceanspaces.com/0002/2099/2024/08/17/khmer-new-year.jpg"
    },
    {
    name: "Water Festival",
    description: "A festival marking the end of the rainy season with boat races and traditional music.",
    date: "November",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD5wXLPWm65ut0hIdkASJ_DpZxLhmwDeK1NA&s"
    }
    ]
    },
    {
    name: "Cameroon",
    festivals: [
    {
    name: "Ngondo Festival",
    description: "A celebration of the Sawa people's culture with traditional dances, music, and rituals.",
    date: "June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Iqes7RKZ-YkkjnHSqwTPgzQUH3lzfU-wWg&s"
    },
    {
    name: "Bamenda Festival",
    description: "A cultural festival featuring local music, dances, and traditional ceremonies.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4w25T3wJTIk4udhbghPnZBQ3voBvGzwu-A&s"
    }
    ]
    },
    {
    name: "Canada",
    festivals: [
    {
    name: "Canada Day",
    description: "Celebrates Canada's confederation with parades, fireworks, and public events.",
    date: "July 1",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3njZiFzsmLKJo37kZGDPBhe65OZDUn9e8dw&s"
    },
    {
    name: "Montreal International Jazz Festival",
    description: "A world-renowned music festival celebrating jazz and live performances.",
    date: "Late June to early July",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKcFEXDxDxRz87hq9s0t5i1vHTz2QpjPiRhA&s"
    }
    ]
    },
    {
    name: "Cayman Islands",
    festivals: [
    {
    name: "Cayman Islands Carnival",
    description: "A celebration of the Caribbean culture with music, dance, and colorful parades.",
    date: "May",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfiL5T2_HDzhTeBPkbEKnmifYgiyw5WSzhBw&s"
    },
    {
    name: "Pirates Week Festival",
    description: "A festival with pirate-themed events, including boat races, parades, and treasure hunts.",
    date: "November",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZgyUzhesQrUXaqvYOqlXeCYrqRzKhFmqOg&s"
    }
    ]
    },
    {
    name: "Central African Republic",
    festivals: [
    {
    name: "Fête de la Musique",
    description: "A celebration of music and local culture with free concerts and performances.",
    date: "June 21",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdmmvXaq3cmF1J6hOf-LhZWe_Hf2suU7-Fw&s"
    },
    {
    name: "Benoît Day",
    description: "Celebrates the country’s patron saint with processions, prayers, and community events.",
    date: "December 6",
    image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D1333048590228740%26id%3D161591850707759%26set%3Da.180495682150709&psig=AOvVaw3eINpv6WLQ7GGRFgHZEhOT&ust=1734763671379000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiGjrjgtYoDFQAAAAAdAAAAABAJ"
    }
    ]
    },
    {
    name: "Chad",
    festivals: [
    {
    name: "La Fête de l'Indépendance",
    description: "Celebrates Chad's independence from France with parades and national events.",
    date: "August 11",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-DnjK47ewIUavxHxJ4s8QbhGDQIxRIohEg&s"
    },
    {
    name: "Festival of Traditional Music",
    description: "A festival showcasing Chad's diverse music, dance, and arts.",
    date: "November",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQD53iS-XiiCXhLPSSbOYp92YdII4oAi5rg&s"
    }
    ]
    },
    {
    name: "Chile",
    festivals: [
    {
    name: "Fiestas Patrias",
    description: "Chile's national day celebrating independence with parades, traditional dances, and food.",
    date: "September 18",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ848tfh5NDwsdiz9IsC6_ozapA7DsYK53wUQ&s"
    },
    {
    name: "Vina del Mar International Song Festival",
    description: "An international music festival showcasing performances by artists from around the world.",
    date: "February",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-wwBsQl7YcGy4-EqClSQEJ76Fd5oJcYmDw&s"
    }
    ]
    },
    {
    name: "China",
    festivals: [
    {
    name: "Chinese New Year",
    description: "The Spring Festival, celebrated with family reunions, feasts, and fireworks.",
    date: "January-February",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2c0avTftJWJF-rPzGGmmXhz7LvWgP2sNvXw&s"
    },
    {
    name: "Mid-Autumn Festival",
    description: "A harvest festival celebrated with mooncakes and lanterns.",
    date: "September-October",
    image_url: "https://www.discoverhongkong.com/content/dam/dhk/intl/explore/culture/mid-autumn-festival-traditions-festivities-and-delicacies/mid-autumn-festival-traditions-festivities-and-delicacies-1920x1080.jpg"
    }
    ]
    },
    {
    name: "Colombia",
    festivals: [
    {
    name: "Carnaval de Barranquilla",
    description: "A colorful festival with parades, traditional music, and dances, one of Colombia’s biggest celebrations.",
    date: "February",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3i6ZeHkwVWLauNIczLuPFEBBUPNf952TKwg&s"
    },
    {
    name: "Feria de las Flores",
    description: "A festival celebrating flowers, with parades, music, and flower displays.",
    date: "August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdRC8TnzE-gH8gI2uHhWtGHVqIfVr4qocUEQ&s"
    }
    ]
    },
    {
    name: "Comoros",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A Muslim festival celebrating the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "Varies (Islamic calendar)",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssbJYdkG4uiLdMHmtkjIm6vrGNm0Tqe9FBg&s"
    },
    {
    name: "Independence Day",
    description: "Celebrates the independence of the Comoros with national events, parades, and festivals.",
    date: "July 6",
    image_url: ""
    }
    ]
    },
    {
    name: "Costa Rica",
    festivals: [
    {
    name: "Fiesta de los Diablitos",
    description: "A traditional festival with masquerades and dances celebrating indigenous culture.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_OPxSIk4R7XuEr4oIQyqaehS3giNeh69WA&s"
    },
    {
    name: "La Tope Nacional",
    description: "A horse parade through the streets of San José marking the start of the national festivities.",
    date: "December 25",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCjsDJxC8b53EoO8exyPD3xO0qzmRJurCFkg&s"
    }
    ]
    },
    {
    name: "Côte d'Ivoire (Ivory Coast)",
    festivals: [
    {
    name: "Fête de la Musique",
    description: "Celebrates music with performances by local artists across various cities.",
    date: "June 21",
    image_url: "https://www.myprivatefrenchtravel.com/application/uploads/files/Sarah/fete-de-la-musique-1-854x640.jpg"
    },
    {
    name: "Independence Day",
    description: "Marks Côte d'Ivoire’s independence with national celebrations and public events.",
    date: "August 7",
    image_url: ""
    }
    ]
    },
    {
    name: "Croatia",
    festivals: [
    {
    name: "Dubrovnik Summer Festival",
    description: "A cultural festival featuring classical music, theater, and dance performances.",
    date: "July-August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJPc37dz8yJA93xXEo4DivncpRPbyUXEmoQ&s"
    },
    {
    name: "Zagreb Advent",
    description: "A Christmas market in the heart of Zagreb, featuring festive lights, food, and local crafts.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCibRXa-9P8LojORatbd7Wx7QOtp5aAxQWDQ&s"
    }
    ]
    },
    {
    name: "Cuba",
    festivals: [
    {
    name: "Carnival of Santiago de Cuba",
    description: "A vibrant festival featuring parades, music, and dancing, celebrating Cuba’s Afro-Cuban heritage.",
    date: "July",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQ8PwKiWoI9pwX3tm564lUPtMu4zxLTB6Xw&s"
    },
    {
    name: "Havana International Jazz Festival",
    description: "An international jazz festival with performances from world-renowned jazz musicians.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AI2bNYvDzD6SDezz9CDaCOsJsz2CJLBZ8g&s"
    }
    ]
    },
    {
    name: "Cyprus",
    festivals: [
    {
    name: "Cyprus Wine Festival",
    description: "Celebrates the island’s wine culture with tastings, music, and local food.",
    date: "June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXk06_1v3sKFXJf0pkrY85kd34ZaOnoURrQ&s"
    },
    {
    name: "Limassol Carnival",
    description: "A lively carnival with parades, dancing, and traditional Greek festivities.",
    date: "February",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPH8qB30v9MoKd7IVaB_PkGWkFtOIDIGkQaw&s"
    }
    ]
    },
    {
    name: "Czechia",
    festivals: [
    {
    name: "Czech Beer Festival",
    description: "A celebration of Czech beer culture with tastings, traditional Czech food, and music.",
    date: "May",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1jow18XBcakF8ww_kN0JtrrfIF7zXl-JgaA&s"
    },
    {
    name: "Prague Spring International Music Festival",
    description: "A classical music festival featuring performances by world-renowned musicians and orchestras.",
    date: "May-June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCzCpuKLLS_w4jTgMybNJVwZkQYX9OArL_7g&s"
    }
    ]
    },
    {
    name: "Czechoslovakia",
    festivals: [
    {
    name: "Czech Easter Festival",
    description: "Celebrates the Czech Easter traditions with parades, dancing, and crafts.",
    date: "April",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZsI8b5Zlzyxh3DLc2aqkXUvD3hMPKDxe-Q&s"
    },
    {
    name: "Prague Folklore Days",
    description: "A celebration of traditional Czech folk music, dance, and costumes.",
    date: "July",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5HrK_TRf_Ieyimp5VolyXQsFB3o7XI0a8A&s"
    }
    ]
    },
    {
    name: "Democratic Republic of the Congo",
    festivals: [
    {
    name: "Fête de la Musique",
    description: "A celebration of music and cultural performances across the country.",
    date: "June 21",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa58xrftYYhuHhYIiHPPX3QheacjimTe938w&s"
    },
    {
    name: "Independence Day",
    description: "Commemorates the independence of the DRC from Belgium with national events and celebrations.",
    date: "June 30",
    image_url: ""
    }
    ]
    },
    {
    name: "Denmark",
    festivals: [
    {
    name: "Copenhagen Jazz Festival",
    description: "A world-famous jazz festival held annually in Copenhagen, attracting top international musicians.",
    date: "July",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMPGqokGKvg20377aeJ1SAtkqXncut1nyXvw&s"
    },
    {
    name: "Roskilde Festival",
    description: "One of the largest music festivals in Europe, featuring rock, pop, and electronic music.",
    date: "June-July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Roskilde_Festival_-_Orange_Stage_-_Bruce_Springsteen.jpg/1200px-Roskilde_Festival_-_Orange_Stage_-_Bruce_Springsteen.jpg"
    }
    ]
    },
    {
    name: "Djibouti",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A Muslim holiday marking the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "Varies (Islamic calendar)",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssbJYdkG4uiLdMHmtkjIm6vrGNm0Tqe9FBg&s"
    },
    {
    name: "Independence Day",
    description: "Celebrates Djibouti’s independence from France with national events and celebrations.",
    date: "June 27",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2m1o0zP9fdqLocJ2vsBBfsuIzhhCf1acpBw&s"
    }
    ]
    },
    {
    name: "Dominica",
    festivals: [
    {
    name: "Carnival",
    description: "The biggest celebration of the year, featuring parades, music, and dancing.",
    date: "February",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqeXB17fKZHBRapMsrIYQxVzlpRgZ2MWqW-A&s"
    },
    {
    name: "Independence Day",
    description: "Celebrates the independence of Dominica from the United Kingdom with national events and parades.",
    date: "November 3",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoBHikEfXk9fl1FYxTdeJFV9wtm5yeH8ulA&s"
    }
    ]
    },
    {
    name: "Dominican Republic",
    festivals: [
    {
    name: "Carnival",
    description: "A lively and colorful celebration with parades, music, and traditional costumes.",
    date: "February",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqeXB17fKZHBRapMsrIYQxVzlpRgZ2MWqW-A&s"
    },
    {
    name: "Merengue Festival",
    description: "A music festival celebrating the country’s most famous music genre, merengue.",
    date: "July",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAtZ-HdwUFuock25URozrMZitWUKrVFPCanw&s"
    }
    ]
    },
    {
    name: "Duchy of Parma, The",
    festivals: [
    {
    name: "Feast of Saint George",
    description: "A celebration of the patron saint of Parma, with religious processions and cultural events.",
    date: "April 23",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_v5nxS--ayCpWDWsFsCrCJ_PWXmwc7RX-2g&s"
    },
    {
    name: "Parma International Music Festival",
    description: "An event showcasing classical music performances by internationally acclaimed artists.",
    date: "May-June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdljOOkdhHYLNIhagOmPKtYKH4PgRVKYrtA&s"
    }
    ]
    },
    {
    name: "East Germany (German Democratic Republic)",
    festivals: [
    {
    name: "May Day Celebrations",
    description: "A socialist celebration of the workers' movement, with parades and demonstrations.",
    date: "May 1",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHsopB3PWauX9kr6luX53JHBXiIQfGZbwTg&s"
    },
    {
    name: "German Unity Day",
    description: "Commemorates the reunification of Germany with national events and ceremonies.",
    date: "October 3",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw1XqM-X_SxmU5TSIDC2Cy7t7nHtlFOvj5jw&s"
    }
    ]
    },
    {
    name: "Ecuador",
    festivals: [
    {
    name: "Carnaval",
    description: "A celebration of Ecuador’s Carnival with parades, music, and traditional dances.",
    date: "February",
    image_url: "https://berksweekly.com/wp-content/uploads/2022/08/031479AE-56FA-4F44-B468-5F458EC5D037.jpeg"
    },
    {
    name: "Fiestas de Quito",
    description: "A week-long festival in Quito celebrating the city’s founding with parades, music, and dancing.",
    date: "December 6",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9SpIX6IlcKd5AHKel8FS5k7jsNAwF5gahcw&s"
    }
    ]
    },
    {
    name: "Egypt",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A Muslim festival marking the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "Varies (Islamic calendar)",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssbJYdkG4uiLdMHmtkjIm6vrGNm0Tqe9FBg&s"
    },
    {
    name: "Sham el-Nessim",
    description: "A traditional Egyptian festival celebrating the beginning of spring with outdoor picnics.",
    date: "April",
    image_url: "https://www.egypttoday.com/siteimages/Larg/44629.jpg"
    }
    ]
    },
    {
    name: "El Salvador",
    festivals: [
    {
    name: "Fiestas Agostinas",
    description: "A religious festival in honor of the patron saint of El Salvador, with processions and music.",
    date: "August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKaC20N6DQVxlmRsBndWNBn4EPt6VVWUsvg&s"
    },
    {
    name: "Independence Day",
    description: "Celebrates El Salvador's independence from Spain with parades and national celebrations.",
    date: "September 15",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzJwsmJNCH206ZnxIH5y3ZyBDfwMCksjbkEA&s"
    }
    ]
    },
    {
    name: "Equatorial Guinea",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates the independence of Equatorial Guinea with national events and celebrations.",
    date: "October 12",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJTYFdIOy1Xy9kjOqW0OM-DthMIzinhGssAA&s"
    },
    {
    name: "Fiesta de la Paz",
    description: "A festival celebrating peace and unity in Equatorial Guinea, featuring music, dance, and food.",
    date: "August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzxuIDYRvbLl8mK5hnXEvRJ8oN5lM3ONM6g&s"
    }
    ]
    },
    {
    name: "Eritrea",
    festivals: [
    {
    name: "Festival of National Unity",
    description: "A celebration of Eritrea's unity with music, dance, and food.",
    date: "August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5MoNAvNVhJBmZS2n42JojnGNfPrkmGe7vA&s"
    },
    {
    name: "Eritrean Independence Day",
    description: "Commemorates Eritrea’s independence with national celebrations and events.",
    date: "May 24",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRn6ZYrIDJY4BDM-gv-dutW1kBXcUygWTHuw&s"
    }
    ]
    },
    {
    name: "Estonia",
    festivals: [
    {
    name: "Tallinn Music Week",
    description: "An international music festival showcasing local and international artists.",
    date: "April",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kwJc5EAZhawGyvEibbjz3X1zbMIZlXu5Sg&s"
    },
    {
    name: "Jaanipäev (Midsummer Day)",
    description: "A traditional celebration of the summer solstice with bonfires and gatherings.",
    date: "June 24",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gQ13mxvoo24xx-nbzZ5-FAoYb4ngQT-wJw&s"
    }
    ]
    },
    {
    name: "Eswatini",
    festivals: [
    {
    name: "Umhlanga (Reed Dance)",
    description: "A cultural celebration in honor of the Queen Mother, with traditional dances and ceremonies.",
    date: "August-September",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJrwQkJB0TzOwJOBsPEkwwUsOnE_HFCYyvw&s"
    },
    {
    name: "Incwala",
    description: "A traditional ceremony marking the harvest and the king's reign.",
    date: "December-January",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-oBFswQa_q0ZAHfiXC2bk57KDy8P15vpcQ&s"
    }
    ]
    },
    {
    name: "Ethiopia",
    festivals: [
    {
    name: "Timkat (Epiphany)",
    description: "A celebration of the baptism of Jesus, featuring processions and religious ceremonies.",
    date: "January 19",
    image_url: "https://res-3.cloudinary.com/hpwmsw17c/image/upload/q_auto/v1/ghost-blog-images/Timkat-in-Ethiopia-Africa-Rebirth.jpg"
    },
    {
    name: "Enkutatash (New Year)",
    description: "Celebrates the Ethiopian New Year with feasts, music, and cultural ceremonies.",
    date: "September 11",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx74MWlhksU_9Z_kTtY6YaRXsTfWBjII3nXQ&s"
    }
    ]
    },
    {
    name: "Federal Government of Germany (1848-49)",
    festivals: [
    {
    name: "Revolution Day",
    description: "A remembrance of the 1848 revolution, which marked a time of democratic movements in Germany.",
    date: "March 18",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxkWkZuCYhaT819e5h_ZH8v261vilTO1Z4zQ&s"
    }
    ]
    },
    {
    name: "Fiji",
    festivals: [
    {
    name: "Hibiscus Festival",
    description: "A week-long festival in Suva with beauty contests, cultural performances, and parades.",
    date: "August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RwEeAZTMhAxksucuRGeNrxWlXF-TEi842A&s"
    },
    {
    name: "Fiji Day",
    description: "Celebrates Fiji's independence from the United Kingdom with national events and parades.",
    date: "October 10",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAplEjzBtvspm5_n6l3Ybo8t3xm0-PC63U_A&s"
    }
    ]
    },
    {
    name: "Finland",
    festivals: [
    {
    name: "Juhannus (Midsummer)",
    description: "A celebration of the summer solstice with bonfires, saunas, and outdoor activities.",
    date: "June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5W5LU9-dCn7It4TJW9b37GTiCFUATaD1Hg&s"
    },
    {
    name: "Vappu",
    description: "A celebration of workers' rights and the coming of spring, with picnics, parades, and festivals.",
    date: "May 1",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4cgnZvMN5_BKARsebGmMzUhIN3jUrAmVvA&s"
    }
    ]
    },
    {
    name: "France",
    festivals: [
    {
    name: "Bastille Day",
    description: "Celebrates the French Revolution with parades, fireworks, and parties.",
    date: "July 14",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOcjoaVxB_6_joQAyllxXcWEKno-eiQPJng&s"
    },
    {
    name: "Cannes Film Festival",
    description: "An international film festival featuring screenings and awards.",
    date: "May",
    image_url: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202305/img_3804-sixteen_nine.jpeg?VersionId=lOPlodW_D_n_7tyyMkScySAkCcupbcDb&size=690:388"
    }
    ]
    },
    {
    name: "Gabon",
    festivals: [
    {
    name: "Festival of Sacred Arts",
    description: "A celebration of Gabonese culture and art, with performances, crafts, and music.",
    date: "July",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qyRcNGYRqr1nmeeD_0dz9Hy4LCSo_YxnVA&s"
    },
    {
    name: "Independence Day",
    description: "Commemorates Gabon's independence from France with national events and celebrations.",
    date: "August 16",
    image_url: "https://img.jagranjosh.com/images/2023/August/1782023/gabon-ind.jpg"
    }
    ]
    },
    {
    name: "Gambia, The",
    festivals: [
    {
    name: "Roots Festival",
    description: "A cultural festival celebrating the Gambia’s history, music, and traditions.",
    date: "May",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPnEkWDw7D1JJtlpeWwt2_ZaNyc873DStS3w&s"
    },
    {
    name: "Independence Day",
    description: "Marks Gambia’s independence from the United Kingdom with parades and national celebrations.",
    date: "February 18",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9HUg6kWMUydlIFBNibQ3zZGp4ef-wfVKkA&s"
    }
    ]
    },
    {
    name: "Georgia",
    festivals: [
    {
    name: "Tbilisi International Film Festival",
    description: "An international film festival featuring screenings, awards, and film industry events.",
    date: "December",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQodbsHQz0eacKxvJfyEBCQF6qk3mmj98f3Q&s"
    },
    {
    name: "Georgian Wine Festival",
    description: "A celebration of Georgia’s rich winemaking tradition with tastings and cultural events.",
    date: "September",
    image_url: "https://cdn.georgiantravelguide.com/storage/files/tbilisoba-wine-festival.jpg"
    }
    ]
    },
    {
    name: "Germany",
    festivals: [
    {
    name: "Oktoberfest",
    description: "A beer festival and folk event held annually in Munich.",
    date: "September-October",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIskUetNDXfpd0tEsQ3RvcjIgCkkcH4z92-w&s"
    },
    {
    name: "Karneval",
    description: "A pre-Lenten festival with parades, costumes, and street parties.",
    date: "February-March",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquqVF4vPlbx-vIk-KiBUeA4dUQZf0s81WLQ&s"
    }
    ]
    },
    {
    name: "Ghana",
    festivals: [
    {
    name: "Homowo Festival",
    description: "A harvest festival celebrated by the Ga people with traditional food and music.",
    date: "August-September",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGByJbCp_AdBB9NPGiHvLVbV_0UkVm9II4VA&s"
    },
    {
    name: "Independence Day",
    description: "Commemorates Ghana’s independence from the United Kingdom with national events and parades.",
    date: "March 6",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE4t3u5XtU1vFw7tIu-VfmKHxbhVP1V9dY4Q&s"
    }
    ]
    },
    {
    name: "Grand Duchy of Tuscany, The",
    festivals: [
    {
    name: "Calcio Storico",
    description: "An ancient game of football with historical significance, played during the summer.",
    date: "June",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJ0ltWZ4ENqdVInSgIwjJdk-6eqtLIswUHw&s"
    }
    ]
    },
    {
    name: "Greece",
    festivals: [
    {
    name: "Easter",
    description: "The most important holiday in Greece, marked with religious services, feasts, and traditional dances.",
    date: "April",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE1PhucJ1EoUqA2lmwUbBfjAVc2H_0VqnAhQ&s"
    },
    {
    name: "Athens and Epidaurus Festival",
    description: "A cultural festival with performances in ancient theaters, including opera, theater, and ballet.",
    date: "June-August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZOiCORo7jEZmQreDvG7LxIIQAjn-fBFMUxQ&s"
    }
    ]
    },
    {
    name: "Grenada",
    festivals: [
    {
    name: "Spicemas",
    description: "Grenada's largest carnival, with colorful parades, music, and dancing.",
    date: "August",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjd6yjzgCR3Fne4_RKUwSP0aFNB1dUsbY_jA&s"
    },
    {
    name: "Independence Day",
    description: "Celebrates Grenada's independence from the United Kingdom with parades and national events.",
    date: "February 7",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXMQR2WT7FQl2joBpuOrGZmamWH9ik-Fouw&s"
    }
    ]
    },
    {
    name: "Guatemala",
    festivals: [
    {
    name: "Semana Santa (Holy Week)",
    description: "A significant religious event with processions, parades, and celebrations during Easter.",
    date: "March-April",
    image_url: ""
    },
    {
    name: "Fiesta de la Virgen de la Asunción",
    description: "A religious festival honoring the Virgin Mary with traditional processions and festivities.",
    date: "August 15",
    image_url: ""
    }
    ]
    },
    {
    name: "Guinea",
    festivals: [
    {
    name: "Fête de l'Indépendance",
    description: "Celebrates Guinea's independence from France with national events and parades.",
    date: "October 2",
    image_url: ""
    },
    {
    name: "Konkoba Festival",
    description: "A cultural festival celebrated by the Malinké people, marked by music, dances, and food.",
    date: "November",
    image_url: ""
    }
    ]
    },
    {
    name: "Guinea-Bissau",
    festivals: [
    {
    name: "Carnival",
    description: "A vibrant celebration with parades, music, and traditional dances.",
    date: "February",
    image_url: ""
    },
    {
    name: "Independence Day",
    description: "Commemorates Guinea-Bissau’s independence from Portugal with national celebrations.",
    date: "September 24",
    image_url: ""
    }
    ]
    },
    {
    name: "Guyana",
    festivals: [
    {
    name: "Mashramani",
    description: "Guyana's Republic Day celebration with parades, music, and cultural performances.",
    date: "February 23",
    image_url: ""
    },
    {
    name: "Diwali",
    description: "The Festival of Lights celebrated by the Hindu community with lights, prayers, and sweets.",
    date: "October-November",
    image_url: ""
    }
    ]
    },
    {
    name: "Haiti",
    festivals: [
    {
    name: "Carnival",
    description: "Haiti's vibrant carnival celebration with parades, music, and dancing.",
    date: "January-February",
    image_url: ""
    },
    {
    name: "Independence Day",
    description: "Commemorates Haiti's independence from France with national events and celebrations.",
    date: "January 1",
    image_url: ""
    }
    ]
    },
    {
    name: "Hanover",
    festivals: [
    {
    name: "Hanover Fair",
    description: "A major industrial trade fair in Hanover showcasing technology and innovation.",
    date: "April",
    image_url: ""
    }
    ]
    },
    {
    name: "Hanseatic Republics",
    festivals: [
    {
    name: "Hanseatic Day",
    description: "A celebration of the Hanseatic League with historic reenactments and events in various cities.",
    date: "June",
    image_url: ""
    }
    ]
    },
    {
    name: "Hawaii",
    festivals: [
    {
    name: "Aloha Festival",
    description: "A festival celebrating Hawaiian culture with music, hula dances, and food.",
    date: "September",
    image_url: ""
    },
    {
    name: "Lei Day",
    description: "A celebration of Hawaiian culture with flower leis, music, and local traditions.",
    date: "May 1",
    image_url: ""
    }
    ]
    },
    {
    name: "Hesse",
    festivals: [
    {
    name: "Wiesbaden Wine Festival",
    description: "A celebration of Hesse’s wine culture, with tastings and events in Wiesbaden.",
    date: "September",
    image_url: ""
    }
    ]
    },
    {
    name: "Holy See",
    festivals: [
    {
    name: "Feast of the Assumption",
    description: "A religious feast day in the Catholic Church, commemorating the Virgin Mary's assumption into heaven.",
    date: "August 15",
    image_url: ""
    }
    ]
    },
    {
    name: "Honduras",
    festivals: [
    {
    name: "La Feria Juniana",
    description: "A celebration of the city of San Pedro Sula with parades, music, and traditional events.",
    date: "June",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/73/La_Feria_Juniana_Honduras.jpg"
    },
    {
    name: "Independence Day",
    description: "Marks Honduras' independence from Spain with national celebrations.",
    date: "September 15",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Honduras_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Hungary",
    festivals: [
    {
    name: "Budapest Spring Festival",
    description: "A cultural festival in Budapest with music, theater, and dance performances.",
    date: "March-April",
    image_url: ""
    },
    {
    name: "St. Stephen's Day",
    description: "A national holiday to celebrate Hungary’s founding with processions and fireworks.",
    date: "August 20",
    image_url: ""
    }
    ]
    },
    {
    name: "Iceland",
    festivals: [
    {
    name: "Iceland Airwaves",
    description: "An annual music festival featuring live performances by Icelandic and international artists.",
    date: "November",
    image_url: ""
    },
    {
    name: "Þorrablót",
    description: "A mid-winter celebration where Icelanders celebrate traditional Viking foods and culture.",
    date: "January-February",
    image_url: ""
    }
    ]
    },
    {
    name: "India",
    festivals: [
    {
    name: "Diwali",
    description: "The Festival of Lights, celebrated with lamps, fireworks, and sweets.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/The_Rangoli_of_Lights.jpg/240px-The_Rangoli_of_Lights.jpg"
    },
    {
    name: "Holi",
    description: "The Festival of Colors, marked by throwing colored powders and water.",
    date: "March",
    image_url: "https://aicc.com.au/wp-content/uploads/2024/03/Australia-India-Chamber-of-Commerce-Holi-02.jpg"
    }
    ]
    },
    {
    name: "Indonesia",
    festivals: [
    {
    name: "Nyepi",
    description: "Balinese Day of Silence, a Hindu celebration marked by fasting, meditation, and no movement in Bali.",
    date: "March",
    image_url: ""
    },
    {
    name: "Independence Day",
    description: "Celebration of Indonesia's independence from the Netherlands with ceremonies and festivities.",
    date: "August 17",
    image_url: ""
    }
    ]
    },
    {
    name: "Iran",
    festivals: [
    {
    name: "Nowruz",
    description: "Persian New Year, celebrated with family gatherings, feasts, and traditional rituals.",
    date: "March 20-21",
    image_url: ""
    },
    {
    name: "Yalda Night",
    description: "A celebration of the longest night of the year with poetry, fruits, and family gatherings.",
    date: "December 20-21",
    image_url: ""
    }
    ]
    },
    {
    name: "Iraq",
    festivals: [
    {
    name: "Ashura",
    description: "A religious observance commemorating the martyrdom of Imam Hussein with processions and rituals.",
    date: "September-October",
    image_url: ""
    },
    {
    name: "Nowruz",
    description: "Persian New Year, celebrated with family gatherings and traditional food, marking the start of spring.",
    date: "March",
    image_url: ""
    }
    ]
    },
    {
    name: "Ireland",
    festivals: [
    {
    name: "St. Patrick's Day",
    description: "Ireland's national holiday, celebrated with parades, wearing green, and festivities honoring St. Patrick.",
    date: "March 17",
    image_url: ""
    },
    {
    name: "Galway International Arts Festival",
    description: "A festival featuring theater, music, and dance performances, celebrated in Galway.",
    date: "July",
    image_url: ""
    }
    ]
    },
    {
    name: "Israel",
    festivals: [
    {
    name: "Passover (Pesach)",
    description: "A major Jewish holiday commemorating the Exodus from Egypt with a Seder meal and family gatherings.",
    date: "March-April",
    image_url: ""
    },
    {
    name: "Yom Kippur",
    description: "The holiest day in Judaism, marked by fasting, prayer, and reflection.",
    date: "September-October",
    image_url: ""
    }
    ]
    },
    {
    name: "Italy",
    festivals: [
    {
    name: "Carnival of Venice",
    description: "A world-famous festival in Venice with elaborate masks, costumes, and parades.",
    date: "February-March",
    image_url: ""
    },
    {
    name: "Ferragosto",
    description: "An Italian summer holiday with festivals, fireworks, and family gatherings.",
    date: "August 15",
    image_url: ""
    }
    ]
    },
    {
    name: "Jamaica",
    festivals: [
    {
    name: "Jamaica Carnival",
    description: "A vibrant celebration featuring music, dance, and colorful parades.",
    date: "April",
    image_url: ""
    },
    {
    name: "Reggae Sumfest",
    description: "The largest reggae festival in the world, featuring performances by top reggae artists.",
    date: "July",
    image_url: ""
    }
    ]
    },
    {
    name: "Japan",
    festivals: [
    {
    name: "Cherry Blossom Festival (Hanami)",
    description: "A celebration of the arrival of spring, with picnics and viewing cherry blossoms.",
    date: "March-April",
    image_url: ""
    },
    {
    name: "Gion Matsuri",
    description: "Kyoto’s annual festival featuring grand parades and cultural performances.",
    date: "July",
    image_url: ""
    }
    ]
    },
    {
    name: "Jordan",
    festivals: [
    {
    name: "Jerash Festival",
    description: "A festival of culture and arts held annually in the ancient city of Jerash.",
    date: "July",
    image_url: ""
    },
    {
    name: "Eid al-Fitr",
    description: "A religious holiday marking the end of Ramadan, celebrated with feasts and prayers.",
    date: "April-May",
    image_url: ""
    }
    ]
    },
    {
    name: "Kazakhstan",
    festivals: [
    {
    name: "Nauryz Meyrami",
    description: "A traditional celebration of the spring equinox, marking the start of the New Year.",
    date: "March 21-23",
    image_url: ""
    },
    {
    name: "Kazakh Independence Day",
    description: "Celebration of Kazakhstan's independence from the Soviet Union with parades and events.",
    date: "December 16",
    image_url: ""
    }
    ]
    },
    {
    name: "Kenya",
    festivals: [
    {
    name: "Lamu Cultural Festival",
    description: "A celebration of the rich culture of Lamu, including music, dance, and traditional rituals.",
    date: "November",
    image_url: ""
    },
    {
    name: "Mombasa Carnival",
    description: "A colorful carnival featuring parades, traditional dances, and coastal music.",
    date: "November",
    image_url: ""
    }
    ]
    },
    {
    name: "Serbia/Yugoslavia",
    festivals: [
    {
    name: "Exit Festival",
    description: "One of the largest music festivals in Europe, held annually in Novi Sad.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Exit_Festival_Serbia.jpg"
    },
    {
    name: "Serbian Orthodox Christmas",
    description: "Celebration of Christmas with religious ceremonies, feasts, and family gatherings.",
    date: "January 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Serbia_Orthodox_Christmas_celebration.jpg"
    }
    ]
    },
    {
    name: "Kiribati",
    festivals: [
    {
    name: "Merry Monarch Festival",
    description: "Celebration of the national holiday with a traditional celebration and cultural dances.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Merry_Monarch_Festival_Kiribati.jpg"
    },
    {
    name: "Christmas",
    description: "Christmas celebrated with local traditions, music, and dancing.",
    date: "December 25",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Kiribati_Christmas_Celebration.jpg"
    }
    ]
    },
    {
    name: "Korea",
    festivals: [
    {
    name: "Seollal (Lunar New Year)",
    description: "A traditional celebration marking the start of the lunar new year with family gatherings.",
    date: "January-February",
    image_url: ""
    },
    {
    name: "Chuseok",
    description: "Korean harvest festival, with feasts, dances, and honoring ancestors.",
    date: "September",
    image_url: ""
    }
    ]
    },
    {
    name: "Kosovo",
    festivals: [
    {
    name: "Kosovo Independence Day",
    description: "Celebration of Kosovo's independence with parades and festivities.",
    date: "February 17",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Kosovo_Independence_Day.jpg"
    },
    {
    name: "Vidovdan",
    description: "A national holiday commemorating the battle of Kosovo and honoring Serbian heritage.",
    date: "June 28",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Vidovdan_Celebration_Kosovo.jpg"
    }
    ]
    },
    {
    name: "Kuwait",
    festivals: [
    {
    name: "Kuwait National Day",
    description: "Commemoration of Kuwait's independence with parades, fireworks, and celebrations.",
    date: "February 25",
    image_url: ""
    },
    {
    name: "Eid al-Fitr",
    description: "Celebration marking the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "April-May",
    image_url: ""
    }
    ]
    },
    {
    name: "Kyrgyzstan",
    festivals: [
    {
    name: "Nooruz",
    description: "The spring festival, marking the new year with rituals, feasts, and celebrations.",
    date: "March 21",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Nooruz_Festival_Kyrgyzstan.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebration of Kyrgyzstan's independence with parades, performances, and cultural events.",
    date: "August 31",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Kyrgyzstan_Independence_Day_Parade.jpg"
    }
    ]
    },
    {
    name: "Laos",
    festivals: [
    {
    name: "Pi Mai (Lao New Year)",
    description: "The Lao New Year, celebrated with water fights, parades, and religious rituals.",
    date: "April 13-15",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Laos_new_year_festival.jpg"
    },
    {
    name: "Boun That Luang",
    description: "A religious festival in Vientiane, celebrating the That Luang stupa.",
    date: "November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Boun_That_Luang_2017.jpg"
    }
    ]
    },
    {
    name: "Latvia",
    festivals: [
    {
    name: "Ligo",
    description: "Latvia’s midsummer festival, celebrated with traditional songs, dances, and bonfires.",
    date: "June 23-24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Ligo_Festival_Latvia.jpg"
    },
    {
    name: "Latvian Song and Dance Festival",
    description: "A national festival of song and dance, showcasing Latvia's cultural traditions.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Latvian_Song_Festival_2018.jpg"
    }
    ]
    },
    {
    name: "Lebanon",
    festivals: [
    {
    name: "Baalbeck International Festival",
    description: "A prestigious cultural festival featuring music, opera, and dance performances.",
    date: "July-August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/67/Baalbek_Festival_Lebanon.jpg"
    },
    {
    name: "Beirut International Film Festival",
    description: "An annual event showcasing films from Lebanon and around the world.",
    date: "October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Beirut_International_Film_Festival.jpg"
    }
    ]
    },
    {
    name: "Lesotho",
    festivals: [
    {
    name: "King’s Birthday",
    description: "A national holiday celebrating the King’s Birthday with parades and ceremonies.",
    date: "July 17",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/39/Lesotho_king.jpg"
    },
    {
    name: "Morija Arts & Cultural Festival",
    description: "A celebration of the country’s cultural heritage through music, dance, and crafts.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Morija_Arts_and_Cultural_Festival.jpg"
    }
    ]
    },
    {
    name: "Liberia",
    festivals: [
    {
    name: "Liberian Independence Day",
    description: "Celebration of Liberia's independence with parades, parties, and cultural exhibitions.",
    date: "July 26",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Liberian_Independence_Day.jpg"
    },
    {
    name: "Christmas",
    description: "Celebration of Christmas with religious services, feasts, and cultural activities.",
    date: "December 25",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Liberian_Christmas_celebration.jpg"
    }
    ]
    },
    {
    name: "Libya",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "Celebration of the end of Ramadan with prayers, feasts, and community gatherings.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Eid_Al_Fitr_Libya.jpg"
    },
    {
    name: "Revolution Day",
    description: "Celebration of the Libyan Revolution with events honoring the country's history.",
    date: "September 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/90/Libya_Revolution_Day.jpg"
    }
    ]
    },
    {
    name: "Liechtenstein",
    festivals: [
    {
    name: "National Day",
    description: "Celebration of Liechtenstein's independence with speeches, fireworks, and festivities.",
    date: "August 15",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Liechtenstein_National_Day.jpg"
    },
    {
    name: "Fasnacht",
    description: "A lively carnival celebration with costumes, parades, and parties.",
    date: "February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Liechtenstein_Fasnacht_Carnival.jpg"
    }
    ]
    },
    {
    name: "Lithuania",
    festivals: [
    {
    name: "Joninės",
    description: "Lithuanian midsummer festival, celebrated with singing, dancing, and bonfires.",
    date: "June 23-24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Joninės_Lithuania.jpg"
    },
    {
    name: "Vilnius International Film Festival",
    description: "A prominent film festival showcasing international and local films.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Vilnius_Film_Festival_Lithuania.jpg"
    }
    ]
    },
    {
    name: "Luxembourg",
    festivals: [
    {
    name: "National Day",
    description: "Celebration of Luxembourg's National Day with parades, fireworks, and concerts.",
    date: "June 23",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Luxembourg_National_Day.jpg"
    },
    {
    name: "Schueberfouer",
    description: "A traditional fair in Luxembourg City with amusement rides, food stalls, and entertainment.",
    date: "August-September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Schueberfouer_Luxembourg.jpg"
    }
    ]
    },{
    name: "Madagascar",
    festivals: [
    {
    name: "Alahamady Be",
    description: "The Malagasy New Year, celebrated with feasts and traditional dances.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Alahamady_Be_Madagascar.jpg"
    },
    {
    name: "Famadihana",
    description: "The 'Turning of the Bones' festival, a traditional ceremony where families exhume the remains of their ancestors.",
    date: "Varies (typically in July-August)",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Famadihana_Madagascar.jpg"
    }
    ]
    },
    {
    name: "Malawi",
    festivals: [
    {
    name: "Lake of Stars Festival",
    description: "An annual music festival held by Lake Malawi, featuring international and local artists.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Lake_of_Stars_Festival_Malawi.jpg"
    },
    {
    name: "Chewa Cultural Festival",
    description: "A celebration of Chewa traditions with music, dance, and food.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Chewa_Cultural_Festival_Malawi.jpg"
    }
    ]
    },
    {
    name: "Malaysia",
    festivals: [
    {
    name: "Hari Raya Puasa",
    description: "The celebration at the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Hari_Raya_Malaysia.jpg"
    },
    {
    name: "Deepavali",
    description: "The Festival of Lights, celebrated with fireworks, sweets, and family gatherings.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Deepavali_Festival_Malaysia.jpg"
    }
    ]
    },
    {
    name: "Maldives",
    festivals: [
    {
    name: "Ramadan",
    description: "A holy month of fasting and prayers, ending with Eid al-Fitr celebrations.",
    date: "March-April",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/28/Maldives_Ramadan.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebration of the Maldives' independence from the British with parades and ceremonies.",
    date: "July 26",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Maldives_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Mali",
    festivals: [
    {
    name: "Festival in the Desert",
    description: "A music festival held in the desert, celebrating traditional and contemporary music.",
    date: "January",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Festival_in_the_Desert_Mali.jpg"
    },
    {
    name: "Timbuktu Festival",
    description: "A festival celebrating the culture and history of Timbuktu with music, arts, and crafts.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Timbuktu_Mali.jpg"
    }
    ]
    },
    {
    name: "Malta",
    festivals: [
    {
    name: "Feast of St. Paul's Shipwreck",
    description: "Celebrating the shipwreck of St. Paul in Malta, with religious ceremonies and processions.",
    date: "February 10",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/51/St_Pauls_Shipwreck_Feast_Malta.jpg"
    },
    {
    name: "Maltese Carnival",
    description: "A colorful celebration with parades, costumes, and feasts.",
    date: "February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/29/Malta_Carnival.jpg"
    }
    ]
    },
    {
    name: "Marshall Islands",
    festivals: [
    {
    name: "Merriman Day",
    description: "Celebration of the life and contributions of the first president of the Marshall Islands.",
    date: "August 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Merriman_Day_Marshall_Islands.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebration of the Marshall Islands' independence with parades and national events.",
    date: "May 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Independence_Day_Marshall_Islands.jpg"
    }
    ]
    },
    {
    name: "Mauritania",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "The celebration at the end of Ramadan with prayers, feasts, and family gatherings.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Eid_Al_Fitr_Mauritania.jpg"
    },
    {
    name: "Nouakchott International Book Fair",
    description: "A cultural event showcasing literature, art, and cultural discussions.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Nouakchott_Book_Fair.jpg"
    }
    ]
    },
    {
    name: "Mauritius",
    festivals: [
    {
    name: "Cavadee",
    description: "A religious festival celebrated by the Tamil community with processions and offerings to Lord Murugan.",
    date: "January-February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Cavadee_Festival_Mauritius.jpg"
    },
    {
    name: "Diwali",
    description: "The Festival of Lights, marked by lamp lighting, prayers, and fireworks.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Mauritius_Diwali_Festival.jpg"
    }
    ]
    },
    {
    name: "Mexico",
    festivals: [
    {
    name: "Day of the Dead (Día de los Muertos)",
    description: "A celebration of deceased loved ones with altars, offerings, and vibrant parades.",
    date: "November 1-2",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Day_of_the_Dead_celebration_Mexico.jpg"
    },
    {
    name: "Cinco de Mayo",
    description: "A holiday celebrating the Mexican victory at the Battle of Puebla with parades, music, and dancing.",
    date: "May 5",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cinco_de_Mayo_Mexico.jpg"
    }
    ]
    },
    {
    name: "Monaco",
    festivals: [
    {
    name: "Monaco Grand Prix",
    description: "A prestigious Formula 1 race held on the streets of Monaco.",
    date: "May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Monaco_Grand_Prix.jpg"
    },
    {
    name: "Monaco National Day",
    description: "The celebration of Monaco's sovereignty with a royal ceremony and various events.",
    date: "November 19",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Monaco_National_Day.jpg"
    }
    ]
    },
    {
    name: "Mongolia",
    festivals: [
    {
    name: "Naadam Festival",
    description: "A major holiday celebrating the three manly games: wrestling, horse racing, and archery.",
    date: "July 11-13",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Naadam_Mongolia.jpg"
    },
    {
    name: "Tsagaan Sar",
    description: "The Mongolian Lunar New Year, marked by family reunions and traditional feasts.",
    date: "February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Tsagaan_Sar_Festival.jpg"
    }
    ]
    },
    {
    name: "Montenegro",
    festivals: [
    {
    name: "Kotor Carnival",
    description: "A colorful carnival featuring parades, masks, and traditional costumes.",
    date: "February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Kotor_Carnival.jpg"
    },
    {
    name: "Montenegro Music Festival",
    description: "An annual event celebrating music with performances by both local and international artists.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Montenegro_Music_Festival.jpg"
    }
    ]
    },
    {
    name: "Morocco",
    festivals: [
    {
    name: "Mawlid al-Nabi",
    description: "The celebration of the birth of Prophet Muhammad, marked by prayers and feasts.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Mawlid_Morocco.jpg"
    },
    {
    name: "Festival of Roses",
    description: "A festival celebrating the blooming of roses in the Valley of Roses, with music and cultural events.",
    date: "May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/16/Rose_Festival_Morocco.jpg"
    }
    ]
    },
    {
    name: "Mozambique",
    festivals: [
    {
    name: "Maputo International Music Festival",
    description: "An annual music festival held in the capital, featuring international and local artists.",
    date: "November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maputo_Music_Festival.jpg"
    },
    {
    name: "Mozambique Independence Day",
    description: "Celebration of Mozambique's independence from Portugal with parades and ceremonies.",
    date: "June 25",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mozambique_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Namibia",
    festivals: [
    {
    name: "Windhoek Carnival",
    description: "A lively carnival in the capital city with parades, music, and dancing.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Windhoek_Carnival.jpg"
    },
    {
    name: "Namibia Tourism Expo",
    description: "A major event to promote Namibian tourism with exhibitions and cultural displays.",
    date: "May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Namibia_Tourism_Expo.jpg"
    }
    ]
    },
    {
    name: "Nauru",
    festivals: [
    {
    name: "Nauru Independence Day",
    description: "The celebration of Nauru's independence from Australia with national events and ceremonies.",
    date: "January 31",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Nauru_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Nepal",
    festivals: [
    {
    name: "Dashain",
    description: "Nepal's largest festival, celebrating the victory of good over evil with animal sacrifices, prayers, and feasts.",
    date: "September-October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Dashain_Festival_Nepal.jpg"
    },
    {
    name: "Tihar",
    description: "The Festival of Lights, celebrated by honoring animals, family, and goddess Laxmi with lamps and decorations.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Tihar_Festival_Nepal.jpg"
    }
    ]
    },
    {
    name: "Netherlands",
    festivals: [
    {
    name: "King's Day",
    description: "A national holiday celebrating the birthday of the King with parades, street parties, and concerts.",
    date: "April 27",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/King%27s_Day_Netherlands.jpg"
    },
    {
    name: "Amsterdam Dance Event",
    description: "An electronic music festival attracting thousands of artists and fans from around the world.",
    date: "October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Amsterdam_Dance_Event.jpg"
    }
    ]
    },
    {
    name: "New Zealand",
    festivals: [
    {
    name: "Waitangi Day",
    description: "A national holiday marking the signing of the Treaty of Waitangi, with cultural events and ceremonies.",
    date: "February 6",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Waitangi_Day_New_Zealand.jpg"
    },
    {
    name: "New Zealand International Film Festival",
    description: "A celebration of cinema with screenings of international and local films across the country.",
    date: "July-August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/34/New_Zealand_Film_Festival.jpg"
    }
    ]
    },
    {
    name: "Nicaragua",
    festivals: [
    {
    name: "La Purísima",
    description: "A celebration honoring the Virgin Mary with processions and fireworks.",
    date: "December 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/La_Purisima_Nicaragua.jpg"
    },
    {
    name: "Semana Santa",
    description: "Holy Week celebrations with religious processions and cultural events.",
    date: "March-April",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Semana_Santa_Nicaragua.jpg"
    }
    ]
    },
    {
    name: "Niger",
    festivals: [
    {
    name: "Independence Day",
    description: "Celebrates Niger's independence from France with ceremonies and parades.",
    date: "August 3",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Independence_Day_Niger.jpg"
    },
    {
    name: "Festival of the Nomads",
    description: "A cultural festival that celebrates nomadic traditions with music, dance, and food.",
    date: "December",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Festival_of_the_Nomads_Niger.jpg"
    }
    ]
    },
    {
    name: "Nigeria",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A major Islamic festival marking the end of Ramadan with feasts and prayers.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Eid_Al_Fitr_Nigeria.jpg"
    },
    {
    name: "Argungu Festival",
    description: "An annual festival in Argungu featuring traditional fishing and cultural performances.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Argungu_Festival.jpg"
    }
    ]
    },
    {
    name: "Niue",
    festivals: [
    {
    name: "Niue Language Week",
    description: "A celebration of the Niuean language and culture with music, food, and performances.",
    date: "June",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Niue_Language_Week.jpg"
    },
    {
    name: "Niuean Independence Day",
    description: "Commemorating Niue's self-government with parades and cultural activities.",
    date: "October 19",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Niue_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "North Macedonia",
    festivals: [
    {
    name: "Ohrid Summer Festival",
    description: "An international cultural event with music, theater, and dance performances.",
    date: "July-August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ohrid_Summer_Festival_Macedonia.jpg"
    },
    {
    name: "Ilinden Day",
    description: "A national holiday celebrating the Macedonian independence movement.",
    date: "August 2",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Ilinden_Macedonia.jpg"
    }
    ]
    },
    {
    name: "Norway",
    festivals: [
    {
    name: "Constitution Day",
    description: "A national holiday celebrating Norway's constitution with parades and public events.",
    date: "May 17",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Constitution_Day_Norway.jpg"
    },
    {
    name: "Bergen International Festival",
    description: "A cultural festival in Bergen featuring music, dance, and theater.",
    date: "May-June",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Bergen_Festival_Norway.jpg"
    }
    ]
    },
    {
    name: "Oman",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "Celebration of the end of Ramadan with family gatherings, prayers, and feasts.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Eid_Al_Fitr_Oman.jpg"
    },
    {
    name: "Muscat Festival",
    description: "A cultural festival in Muscat with traditional music, dance, and performances.",
    date: "January-February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Muscat_Festival_Oman.jpg"
    }
    ]
    },
    {
    name: "Pakistan",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A major Islamic festival marking the end of Ramadan with feasts and prayers.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Eid_al-Fitr_in_Pakistan.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebrates Pakistan's independence from Britain with parades, flag hoisting, and ceremonies.",
    date: "August 14",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Pakistan_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Palau",
    festivals: [
    {
    name: "Palau National Day",
    description: "Celebrates Palau's independence with parades, cultural events, and flag ceremonies.",
    date: "October 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Palau_National_Day.jpg"
    },
    {
    name: "Belau (Olon) Festival",
    description: "A festival celebrating the culture and traditions of Palau with music, dance, and food.",
    date: "November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/55/Belau_Festival_Palau.jpg"
    }
    ]
    },
    {
    name: "Panama",
    festivals: [
    {
    name: "Carnival",
    description: "A lively pre-Lenten festival with parades, music, and dancing.",
    date: "February-March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Panama_Carnival.jpg"
    },
    {
    name: "Independence Day",
    description: "Commemorates Panama's separation from Colombia with celebrations and parades.",
    date: "November 3",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Panama_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Papal States",
    festivals: [
    {
    name: "Feast of the Chair of St. Peter",
    description: "A Roman Catholic celebration of St. Peter, the first pope.",
    date: "February 22",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Chair_of_St_Peter.jpg"
    },
    {
    name: "Papal Jubilee",
    description: "A religious event celebrating the Pope’s reign and the Catholic faith.",
    date: "Various years",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Papal_Jubilee.jpg"
    }
    ]
    },
    {
    name: "Papua New Guinea",
    festivals: [
    {
    name: "Hiri Moale Festival",
    description: "A celebration of the culture and history of the Motu-Koitabu people with canoe races, music, and food.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Hiri_Moale_Festival.jpg"
    },
    {
    name: "National Independence Day",
    description: "Commemorates Papua New Guinea's independence from Australia with parades and public celebrations.",
    date: "September 16",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Papua_New_Guinea_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Paraguay",
    festivals: [
    {
    name: "Carnival",
    description: "A vibrant celebration with music, parades, and dancing before the start of Lent.",
    date: "February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Paraguay_Carnival.jpg"
    },
    {
    name: "Independence Day",
    description: "A national holiday commemorating Paraguay's independence with parades, festivities, and cultural events.",
    date: "May 14-15",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Paraguay_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Peru",
    festivals: [
    {
    name: "Inti Raymi",
    description: "The Incan Sun Festival, celebrated with processions and rituals honoring the sun god, Inti.",
    date: "June 24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Inti_Raymi_Peru.jpg"
    },
    {
    name: "Fiesta de la Candelaria",
    description: "A religious festival featuring dances, music, and colorful costumes, honoring the Virgin of Candelaria.",
    date: "February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Fiesta_de_la_Candelaria_Peru.jpg"
    }
    ]
    },
    {
    name: "Philippines",
    festivals: [
    {
    name: "Sinulog Festival",
    description: "A major cultural and religious festival in Cebu City with street dancing, parades, and parties.",
    date: "January",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Sinulog_Festival_Philippines.jpg"
    },
    {
    name: "Eid al-Fitr",
    description: "A major Islamic festival marking the end of Ramadan with feasts and prayers.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Eid_al-Fitr_Philippines.jpg"
    }
    ]
    },
    {
    name: "Piedmont-Sardinia",
    festivals: [
    {
    name: "Festa della Liberazione",
    description: "Commemorates the liberation of Piedmont from foreign rule with parades and cultural events.",
    date: "April 25",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Festa_della_Liberazione_Piedmont.jpg"
    },
    {
    name: "St. John’s Day",
    description: "A religious festival in honor of St. John the Baptist, featuring processions and church services.",
    date: "June 24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/St_John%27s_Day_Piedmont.jpg"
    }
    ]
    },
    {
    name: "Poland",
    festivals: [
    {
    name: "Wianki",
    description: "A midsummer festival in Kraków with bonfires, music, and flower wreaths.",
    date: "June 23",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Wianki_Poland.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebrates Poland's independence with parades, ceremonies, and patriotic events.",
    date: "November 11",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Poland_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Portugal",
    festivals: [
    {
    name: "Festa de São João",
    description: "A lively festival in Porto with music, dancing, and fireworks celebrating St. John.",
    date: "June 23-24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Festa_de_São_João_Portugal.jpg"
    },
    {
    name: "Carnival",
    description: "A festive season of parades, dancing, and music, celebrated before Lent.",
    date: "February-March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Portugal_Carnival.jpg"
    }
    ]
    },
    {
    name: "Qatar",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A major Islamic festival marking the end of Ramadan with feasts and prayers.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Eid_al-Fitr_Qatar.jpg"
    },
    {
    name: "National Day",
    description: "Commemorates Qatar’s independence with parades, traditional dances, and military displays.",
    date: "December 18",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Qatar_National_Day.jpg"
    }
    ]
    },
    {
    name: "Republic of Genoa",
    festivals: [
    {
    name: "Genoa International Boat Show",
    description: "A major maritime event showcasing boats and yachts.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Genoa_Boat_Show.jpg"
    },
    {
    name: "Festa della Madonna della Guardia",
    description: "A religious festival honoring the patron saint of Genoa with processions and festivities.",
    date: "August 29",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Festa_della_Madonna_della_Guardia.jpg"
    }
    ]
    },
    {
    name: "Republic of Korea (South Korea)",
    festivals: [
    {
    name: "Seollal",
    description: "The Korean Lunar New Year, celebrated with family gatherings, rituals, and traditional food.",
    date: "January or February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Seollal_South_Korea.jpg"
    },
    {
    name: "Chuseok",
    description: "A harvest festival celebrated with family, feasts, and ancestor rituals.",
    date: "September or October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Chuseok_South_Korea.jpg"
    }
    ]
    },
    {
    name: "Republic of the Congo",
    festivals: [
    {
    name: "Fête de la Musique",
    description: "A celebration of music with free performances throughout the country.",
    date: "June 21",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Fete_de_la_Musique_Congo.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebrates the Republic of the Congo's independence from France with ceremonies and parades.",
    date: "August 15",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Republic_of_the_Congo_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Romania",
    festivals: [
    {
    name: "Unification Day",
    description: "Commemorates the unification of Romania with Moldova, celebrated with ceremonies and festivities.",
    date: "January 24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Unification_Day_Romania.jpg"
    },
    {
    name: "Romanian National Day",
    description: "Celebrates Romania's national unity with parades, concerts, and fireworks.",
    date: "December 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Romanian_National_Day.jpg"
    }
    ]
    },
    {
    name: "Russia",
    festivals: [
    {
    name: "Victory Day",
    description: "Commemorates the victory over Nazi Germany in WWII with military parades and celebrations.",
    date: "May 9",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Victory_Day_Russia.jpg"
    },
    {
    name: "Maslenitsa",
    description: "A traditional Slavic festival welcoming spring with pancakes, music, and dances.",
    date: "February or March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Maslenitsa_Russia.jpg"
    }
    ]
    },
    {
    name: "Rwanda",
    festivals: [
    {
    name: "Kwita Izina",
    description: "A gorilla naming ceremony held annually to promote wildlife conservation.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Kwita_Izina_Gorilla_Ceremony.jpg"
    },
    {
    name: "Genocide Memorial Day",
    description: "A solemn day of remembrance for the victims of the 1994 Rwandan Genocide.",
    date: "April 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Genocide_Memorial_Day_Rwanda.jpg"
    }
    ]
    },
    {
    name: "Saint Kitts and Nevis",
    festivals: [
    {
    name: "St. Kitts Music Festival",
    description: "A popular music festival featuring international and local artists.",
    date: "June",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/34/St_Kitts_Music_Festival.jpg"
    },
    {
    name: "Independence Day",
    description: "Commemorates the independence of Saint Kitts and Nevis from Britain with parades and celebrations.",
    date: "September 19",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Saint_Kitts_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Saint Lucia",
    festivals: [
    {
    name: "Carnival",
    description: "A vibrant Caribbean festival celebrated with parades, costumes, and music.",
    date: "July-August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Saint_Lucia_Carnival.jpg"
    },
    {
    name: "La Rose Festival",
    description: "A celebration of Saint Lucia's cultural heritage, featuring music, dance, and floral displays.",
    date: "August 30",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/La_Rose_Festival_Saint_Lucia.jpg"
    }
    ]
    },
    {
    name: "Saint Vincent and the Grenadines",
    festivals: [
    {
    name: "Vincy Mas",
    description: "A lively carnival with parades, music, and dancing, celebrated during the summer.",
    date: "June-July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Vincy_Mas_Festival.jpg"
    },
    {
    name: "Independence Day",
    description: "Commemorates the independence of Saint Vincent and the Grenadines from Britain with national celebrations.",
    date: "October 27",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Independence_Day_SVG.jpg"
    }
    ]
    },
    {
    name: "Samoa",
    festivals: [
    {
    name: "Siva Afi Festival",
    description: "A traditional Samoan fire knife dance festival held to celebrate Samoan culture.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Samoa_Festival.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebrates Samoa's independence from New Zealand with cultural displays, parades, and festivities.",
    date: "June 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Samoa_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "San Marino",
    festivals: [
    {
    name: "Feast of Saint Marinus",
    description: "The national day of San Marino, celebrating the country's patron saint with religious ceremonies and festivities.",
    date: "September 3",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Feast_of_Saint_Marinus_San_Marino.jpg"
    },
    {
    name: "Medieval Days",
    description: "A festival celebrating San Marino's medieval history with reenactments, traditional music, and markets.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Medieval_Days_San_Marino.jpg"
    }
    ]
    },
    {
    name: "Sao Tome and Principe",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates Sao Tome and Principe's independence from Portugal with national celebrations and parades.",
    date: "July 12",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Sao_Tome_Independence_Day.jpg"
    },
    {
    name: "Cultural Festival",
    description: "A festival showcasing the rich cultural traditions of Sao Tome and Principe, including music, dance, and crafts.",
    date: "December",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Cultural_Festival_Sao_Tome.jpg"
    }
    ]
    },
    {
    name: "Saudi Arabia",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A major Islamic festival marking the end of Ramadan with feasts, prayers, and giving to charity.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eid_al-Fitr_Saudi_Arabia.jpg"
    },
    {
    name: "Saudi National Day",
    description: "Celebrates the founding of the Kingdom of Saudi Arabia with parades, fireworks, and cultural performances.",
    date: "September 23",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Saudi_National_Day.jpg"
    }
    ]
    },
    {
    name: "Senegal",
    festivals: [
    {
    name: "Tabaski",
    description: "A religious festival marking the end of Hajj, celebrated with feasts and prayers.",
    date: "July-August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/57/Tabaski_Senegal.jpg"
    },
    {
    name: "Saint-Louis Jazz Festival",
    description: "An annual jazz festival held in Saint-Louis, showcasing international and local jazz musicians.",
    date: "May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Saint-Louis_Jazz_Festival_Senegal.jpg"
    }
    ]
    },
    {
    name: "Serbia",
    festivals: [
    {
    name: "Serbian Orthodox Christmas",
    description: "Celebrated on January 7, this festival includes church services, family gatherings, and traditional food.",
    date: "January 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Serbia_Christmas_Festival.jpg"
    },
    {
    name: "EXIT Festival",
    description: "A popular music festival held annually in Novi Sad, attracting international music acts.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/EXIT_Festival_Serbia.jpg"
    }
    ]
    },
    {
    name: "Seychelles",
    festivals: [
    {
    name: "Seychelles Carnival",
    description: "A colorful carnival with parades, music, and dancing, attracting visitors from all over the world.",
    date: "April",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Seychelles_Carnival.jpg"
    },
    {
    name: "Independence Day",
    description: "Celebrates Seychelles' independence from Britain with national ceremonies and cultural events.",
    date: "June 29",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Seychelles_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Sierra Leone",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates Sierra Leone's independence from Britain with parades and national celebrations.",
    date: "April 27",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Sierra_Leone_Independence_Day.jpg"
    },
    {
    name: "Freetown Music Festival",
    description: "A festival that brings together local and international artists to perform in Sierra Leone’s capital.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Freetown_Music_Festival.jpg"
    }
    ]
    },
    {
    name: "Singapore",
    festivals: [
    {
    name: "Chinese New Year",
    description: "A major cultural celebration in Singapore with family reunions, parades, and feasts.",
    date: "January-February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Chinese_New_Year_Singapore.jpg"
    },
    {
    name: "Singapore Grand Prix",
    description: "A Formula 1 night race held in the heart of Singapore, attracting global attention.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Singapore_Grand_Prix.jpg"
    }
    ]
    },
    {
    name: "Slovakia",
    festivals: [
    {
    name: "Slovak National Uprising Day",
    description: "Commemorates the Slovak National Uprising against Nazi occupation in 1944.",
    date: "August 29",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Slovak_National_Uprising_Day.jpg"
    },
    {
    name: "Bratislava Music Festival",
    description: "A festival celebrating classical and contemporary music with performances by local and international musicians.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Bratislava_Music_Festival.jpg"
    }
    ]
    },
    {
    name: "Slovenia",
    festivals: [
    {
    name: "Kurentovanje",
    description: "A traditional Slovenian carnival held to welcome spring, featuring masks and performances.",
    date: "February-March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Kurentovanje_Slovenia.jpg"
    },
    {
    name: "Slovenian Independence Day",
    description: "Commemorates Slovenia's independence from Yugoslavia with national celebrations.",
    date: "December 26",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/64/Slovenian_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Solomon Islands",
    festivals: [
    {
    name: "Independence Day",
    description: "Celebrates the independence of the Solomon Islands from Britain, with parades and cultural performances.",
    date: "July 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Solomon_Islands_Independence_Day.jpg"
    },
    {
    name: "Solomon Islands Festival of Arts",
    description: "A cultural festival showcasing traditional music, dance, and crafts from across the islands.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Solomon_Islands_Festival_of_Arts.jpg"
    }
    ]
    },
    {
    name: "Somalia",
    festivals: [
    {
    name: "Somali Independence Day",
    description: "Commemorates the day Somalia gained independence in 1960 with national celebrations.",
    date: "July 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/48/Somali_Independence_Day.jpg"
    },
    {
    name: "Eid al-Fitr",
    description: "A major Islamic holiday marking the end of Ramadan with feasts and prayers.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Somali_Eid_celebration.jpg"
    }
    ]
    },
    {
    name: "South Africa",
    festivals: [
    {
    name: "Nelson Mandela International Day",
    description: "A day dedicated to honoring the legacy of Nelson Mandela with community service and global events.",
    date: "July 18",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Nelson_Mandela_International_Day.jpg"
    },
    {
    name: "Cape Town International Jazz Festival",
    description: "A renowned jazz festival attracting musicians from around the world to South Africa's cultural capital.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Cape_Town_International_Jazz_Festival.jpg"
    }
    ]
    },
    {
    name: "South Sudan",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates South Sudan's independence from Sudan with national celebrations and cultural events.",
    date: "July 9",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/South_Sudan_Independence_Day.jpg"
    },
    {
    name: "South Sudan Festival of Arts",
    description: "A celebration of South Sudanese culture with traditional music, dance, and art exhibitions.",
    date: "December",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/South_Sudan_Festival_of_Arts.jpg"
    }
    ]
    },
    {
    name: "Spain",
    festivals: [
    {
    name: "La Tomatina",
    description: "A famous festival in Buñol where participants throw tomatoes at each other in a friendly battle.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/La_Tomatina_Spain.jpg"
    },
    {
    name: "Running of the Bulls (San Fermín)",
    description: "A traditional festival in Pamplona, featuring bull runs and bullfights during the San Fermín celebrations.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Running_of_the_Bulls_Spain.jpg"
    }
    ]
    },
    {
    name: "Sri Lanka",
    festivals: [
    {
    name: "Sinhala and Tamil New Year",
    description: "A celebration of the new year in Sri Lanka with family gatherings, traditional games, and feasts.",
    date: "April 13-14",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Sinhala_and_Tamil_New_Year_Sri_Lanka.jpg"
    },
    {
    name: "Vesak Festival",
    description: "A Buddhist festival marking the birth, enlightenment, and death of Buddha, with religious ceremonies and lantern displays.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Vesak_Festival_Sri_Lanka.jpg"
    }
    ]
    },
    {
    name: "Sudan",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A major Islamic festival marking the end of Ramadan, celebrated with feasts and prayers.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Sudan_Eid_Festival.jpg"
    },
    {
    name: "Sudanese Independence Day",
    description: "Commemorates Sudan's independence from Britain and Egypt with national celebrations.",
    date: "January 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Sudan_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Suriname",
    festivals: [
    {
    name: "Independence Day",
    description: "Celebrates Suriname's independence from the Netherlands with national celebrations and parades.",
    date: "November 25",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/49/Suriname_Independence_Day.jpg"
    },
    {
    name: "Srefidensi Festival",
    description: "A cultural festival celebrating Suriname's independence and diverse heritage, with music, dance, and food.",
    date: "November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Srefidensi_Festival_Suriname.jpg"
    }
    ]
    },
    {
    name: "Sweden",
    festivals: [
    {
    name: "Midsummer",
    description: "A traditional Swedish celebration of the summer solstice with dancing, music, and feasts.",
    date: "June",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Midsummer_Sweden.jpg"
    },
    {
    name: "Nobel Prize Ceremony",
    description: "A prestigious ceremony held in Stockholm to honor the Nobel Prize laureates with speeches, music, and celebrations.",
    date: "December 10",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Nobel_Prize_Ceremony_Sweden.jpg"
    }
    ]
    },
    {
    name: "Switzerland",
    festivals: [
    {
    name: "Fête de l'Escalade",
    description: "A historical celebration in Geneva commemorating the city's victory over the Duke of Savoy in 1602, with parades and medieval costumes.",
    date: "December",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Fe%CC%82te_de_l%27Escalade_Geneva.jpg"
    },
    {
    name: "Sechseläuten",
    description: "A spring festival in Zurich, featuring a parade and the burning of the Böögg, a snowman effigy symbolizing winter's end.",
    date: "April",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Sechseläuten_Zurich.jpg"
    }
    ]
    },
    {
    name: "Syria",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "A significant Islamic festival marking the end of Ramadan with prayers, feasts, and gatherings.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Eid_celebration_in_Syria.jpg"
    },
    {
    name: "Ancient Palmyra Festival",
    description: "An annual cultural event in the ancient city of Palmyra featuring music, dance, and theatre.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Palmyra_Syria.jpg"
    }
    ]
    },
    {
    name: "Tajikistan",
    festivals: [
    {
    name: "Navruz",
    description: "The Persian New Year, celebrating the arrival of spring with traditional food, music, and dances.",
    date: "March 21",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Navruz_in_Tajikistan.jpg"
    },
    {
    name: "Independence Day",
    description: "Commemorates Tajikistan's independence from the Soviet Union with national celebrations and cultural events.",
    date: "September 9",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Tajikistan_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Tanzania",
    festivals: [
    {
    name: "Zanzibar International Film Festival",
    description: "A prestigious film festival held in Zanzibar, showcasing films from Africa and beyond.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Zanzibar_Film_Festival.jpg"
    },
    {
    name: "Saba Saba Day",
    description: "A national holiday celebrating the founding of the Tanganyika African National Union (TANU).",
    date: "July 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Tanzania_Saba_Saba_Day.jpg"
    }
    ]
    },
    {
    name: "Texas",
    festivals: [
    {
    name: "State Fair of Texas",
    description: "A large annual fair in Dallas featuring rodeos, concerts, and classic Texas cuisine.",
    date: "September-October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/State_Fair_of_Texas_2016.jpg"
    },
    {
    name: "Texas Renaissance Festival",
    description: "A themed festival held in Todd Mission, celebrating Renaissance-era culture with jousting, music, and feasts.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Texas_Renaissance_Festival.jpg"
    }
    ]
    },
    {
    name: "Thailand",
    festivals: [
    {
    name: "Songkran",
    description: "The Thai New Year, celebrated with water fights, parades, and religious ceremonies.",
    date: "April 13-15",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Songkran_Thailand.jpg"
    },
    {
    name: "Loy Krathong",
    description: "A beautiful festival where people release floating lanterns into rivers to pay respects to the water spirits.",
    date: "November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Loy_Krathong_Festival_Thailand.jpg"
    }
    ]
    },
    {
    name: "Timor-Leste",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates East Timor's independence from Indonesia with national celebrations and cultural performances.",
    date: "May 20",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Timor_Leste_Independence_Day.jpg"
    },
    {
    name: "Dia de São João",
    description: "A celebration of the feast day of Saint John, marked by religious ceremonies and community feasts.",
    date: "June 24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Timor_Leste_Sao_Joao.jpg"
    }
    ]
    },
    {
    name: "Togo",
    festivals: [
    {
    name: "Independence Day",
    description: "Marks Togo's independence from France, celebrated with national ceremonies and cultural events.",
    date: "April 27",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Togo_Independence_Day.jpg"
    },
    {
    name: "Voodoo Festival",
    description: "A celebration of the Vodun religion with traditional rituals, music, and dances.",
    date: "January 10",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Voodoo_Festival_Togo.jpg"
    }
    ]
    },
    {
    name: "Tonga",
    festivals: [
    {
    name: "Tonga National Day",
    description: "A national holiday commemorating Tonga's independence with cultural displays and traditional performances.",
    date: "November 4",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tonga_National_Day.jpg"
    },
    {
    name: "Heiva Festival",
    description: "A cultural festival showcasing traditional Tongan music, dance, and sports.",
    date: "July",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Heiva_Festival_Tonga.jpg"
    }
    ]
    },
    {
    name: "Trinidad and Tobago",
    festivals: [
    {
    name: "Carnival",
    description: "The vibrant Carnival, featuring parades, costumes, and soca music, is one of the largest in the world.",
    date: "February-March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Trinidad_and_Tobago_Carnival.jpg"
    },
    {
    name: "Divali",
    description: "The Hindu festival of lights, celebrated with oil lamps, prayers, and feasts.",
    date: "October-November",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Divali_celebration_Trinidad.jpg"
    }
    ]
    },
    {
    name: "Tunisia",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates Tunisia's independence from France with national celebrations and cultural events.",
    date: "March 20",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Tunisia_Independence_Day.jpg"
    },
    {
    name: "International Festival of Carthage",
    description: "A music and arts festival held in the ancient city of Carthage, featuring performances by international artists.",
    date: "July-August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/International_Festival_of_Carthage.jpg"
    }
    ]
    },
    {
    name: "Turkey",
    festivals: [
    {
    name: "Republic Day",
    description: "Celebrates the founding of the Turkish Republic with parades, fireworks, and national pride.",
    date: "October 29",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Turkey_Republic_Day.jpg"
    },
    {
    name: "Ramazan Bayramı (Eid al-Fitr)",
    description: "The end of Ramadan is marked with prayers, feasts, and family gatherings.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Ramazan_Bayrami_Turkey.jpg"
    }
    ]
    },
    {
    name: "Turkmenistan",
    festivals: [
    {
    name: "Nowruz",
    description: "The Persian New Year, celebrated with traditional rituals, feasts, and music, marking the arrival of spring.",
    date: "March 21",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Nowruz_Turkmenistan.jpg"
    },
    {
    name: "Independence Day",
    description: "Commemorates Turkmenistan's independence from the Soviet Union with national parades and festivities.",
    date: "October 27",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Turkmenistan_Independence_Day.jpg"
    }
    ]
    },
    {
    name: "Tuvalu",
    festivals: [
    {
    name: "Independence Day",
    description: "Marks Tuvalu's independence from the United Kingdom with cultural celebrations and events.",
    date: "October 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Tuvalu_Independence_Day.jpg"
    },
    {
    name: "Te Aso Faka Tuvalu",
    description: "Celebrates Tuvaluan culture, with music, dancing, and traditional performances.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Te_Aso_Faka_Tuvalu.jpg"
    }
    ]
    },
    {
    name: "Uganda",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates Uganda's independence from the United Kingdom, with national celebrations and festivities.",
    date: "October 9",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Uganda_Independence_Day.jpg"
    },
    {
    name: "Nyege Nyege Festival",
    description: "A popular music and arts festival celebrating Ugandan culture, electronic music, and international performers.",
    date: "September",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Nyege_Nyege_Festival.jpg"
    }
    ]
    },
    {
    name: "Ukraine",
    festivals: [
    {
    name: "Independence Day",
    description: "Celebrates Ukraine's independence from the Soviet Union with parades, performances, and national pride.",
    date: "August 24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Ukraine_Independence_Day.jpg"
    },
    {
    name: "Kupala Night",
    description: "A Slavic celebration marking the summer solstice, with bonfires, singing, and dancing to honor the sun and nature.",
    date: "June 23-24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Kupala_Night_Ukraine.jpg"
    }
    ]
    },
    {
    name: "Union of Soviet Socialist Republics",
    festivals: [
    {
    name: "Victory Day",
    description: "A major holiday commemorating the defeat of Nazi Germany in World War II, celebrated with military parades and fireworks.",
    date: "May 9",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Soviet_Victory_Day.jpg"
    },
    {
    name: "October Revolution Day",
    description: "Marks the anniversary of the Bolshevik Revolution of 1917, with parades and celebrations of Soviet achievements.",
    date: "November 7",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/3b/October_Revolution_Parade.jpg"
    }
    ]
    },
    {
    name: "United Arab Emirates",
    festivals: [
    {
    name: "National Day",
    description: "Commemorates the founding of the United Arab Emirates, with fireworks, parades, and traditional performances.",
    date: "December 2",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/UAE_National_Day.jpg"
    },
    {
    name: "Eid al-Fitr",
    description: "Marks the end of Ramadan, with prayers, feasts, and gatherings across the UAE.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Eid_Al_Fitr_in_UAE.jpg"
    }
    ]
    },
    {
    name: "United Kingdom",
    festivals: [
    {
    name: "Guy Fawkes Night",
    description: "A traditional event held on November 5, commemorating the failed Gunpowder Plot of 1605 with fireworks and bonfires.",
    date: "November 5",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Guy_Fawkes_Night_Fireworks.jpg"
    },
    {
    name: "Notting Hill Carnival",
    description: "A large Caribbean festival held in London, featuring parades, music, and dancing.",
    date: "August Bank Holiday",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/15/Notting_Hill_Carnival.jpg"
    }
    ]
    },
    {
    name: "Uruguay",
    festivals: [
    {
    name: "Carnival",
    description: "One of the largest carnivals in the world, with parades, music, and dances celebrating Afro-Uruguayan culture.",
    date: "February-March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Uruguay_Carnival.jpg"
    },
    {
    name: "Fiesta de la Patria Gaucha",
    description: "A celebration of Uruguay's gaucho (cowboy) heritage with music, parades, and traditional foods.",
    date: "March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Fiesta_de_la_Patria_Gaucha.jpg"
    }
    ]
    },
    {
    name: "Uzbekistan",
    festivals: [
    {
    name: "Navruz",
    description: "The Persian New Year, celebrated with festivities such as feasts, dancing, and traditional music.",
    date: "March 21",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/1/16/Navruz_Uzbekistan.jpg"
    },
    {
    name: "Independence Day",
    description: "Marks Uzbekistan's independence from the Soviet Union with parades, cultural performances, and celebrations.",
    date: "September 1",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Uzbekistan_Independence_Day.jpg"
    }
    ]
    },{
    name: "Vanuatu",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates Vanuatu's independence from France and the United Kingdom, celebrated with parades and cultural events.",
    date: "July 30",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Vanuatu_Independence_Day.jpg"
    },
    {
    name: "Cultural Festival",
    description: "A celebration of Vanuatu's indigenous cultures with traditional dances, music, and feasts.",
    date: "August",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Vanuatu_Cultural_Festival.jpg"
    }
    ]
    },
    {
    name: "Venezuela",
    festivals: [
    {
    name: "Carnival",
    description: "A lively festival celebrated with colorful parades, music, and dancing throughout Venezuela.",
    date: "February-March",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Venezuela_Carnival.jpg"
    },
    {
    name: "Día de la Virgen de Coromoto",
    description: "A religious festival honoring the patron saint of Venezuela, marked by pilgrimages and celebrations.",
    date: "September 8",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Virgin_Coromoto_Venezuela.jpg"
    }
    ]
    },
    {
    name: "Vietnam",
    festivals: [
    {
    name: "Tết Nguyên Đán",
    description: "The Vietnamese Lunar New Year, celebrated with family reunions, feasts, and traditional rituals.",
    date: "January-February",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Tet_Nguyen_Dan_Vietnam.jpg"
    },
    {
    name: "Mid-Autumn Festival",
    description: "A harvest festival celebrated with lanterns, mooncakes, and family gatherings.",
    date: "September-October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Mid-Autumn_Festival_Vietnam.jpg"
    }
    ]
    },
    {
    name: "Württemberg",
    festivals: [
    {
    name: "Cannstatter Volksfest",
    description: "A large beer festival in Stuttgart, featuring traditional music, food, and funfair rides.",
    date: "September-October",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Cannstatter_Volksfest_Stuttgart.jpg"
    },
    {
    name: "Stuttgart Spring Festival",
    description: "A spring celebration with music, food, and carnival rides in Stuttgart, Germany.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Stuttgart_Spring_Festival.jpg"
    }
    ]
    },
    {
    name: "Yemen",
    festivals: [
    {
    name: "Eid al-Fitr",
    description: "Celebrates the end of Ramadan, with prayers, feasts, and family gatherings.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Eid_al-Fitr_Yemen.jpg"
    },
    {
    name: "National Day",
    description: "Commemorates Yemen's unification, celebrated with parades and cultural performances.",
    date: "May 22",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Yemen_National_Day.jpg"
    }
    ]
    },
    {
    name: "Zambia",
    festivals: [
    {
    name: "Independence Day",
    description: "Marks Zambia's independence from the United Kingdom, with national parades and celebrations.",
    date: "October 24",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/27/Zambia_Independence_Day.jpg"
    },
    {
    name: "Kuomboka Festival",
    description: "A traditional festival celebrating the annual migration of the Lozi people, with music, dances, and a boat procession.",
    date: "April",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kuomboka_Festival_Zambia.jpg"
    }
    ]
    },
    {
    name: "Zimbabwe",
    festivals: [
    {
    name: "Independence Day",
    description: "Commemorates Zimbabwe's independence from the United Kingdom, with cultural events, speeches, and national pride.",
    date: "April 18",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Zimbabwe_Independence_Day.jpg"
    },
    {
    name: "Harare International Festival of the Arts (HIFA)",
    description: "A major cultural event in Zimbabwe, celebrating music, theater, dance, and the arts.",
    date: "April-May",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/7/74/HIFA_Zimbabwe.jpg"
    }
    ]
    }  
    ],
    };
    

    // ---------------------------------sports-----------------------------------
    
let sports = {
"countries": [
{
"name": "Afghanistan",
"nationalSport": "Buzkashi",
"description": "Buzkashi, the national sport of Afghanistan, is a centuries-old tradition rooted in the country's nomadic and tribal heritage. Players, mounted on horseback, compete to seize a goat carcass and deliver it to a designated goal while fending off opponents. The sport emphasizes bravery, strength, and skill, reflecting Afghanistan's warrior culture. Matches can last for hours, and the game is often accompanied by music and celebrations in rural communities.",
"image": "https://static01.nyt.com/images/2009/01/03/world/03afghan3_600.JPG"
},
{
"name": "Albania",
"nationalSport": "Football",
"description": "Football (soccer) is Albania's most popular sport, capturing the hearts of millions. It represents a unifying force across the country, with passionate fans supporting local clubs and the national team. The Albanian national football team, particularly its participation in the 2016 UEFA European Championship, has inspired national pride. Football also thrives at grassroots levels, with youth leagues fostering talent across cities and villages.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Algeria",
"nationalSport": "Football",
"description": "Football is a deeply cherished sport in Algeria, symbolizing unity and resilience. The Algerian national team, known as 'Les Fennecs' (The Desert Foxes), has a storied history, including winning the Africa Cup of Nations. Football serves as a cultural touchstone, with vibrant street games and fan gatherings creating an electrifying atmosphere during tournaments.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Andorra",
"nationalSport": "Skiing",
"description": "Skiing is the lifeblood of Andorra, a mountainous microstate nestled in the Pyrenees. Known for its premier ski resorts like Grandvalira and Vallnord, Andorra attracts enthusiasts from around the globe. Skiing is not just a sport but a cultural and economic pillar, with international competitions and tourism significantly shaping the nation's identity.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg"
},
{
"name": "Angola",
"nationalSport": "Basketball",
"description": "Basketball is Angola's national sport and a symbol of national pride, with the men's national team being one of the most successful in Africa. The sport gained prominence during the late 20th century and continues to inspire young athletes across the country. Street basketball and professional leagues are common, reflecting its grassroots popularity.",
"image": "https://static01.nyt.com/images/2020/03/11/sports/11virus-leagues-curry2/merlin_170213634_6955db75-0fa6-476b-b75d-9f63826e296a-superJumbo.jpg"
},
{
"name": "Antigua and Barbuda",
"nationalSport": "Cricket",
"description": "Cricket is deeply embedded in Antigua and Barbuda's culture, with a legacy tied to the British colonial era. The nation has produced legendary cricketers such as Sir Vivian Richards, whose contributions have left an indelible mark on West Indian and global cricket. Matches are festive occasions, blending athleticism with vibrant music and local cuisine.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Argentina",
"nationalSport": "Pato",
"description": "Pato, a sport native to Argentina, is played on horseback and combines elements of polo and basketball. Players use a leather ball with handles to score goals by throwing it into tall vertical nets. Recognized as Argentina's national sport in 1953, Pato has historical roots dating back to the 17th century, where it was played by gauchos (cowboys). The sport embodies Argentina's equestrian culture and rural traditions.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Patogame.JPG/800px-Patogame.JPG"
},
{
"name": "Armenia",
"nationalSport": "Chess",
"description": "Chess is Armenia's intellectual hallmark, celebrated as both a pastime and a competitive sport. The country boasts a rich history of grandmasters and world champions, making it a global chess powerhouse. Chess education is even integrated into school curriculums, highlighting its cultural and national significance.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chess_pieces_close_up.jpg/800px-Chess_pieces_close_up.jpg"
},
{
"name": "Australia",
"nationalSport": "Cricket",
"description": "Cricket is the heartbeat of Australia's sports culture, with a history intertwined with its colonial past. Known for legendary players and historic matches like The Ashes, Australia's cricket team has a reputation for dominance on the global stage. The sport is celebrated as a unifying tradition, bringing together communities and generations.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Austria",
"nationalSport": "Skiing",
"description": "Skiing is synonymous with Austria's identity, thanks to its stunning Alpine landscapes and world-class athletes. The sport is a major draw for tourists and a cornerstone of the country's economy. Austria has a long history of producing Olympic and World Cup champions, solidifying its place as a global leader in winter sports.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg"    }, 
{
"name": "Bahamas",
"nationalSport": "Sloop Sailing",
"description": "Sloop sailing is the national sport of the Bahamas, a reflection of the nation's deep connection to the sea. Rooted in the country's maritime history, these single-mast sailboats were originally used for fishing and transportation. Today, regattas held across the islands showcase the skill and precision of sailors, drawing both local and international crowds.",
"image": "https://assets.isu.pub/document-structure/220403230918-f73f44d6118343794c5c5fb9e6f7f19f/v1/0fd38063946fdd9c141621f1ec065dc4.jpeg?width=720&quality=85%2C50"
},
{
"name": "Bahrain",
"nationalSport": "Endurance Racing",
"description": "Endurance racing, particularly with Arabian horses, is Bahrain's national sport. The sport embodies the country's equestrian heritage, requiring stamina and strategy to traverse long desert courses. These events celebrate traditional Bedouin culture and often take place in grand arenas, blending modernity with heritage.",
"image": "https://static01.nyt.com/images/2014/06/13/sports/autoracing/13iht-srlmover13-le-mans/13iht-srlmover13-le-mans-superJumbo.jpg"
},
{
"name": "Bangladesh",
"nationalSport": "Kabaddi",
"description": "Kabaddi, a team sport that originated in South Asia, is the national sport of Bangladesh. Played without equipment, players alternate between defense and offense, requiring agility, strategy, and teamwork. Kabaddi symbolizes the rural roots of Bangladesh and is widely played across schools and villages, keeping the sport alive in the hearts of millions.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Iran_men%27s_national_kabaddi_team_13970602000432636707284535394012_98208.jpg/640px-Iran_men%27s_national_kabaddi_team_13970602000432636707284535394012_98208.jpg"
},
{
"name": "Barbados",
"nationalSport": "Cricket",
"description": "Cricket is the most popular and celebrated sport in Barbados, deeply tied to the island's colonial history. Barbados has produced legendary cricketers like Sir Garfield Sobers, whose contributions have left a lasting legacy. Matches, whether at the professional or local level, are events filled with enthusiasm and community pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Belarus",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is Belarus' national sport, reflecting its passion for winter sports and competitive spirit. The country has a strong domestic league and regularly participates in international tournaments. Ice hockey arenas in cities like Minsk serve as hubs for fans to gather and cheer for their teams.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Belgium",
"nationalSport": "Cycling",
"description": "Cycling holds a special place in Belgium, a nation known for its challenging terrains and iconic races like the Tour of Flanders. Belgium has produced some of the most legendary cyclists, and the sport is celebrated at both professional and grassroots levels. Cycling is more than a sport—it's a lifestyle in Belgium.",
"image": "https://upload.wikimedia.org/wikipedia/commons/5/55/Cycling_in_Belgium.jpg"
},
{
"name": "Belize",
"nationalSport": "Football",
"description": "Football is the most popular sport in Belize, played by people of all ages across urban and rural areas. The Belizean national team, though relatively young, brings communities together, inspiring unity and pride. Football is widely played in schools, and local leagues contribute to the sport's growing popularity.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Benin",
"nationalSport": "Football",
"description": "Football is Benin's national sport, serving as a source of joy and unity for its citizens. The sport thrives in both urban centers and rural villages, with local tournaments fostering talent and community spirit. International matches featuring the Benin national team are celebrated events, often accompanied by vibrant cultural displays.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Bolivia",
"nationalSport": "Football",
"description": "Football is the heartbeat of sports culture in Bolivia, played passionately from high-altitude cities like La Paz to the country's rural plains. The Bolivian national team has a loyal following, with its participation in the FIFA World Cup remaining a cherished achievement. Local leagues and street football continue to drive its popularity.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Bosnia and Herzegovina",
"nationalSport": "Football",
"description": "Football in Bosnia and Herzegovina is more than a sport—it’s a unifying force in a country with a complex history. The national team has inspired immense pride by representing the country on international stages. Local clubs also play an important role in fostering talent and bringing communities together.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Botswana",
"nationalSport": "Football",
"description": "Football is the most popular sport in Botswana, with a growing fan base and increasing participation among the youth. The Botswana Premier League and the national team, known as the Zebras, play key roles in promoting the sport. Matches are vibrant events, showcasing the nation's love for the game.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Brazil",
"nationalSport": "Football",
"description": "Football is Brazil’s national obsession, symbolizing the country's culture, creativity, and resilience. Home to legendary players like Pelé and Neymar, Brazil has a storied history of World Cup victories. Football is played everywhere, from professional stadiums to improvised pitches in favelas, embodying the spirit of the nation.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"
},
{
"name": "Brunei",
"nationalSport": "Silat",
"description": "Silat, a traditional martial art, is Brunei's national sport and an integral part of its cultural heritage. Originating in Southeast Asia, Silat combines self-defense techniques with artistic movements, often performed during ceremonies and festivals. It represents discipline, strength, and cultural pride in Brunei, where it is taught in schools and practiced by all generations.",
"image": "https://i.guim.co.uk/img/media/048ac213ee96a0c9c8db232b9355a8636f906abb/0_156_3207_1925/master/3207.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=3affd2b390519e0f9142ace8b48c3860"
},
{
"name": "Bulgaria",
"nationalSport": "Wrestling",
"description": "Wrestling is Bulgaria's national sport, with a history that dates back to ancient Thracian times. Bulgarian wrestlers have achieved international success, earning Olympic and world championship medals. The sport is celebrated for its emphasis on physical strength, technique, and tradition, making it a source of national pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Wrestling_at_the_2016_Summer_Olympics%2C_Gazyumov_vs_Andriitsev_6.jpg"
},
{
"name": "Burkina Faso",
"nationalSport": "Football",
"description": "Football is the most popular sport in Burkina Faso, bringing communities together across urban and rural areas. The Burkinabé national team, affectionately called 'Les Étalons' (The Stallions), has inspired immense pride with its performances in the Africa Cup of Nations. Street football and local tournaments are common, showcasing the sport's grassroots appeal.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Burma (Myanmar)",
"nationalSport": "Chinlone",
"description": "Chinlone, Myanmar's traditional sport, blends elements of dance, teamwork, and precision. Played with a rattan ball, the objective is to keep the ball in the air while performing intricate moves. This non-competitive sport emphasizes grace and coordination and is often played during festivals, symbolizing unity and cultural identity.",
"image": "https://dnwp63qf32y8i.cloudfront.net/30e163bed587058f9f38681324adc1167f18acdc"
},
{
"name": "Burundi",
"nationalSport": "Football",
"description": "Football is Burundi's most celebrated sport, uniting people across ethnic and regional lines. The sport is widely played in schools and communities, and the national team, 'The Swallows,' inspires hope and pride during international competitions. Local leagues and street matches are integral to Burundi's football culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Cabo Verde",
"nationalSport": "Football",
"description": "Football is Cabo Verde's national sport, deeply cherished across the archipelago. The national team, nicknamed 'The Blue Sharks,' has achieved notable success in African competitions, inspiring unity and pride among citizens. Football is played widely on sandy beaches and local fields, making it a core part of the islands' culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Cambodia",
"nationalSport": "Pradal Serey",
"description": "Pradal Serey, a traditional martial art, is Cambodia's national sport. This combat sport emphasizes striking techniques, agility, and strategy. It has ancient roots in Khmer culture and is often performed during festivals and competitions. Modern adaptations have gained international recognition, helping preserve this vital aspect of Cambodian heritage.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kneestrike_kun_khmer.jpg/1200px-Kneestrike_kun_khmer.jpg"
},
{
"name": "Cameroon",
"nationalSport": "Football",
"description": "Football is the lifeblood of Cameroon's sports culture. The national team, known as 'The Indomitable Lions,' is one of Africa's most successful, with multiple Africa Cup of Nations titles and FIFA World Cup appearances. Football unites communities, with matches often celebrated as festive occasions across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Canada",
"nationalSport": "Ice Hockey and Lacrosse",
"description": "Canada officially recognizes two national sports: ice hockey for winter and lacrosse for summer. Ice hockey is a cultural institution, celebrated for its speed, skill, and teamwork, with the NHL serving as a global showcase. Lacrosse, a sport with Indigenous origins, reflects Canada's rich history and heritage. Both sports unite Canadians across diverse communities.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Cayman Islands",
"nationalSport": "Cricket",
"description": "Cricket is the most popular sport in the Cayman Islands, reflecting its British colonial heritage. Local matches and leagues are common, and the national team competes in regional tournaments, fostering local talent. Cricket events are festive occasions, often accompanied by music and social gatherings.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Central African Republic",
"nationalSport": "Basketball",
"description": "Basketball is the national sport of the Central African Republic, with a rich history of international success. The national team has won multiple African championships, inspiring a love for the sport across the country. Basketball courts are common in urban areas, where the youth actively participate in the sport.",
"image": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Basketball_CAR.jpg"
},
{
"name": "Chad",
"nationalSport": "Football",
"description": "Football is Chad's most popular sport, enjoyed across its vast and diverse landscapes. Local leagues and informal matches are integral to community life, while the national team continues to inspire hope and pride. Football serves as a unifying force in a country with varied ethnic and cultural backgrounds.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Chile",
"nationalSport": "Rodeo",
"description": "Rodeo is Chile's national sport, deeply tied to its rural traditions and cowboy culture. In Chilean rodeo, teams of riders guide cattle into a corral in a display of skill and teamwork. The sport is celebrated during national holidays and festivals, reflecting the country's agricultural roots and equestrian heritage.",
"image": "https://cdn.britannica.com/18/96318-050-33D6CA12/roping-event-rodeo-Cody-Wyoming-2013.jpg"
},
{
"name": "China",
"nationalSport": "Table Tennis",
"description": "Table tennis, China's national sport, symbolizes precision, agility, and discipline. Dominating international competitions, Chinese players have set records and inspired millions. The sport is played widely across the country, from professional arenas to neighborhood parks, reflecting its immense popularity and cultural significance.",
"image": "https://upload.wikimedia.org/wikipedia/commons/5/58/Mondial_Ping_-_Men%27s_Singles_-_Round_4_-_Kenta_Matsudaira-Vladimir_Samsonov_-_57.jpg"
},
{
"name": "Colombia",
"nationalSport": "Tejo",
"description": "Tejo, Colombia's national sport, is a traditional game that involves throwing a metal puck (tejo) at a target with small gunpowder packets. The game is a vibrant part of Colombian culture, often accompanied by music, food, and social gatherings. Tejo reflects the country's festive and communal spirit.",
"image": "https://images.squarespace-cdn.com/content/v1/5b6dbbbb7c9327c94263ee8f/1677083229453-SCW5TXQU4FN04L7M6B8H/Turmeque%CC%81-Homenaje_al_Tejo_%28juego_tradicional%29.jpg?format=1500w"
},
{
"name": "Comoros",
"nationalSport": "Football",
"description": "Football is the most popular sport in Comoros, played enthusiastically across the islands. The national team, nicknamed 'Les Coelacanthes,' has inspired growing interest in international competitions. Football matches, whether professional or community-based, are vibrant events that bring people together.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Congo Free State (Historical)",
"nationalSport": "No National Sport",
"description": "The Congo Free State was a historical entity from the late 19th century to early 20th century, and no national sport was established during this period due to its tumultuous history under colonial rule.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Cook Islands",
"nationalSport": "Rugby League",
"description": "Rugby league is the national sport of the Cook Islands, reflecting its connection to Pacific island sports culture. The national team, 'The Kukis,' competes in international tournaments, fostering national pride. Rugby league is widely played and celebrated across the islands.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Costa Rica",
"nationalSport": "Football",
"description": "Football is Costa Rica's national sport and a cornerstone of its culture. The national team, 'Los Ticos,' has achieved international recognition, especially during the FIFA World Cup. Football is played everywhere, from beaches to urban fields, embodying Costa Rican passion and pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Cote d’Ivoire (Ivory Coast)",
"nationalSport": "Football",
"description": "Football is the heartbeat of sports culture in Cote d’Ivoire. The national team, known as 'Les Éléphants,' has achieved significant success, including winning the Africa Cup of Nations. Football fosters unity in a country known for its ethnic and regional diversity.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Croatia",
"nationalSport": "Football",
"description": "Football is Croatia's national sport and a source of immense national pride. The national team's success, including reaching the FIFA World Cup final in 2018, has cemented its place in Croatian culture. Local clubs like Dinamo Zagreb and Hajduk Split foster talent and fan enthusiasm.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Cuba",
"nationalSport": "Baseball",
"description": "Baseball is Cuba's national sport, introduced during the 19th century and quickly adopted as a cultural symbol. The sport is played at both amateur and professional levels, with Cuban players achieving international fame. Baseball games are lively events that reflect the island's passion for the sport.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Cyprus",
"nationalSport": "Football",
"description": "Football is the most popular sport in Cyprus, uniting communities across the island. Local leagues are competitive, with teams like APOEL and Omonia dominating the scene. Football is played at both professional and grassroots levels, fostering a strong sporting culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Czechia",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is the national sport of Czechia, celebrated for its rich history and international success. The Czech national team has won numerous championships, including Olympic gold. Ice hockey is a cornerstone of Czech culture, with packed arenas and passionate fans.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Czechoslovakia (Historical)",
"nationalSport": "Football and Ice Hockey",
"description": "Czechoslovakia, before its division in 1993, excelled in football and ice hockey. The national football team reached the FIFA World Cup finals, while the ice hockey team was a dominant force in international tournaments. These sports remain part of the legacy shared by the Czech Republic and Slovakia.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"     }, {
"name": "Democratic Republic of the Congo",
"nationalSport": "Football",
"description": "Football is the most popular sport in the Democratic Republic of the Congo. The national team, known as 'The Leopards,' has had moments of glory, including winning the Africa Cup of Nations. Football is played widely across the country, symbolizing unity and resilience in a nation with diverse cultures.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Denmark",
"nationalSport": "Football",
"description": "Football is Denmark's most popular sport, with a rich history of international achievements, including a victory at the 1992 UEFA European Championship. The Danish Superliga fosters local talent, and the sport is played widely at both grassroots and professional levels, reflecting its cultural significance.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"     },
{
"name": "Djibouti",
"nationalSport": "Football",
"description": "Football is Djibouti's favorite sport, played in urban centers and rural areas alike. Despite limited international success, the sport remains a unifying force in the country, fostering community spirit and providing opportunities for youth development.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"     },
{
"name": "Dominica",
"nationalSport": "Cricket",
"description": "Cricket is Dominica's national sport, reflecting its British colonial heritage and Caribbean culture. Local teams and regional competitions are popular, with the sport serving as a source of national pride and community bonding.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Dominican Republic",
"nationalSport": "Baseball",
"description": "Baseball is the heart of sports culture in the Dominican Republic. The country has produced numerous MLB stars, making it a global powerhouse in the sport. Baseball fields, or 'play,' are ubiquitous, reflecting the sport's importance in Dominican identity and daily life.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Duchy of Parma (Historical)",
"nationalSport": "No National Sport",
"description": "The Duchy of Parma, a historical Italian state, did not have an officially recognized national sport. Traditional Italian games and activities such as calcio storico (an early form of football) were likely enjoyed during its existence.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "East Germany (German Democratic Republic) (Historical)",
"nationalSport": "Football and Athletics",
"description": "During its existence, East Germany excelled in football and athletics, achieving remarkable success in international competitions, particularly the Olympics. Sports were state-sponsored, reflecting the government's emphasis on showcasing national strength and unity through athletic achievement.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"     },
{
"name": "Ecuador",
"nationalSport": "Football",
"description": "Football is Ecuador's national sport, celebrated for its role in uniting the country's diverse regions. The national team has achieved notable success, including World Cup appearances. Football is played in cities and rural areas alike, with passionate fans supporting local clubs.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Egypt",
"nationalSport": "Football",
"description": "Football is Egypt's national sport and a central part of its culture. The Egyptian Premier League and the national team, particularly during the Africa Cup of Nations, enjoy immense popularity. Iconic clubs like Al Ahly and Zamalek have fervent followings.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "El Salvador",
"nationalSport": "Football",
"description": "Football is the most popular sport in El Salvador, enjoyed by people of all ages. The national team's historic participation in the FIFA World Cup and local club rivalries fuel the country's passion for the sport. Football serves as a unifying and entertaining activity for Salvadorans.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Equatorial Guinea",
"nationalSport": "Football",
"description": "Football is Equatorial Guinea's national sport, played and loved throughout the country. The national team has achieved notable milestones, including hosting the Africa Cup of Nations. Football is an integral part of community life and a source of national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Eritrea",
"nationalSport": "Cycling",
"description": "Cycling is Eritrea's national sport and a source of immense pride. Eritrean cyclists have achieved significant success in international competitions, including the Tour de France. Cycling events are celebrated nationwide, reflecting the sport's importance in the country's culture.",
"image": "https://upload.wikimedia.org/wikipedia/commons/5/55/Cycling_in_Belgium.jpg"
},
{
"name": "Estonia",
"nationalSport": "Wrestling",
"description": "Wrestling is deeply rooted in Estonian culture and considered the national sport. Traditional styles, such as Estonian back-hold wrestling, showcase the nation’s heritage. Estonian athletes have also excelled in Greco-Roman and freestyle wrestling on the international stage.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Wrestling_at_the_2016_Summer_Olympics%2C_Gazyumov_vs_Andriitsev_6.jpg"
},
{
"name": "Eswatini",
"nationalSport": "Football",
"description": "Football is the most popular sport in Eswatini, enjoyed across urban and rural areas. Local leagues and national matches foster unity and enthusiasm, reflecting its cultural significance. The sport is a primary activity for youth and a source of national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Ethiopia",
"nationalSport": "Long-Distance Running",
"description": "Ethiopia is renowned globally for its dominance in long-distance running. Legendary athletes like Haile Gebrselassie and Tirunesh Dibaba have brought international fame to the country. Running is not just a sport but a symbol of Ethiopian resilience and excellence.",
"image": "https://upload.wikimedia.org/wikipedia/commons/4/49/5000_m_men_final_Berlin_2009.jpg"
},
{
"name": "Federal Government of Germany (1848-49) (Historical)",
"nationalSport": "No National Sport",
"description": "The Federal Government of Germany (1848-49) was a short-lived historical entity and did not establish a national sport. Traditional German activities, such as shooting and gymnastics, were popular during this period.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Fiji",
"nationalSport": "Rugby Union",
"description": "Rugby union is Fiji's national sport and a cornerstone of its identity. The Fiji national team, especially in rugby sevens, is world-renowned, having won Olympic gold medals. Rugby is played in schools, villages, and at the professional level, embodying Fijian unity and athleticism.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Finland",
"nationalSport": "Pesäpallo",
"description": "Pesäpallo, often called Finnish baseball, is Finland's national sport. Combining elements of baseball and traditional Finnish games, it showcases strategy, skill, and teamwork. Played widely across Finland, it represents the country's unique approach to sports.",
"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWGy2dpaD5J1K9KJdqU81X6lHBPoyLU-piPg&s"
},
{
"name": "France",
"nationalSport": "Football",
"description": "Football is France's national sport, celebrated for its widespread popularity and international success. The national team, 'Les Bleus,' has won multiple FIFA World Cups and European Championships, fostering immense national pride. Football is deeply embedded in French culture, from local clubs to international arenas.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Gabon",
"nationalSport": "Football",
"description": "Football is the most popular sport in Gabon, symbolizing unity and passion. The national team, 'The Panthers,' inspires fans across the country. Football is played in schools and communities, fostering local talent and national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Gambia, The",
"nationalSport": "Wrestling",
"description": "Traditional wrestling, known as 'Borreh,' is the national sport of The Gambia. Wrestling matches are significant cultural events, often accompanied by music and dance, showcasing strength and tradition. The sport reflects Gambian heritage and community spirit.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Wrestling_at_the_2016_Summer_Olympics%2C_Gazyumov_vs_Andriitsev_6.jpg"
},
{
"name": "Georgia",
"nationalSport": "Rugby Union",
"description": "Rugby union is Georgia's national sport, reflecting the country's passion for physical and strategic games. The Georgian national rugby team, known as 'The Lelos,' has achieved international recognition, especially in the Rugby World Cup. Rugby is deeply rooted in Georgian culture and history.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Germany",
"nationalSport": "Football",
"description": "Football is Germany's national sport, celebrated for its widespread popularity and international success. The German national team has won multiple FIFA World Cups and European Championships. Football is played at every level, from local leagues to Bundesliga, the country's top professional league.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Ghana",
"nationalSport": "Football",
"description": "Football is Ghana's national sport and a unifying force in the country. The Ghanaian national team, known as 'The Black Stars,' has achieved significant success, including multiple Africa Cup of Nations victories. Football is played widely, fostering talent and community pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Grand Duchy of Tuscany (Historical)",
"nationalSport": "No National Sport",
"description": "The Grand Duchy of Tuscany, a historical Italian state, did not have an officially recognized national sport. Traditional Italian activities, such as calcio storico (an early form of football), were likely popular during its existence.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},

{
"name": "Greece",
"nationalSport": "Football",
"description": "Football is the most popular sport in Greece, followed closely by basketball. The national team’s victory in the 2004 UEFA European Championship remains a highlight in Greek sports history. Football is played and celebrated across the country, reflecting its importance in Greek culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Greenland",
    "nationalSport": "No National Sport",
    "description": "Greenland, an autonomous territory within the Kingdom of Denmark, does not have an officially recognized national sport. Traditional activities such as dog sledding and ice fishing are significant in Greenlandic culture.",
    "image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Grenada",
"nationalSport": "Cricket",
"description": "Cricket is Grenada's national sport, reflecting its British colonial heritage and Caribbean identity. The sport is widely played and celebrated, with Grenadian cricketers contributing to the success of the West Indies cricket team.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Guatemala",
"nationalSport": "Football",
"description": "Football is Guatemala's national sport, enjoyed by people of all ages. Despite limited success on the international stage, the sport remains a central part of Guatemalan culture, fostering community engagement and youth participation.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Guinea",
"nationalSport": "Football",
"description": "Football is Guinea's national sport, bringing communities together across the country. The Guinean national team, known as 'Syli National,' inspires local talent and passionate fan support. Football is played in urban and rural areas, reflecting its widespread appeal.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Guinea-Bissau",
"nationalSport": "Football",
"description": "Football is the most popular sport in Guinea-Bissau, serving as a unifying activity across diverse communities. Local leagues and the national team foster pride and enthusiasm for the sport.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Guyana",
"nationalSport": "Cricket",
"description": "Cricket is Guyana's national sport, reflecting its British colonial heritage and Caribbean identity. Guyana has produced many talented cricketers who have contributed to the success of the West Indies cricket team, making the sport a source of national pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Haiti",
"nationalSport": "Football",
"description": "Football is the most popular sport in Haiti, reflecting the country's passion for the game. The Haitian national team has a historic achievement of participating in the 1974 FIFA World Cup. Football is played widely across the country, uniting communities through sport.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Hanover (Historical)",
"nationalSport": "No National Sport",
"description": "The Kingdom of Hanover, a historical German state, did not have an officially recognized national sport. Traditional activities like shooting and hunting were popular during its existence, reflecting the cultural norms of the time.",
"image": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Kingdom_of_Hanover_Map.jpg"
},
{
"name": "Hanseatic Republics (Historical)",
"nationalSport": "No National Sport",
"description": "The Hanseatic Republics, a confederation of city-states in medieval Europe, did not have a unified national sport. Traditional European games and physical activities were likely popular in individual cities like Lübeck, Hamburg, and Bremen.",
"image": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hanseatic_League_Map.jpg"
},
{
"name": "Hawaii (Historical)",
"nationalSport": "Surfing",
"description": "Surfing originated in Hawaii and was deeply embedded in the culture of the Hawaiian Kingdom. Known as 'heʻe nalu,' surfing was both a sport and a spiritual activity, practiced by royalty and commoners alike. It remains a key symbol of Hawaiian heritage.",
"image": "https://womenandwavessociety.com/wp-content/uploads/@surf.stories-09618-1.jpg"
},
{
"name": "Hesse (Historical)",
"nationalSport": "No National Sport",
"description": "The Grand Duchy of Hesse, a historical German state, did not have a designated national sport. However, traditional European activities such as fencing, hunting, and gymnastics were popular pastimes during its existence.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Holy See",
"nationalSport": "No National Sport",
"description": "The Holy See does not have a national sport. However, football is widely played and appreciated within Vatican City, and it occasionally hosts charity matches featuring clergy and Swiss Guards.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Honduras",
"nationalSport": "Football",
"description": "Football is the most popular sport in Honduras, passionately followed by fans across the country. The national team, known as 'Los Catrachos,' has participated in multiple FIFA World Cups, fostering national pride and enthusiasm for the sport.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Hungary",
"nationalSport": "Water Polo",
"description": "Water polo is Hungary's national sport, reflecting the country's dominance in the sport. Hungarian teams have won numerous Olympic gold medals, and water polo is played at all levels, symbolizing national pride and athletic excellence.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/WaterPolo.JPG/640px-WaterPolo.JPG"
},
{
"name": "Iceland",
"nationalSport": "Handball",
"description": "Handball is Iceland's national sport, with strong participation at both amateur and professional levels. Icelandic handball teams have achieved international recognition, including a silver medal at the 2008 Beijing Olympics, symbolizing the country's athletic prowess.",
"image": "https://arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/JXIJ4ITDZMI6NEAO36PQGHKNJU.jpg"
},
{
"name": "India",
"nationalSport": "Hockey",
"description": "Hockey is India's national sport, celebrated for its golden era when the Indian team dominated international competitions, including eight Olympic gold medals. While cricket is now more popular, hockey remains a symbol of India's rich sporting heritage.",
"image": "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5dd01dd2-0d4e-440e-a787-565c6dec7935_4096x2859.jpeg"
},
{
"name": "Indonesia",
"nationalSport": "Badminton",
"description": "Badminton is Indonesia's national sport, reflecting its dominance in the sport globally. Indonesian players have won numerous Olympic and world championship titles, making badminton a symbol of national pride and a favorite pastime across the country.",
"image": "https://cdn.britannica.com/44/256944-050-8D414329/PV-Sindhu-2020-Tokyo-Olympics.jpg"
},
{
"name": "Iran",
"nationalSport": "Wrestling",
"description": "Wrestling is Iran's national sport, deeply rooted in its history and culture. Iranian wrestlers have achieved great success in Greco-Roman and freestyle wrestling at the Olympic and world levels. The sport represents strength, tradition, and honor in Iranian society.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Wrestling_at_the_2016_Summer_Olympics%2C_Gazyumov_vs_Andriitsev_6.jpg"
},
{
"name": "Iraq",
"nationalSport": "Football",
"description": "Football is the most popular sport in Iraq, symbolizing hope and unity in the country. The Iraqi national team achieved a historic victory in the 2007 AFC Asian Cup, inspiring millions and fostering national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Ireland",
"nationalSport": "Gaelic Games (Hurling and Gaelic Football)",
"description": "The Gaelic games, including hurling and Gaelic football, are Ireland's national sports. Organized by the Gaelic Athletic Association (GAA), these sports are deeply tied to Irish culture and heritage, with annual tournaments drawing significant national attention.",
"image": "hhttps://upload.wikimedia.org/wikipedia/commons/e/ea/Aidan_O%27Mahony_%26_Eoin_Bradley.jpg"
},
{
"name": "Israel",
"nationalSport": "Football",
"description": "Football is Israel's most popular sport, enjoyed by fans and players nationwide. The Israeli national team and local leagues, like the Israeli Premier League, foster a deep love for the game in the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Italy",
"nationalSport": "Football",
"description": "Football is Italy's national sport, with a rich history of success in international tournaments. The Italian national team, known as 'Gli Azzurri,' has won multiple FIFA World Cups, and Serie A is one of the world's premier football leagues.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Jamaica",
"nationalSport": "Cricket",
"description": "Cricket is Jamaica's national sport, reflecting its British colonial heritage. Jamaica has produced many legendary cricketers who have contributed to the success of the West Indies cricket team. Track and field, particularly sprinting, is also immensely popular.",
"image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Jamaica_Cricket.jpg"
},
{
"name": "Japan",
"nationalSport": "Sumo Wrestling",
"description": "Sumo wrestling is Japan's national sport, deeply rooted in Japanese culture and Shinto traditions. The sport is known for its rituals, discipline, and history, making it a key symbol of Japanese heritage.",
"image": "https://www.japan-guide.com/g21/2080_02.jpg"
},
{
"name": "Jordan",
"nationalSport": "Football",
"description": "Football is the most popular sport in Jordan, enjoyed by fans of all ages. The Jordanian national team and local clubs foster enthusiasm and community engagement across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Kazakhstan",
"nationalSport": "Kazakh Wrestling (Kures)",
"description": "Kazakh wrestling, known as 'Kures,' is the national sport of Kazakhstan. It is a traditional wrestling style that highlights strength and skill, with deep cultural and historical significance.",
"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiU7Eka3lFm-FVeuXoaQZqeSbJtNvnuRnYQ&s"
},
{
"name": "Kenya",
"nationalSport": "Athletics (Long-Distance Running)",
"description": "Kenya is renowned globally for its dominance in long-distance running. Kenyan athletes have won numerous Olympic and world championship titles, particularly in marathons. The sport represents national pride and excellence.",
"image": "https://upload.wikimedia.org/wikipedia/commons/4/49/5000_m_men_final_Berlin_2009.jpg"
},
{
"name": "Kingdom of Serbia/Yugoslavia (Historical)",
"nationalSport": "No Official National Sport",
"description": "The Kingdom of Serbia, and later Yugoslavia, did not designate an official national sport. However, football was widely popular and became a significant unifying activity across the region, especially during Yugoslavia’s participation in international tournaments.",
"image": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Yugoslavia_Football.jpg"
},
{
"name": "Kiribati",
"nationalSport": "Football",
"description": "Football is the most popular sport in Kiribati. The island nation actively participates in regional competitions, with football fostering community spirit and physical fitness among its citizens.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Korea (South Korea)",
"nationalSport": "Taekwondo",
"description": "Taekwondo is South Korea's national sport, symbolizing discipline, strength, and Korean culture. As a globally recognized martial art, taekwondo is practiced by millions worldwide, making it a key aspect of Korea’s cultural heritage.",
"image": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Taekwondo_at_the_2020_Summer_Olympics_%E2%80%93_Men%27s_58_kg_%E2%80%93_Hadipour_%28IRI%29_vs_Ochoa_%28COL%29_%282%29.jpg"
},
{
"name": "Korea (North Korea)",
"nationalSport": "Football",
"description": "Football is North Korea's most popular sport. The country's participation in the 1966 FIFA World Cup, where they reached the quarterfinals, remains a highlight in its sporting history.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Kosovo",
"nationalSport": "Judo",
"description": "Judo has become Kosovo’s national sport, following the international success of Kosovar judokas such as Majlinda Kelmendi, who won the country's first Olympic gold medal in 2016. Judo represents resilience and national pride in Kosovo.",
"image": "https://www.kcpinternational.com/wp-content/uploads/2011/09/50208542308_12222e860b_c.jpg"
},
{
"name": "Kuwait",
"nationalSport": "Football",
"description": "Football is Kuwait’s most popular sport, with significant national and regional participation. Kuwait’s football team achieved its peak in 1980, winning the AFC Asian Cup. The sport fosters community engagement across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Kyrgyzstan",
"nationalSport": "Kok-Boru",
"description": "Kok-Boru, a traditional equestrian game similar to polo but played with a goat carcass, is Kyrgyzstan’s national sport. It is deeply rooted in the nomadic culture and showcases the physical skill and heritage of the Kyrgyz people.",
"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zSyDOG55tDIl8B6xvWW-74PdnxzfN_Zxww&s"
},
{
"name": "Laos",
"nationalSport": "Sepak Takraw",
"description": "Sepak Takraw, a sport that combines elements of volleyball and soccer, is Laos’ national sport. Played widely in Southeast Asia, it highlights agility, teamwork, and athleticism, forming a significant part of Laos’ cultural identity.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/75/Incheon_AsianGames_Sepaktakraw_09_%2815291705581%29.jpg"
},
{
"name": "Latvia",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is Latvia’s national sport, reflecting the country’s passion for winter sports. Latvia regularly participates in international tournaments, and the sport is a significant source of national pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Lebanon",
"nationalSport": "Basketball",
"description": "Basketball is Lebanon's most popular sport, with the national team achieving success in regional and international competitions. The sport is widely played and followed across the country, uniting communities through its dynamic appeal.",
"image": "https://upload.wikimedia.org/wikipedia/commons/8/83/Lebanon_Basketball.jpg"
},
{
"name": "Lesotho",
"nationalSport": "Athletics",
"description": "Athletics, particularly long-distance running, is Lesotho's national sport. The country has produced talented athletes who compete in international marathons, showcasing the endurance and skill of its runners.",
"image": "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_sm_2x/f_auto/primary/hiuf5ahd3cbhr11q6m5m"
},
{
"name": "Liberia",
"nationalSport": "Football",
"description": "Football is the most popular sport in Liberia, followed passionately by citizens across the country. The national football team, known as the 'Lone Stars,' has represented the country in several international competitions, and the sport holds a significant place in Liberia's social and cultural life.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Libya",
"nationalSport": "Football",
"description": "Football is the most popular and significant sport in Libya. It has a deep cultural following, and the Libyan national football team has represented the country in various international tournaments. The sport brings national pride and is widely supported across the nation.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Liechtenstein",
"nationalSport": "Football",
"description": "Football is the most popular sport in Liechtenstein. Despite the country’s small size, the national football team participates in international competitions, and the sport is deeply ingrained in the culture, with clubs playing a central role in local communities.",
"image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Liechtenstein_Football.jpg"
},
{
"name": "Lithuania",
"nationalSport": "Basketball",
"description": "Basketball is Lithuania’s national sport, with a rich tradition of success in international competitions. Lithuania has produced some of the world's best basketball players and regularly competes in the European Basketball Championship and the FIBA World Cup. The sport holds great cultural significance and national pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Lithuania_Basketball.jpg"
},
{
"name": "Luxembourg",
"nationalSport": "Football",
"description": "Football is Luxembourg's most popular sport. The Luxembourg national football team has participated in various international competitions, although the country has not yet won major titles. However, the sport remains central to Luxembourgish culture, with widespread local participation.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Madagascar",
"nationalSport": "Basketball",
"description": "Basketball is the most popular sport in Madagascar. The sport is widely played across the island nation, with local teams competing in various regional tournaments. It brings together communities and is a significant part of youth culture.",
"image": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Madagascar_Basketball.jpg"
},
{
"name": "Malawi",
"nationalSport": "Football",
"description": "Football is the most popular sport in Malawi. It is followed passionately, and the Malawi national football team, known as the 'Flames,' competes in regional and international tournaments. The sport is a major source of national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Malaysia",
"nationalSport": "Badminton",
"description": "Badminton is Malaysia's national sport, reflecting the country's success in international competitions. Malaysia has produced world-class players who have achieved great success in tournaments like the All England Open and the Olympics.",
"image": "https://cdn.britannica.com/44/256944-050-8D414329/PV-Sindhu-2020-Tokyo-Olympics.jpg"
},
{
"name": "Maldives",
"nationalSport": "Football",
"description": "Football is the most popular sport in the Maldives, especially among the youth. The national football team competes in regional tournaments, and football has a strong following in the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mali",
"nationalSport": "Football",
"description": "Football is Mali's national sport, widely followed and played across the country. Mali has a strong footballing history, with several players achieving success at international clubs. The national team, known as the 'Eagles,' regularly competes in continental tournaments.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Malta",
"nationalSport": "Football",
"description": "Football is the most popular sport in Malta, and it is considered the national sport. The Maltese national football team competes in international competitions, with local football clubs playing a central role in the country's sporting culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Marshall Islands",
"nationalSport": "Basketball",
"description": "Basketball is the most popular sport in the Marshall Islands. The sport is widely played at schools and in local communities, with the national team competing in regional competitions and fostering a sense of national pride.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Mauritania",
"nationalSport": "Football",
"description": "Football is Mauritania's most popular and important sport. The national team, known as the 'Lions of Chinguetti,' competes in international tournaments, and the sport brings together diverse communities in the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mauritius",
"nationalSport": "Football",
"description": "Football is Mauritius' national sport, with the sport widely followed and played by people of all ages. The national football team competes in regional tournaments, and football brings a sense of unity and community in the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mecklenburg-Schwerin (Historical)",
"nationalSport": "Football",
"description": "As a historical state within the German Empire, the Duchy of Mecklenburg-Schwerin did not officially designate a national sport. However, football was widely popular, and the sport continued to thrive in the region after the unification of Germany. Football remains a dominant sport in the area today.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mecklenburg-Strelitz (Historical)",
"nationalSport": "Football",
"description": "As a historical state in the German Empire, Mecklenburg-Strelitz did not have an officially designated national sport. However, like much of Germany, football became immensely popular. The region continued to develop its football culture even after the dissolution of the state.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mexico",
"nationalSport": "Charrería",
"description": "Charrería, a traditional Mexican sport that resembles rodeo, is Mexico's national sport. It is deeply rooted in the country's rural culture and showcases skill in horseback riding, roping, and other equestrian feats. The sport is recognized as part of Mexico’s cultural heritage.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Escaramuza-45.jpg/1200px-Escaramuza-45.jpg"
},
{
"name": "Micronesia",
"nationalSport": "Basketball",
"description": "Basketball is the most popular sport in Micronesia. It is widely played in schools and communities, and the sport serves as a major recreational activity throughout the Federated States of Micronesia.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Moldova",
"nationalSport": "Football",
"description": "Football is the most popular sport in Moldova. The country's national football team, known as the 'Moldovan national football team,' competes in international competitions, and the sport has a strong following, especially in urban areas.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Monaco",
"nationalSport": "Football",
"description": "Football is a popular sport in Monaco, with the country’s football club AS Monaco achieving notable success in French football leagues. The sport is an important part of Monaco’s sporting culture, with significant local and international support.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mongolia",
"nationalSport": "Wrestling (Bökh)",
"description": "Wrestling, known as Bökh in Mongolia, is the country’s national sport. This ancient sport is an integral part of Mongolia's cultural identity and is featured in major national festivals such as Naadam. Bökh is both a physical and spiritual contest, reflecting Mongolian values of strength and honor.",
"image": "https://upload.wikimedia.org/wikipedia/commons/9/96/Mongolian_warriors.jpg"
},
{
"name": "Montenegro",
"nationalSport": "Water Polo",
"description": "Water polo is Montenegro's national sport, with the national team being a dominant force in European and international competitions. The sport holds significant cultural importance, and Montenegro has produced several top-level water polo players.",
"image": "https://upload.wikimedia.org/wikipedia/commons/e/e5/WaterPolo.JPG"
},
{
"name": "Morocco",
"nationalSport": "Football",
"description": "Football is Morocco's national sport, with the Moroccan national team regularly competing in African Cup of Nations and World Cup qualifiers. The sport is a source of national pride, and Morocco has a strong domestic football league.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Mozambique",
"nationalSport": "Football",
"description": "Football is the most popular sport in Mozambique. The country has a rich football history, and the sport is a major part of the national identity. The Mozambique national football team competes regularly in African competitions.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Namibia",
"nationalSport": "Rugby",
"description": "Rugby is Namibia’s national sport, with the national rugby team having a strong presence in international competitions, particularly in Africa. The sport is widely played across the country, with a large following among Namibians.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Nassau (Historical)",
"nationalSport": "No Official National Sport",
"description": "As a historical region, Nassau, which was once a principality within the Holy Roman Empire, did not have an officially designated national sport. However, like much of Europe, football gained prominence in the region, with the sport continuing to be widely played.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Nauru",
"nationalSport": "Australian Rules Football",
"description": "Australian Rules Football is the most popular sport in Nauru. The sport has been ingrained in Nauru's culture due to historical ties with Australia. It is widely played and followed, with local teams regularly competing in various competitions.",
"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnJFIyKAQX1cRTBghI1TD5zbUMhFPOB-zwvQ&s"
},
{
"name": "Nepal",
"nationalSport": "Volleyball",
"description": "Volleyball is the national sport of Nepal. It is widely played in rural and urban areas and is a popular recreational activity for people of all ages. The sport holds cultural significance and is particularly popular among women in Nepal.",
"image": "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/v1536936974/primary/exvzqcvorticinejmmel"
},
{
"name": "Netherlands",
"nationalSport": "Field Hockey",
"description": "Field Hockey is the national sport of the Netherlands. The country has produced some of the world’s best players and teams, especially in women’s field hockey. The Netherlands has a rich field hockey tradition and is a dominant force in international competitions.",
"image": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Match_Hockey_Grande_Bretagne_x_Espagne_Jeux_Olympiques_2024_Terrain_1_Stade_Yves_Manoir_-_Colombes_%28FR92%29_-_2024-07-27_-_28.jpg"
},
{
"name": "New Zealand",
"nationalSport": "Rugby",
"description": "Rugby is New Zealand's national sport, with the All Blacks being one of the most successful and famous teams in world rugby. The sport is integral to the country's culture, with rugby players achieving national hero status.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Nicaragua",
"nationalSport": "Baseball",
"description": "Baseball is the most popular sport in Nicaragua. The sport has deep cultural roots, and the country has a strong baseball tradition. Nicaragua regularly participates in regional competitions, and baseball is a significant part of the nation's identity.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Niger",
"nationalSport": "Football",
"description": "Football is the most popular and significant sport in Niger. The national football team competes in regional tournaments and is a source of pride for the country. Football has widespread popularity, particularly in urban areas.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Nigeria",
"nationalSport": "Football",
"description": "Football is Nigeria's national sport. The Nigerian national football team, known as the 'Super Eagles,' has been highly successful in international competitions. Football is deeply ingrained in the culture of Nigeria and is a major source of national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Niue",
"nationalSport": "Rugby",
"description": "Rugby is the most popular sport in Niue. Despite the small population, rugby has a strong following, with the country’s national team competing in regional competitions. The sport plays an important role in Niue's social and cultural life.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "North German Confederation (Historical)",
"nationalSport": "Football",
"description": "As a historical state within the German Empire, the North German Confederation did not officially have a designated national sport. However, football gained popularity during this period and continued to be a significant sport in the region after the confederation's dissolution.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "North German Union (Historical)",
"nationalSport": "Football",
"description": "The North German Union, formed as a precursor to the German Empire, did not have an officially designated national sport. However, football was becoming increasingly popular in the region, and it continued to grow as a dominant sport in the subsequent formation of Germany.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "North Macedonia",
"nationalSport": "Football",
"description": "Football is the national sport of North Macedonia, and it enjoys widespread popularity across the country. The Macedonian national football team competes in international tournaments, and the sport is a major source of national pride.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Norway",
"nationalSport": "Cross-Country Skiing",
"description": "Cross-country skiing is Norway’s national sport, reflecting the country’s strong winter sports tradition. Norway has dominated international competitions in this sport, particularly in the Winter Olympics, where cross-country skiing has brought home many medals.",
"image": "https://dotorg.brightspotcdn.com/dims4/default/12c8a9d/2147483647/strip/true/crop/1291x725+4+16/resize/800x449!/quality/90/?url=http%3A%2F%2Fsoi-brightspot.s3.amazonaws.com%2Fdotorg%2Fe4%2F8c%2Fd0f9d6374c78960a7d67d6f03bcc%2F1300x800-cross-country-wide.jpg"
},
{
"name": "Oman",
"nationalSport": "Football",
"description": "Football is the most popular and significant sport in Oman. The Omani national football team competes in international competitions, and the sport has a large following across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Orange Free State (Historical)",
"nationalSport": "Rugby",
"description": "The Orange Free State, a former Boer republic in South Africa, did not have an officially designated national sport. However, rugby was widely played and was a key part of the culture, especially in the context of the South African region after the union.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Pakistan",
"nationalSport": "Field Hockey",
"description": "Field hockey is the national sport of Pakistan, reflecting the country's long history of success in international tournaments. Pakistan has won multiple Olympic gold medals in field hockey, and the sport is deeply embedded in the nation's sporting culture.",
"image": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Match_Hockey_Grande_Bretagne_x_Espagne_Jeux_Olympiques_2024_Terrain_1_Stade_Yves_Manoir_-_Colombes_%28FR92%29_-_2024-07-27_-_28.jpg"
},
{
"name": "Palau",
"nationalSport": "Basketball",
"description": "Basketball is the most popular sport in Palau. It is played in schools and communities, and the sport is a central aspect of social life. Palau has a strong basketball culture, with local teams frequently competing in regional tournaments.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Panama",
"nationalSport": "Baseball",
"description": "Baseball is Panama's national sport. The sport has deep historical roots, with Panama producing numerous Major League Baseball players. Baseball holds cultural significance in the country, particularly in rural areas where it is a popular recreational activity.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    },
{
"name": "Papal States (Historical)",
"nationalSport": "No Official National Sport",
"description": "The Papal States did not have an officially designated national sport. However, football became widely popular in Italy, including in the region that later became part of the modern Italian Republic, following the dissolution of the Papal States.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Papua New Guinea",
"nationalSport": "Rugby League",
"description": "Rugby league is the national sport of Papua New Guinea. It has a deep cultural significance and is played by people of all ages across the country. The national rugby league team is one of the strongest in the Pacific region.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Paraguay",
"nationalSport": "Football",
"description": "Football is the national sport of Paraguay. The sport is widely followed, and the national football team has enjoyed success in international competitions, particularly in South America. The sport is deeply embedded in the country's culture and daily life.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Peru",
"nationalSport": "Football",
"description": "Football is the most popular sport in Peru. The Peruvian national football team is a key player in South American football, with a rich history in international competitions such as the Copa América and the FIFA World Cup.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/31/Peru_Football.jpg"
},
{
"name": "Philippines",
"nationalSport": "Arnis (Escrima)",
"description": "Arnis, also known as Escrima or Kali, is the national sport of the Philippines. It is a martial art that emphasizes the use of sticks, knives, and other bladed objects, as well as empty-hand techniques. Arnis is part of the country’s cultural heritage and is widely practiced.",
"image": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Terry_Lim%27s_Kali_Seminar_with_Maurice_Ruiz_and_Ben_Poon.jpg"
},
{
"name": "Piedmont-Sardinia (Historical)",
"nationalSport": "Football",
"description": "Piedmont-Sardinia, a historical kingdom in Italy, did not have an officially designated national sport. However, as part of Italy, football became immensely popular in the region, and its influence was significant in the broader Italian football culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Poland",
"nationalSport": "Football",
"description": "Football is Poland's national sport. The Polish national football team has seen success on the international stage, particularly in the 1970s and 1980s. The sport is widely followed, and Poland has a strong domestic football league.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Portugal",
"nationalSport": "Football",
"description": "Football is the national sport of Portugal. The Portuguese national football team is renowned for its skill and success, with famous players such as Cristiano Ronaldo. Football has a massive following in the country, from local clubs to international competitions.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Qatar",
"nationalSport": "Football",
"description": "Football is the most popular sport in Qatar. The Qatari national football team has made strides in international competitions, and the sport is widely played at the grassroots level. Qatar is also set to host the 2022 FIFA World Cup, enhancing the country's football culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Republic of Genoa (Historical)",
"nationalSport": "No Official National Sport",
"description": "The Republic of Genoa, a historic maritime republic, did not have an officially designated national sport. However, like much of Italy, football became a significant sport in the region following its dissolution. Genoa, as a modern city, is home to one of Italy’s oldest football clubs.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Republic of Korea (South Korea)",
"nationalSport": "Taekwondo",
"description": "Taekwondo is the national sport of South Korea. It is a martial art known for its emphasis on high, fast kicks and powerful strikes. Taekwondo is practiced globally and is a significant part of Korean culture, with South Korea being the birthplace of the sport.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Taekwondo_at_the_2020_Summer_Olympics_%E2%80%93_Men%27s_58_kg_%E2%80%93_Hadipour_%28IRI%29_vs_Ochoa_%28COL%29_%282%29.jpg/800px-Taekwondo_at_the_2020_Summer_Olympics_%E2%80%93_Men%27s_58_kg_%E2%80%93_Hadipour_%28IRI%29_vs_Ochoa_%28COL%29_%282%29.jpg"
},
{
"name": "Republic of the Congo",
"nationalSport": "Football",
"description": "Football is the national sport of the Republic of the Congo. The national team competes in continental tournaments, and the sport has a significant following across the country. Local leagues and informal matches are common throughout the nation.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Romania",
"nationalSport": "Romanian Handball",
"description": "Handball is the national sport of Romania, with both men’s and women’s teams being highly competitive on the international stage. Romania has a rich handball tradition and has produced world-class players who have won numerous international titles.",
"image": "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/qlyaykxm9inkwkftarkj"
},
{
"name": "Russia",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is considered the national sport of Russia. The country has a long and successful history in the sport, with the national team winning multiple Olympic gold medals and World Championships. Ice hockey is a major source of national pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Rwanda",
"nationalSport": "Football",
"description": "Football is the most popular sport in Rwanda, and the national team, known as the 'Amavubi,' competes in various international competitions. The sport is followed passionately across the country, with numerous local clubs and leagues.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Saint Kitts and Nevis",
"nationalSport": "Football",
"description": "Football is the national sport of Saint Kitts and Nevis. The sport is highly popular and plays a key role in the country’s sporting culture, with the national football team regularly participating in Caribbean and international competitions.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Saint Lucia",
"nationalSport": "Cricket",
"description": "Cricket is the most popular sport in Saint Lucia. The island has produced some world-class cricketers who have excelled in international competitions, and the sport is a significant part of the country’s culture and heritage.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Saint Vincent and the Grenadines",
"nationalSport": "Cricket",
"description": "Cricket is the national sport of Saint Vincent and the Grenadines. It is widely played and followed across the islands, with the national team competing in regional tournaments and producing some notable international players.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Samoa",
"nationalSport": "Rugby",
"description": "Rugby is the national sport of Samoa. The country has a strong rugby culture and is known for producing some of the best players in the sport. The national rugby team, known as the 'Manu Samoa,' competes regularly in international competitions.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "San Marino",
"nationalSport": "Football",
"description": "Football is the national sport of San Marino. Despite the country’s small size, football is widely played, and the national team competes in international tournaments, although they have not achieved significant success on the global stage.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Sao Tome and Principe",
"nationalSport": "Football",
"description": "Football is the most popular sport in Sao Tome and Principe. The national football team competes in regional and international competitions, and football is a key part of the country's sporting culture and identity.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Saudi Arabia",
"nationalSport": "Football",
"description": "Football is the national sport of Saudi Arabia. The Saudi national football team is one of the strongest in the region and regularly competes in international tournaments such as the FIFA World Cup and the AFC Asian Cup.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Schaumburg-Lippe (Historical)",
"nationalSport": "No Official National Sport",
"description": "Schaumburg-Lippe, a former principality in Germany, did not have an officially designated national sport. However, as part of the larger German state, football gained popularity in the region, and the modern state of Lower Saxony, which encompasses Schaumburg-Lippe, follows this tradition.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Senegal",
"nationalSport": "Football",
"description": "Football is the national sport of Senegal, where the sport enjoys immense popularity. The Senegal national football team is considered one of the best in Africa, regularly competing in major tournaments like the FIFA World Cup and the Africa Cup of Nations.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Serbia",
"nationalSport": "Football",
"description": "Football is Serbia's national sport. The country has a rich football history, with the Serbian national team competing in prestigious international tournaments. Serbia has produced numerous football legends, and the sport is central to the nation's identity.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Seychelles",
"nationalSport": "Football",
"description": "Football is the most popular sport in Seychelles. The Seychelles national football team participates in regional tournaments, and the sport plays a major role in the nation's culture, especially in the youth and community levels.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Sierra Leone",
"nationalSport": "Football",
"description": "Football is the national sport of Sierra Leone. The Sierra Leone national football team has a passionate fan base, and the sport is played across the country. The national team has a strong presence in African football competitions.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Singapore",
"nationalSport": "Football",
"description": "Football is Singapore's most popular sport. The Singapore national football team competes in various international tournaments such as the AFC Asian Cup, and football has a significant following, with the Singapore Premier League being the country's top domestic league.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Slovakia",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is the national sport of Slovakia. The country has a proud history in the sport, with the national team regularly competing in international tournaments such as the IIHF World Championships and the Winter Olympics. Slovakia is one of the top ice hockey nations in Europe.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Slovenia",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is the national sport of Slovenia. The sport has a long tradition in the country, and Slovenia has produced several world-class ice hockey players. The Slovenian national team regularly competes in international tournaments like the IIHF World Championships.",
"image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Solomon Islands",
"nationalSport": "Football",
"description": "Football is the national sport of the Solomon Islands. The country has a strong football culture, with the national team, known as the 'Solomon Islands Kurukuru,' competing in regional tournaments and qualifying for the OFC Nations Cup.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Somalia",
"nationalSport": "Football",
"description": "Football is the national sport of Somalia. The country has a passionate football community, and the national team competes in African competitions. The sport is widely played and followed across Somalia, especially in urban areas.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "South Africa",
"nationalSport": "Rugby",
"description": "Rugby is South Africa's national sport, with the Springboks being one of the most successful teams in international rugby history. South Africa has won the Rugby World Cup multiple times, and the sport holds a significant cultural and national pride.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "South Sudan",
"nationalSport": "Football",
"description": "Football is the national sport of South Sudan. The national team competes in various international tournaments, and the sport is widely played at both the grassroots and professional levels in the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Spain",
"nationalSport": "Football",
"description": "Football is the national sport of Spain. The Spanish national football team has been highly successful, winning multiple UEFA European Championships and FIFA World Cups. Football has a massive following across the country, with many clubs like FC Barcelona and Real Madrid being globally renowned.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Sri Lanka",
"nationalSport": "Cricket",
"description": "Cricket is the national sport of Sri Lanka. The country has produced numerous cricketing legends and the national team has achieved significant success in international cricket, including winning the ICC Cricket World Cup in 1996.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Sudan",
"nationalSport": "Football",
"description": "Football is the national sport of Sudan. The Sudanese national football team competes in continental and international competitions, and football is widely followed and played across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Suriname",
"nationalSport": "Football",
"description": "Football is the national sport of Suriname. The sport is popular among the youth, and the national football team competes in regional competitions like the Caribbean Cup and the CONCACAF Gold Cup.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Sweden",
"nationalSport": "Ice Hockey",
"description": "Ice hockey is the national sport of Sweden. The Swedish national ice hockey team has been highly successful, regularly competing in the Winter Olympics and the IIHF World Championships. The sport is immensely popular in Sweden, with many domestic leagues and clubs.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg/640px-Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "Switzerland",
"nationalSport": "Football",
"description": "Football is the national sport of Switzerland. The Swiss national football team competes regularly in international tournaments such as the FIFA World Cup and the UEFA European Championship, with a passionate fan base supporting the team.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Syria",
"nationalSport": "Football",
"description": "Football is the most popular sport in Syria. The national football team competes in regional and international competitions, and the sport is followed by fans across the country, despite the challenges posed by the ongoing conflict.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Tajikistan",
"nationalSport": "Football",
"description": "Football is the national sport of Tajikistan. The national team competes in regional and international competitions, and the sport has a growing following in the country, with local clubs and football infrastructure being developed.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Tanzania",
"nationalSport": "Football",
"description": "Football is the national sport of Tanzania. The Tanzanian national football team competes in regional tournaments and international competitions, and the sport is widely played and followed across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Texas (Historical)",
"nationalSport": "No Official National Sport",
"description": "As an independent republic and later as a state in the U.S., Texas did not have an officially designated national sport. However, American football has become the most popular sport in Texas, and it plays a significant role in the state's culture.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Thailand",
"nationalSport": "Muay Thai",
"description": "Muay Thai is the national sport of Thailand, known as the 'Art of Eight Limbs.' It is a martial art that utilizes punches, kicks, elbows, and knee strikes. It has a deep cultural significance in Thailand, with historical roots in ancient military training.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Muay_Thai_Fight_Us_Vs_Burma_%2880668065%29.jpeg/640px-Muay_Thai_Fight_Us_Vs_Burma_%2880668065%29.jpeg"
},
{
"name": "Timor-Leste",
"nationalSport": "Football",
"description": "Football is the most popular sport in Timor-Leste. The national football team competes in regional and international competitions, and football is a major part of the country's sporting culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Togo",
"nationalSport": "Football",
"description": "Football is the national sport of Togo. The Togolese national football team, known as the 'Spoonbills,' competes in international and continental competitions, and football has a large following in the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Tonga",
"nationalSport": "Rugby",
"description": "Rugby is the national sport of Tonga, with the country being known for its strong rugby culture. Tonga's national rugby team, the 'Ikale Tahi,' regularly competes in international tournaments, including the Rugby World Cup.",
"image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Trinidad and Tobago",
"nationalSport": "Cricket",
"description": "Cricket is the national sport of Trinidad and Tobago. The island has a rich cricketing history and is home to many legendary cricketers. The national team competes in regional and international cricket tournaments, including the ICC Cricket World Cup.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "Tunisia",
"nationalSport": "Football",
"description": "Football is the national sport of Tunisia. The Tunisian national football team, known as the 'Carthage Eagles,' competes regularly in international tournaments such as the FIFA World Cup and the Africa Cup of Nations.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Turkey",
"nationalSport": "Turkish Wrestling (Yağlı Güreş)",
"description": "Turkish wrestling, specifically oil wrestling (Yağlı Güreş), is the national sport of Turkey. It has been practiced for centuries and is a part of the country's rich cultural heritage. The sport involves two wrestlers, who are coated in olive oil, trying to pin each other to the ground.",
"image": "https://t3.ftcdn.net/jpg/03/34/86/36/360_F_334863652_bZWPGMEyQO1ZDENQKpxeUec2P40c9cgb.jpg"
},
{
"name": "Turkmenistan",
"nationalSport": "Turkmen Wrestling (Gures)",
"description": "Wrestling (Gures) is the national sport of Turkmenistan. It has a long-standing tradition in the country, with competitive matches held during festivals and national celebrations. Turkmenistan also has a significant history in martial arts.",
"image": "https://t3.ftcdn.net/jpg/03/34/86/36/360_F_334863652_bZWPGMEyQO1ZDENQKpxeUec2P40c9cgb.jpg"
},
{
"name": "Tuvalu",
"nationalSport": "Football",
"description": "Football is the most popular sport in Tuvalu, despite the country being small. The Tuvalu national football team competes in regional competitions, and the sport enjoys widespread popularity among the youth.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Two Sicilies (Historical)",
"nationalSport": "No Official National Sport",
"description": "The Kingdom of Two Sicilies, which existed until the mid-19th century, did not have an officially recognized national sport. However, in the broader Italian context, football became the dominant sport after the unification of Italy, and it remains central to the region's identity.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Uganda",
"nationalSport": "Football",
"description": "Football is the national sport of Uganda, where the national team, known as the 'Cranes,' has participated in various international tournaments. Football has a strong following across the country, with both local clubs and the national team playing a significant role in Uganda's sporting culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Ukraine",
"nationalSport": "Football",
"description": "Football is the national sport of Ukraine. The Ukrainian national football team has a passionate fan base and competes in international competitions like the UEFA European Championship and FIFA World Cup. Football enjoys widespread popularity at both the grassroots and professional levels.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Union of Soviet Socialist Republics (USSR, Historical)",
"nationalSport": "Ice Hockey",
"description": "Ice hockey was the most popular sport in the USSR, with the Soviet Union's national team dominating international competitions during its existence. The USSR won multiple Olympic gold medals and World Championships in ice hockey, and the sport played a central role in Soviet sports culture.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg/640px-Pittsburgh_Penguins%2C_Washington_Capitals%2C_Bryan_Rust_%2833744033514%29.jpg"
},
{
"name": "United Arab Emirates (UAE)",
"nationalSport": "Football",
"description": "Football is the national sport of the UAE. The country’s national team competes in international competitions like the AFC Asian Cup and World Cup qualifiers. The UAE is home to many top football clubs and a vibrant professional football scene.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "United Kingdom (UK)",
"nationalSport": "Cricket",
"description": "Cricket is often considered the national sport of the United Kingdom, particularly in England. The UK has a rich cricketing history, with the national team competing in international tournaments such as the ICC Cricket World Cup. The sport has a deep cultural significance, especially in England.",
"image": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Pollock_to_Hussey.jpg"
},
{
"name": "United States",
"nationalSport": "Baseball",
"description": "Baseball is considered the national sport of the United States. It has a rich history in American culture, often referred to as 'America's pastime.' The sport gained immense popularity in the late 19th and early 20th centuries and remains a symbol of American tradition. Major League Baseball (MLB) is the top professional league in the country, with iconic teams like the New York Yankees and the Boston Red Sox.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"    }
,
{
"name": "Uruguay",
"nationalSport": "Football",
"description": "Football is the national sport of Uruguay. The country has a proud footballing history, having won the first FIFA World Cup in 1930 and the 1950 World Cup. The national team, known as the 'Celeste,' continues to be one of the top teams in international football.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Uzbekistan",
"nationalSport": "Football",
"description": "Football is the national sport of Uzbekistan, and the national team competes in regional and international tournaments like the AFC Asian Cup and FIFA World Cup qualifiers. The sport is widely followed and played across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Vanuatu",
"nationalSport": "Rugby Union",
"description": "Rugby union is the national sport of Vanuatu. The country has a strong rugby culture, and the national team competes in regional tournaments and qualifiers for international competitions. Rugby is particularly popular in the country's northern regions.",
"image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG/1200px-New_Zealand_vs_South_Africa_2006_Tri_Nations_Line_Out.JPG"
},
{
"name": "Venezuela",
"nationalSport": "Baseball",
"description": "Baseball is the national sport of Venezuela, where the sport has a massive following. Venezuela produces many professional baseball players who compete in Major League Baseball (MLB) and other international leagues. The sport is deeply embedded in the country's culture.",
"image": "https://static01.nyt.com/images/2020/08/24/sports/24mlb-kepner-1/merlin_176084667_69b1099b-0b7e-41ce-bfdf-e407899f10dc-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
},
{
"name": "Vietnam",
"nationalSport": "Football",
"description": "Football is the national sport of Vietnam. The country has a passionate football fan base, and the national team has made significant progress in international competitions like the AFC Asian Cup and World Cup qualifiers. Football is a key part of the national sporting identity.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Württemberg (Historical)",
"nationalSport": "No Official National Sport",
"description": "The Kingdom of Württemberg, which existed until the early 20th century as part of Germany, did not have a designated national sport. However, as part of Germany, football eventually became the dominant sport in the region after the unification of Germany, and it continues to be popular in the area.",
"image": "https://media1.tenor.com/m/N8Gdk2jIFJMAAAAd/troop-originals-telugu-memes.gif"
},
{
"name": "Yemen",
"nationalSport": "Football",
"description": "Football is the most popular sport in Yemen. The Yemen national football team competes in regional and international competitions, and the sport enjoys widespread popularity among the youth across the country.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Zambia",
"nationalSport": "Football",
"description": "Football is the national sport of Zambia. The Zambian national football team, known as the 'Chipolopolo,' has enjoyed success on the continental level, particularly with their victory in the 2012 Africa Cup of Nations. Football is deeply ingrained in Zambia's sporting culture.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    },
{
"name": "Zimbabwe",
"nationalSport": "Football",
"description": "Football is the national sport of Zimbabwe. The Zimbabwe national football team, known as the 'Warriors,' competes in international competitions such as the Africa Cup of Nations and World Cup qualifiers. The sport is very popular throughout the country, with local clubs enjoying large fan bases.",
"image": "https://images.isspf.com/wp-content/uploads/2022/03/21190146/INTERNATIONAL-FOOTBALL-PLAYER-1.webp"    }

]
}




