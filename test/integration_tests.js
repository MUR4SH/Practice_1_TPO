const application = require('../script.js');
let element_test = {
    value:null,
    style:null,
    disabled: false
}

QUnit.module('Application module');
QUnit.test('test1  - normal numbers',assert=>{
    let app = new application();
    for(let i=0;i<13;i++){
        let vl = (Math.random()*100000).toFixed(0)
        vl = vl.substr(0,4)
        if(vl == 0){vl='9999'}
        element_test.value = vl;vl
        assert.equal((app.number_input(element_test)).value,vl,'equal numbers '+i);
        if(i>=10){
            assert.equal((app.submit_number(element_test)),'10','array is to big');
        }else{
            assert.equal((app.submit_number(element_test)),(i+1),'array length');
        }
    }
})

QUnit.test('test2  - only random chars',assert=>{
    let app = new application();
    let chars = ['a','x','c','o','\\','>','&','*',';','?','\]',' ']
    for(let i=0;i<13;i++){
        let str;
        let str_eq = '';
        for(let j=0;j<15;j++){
            str += chars[(Math.random()*10).toFixed(0)]
        }
        element_test.value = str;
        assert.equal((app.number_input(element_test)).value,str_eq,'chars '+i);
        assert.equal((app.submit_number(element_test)),0,'array length: '+app.arr.length);
    }
})

QUnit.test('test3  - random chars and numbers',assert=>{
    let app = new application();
    let chars = ['a','x','c','o','\\','>','&','*',';','?','\]',' ']
    let n = 0;
    for(let i=0;i<13;i++){
        let str;
        let str_eq = '';
        let chrs = Boolean(Math.round(Math.random()))
        if(chrs){
            for(let j=0;j<15;j++){
                str += chars[(Math.random()*10).toFixed(0)]
            }
        }else{
            str = (Math.random()*100000).toFixed(0)
            str = str.substr(0,4)
            str_eq = str
            if(str == 0){str='9999'}
            n++;
            if(n>10) n=10
        }
        element_test.value = str;
        assert.equal((app.number_input(element_test)).value,str_eq,chrs?'chars '+i:'numbers');
        assert.equal((app.submit_number(element_test)),n,'array length: '+app.arr.length);
    }
})