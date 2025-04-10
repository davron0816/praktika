document.getElementById("butn").addEventListener("click", function () {
    const kenglikEl = document.querySelectorAll(".menu h2")[0];
    const uzunlikEl = document.querySelectorAll(".menu h2")[1];
    const mamlakatEl = document.querySelectorAll(".menu h2")[2];
    const shaharEl = document.querySelectorAll(".menu h2")[3];
    const ipEl = document.querySelectorAll(".menu h2")[4];
    const ispEl = document.querySelectorAll(".menu h2")[5];


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                kenglikEl.textContent = "Kenglik: " + lat;
                uzunlikEl.textContent = "Uzunlik: " + lon;

                // Locationni ko'rsatish uchun yangi link
                let locationLink = document.getElementById("location-link");
                if (!locationLink) {
                    locationLink = document.createElement("a");
                    locationLink.id = "location-link";
                    locationLink.target = "_blank";
                    locationLink.style.display = "block";
                    locationLink.style.marginTop = "10px";
                    document.querySelector(".menu").appendChild(locationLink);
                }
                locationLink.href = `https://www.google.com/maps?q=${lat},${lon}`;
                locationLink.textContent = "Joylashuvni xaritada ko‘rish";

                
                try {
                    const response = await fetch("https://ipinfo.io/json");
                    const data = await response.json();

                    mamlakatEl.textContent = "Mamlakat: " + data.country;
                    shaharEl.textContent = "Shahar: " + data.city;
                    ipEl.textContent = "IP manzil: " + data.ip;
                    ispEl.textContent = "Internet provayder: " + data.org;
                } catch (error) {
                    alert("IP ma'lumotlarini olishda xatolik!");
                }
            },
            async function (error) {
                alert("Geolokatsiya olishda xatolik: " + error.message);

                // IP orqali joylashuvni olish
                try {
                    const response = await fetch("https://ipinfo.io/json");
                    const data = await response.json();

                    const latlon = data.loc.split(",");
                    const lat = latlon[0];
                    const lon = latlon[1];

                    kenglikEl.textContent = "Kenglik: " + lat;
                    uzunlikEl.textContent = "Uzunlik: " + lon;
                    mamlakatEl.textContent = "Mamlakat: " + data.country;
                    shaharEl.textContent = "Shahar: " + data.city;
                    ipEl.textContent = "IP manzil: " + data.ip;
                    ispEl.textContent = "Internet provayder: " + data.org;

                    // Locationni ko'rsatish uchun yangi link
                    let locationLink = document.getElementById("location-link");
                    if (!locationLink) {
                        locationLink = document.createElement("a");
                        locationLink.id = "location-link";
                        locationLink.target = "_blank";
                        locationLink.style.display = "block";
                        locationLink.style.marginTop = "10px";
                        document.querySelector(".menu").appendChild(locationLink);
                    }
                    locationLink.href = `https://www.google.com/maps?q=${lat},${lon}`;
                    locationLink.textContent = "Joylashuvni xaritada ko‘rish";
                } catch (error) {
                    alert("IP orqali joylashuvni olishda ham xatolik!");
                }
            }
        );
    } else {
        alert("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.");
    }
});
