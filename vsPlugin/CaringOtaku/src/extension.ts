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

        const option = {
            ignoreFocusOut: true,
            password: false,
            prompt: 'please input your city (eg.shenzhen or 深圳)'
        }
        vscode.window.showInputBox(option).then(value => {
            if (!value) {
                vscode.window.showInformationMessage('please input your city')
                return
            } else {
                vscode.window.showInformationMessage(`肥宅快乐编程, 启动!`);
            }
        })

        setTimeout(() => {
            let now = new Date();
            if (now.getHours() == 18) {
                vscode.window.showInformationMessage('下班~');
            }
        }, 3000);

        // Display a message box to the user
        // vscode.window.showInformationMessage('肥宅快乐编程, 启动!');
    });

    context.subscriptions.push(care);
}


// this method is called when your extension is deactivated
export function deactivate() { }