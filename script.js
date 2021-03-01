let arr=[]; //Массив

/*
Ф-я проверяет подходит ли число под условие
*/
function is_answer(num){
    let max=-1;
    let mid=0;
    for(let i=0;i<num.length;i++){
        mid+=Number(num[i]);
        max<Number(num[i])?max=Number(num[i]):0;
    }
    if(num[0] == '0' || num.length<4 || num.length>4){
        return false;
    }
    if(max == 7 && (mid/4)<7){
        return true;
    }else{
        return false;
    }
}

/*
Проходит по всем эл-там массива, ищет ответ и пишет его
Функция поиска ответа
*/
function find_answer(){
    if(arr.length < 10){ return; }
    let answers = 0;
    arr.forEach((element)=>{
        is_answer(element)?answers++:0;
    })
    if(document.getElementById('answers_box')){
        document.getElementById('answers_box').innerText = answers?'Ответ: '+answers:'Нужных чисел нет';
    }else{
        console.log(answers?'Ответ: '+answers:'Нужных чисел нет');
    }
}

/*
Проверяет вводимые символы
Функция проверки вводимых символов
*/
function number_input(elem) {
    if(arr.length>=10){ 
        elem.value = null; 
        return;
    }

    let number = elem.value;
    if(number[0] == ' '){
        elem.value = null;
        return;
    }
    if(Number(number[0]) == 0){
        elem.value = 0;
        return;
    }else if(number[0] == '-' || number[0] == '+'){
        elem.value = null;
        return;
    }

    if(number.length>4){
        elem.value = number.substr(0,4);
    }
    if(Number(number) != number || number[number.length-1] == '.' || number[number.length-1] == ','){
        elem.value = number.substr(0,number.length-1);
    }
}

/*Вывод длины массива для удобства */
function cur_length(array){
    if(document.getElementById('numbers_num')){
        document.getElementById('numbers_num').innerText = array.length+'/10'
    }
    return;
}

/*Подтведить ввод
Функция проверки введенного числа
*/
function submit_number() {
    let elem = document.getElementById('inp_number');
    if(arr.length>=10 || !elem){ 
        return; 
    }

    let number = elem.value;

    if(Number(number) == number && Number.isInteger(Number(number)) && Number(number)>0 && number.length==4){
        elem.style='border:none;'
        arr.push(number);
        elem.value = null;
    }else{
        elem.style='border:2px solid red;'
        return;
    }

    cur_length(arr)

    if(arr.length>=10){
        find_answer();
    }
}