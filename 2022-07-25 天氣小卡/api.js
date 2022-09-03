fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-E5991866-9AEF-4F46-AB8C-F3490A7F89AC').then(function (response) {
            return response.json();
        })
            .then(function (data) {
                var userface = document.querySelector('.userface');
                var locations = data.records.location;
                console.log(data);
                locations.forEach(function (location) {
                    var img;
                    var shortcut = location.weatherElement[0].time[0].parameter.parameterName;
                    img = image(shortcut);
                    userface.innerHTML +=
                        `
                        <div class="card">
                        <picture><img src="${img}" alt=""></picture>
                        <h3 class='name'>${location.locationName}</h3>
                        <p class='cardContent'>最高溫度:${location.weatherElement[4].time[0].parameter.parameterName}</p>
                        <p class='cardContent'>最低溫度:${location.weatherElement[2].time[0].parameter.parameterName}</p>
                        <p class="price">${location.weatherElement[0].time[0].parameter.parameterName}</p>
                        </div>
                        `
                });
            });
        function filter(l) {
            fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-E5991866-9AEF-4F46-AB8C-F3490A7F89AC').then(function (response) {
                return response.json();
            })
                .then(function (data) {
                    var userface = document.querySelector('.userface');
                    var locations = data.records.location;
                    var norths = [1, 5, 7, 13, 18, 3, 4];
                    var wests = [9, 14, 20, 11, 8];
                    var souths = [0, 2, 6, 15, 17, 19];
                    var easts = [10, 12];
                    var outers = [21, 16];
                    if (l == 'north') {
                        userface.innerHTML = '';
                        norths.forEach(function (place) {
                            generate(place);
                        })
                    }
                    else if (l == 'west') {
                        userface.innerHTML = '';
                        wests.forEach(function (place) {
                            generate(place);
                        })
                    }
                    else if (l == 'south') {
                        userface.innerHTML = '';
                        souths.forEach(function (place) {
                            generate(place);
                        })
                    }
                    else if (l == 'east') {
                        userface.innerHTML = '';
                        easts.forEach(function (place) {
                            generate(place);
                        })
                    }
                    else if (l == 'outer') {
                        userface.innerHTML = '';
                        outers.forEach(function (place) {
                            generate(place);
                        })
                    }
                    function generate(a) {
                        var img;
                        var shortcut = locations[a].weatherElement[0].time[0].parameter.parameterName;
                        img = image(shortcut);
                        userface.innerHTML +=
                        `
                        <div class="card">
                        <picture><img src="${img}" alt=""></picture>
                        <h3 class='name'>${locations[a].locationName}</h3>
                        <p class='cardContent'>最高溫度:${locations[a].weatherElement[4].time[0].parameter.parameterName}</p>
                        <p class='cardContent'>最低溫度:${locations[a].weatherElement[2].time[0].parameter.parameterName}</p>
                        <p class="price">${locations[a].weatherElement[0].time[0].parameter.parameterName}</p>
                        </div>
                        `
                    }
                })
        }
        function image(shortcut){
            if (shortcut.includes('雷')){
                return "./img/weather/thunderstorm.gif";
            } 
            else if(shortcut.includes('晴')){
                return "./img/weather/Sunnycloudy.gif";
            }
            else if(shortcut.includes('多雲')){
                return "./img/weather/cloud.gif"
            }
        }
        