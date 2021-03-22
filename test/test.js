const application = require('../script.js');
let app = new application();

QUnit.module('check_num');
QUnit.test('check_num',assert=>{
    assert.equal(app.check_num('garb34ywbw5'),false,'not a number 1');
    assert.equal(app.check_num('5234'),true,'correct str');
    assert.equal(app.check_num(0070),false,'not a 4 length number');
    assert.equal(app.check_num(5985),true,'correct number');
    assert.equal(app.check_num(554.7),false,'not int');
    assert.equal(app.check_num('-1685'),false,'have minus');
})

QUnit.module('is_answer');
QUnit.test('number is answer',assert=>{
    assert.equal(app.is_answer(1234),false,'not correct');
    assert.equal(app.is_answer('garb34ywbw5'),false,'not a number');
    assert.equal(app.is_answer(1237),true,'correct');
    assert.equal(app.is_answer(6777),true,'correct');
    assert.equal(app.is_answer(7777),false,'not correct');
    assert.equal(app.is_answer(9979),false,'not correct');
    assert.equal(app.is_answer(0979),false,'not a 4 length number');
})


QUnit.module('find_answer');
QUnit.test('find answer',assert=>{
    assert.equal(app.find_answer([1237,1117,7676,1234,2345,7777,9877,9999,8888,0456]),3,'array 1');
    assert.equal(app.find_answer([1237,1117,7676,1234,2745,7111,7777,9711,7452,5457]),7,'array 2');
    assert.equal(app.find_answer(['1237',1117,'7676',1234,2745,7111,'7777',9711,7452,'5457']),7,'array with strings');
    assert.equal(app.find_answer([1117,1234,2745,7111,9711,7452]),false,'not full array');
    assert.equal(app.find_answer([1239,1112,2626,1234,2145,5111,7777,9799,7999,9997]),0,'array 2');
})