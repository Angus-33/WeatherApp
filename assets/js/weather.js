let ElemBody = document.body;
let Loader = document.getElementsByClassName("loader")[0];

function ShowLoader(){
    ElemBody.style.overflow = "hidden";
    Loader.classList.remove("d-none");
}

function HideLodaer(){
    ElemBody.style.overflow = "visible";
    Loader.classList.add("d-none");
}

//show loader
ShowLoader();

//clock
function updateTime() {
    var clock = document.getElementsByClassName("clock");
    var date = document.getElementsByClassName("date");

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the string with leading zeroes
    const clockStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    clock[0].innerHTML = clockStr;
    clock[1].innerHTML = clockStr;
    date[0].innerHTML = now.toLocaleDateString('en-US');
    date[1].innerHTML = now.toLocaleDateString('fa-IR');
}
updateTime();
setInterval(updateTime, 1000);

//set cookie

//from cookie
let TempalteMode = 1; // on (light) and language => english 
let Lang = "en";

let btnChangeTem = document.getElementsByClassName("BtnChangeTem")[0];
let SearchBox = document.getElementById("searchbox");

//default api to shiraz
setTimeout(() => {
    SearchBox.previousElementSibling.click();
}, 100);

function ChangeLanguage(e,val){
    let TitleHeader = document.getElementsByClassName("title-header")[0];
    let SideBar = document.getElementById("sidebar");
    let MoreInformatinoBox = document.getElementById("moreinformatino");
    let Forecast = document.getElementById("forecast");
    let TitleSunsetSunrise = document.querySelector(".title-sunset-sunrise");
    let HumidityTitle = document.querySelector(".humidity-title");
    let TempTitle = document.querySelector(".temp-title");
    let MinMaxTempTitle = document.querySelector(".min-max-temp-title");
    let TempMaxTitle = document.querySelector(".temp-max-title");
    let TempMinTitle = document.querySelector(".temp-min-title");
    let Speed = document.querySelector(".speed-title");
    let Pressure = document.querySelector(".pressure-title");

   if(!e.classList.contains("active")){
        if(val == "English"){ 
            SideBar.classList.remove("order");
            e.parentNode.childNodes[3].classList.remove("active");
            e.parentNode.childNodes[1].classList.add("active");
            TitleHeader.innerHTML = "METEOROLOGY";
            document.title = "METEOROLOGY";
            btnChangeTem.classList.remove("persian-btn-change-template");
            btnChangeTem.parentElement.classList.remove("btn-change-tem-lang");
            TitleHeader.parentElement.classList.remove("persian-title");
            SearchBox.classList.remove("persian-searchbox-input");
            SearchBox.parentElement.classList.remove("persian");
            SearchBox.setAttribute("placeholder","Search for place");
            MoreInformatinoBox.firstElementChild.innerHTML = "Today's Highlights";
            Forecast.classList.remove("persian");
            MoreInformatinoBox.children[1].classList.remove("persian");
            SideBar.children[1].children[1].classList.remove("d-none");
            SideBar.children[1].children[2].classList.add("d-none");
            document.documentElement.classList.remove("font-persian");
            TitleSunsetSunrise.innerHTML = "Sunrise &amp; Sunset";
            HumidityTitle.innerHTML = "Humidity";
            TempTitle.innerHTML = "Temp";
            MinMaxTempTitle.innerHTML = "Max & Min Temp";
            TempMaxTitle.innerHTML = "Max";
            TempMinTitle.innerHTML = "Min";
            Speed.innerHTML = "Speed";
            Pressure.innerHTML = "Pressure";
            Lang = "en";
        }else{
            SideBar.classList.add("order");
            e.parentNode.childNodes[1].classList.remove("active");
            e.parentNode.childNodes[3].classList.add("active");
            TitleHeader.innerHTML = "هوا شناسی";
            document.title = "هوا شناسی";
            btnChangeTem.classList.add("persian-btn-change-template");
            btnChangeTem.parentElement.classList.add("btn-change-tem-lang");
            TitleHeader.parentElement.classList.add("persian-title");
            SearchBox.classList.add("persian-searchbox-input");
            SearchBox.parentElement.classList.add("persian");
            SearchBox.setAttribute("placeholder","نام شهر را وارد کنید")
            MoreInformatinoBox.firstElementChild.innerHTML = "اطلاعات امروز";
            Forecast.classList.add("persian");
            MoreInformatinoBox.children[1].classList.add("persian");
            SideBar.children[1].children[1].classList.add("d-none");
            SideBar.children[1].children[2].classList.remove("d-none");
            document.documentElement.classList.add("font-persian");
            TitleSunsetSunrise.innerHTML = "طلوع و غروب  خورشید";
            HumidityTitle.innerHTML = "رطوبت هوا";
            TempTitle.innerHTML = "دما";
            MinMaxTempTitle.innerHTML = "میزان دما";
            TempMaxTitle.innerHTML = "بیشترین";
            TempMinTitle.innerHTML = "کمترین";
            Speed.innerHTML = "سرعت هوا";
            Pressure.innerHTML = "فشار هوا";
            Lang = "fa";
        }
   }
}

function CheckTemplate(Mode){
    var Template = document.documentElement;
    if(Mode == 1){
        Template.classList.add("dark");  
        TempalteMode = 0;
    } else{
        Template.classList.remove("dark");
        TempalteMode = 1;
    }
}

btnChangeTem.addEventListener("click",function(){
    CheckTemplate(TempalteMode)
});

const apiKey = "8a501e4ecbade78f2182073c7a191453";
const apiUrlMain = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiUrlForcast = 'https://api.openweathermap.org/data/2.5/forecast?&q=';

async function GetData(){
    //show loader
    ShowLoader();
    
    let city = SearchBox.value;
 
    //errors
    let titleErrorResponse;
    let textErrorResponse;
    let textErrorLocation;
    if(Lang == "en"){
        titleErrorResponse = "Error";
        textErrorResponse = "There was an error receiving information!";
        textErrorLocation = "Location Not Found!";
    }else{
        titleErrorResponse = "خطا";
        textErrorResponse = "!دریافت اطلاعات با خطا مواجه شد";
        textErrorLocation = "!مکان مورد نظر شما یافت نشد";
    }

    try {
        //api for today
        const response = await fetch(apiUrlMain + city +`&lang=`+ Lang +`&appid=${apiKey}`);

        //api for forcast
        const responseForcast = await fetch(apiUrlForcast + city +`&lang=`+ Lang +`&appid=${apiKey}`);
          
        //hide loader
        HideLodaer();

        //response tody
        if(response.status == 404){
            Swal.fire({
            title: titleErrorResponse,
            text: textErrorLocation,
            icon: "info"
            });
        }else{
            //response tody
            var data = await response.json();
            var sunrise = document.querySelector(".sunrise");
            var sunset = document.querySelector(".sunset");
            var humidity = document.querySelector(".humidity");
            var pressure = document.querySelector(".pressure");
            var temp = document.getElementsByClassName("temp");
            var temp_max = document.querySelector(".temp_max");
            var temp_min = document.querySelector(".temp_min");
            var speed = document.querySelector(".speed");
            var caption = document.getElementsByClassName("caption");  
            var cityName = document.getElementsByClassName("city-name");

            sunrise.innerHTML = timeConverter(data.sys.sunrise);
            sunset.innerHTML = timeConverter(data.sys.sunset);
            humidity.innerHTML = data.main.humidity;
            pressure.innerHTML = data.main.pressure;
            temp[0].innerHTML = data.main.temp + " °C ";
            temp[1].innerHTML = data.main.temp + " °C ";
            temp[2].innerHTML = data.main.temp;
            temp_max.innerHTML = data.main.temp_max + " °C ";
            temp_min.innerHTML = data.main.temp_min + " °C ";
            speed.innerHTML = data.wind.speed;
            caption[0].innerHTML = data.weather[0].description;
            caption[1].innerHTML = data.weather[0].description;
            cityName[0].innerHTML = data.name;
            cityName[1].innerHTML = data.name;
            
            //change vedio
            let videoTag = document.getElementsByTagName("video")[0];
            switch (data.weather[0].main) {
                case "Clear":
                    videoTag.setAttribute("src","./assets/movie/Clear.mp4");
                break;
                case "Cloudy":
                    videoTag.setAttribute("src","./assets/movie/Cloudy.mp4");
                break;
                case "Rain":
                    videoTag.setAttribute("src","./assets/movie/Rain.mp4");
                break;
                case "Snowing":
                    videoTag.setAttribute("src","./assets/movie/Snowing.mp4");
                break;
                case "Sunny":
                    videoTag.setAttribute("src","./assets/movie/Sunny.mp4");
                break;
                default:
                    videoTag.setAttribute("src","./assets/movie/Cloudy.mp4");
                break;
            }

            //response forcast
            var data = await responseForcast.json();

            var TitleForcast = document.getElementsByClassName("title-forcast"); 
            var IconForcast = document.getElementsByClassName("icon-forcast"); 
            var TempForcast = document.getElementsByClassName("temp-forcast"); 
            var DateForcast = document.getElementsByClassName("date-forcast"); 

            var WeekEnglish = ["Sat", "Sun", "Mon","Tue","Wed", "Thu","Fri"];
            var WeekPersian = ["شنبه","یکشنبه","دوشنبه" ,"سه شنبه" ,"چهارشنبه","پنج شنبه","جمعه"];
            var i =0;
            data.list.forEach(element => {
                if(element.dt_txt.includes("00:00:00")){
                    TitleForcast[i].innerHTML = Lang == "en" ? WeekEnglish[new Date(element.dt_txt).getDay()] :WeekPersian[new Date(element.dt_txt).getDay()] ;
                    IconForcast[i].setAttribute("src","https://openweathermap.org/img/wn/" + element.weather[0].icon+".png");
                    TempForcast[i].innerHTML = element.wind.speed;
                    DateForcast[i].innerHTML = element.dt_txt.replace(" 00:00:00","");
                    i++;
                }
            });
        }

    } catch (error) {
        Swal.fire({
        title: titleErrorResponse,
        text: textErrorResponse,
        icon: "error"
        });

        HideLodaer();
        return;
    }
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = hour + ' : ' + min ;
    return time;
}