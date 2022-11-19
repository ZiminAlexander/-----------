let chapterCounter = function(numberOfChapter = 1, offsetValue = 0){

    //Счетчик от 0 до конца массива allChapters +-1
    if ((numberOfChapter + offsetValue) > (chapterCount-1)){
        numberOfChapter = 0;
    } else if ((numberOfChapter + offsetValue) < 0){
        numberOfChapter = chapterCount-1;
    } else {
        numberOfChapter = numberOfChapter + offsetValue;
    }
    
    return numberOfChapter;

}

// Настраивает классы для отображения разделов
let showClassFunction = function(){

    for (i = 0; i < chapterCount; i++){
        allChapters[i].classList.remove('hidden');
        allChapters[i].classList.remove('current');
        if (i === currentChapter){
            allChapters[i].classList.add('current');
            allChapters[i].style.order = 0;
        } else if (i === chapterCounter(currentChapter, -1)){
            allChapters[i].style.order = -1;
        } else if (i === chapterCounter(currentChapter, 1)){
            allChapters[i].style.order = 1;
        } else {
            allChapters[i].classList.add('hidden');
        }
        
    }

}

let nextButtonFunc = function() {
    currentChapter = chapterCounter(currentChapter, 1);
    showClassFunction();

}

let backButtonFunc = function() {
    currentChapter = chapterCounter(currentChapter, -1);
    showClassFunction();
    
}

let allChapters = document.querySelectorAll('.chapter');
let chapterCount = allChapters.length;
let currentChapter = 1;
if (chapterCount === 1) {currentChapter = 0};

// Задаём начальное отображение
showClassFunction();

// Ищем кнопки "Назад" и "Вперед"
let arrowNext = document.querySelector('.arrow-next');
let arrowBack = document.querySelector('.arrow-back');

// Функционал кнопок
arrowNext.addEventListener('click', nextButtonFunc);
arrowBack.addEventListener('click', backButtonFunc);

