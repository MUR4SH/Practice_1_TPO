const application = require('../script.js');
let app = new application();
let element_test = {
    value:null,
    style:null,
    disabled: false
}
let element_equal = {
    value:null,
    style:null,
    disabled: false
}

QUnit.module('Application module');
QUnit.test('check_num',assert=>{
    assert.equal(app.check_num('garb34ywbw5'),false,'not a number 1');
    assert.equal(app.check_num('5234'),true,'correct str');
    assert.equal(app.check_num(0070),false,'not a 4 length number');
    assert.equal(app.check_num(5985),true,'correct number');
    assert.equal(app.check_num(554.7),false,'not int');
    assert.equal(app.check_num('-1685'),false,'have minus');
})


QUnit.test('number is answer',assert=>{
    assert.equal(app.is_answer(1234),false,'not correct');
    assert.equal(app.is_answer('garb34ywbw5'),false,'not a number');
    assert.equal(app.is_answer(1237),true,'correct');
    assert.equal(app.is_answer(67.77),false,'not correct');
    assert.equal(app.is_answer(7777),false,'not correct');
    assert.equal(app.is_answer(9979),false,'not correct');
    assert.equal(app.is_answer(0979),false,'not a 4 length number');
})

QUnit.test('find answer',assert=>{
    assert.equal(app.find_answer([1237,1117,7676,1234,2345,7777,9877,9999,8888,0456]),3,'array 1');
    assert.equal(app.find_answer([1237,1117,7676,1234,2745,7111,7777,9711,7452,5457]),7,'array 2');
    assert.equal(app.find_answer(['1237',1117,'7676',1234,2745,7111,'7777',9711,7452,'5457']),7,'array with strings');
    assert.equal(app.find_answer([1117,1234,2745,7111,9711,7452]),false,'not full array');
    assert.equal(app.find_answer([1239,1112,2626,1234,2145,5111,7777,9799,7999,9997]),0,'array 2');
})

QUnit.test('number input',assert=>{
    assert.equal((app.number_input('1')),false,'test 1');
    element_test.value = 1234;element_equal.value='1234'
    assert.equal((app.number_input(element_test)).value,element_equal.value,'test 1234');
    element_test.value = '+123';element_equal.value='123'
    assert.equal((app.number_input(element_test)).value,element_equal.value,'test +123');
    element_test.value = '+1.2-35';element_equal.value='1235'
    assert.equal((app.number_input(element_test)).value,element_equal.value,'test +1.2-35');
    element_test.value = 'ads3ew35wt44';element_equal.value='3354'
    assert.equal((app.number_input(element_test)).value,element_equal.value,'test ads3ew35wt44');
    element_test.value = '-*/fdgjtryj';element_equal.value=''
    assert.equal((app.number_input(element_test)).value,element_equal.value,'test -*/fdgjtryj');
    element_test.value = '';
    assert.equal((app.number_input(element_test)),false,'test nothing');
})