const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const variant_desc = `Вариант 3: Ввести массив из 10 целых положительных четырехзначных целых
чисел. Вывести количество чисел массива, в которых максимальная цифра
равна 7 и среднее арифметическое цифр этих чисел меньше 7. Если таких
элементов нет, то выдать сообщение об этом.`

describe('Application launch', function () {
	this.timeout(5000)

	beforeEach(function () {
		this.app = new Application({
			path: electronPath,
			args: ['.']
		})
		return this.app.start()
	})

	afterEach(function () {
		if (this.app && this.app.isRunning()) {
			return this.app.stop()
		}
	})

    /*App shows window*/
	it('shows an initial window', async function () {
        return this.app.client.getWindowCount().then(function (count) {
            assert.strictEqual(count, 1)
        })
	})

    /*HTML elements after loading*/
    it('variant description exist', async function(){
        return this.app.client.waitUntilTextExists('#var_info', variant_desc, 1000)
    })
    it('input exist', async function(){
        let input = await this.app.client.$('#inp_number')
        return assert.ok(input)            
    })
    it('button exist', async function(){
        let input = await this.app.client.$('#inp_submit')
        return assert.ok(input)            
    })

    /*Array length */
    it('array length', async function(){
        const inp = await this.app.client.$('#inp_number');
        const btn = await this.app.client.$('#inp_submit');
        for(let i=0;i<14;i++){
            let num = (Math.random()*100000).toFixed(0)
            num = num.substr(0,4)
            this.app.electron.clipboard.writeText(num);
            await inp.click();
            await this.app.webContents.paste();
            btn.click()
        }        
        return this.app.client.waitUntilTextExists('#numbers_num','10/10', 1000)
    })

    /*Usages*/
    it('usage #1', async function(){
        let chars = ['a','x','c','o','\\','>','&','*',';','?',']']
        const inp = await this.app.client.$('#inp_number');
        const btn = await this.app.client.$('#inp_submit');
        for(let i=0;i<10;i++){
            let str = ''
            for(let j=0;j<15;j++){
                str += chars[(Math.random()*10).toFixed(0)]
            }
            this.app.electron.clipboard.writeText(str);
            await inp.click();
            await this.app.webContents.paste();
            btn.click()
        }
        return this.app.client.waitUntilTextExists('#numbers_num','0/10', 1000)
    })
    
    it('usage #2', async function(){
        const inp = await this.app.client.$('#inp_number');
        const btn = await this.app.client.$('#inp_submit');
        this.app.electron.clipboard.writeText('1117');
        await inp.click();
        await this.app.webContents.paste();
        btn.click()
        this.app.electron.clipboard.writeText('7222');
        await inp.click();
        await this.app.webContents.paste();
        btn.click()
        for(let i=0;i<8;i++){
            this.app.electron.clipboard.writeText('9999');
            await inp.click();
            await this.app.webContents.paste();
            btn.click()
        }
        return this.app.client.waitUntilTextExists('#answers_box','Ответ: 2', 1000) && this.app.client.waitUntilTextExists('#numbers_num','10/10', 1000)
    })

    it('usage #3', async function(){
        const inp = await this.app.client.$('#inp_number');
        const btn = await this.app.client.$('#inp_submit');
        for(let i=0;i<15;i++){
            this.app.electron.clipboard.writeText('9999');
            await inp.click();
            await this.app.webContents.paste();
            btn.click()
        }
        return this.app.client.waitUntilTextExists('#answers_box','Нужных чисел нет', 1000) && this.app.client.waitUntilTextExists('#numbers_num','10/10', 1000)
    })
})