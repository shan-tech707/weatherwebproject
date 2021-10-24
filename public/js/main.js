const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp_real_val");

const dataHide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal == "") {
    city_name.innerText = `Please write the name before search`;
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=14b6dc373052765c47ddcd96d4c81b09`;
      const response = await fetch(url);
      const objData = await response.json();
      const arrData = [objData];

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerText = arrData[0].main.temp;
      const tempMood = arrData[0].weather[0].main;

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #dfe4ea;'></i>";
      } else if (tempMood == "Rainy") {
        temp_status.innerHTML =
          "<i class='fas fa-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      }
      dataHide.classList.remove("data_hide");
    } catch (error){
      city_name.innerText = `Please Enter the Name of City Properly`;
      dataHide.classList.add("data_hide");
      console.log(error)
    }
  }
};

submitBtn.addEventListener("click", getInfo);
