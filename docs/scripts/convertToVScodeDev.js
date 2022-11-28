// convertToVScodeDev.js
'use strict';
//
const convertToVScodeDev = (() => {
    const inputUserValue = document.querySelector("#sampleUserInput");
    const resultTextArea = document.querySelector("#resultTextArea");
    const devItem = {
        name : "vscode-dev",
        url  : "https://vscode.dev/",
        path : "/",
        label: "Visual Studio Code",
    }
    console.log(inputUserValue.value);
    const convert = () => {
        console.log(inputUserValue.value);
        try {
            let inputProjectURL = new URL(inputUserValue.value);
            console.log(inputProjectURL);
            let projectHostname = inputProjectURL.hostname;
            if (projectHostname.indexOf('https://github.com') === -1) {
                devItem.path = inputProjectURL.pathname;
                console.log(devItem);
                resultTextArea.textContent = `${devItem.name}\npath : ${devItem.path};\n`;
                resultTextArea.textContent += "URL : " + devItem.url + "github.com" + devItem.path;
            } else {
                resultTextArea.textContent = "githubのレポジトリURLを入力してください";
            }
        } catch (e) {
            console.log(e);
            if (e instanceof TypeError) {
                resultTextArea.textContent = "レポジトリのURLを入力してください";
            } else {
                resultTextArea.textContent = e;
            }
        }
    }
    return {
        convert
    };
})();
//