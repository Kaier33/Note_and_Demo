'use strict';
import * as vscode from 'vscode';
const webRequest = require('web-request');
let timer: any;
export function activate(context: vscode.ExtensionContext) {

    // console.log('Congratulations, your extension "CaringOtaku" is now active!');

    let disposable = vscode.commands.registerCommand('extension.caringOtaku', () => {

        vscode.window.showInformationMessage('肥宅快乐编程, 启动!');
        /* Duang Duang Duang Duang Duang Duang Duang Duang Duang Duang  */

    //     const config = vscode.workspace.getConfiguration('CaringOtaku');
    //     const reg = new RegExp(/^([01][0-9]|2[0-3]):([0-5][0-9])$/);
    //     const addZero1 = (num: String | Number, len = 2) => `0${num}`.slice(-len);
    //     if (config.lunchTime && reg.test(config.lunchTime)) {
    //         if (timer) clearInterval(timer)
    //         timer = setInterval(function () {
    //             const configTime = vscode.workspace.getConfiguration('remind-me')
    //             const [lh, lm] = configTime.lunchTime.split(':')
    //             const [gh, gm] = configTime.getOffTime.split(':')
    //             if (
    //                 lh &&
    //                 lm &&
    //                 addZero1(new Date().getHours()) == lh &&
    //                 addZero1(new Date().getMinutes()) == lm
    //             ) {
    //                 getWeatherInfo(configTime.defaultCity, 1)
    //             }
    //             if (
    //                 gh &&
    //                 gm &&
    //                 addZero1(new Date().getHours()) == gh &&
    //                 addZero1(new Date().getMinutes()) == gm
    //             ) {
    //                 getWeatherInfo(configTime.defaultCity, 2)
    //             }
    //         }, 60000)
    //     }

    //     if (!config.defaultCity) {
    //         vscode.window.showInformationMessage('please input your city in vscode setting');
    //         const options = {
    //             ignoreFocusOut: true,
    //             password: false,
    //             prompt: 'please input your city (eg.shenzhen or 深圳)，最好在配置文件里填'
    //         }
    //         vscode.window.showInputBox(options).then(value => {
    //             if (!value) {
    //                 vscode.window.showInformationMessage('please input your city')
    //                 return
    //             }
    //             const cityName = value.trim()
    //             getWeatherInfo(cityName)
    //         })
    //     } else {
    //         getWeatherInfo(config.defaultCity);
    //     }
    //     // console.log(config);

    //     setTimeout(() => {
    //         let now = new Date();
    //         if (now.getHours() == 0) {
    //             vscode.window.showInformationMessage('下班~');
    //         }
    //     }, 3000);
    // });

    context.subscriptions.push(disposable);
}

function getWeatherInfo(cityName: string, operation: Number = -1): void {
    const config = vscode.workspace.getConfiguration('caringOtaku');
    const AK = config.freeweatherAK ? config.freeweatherAK : 'a90ea189359766e44a1c976654993eb2';
    webRequest.get(
        `https://way.jd.com/he/freeweather?city=${encodeURI(
            cityName
        )}&appkey=${AK}`
    ).then((reps: any) => {
        let res = JSON.parse(reps.body)
        console.log(res)
        if (res.code != 10000) {
            vscode.window.showErrorMessage('获取天气失败,请检查网络或是appkey或是输入的城市不对~rua')
            return
        }

        const weatherData = res.request.HeWeather5[0];
        if (weatherData.status !== 'ok') {
            vscode.window.showInformationMessage(`sorry,${weatherData.status}`)
            return
        }

        const tmpLine = renderTmpLine(weatherData.hourly_forecast);
        vscode.window.showInformationMessage(`未来十二小时温度曲线 ：${tmpLine}`);
        if (weatherData.hourly_forecast[0].cond.code >= 300 &&
            weatherData.hourly_forecast[0].cond.code < 500) {
            vscode.window.showInformationMessage(`${weatherData.basic.city}, ${weatherData.now.cond.txt}, ${weatherData.now.tmp}°C, 未来两小时${weatherData.hourly_forecast[0].cond.txt},请携带雨具 ☂️`, '哦哦 👌')
        } else {
            vscode.window.showInformationMessage(`${weatherData.basic.city}, ${weatherData.now.cond.txt}, ${weatherData.now.tmp}°C, 未来两小时${weatherData.hourly_forecast[0].cond.txt}`)
        }

        if (operation == 1) {
            vscode.window.showInformationMessage(`吃饭啦 🍚🥢`)
        }
        if (operation == 2) {
            vscode.window.showInformationMessage(`下班啦 🚀`)
        }


    })
}

/**
  * 绘制温度曲线
  * @param {Array} parm 天气数组
*/
function renderTmpLine(parm: any) {
    // ▁▂▃▅▆▇▁▂▃▅▆▇
    let array: any[] = [];
    let weatherNotice = ''
    parm.forEach(function (el: any): void {
        if (el.cond.code > 204 && !weatherNotice) {
            weatherNotice = ` , ${
                el.date.substr(8, 2) - new Date().getDate() > 0 ? '明天' : '今天'
                }${el.date.substr(-5, 2)}点后有${el.cond.txt}`
        }
        array.push(el.tmp)
    })
    const tmpSigns = ['__ ', '▁▁ ', '▂  ', '▃ ', '▅  ', '▆  ', '▇  ']
    const tmpRange = {
        max: Math.max.apply(Math, array),
        min: Math.min.apply(Math, array)
    }
    let tmpLine = ''
    array.forEach(el => {
        tmpLine += tmpSigns[el - tmpRange.min > 6 ? 6 : el - tmpRange.min]
    })
    return (
        tmpLine +
        weatherNotice +
        ', 最高: ' +
        tmpRange.max +
        '°C, 最低 : ' +
        tmpRange.min +
        '°C'
    )
}


// this method is called when your extension is deactivated
export function deactivate() {
}