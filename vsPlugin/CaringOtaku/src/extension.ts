'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let care = vscode.commands.registerCommand('extension.caringOtaku', () => {
        // The code you place here will be executed every time your command is executed

        /* Duang Duang Duang Duang Duang Duang Duang Duang Duang Duang  */
        vscode.window.showInformationMessage('肥宅快乐编程, 启动!');
        /* Duang Duang Duang Duang Duang Duang Duang Duang Duang Duang  */
        const config = vscode.workspace.getConfiguration('CaringOtaku');
        if (!config.defaultCity) {
            vscode.window.showInformationMessage('please input your city in vscode setting');
        } else {
            getWeatherInfo(config.defaultCity);
        }
        // console.log(config);

        setTimeout(() => {
            let now = new Date();
            if (now.getHours() == 0) {
                vscode.window.showInformationMessage('下班~');
            }
        }, 3000);

        // Display a message box to the user
        // vscode.window.showInformationMessage('肥宅快乐编程, 启动!');
    });

    context.subscriptions.push(care);
}

function getWeatherInfo(cityName: string, operation: Number = -1): void {
    const config = vscode.workspace.getConfiguration('caringOtaku');
    const AK = config.freeweatherAK ? config.freeweatherAK : 'f9fcf6d427b513e10e7483652a688bff';
    axios.get('https://way.jd.com/he/freeweathe', {
        params: {
            city: config.defaultCity,
            appkey: AK
        },
        withCredentials: true, 
    })
        .then(function (response) {

            console.log("*****************")
            console.log(response);
        })
        .catch(function (error) {
            vscode.window.showErrorMessage('获取天气失败/server error/母鸡点解')
        })
        .then(function () {
            // always executed
        });


}


// this method is called when your extension is deactivated
export function deactivate() { }