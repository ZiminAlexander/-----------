let ch1Btn = document.querySelector('.chapter.button');
ch1Btn.addEventListener('click', function(){

    // Очищаем страницу, меняем заголовок, создаём ссылку на главную страницу
    let mainChapter = document.querySelector('.carousel');
    mainChapter.innerHTML = "";
    mainChapter.classList.remove('carousel');
    mainChapter.classList.add('editImage');
    mainChapter.style.display = "flex";
    mainChapter.style.flexDirection = "column";
    mainChapter.style.alignItems = "center";
    document.querySelector('.title-header').textContent = "Редактор фотографий";
    document.querySelector("[href='mainStyle.css']").remove();

    // Ссылка на главную страницу
    let homeLink = document.createElement('a');
    homeLink.href = "index.html";
    homeLink.textContent = "На главную";
    homeLink.classList.add('toMainPage');
    homeLink.style.color = "blue";
    document.querySelector('header').insertBefore(homeLink, document.querySelector('header').firstChild);
    
    //Отрисовка страницы с редактором
    let templateImg = document.querySelector('#edit-photo-template').content;
    templateImg.querySelector('img').classList.add('image-for-edit');
    mainChapter.appendChild(templateImg);

    let downloadButton = document.querySelector(".download-button");
    
    downloadButton.addEventListener('change', function(){
        
        let newFileName = document.querySelector("input[type=file]").files[0];
        let urlImageNew = new FileReader();
        let imageForEdit = document.querySelector("img");
            
        urlImageNew.addEventListener("load", () => {
                imageForEdit.src = urlImageNew.result;
            }, false);
        if (newFileName) {
            urlImageNew.readAsDataURL(newFileName);
        }
            
    });

    let addFilterButton = mainChapter.querySelector(".add-philter");
    addFilterButton.addEventListener('click', function(){
        let templateFilterString = document.querySelector('#filter-string-template').content;
        mainChapter.appendChild(templateFilterString.cloneNode(true));
        setEventListeners();
        setcounter();
    

    });
});

let setEventListeners = function (){
    let allFilters = document.querySelectorAll(".filterString");
    if (allFilters.length === 0) {return;}
    let currentFilterString = allFilters[allFilters.length-1];
    let currentSelect = currentFilterString.querySelector('select');
    currentSelect.addEventListener('change', setLimitsAndFilters);
    let currentFilterValue = currentFilterString.querySelector('input');
    currentFilterValue.addEventListener('change', setFilters);
    let deleteButton = currentFilterString.querySelector('.delete-button');
    deleteButton.addEventListener('click', deleteFilter);
}

let setFilters = function (){
    // Применяет все фильтры к изображению
    let imageField = document.querySelector(".image-for-edit");
    let allFilters = document.querySelectorAll(".filterString");
    if (allFilters.length === 0) {return;}
    let resultFilter = "";
    for (i = 0; i < allFilters.length ; i++){
        let currentFilterString = allFilters[i];
        let currentSelect = currentFilterString.querySelector('select');
        let currentFilter = currentSelect.querySelector("option[value = " + currentSelect.value + "]");
        let currentFilterValue = currentFilterString.querySelector('input');
        let sizing = currentFilter.dataset.values.split(",")[3];

        resultFilter = resultFilter + currentSelect.value + "(" + currentFilterValue.value + sizing + ")" + " ";
    }
    imageField.style.filter = resultFilter;

}

let setLimitsAndFilters = function(){
    
    let allFilters = document.querySelectorAll(".filterString");
    if (allFilters.length === 0) {return;}
    let currentFilterString = allFilters[this.parentElement.dataset.counter-1];
    let currentSelect = currentFilterString.querySelector('select');
    let currentFilter = currentSelect.querySelector("option[value = " + currentSelect.value + "]");
    let currentFilterValue = currentFilterString.querySelector('input');
        
    //Устанавливаем значения полоски
    let minValue = currentFilter.dataset.values.split(",")[0];
    let maxValue = currentFilter.dataset.values.split(",")[1];
    let currentValue = currentFilter.dataset.values.split(",")[2];
    
    currentFilterValue.min = Number(minValue);
    currentFilterValue.max = Number(maxValue);
    currentFilterValue.step = Number(maxValue-minValue)/10;
    currentFilterValue.value = Number(currentValue);
    setFilters();

}

let deleteFilter = function(){
    let allFilters = document.querySelectorAll(".filterString");
    if (allFilters.length === 0) {return;}
    let currentFilterString = allFilters[this.parentElement.dataset.counter-1];
    currentFilterString.remove();
    setcounter();

}

let setcounter = function(){
    let allFilters = document.querySelectorAll(".filterString");
    if (allFilters.length === 0) {return;}
    for (i = 0; i < allFilters.length ; i++){
        let currentFilterString = allFilters[i];
        currentFilterString.dataset.counter = i + 1;
    }
}