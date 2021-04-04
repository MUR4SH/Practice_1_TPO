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

    /*Вывести ответ*/
    answer_fill(answers){
        let check = false
        try{
            if(document.getElementById('answers_box')){
                document.getElementById('answers_box').innerText = answers?'Ответ: '+answers:'Нужных чисел нет';
                check = true;
            }else{
                console.log(answers?'Ответ: '+answers:'Нужных чисел нет');
            }
        }catch(err){
            console.log(answers?'Ответ: '+answers:'Нужных чисел нет');
        }
        return check
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

    /*
    Объединяет функции поиска ответа и вывода ответа
    */
    find_fill_answers(array){
        let answers = this.find_answer(array)
        return this.answer_fill(answers)
    }

    /*
    Проверяет вводимые символы
    Функция проверки вводимых символов
    */
    number_input(elem) {
        let check = true
        if(!elem.value){return false}
        while(check){
            check = false
            let number = String(elem.value);
            if(Number(number[0]) == 0 && number.length>1 && number[0]!=' '){
                elem.value = '0';
                number = '0';
                check = true
            }
            let num='';
            for(let i=0;i<number.length;i++){
                if(number[i] != '.' && number[i] != ',' && number[i] != '-' && number[i] != '+' && number[i] != ' ' && Number(number[i]) == number[i]){
                    num+=number[i]
                }
            }
            number = num
            check = false
            if(number.length>4){
                number = number.substring(0,4);
                check = true
            }
            elem.value = number
        }
        return elem
    }

    /*Подтведить ввод
    Функция проверки введенного числа
    */
    submit_number(elem) {
        if(this.arr.length>=10 || !elem) return this.arr.length; 

        if(this.check_num(elem.value)){
            this.arr.push(elem.value);
            elem.style='border:none;'
            elem.value = null;
        }else{
            elem.value?elem.style='border:2px solid red;':0
        }

        if(this.arr.length>=10){
            this.find_fill_answers(this.arr);
            elem.disabled = true;
        }
        return this.arr.length
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