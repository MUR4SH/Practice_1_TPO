class application {
    constructor(){
        this.arr = []//Массив
    } 

    /*
    Ф-я проверяет подходит ли число под условие
    */
    is_answer(num){
        num = String(num)
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

    answer_fill(answers){
        if(document.getElementById('answers_box')){
            document.getElementById('answers_box').innerText = answers?'Ответ: '+answers:'Нужных чисел нет';
        }else{
            console.log(answers?'Ответ: '+answers:'Нужных чисел нет');
        }
        return answers;
    }

    /*
    Проходит по всем эл-там массива, ищет ответ и пишет его
    Функция поиска ответа
    */
    find_answer(array){
        if(array.length < 10){ return false; }
        let answers = 0;
        array.forEach((element)=>{
            this.is_answer(element)?answers++:0;
        })
        return answers;
    }

    find_fill_answers(array){
        let answers = this.find_answer(array)
        this.answer_fill(answers)
    }

    /*
    Проверяет вводимые символы
    Функция проверки вводимых символов
    */
    number_input(elem) {
        if(this.arr.length>=10){ 
            elem.value = null; 
            return false;
        }

        let number = elem.value;
        if(number[0] == ' '){
            elem.value = null;
        }
        if(Number(number[0]) == 0){
            elem.value = 0;
        }else if(number[0] == '-' || number[0] == '+'){
            elem.value = null;
        }

        if(number.length>4){
            elem.value = number.substr(0,4);
        }
        if(Number(number) != number || number[number.length-1] == '.' || number[number.length-1] == ','){
            elem.value = number.substr(0,number.length-1);
        }
        if(number.length >= 4){
            return true;
        }else{
            return false;
        }
    }

    /*Подтведить ввод
    Функция проверки введенного числа
    */
    submit_number(elem) {
        if(this.arr.length>=10 || !elem) return false; 

        if(this.check_num(elem.value)){
            this.arr.push(elem.value);
            elem.style='border:none;'
            elem.value = null;
        }else{
            elem.value?elem.style='border:2px solid red;':0
            return false;
        }

        if(this.arr.length>=10){
            this.find_fill_answers(this.arr);
            elem.disabled = true;
        }
        return true
    }

    //Проверяет число и возвращает t/f при прохождении условий
    check_num(number){
        number = String(number)
        if(Number(number) == number && Number.isInteger(Number(number)) && Number(number)>0 && number.length==4){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = application;