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
    const githubInfo = {
        user: '',
        project: '',
        email: '',
        avatar_url: '',
        name: '',
        repos_url: '',
    };
    const init_githubInfo = () => {
        let keys = Object.keys(githubInfo)
        keys.forEach((key) => githubInfo[key] = '');
    };
    const convert = () => {
        init_githubInfo();
        console.log(inputUserValue.value);
        try {
            let inputProjectURL = new URL(inputUserValue.value);
            console.log(inputProjectURL);
            let projectHostname = inputProjectURL.hostname;
            if (projectHostname.indexOf('https://github.com') === -1) {
                devItem.path = inputProjectURL.pathname;
                console.log(devItem);
                get_githubapi(inputUserValue.value);
                let vscodeURL = devItem.url + "github.com" + devItem.path;
                resultTextArea.innerHTML = `<p>${devItem.name}</p><p>path : ${devItem.path};</p>`;
                resultTextArea.innerHTML += `<p>URL : <a href="${vscodeURL}" target="_blank">${vscodeURL}</a></p>`;
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
    };
    const get_githubapi = (inputUserValue) => {
        console.log('inputUserValue: ' + inputUserValue);
        inputUserValue.split('/').map((path, index)=>{
            switch(index) {
                case 2:
                    console.log(path);
                    break;
                case 3:
                    console.log(path);
                    githubInfo.user = path;
                    break;
                case 4:
                    console.log(path);
                    githubInfo.project = path;
                    break;
            }
        });
        let githubaUserURL = 'https://api.github.com/users/' + githubInfo.user;
        // GETリクエスト（通信）
        axios.get(githubaUserURL)

            // thenで成功した場合の処理
            .then((res) => {
                console.log(res.data);
                githubInfo.email = res.data.email;
                githubInfo.name  = res.data.name;
                githubInfo.repos_url  = res.data.repos_url;
                githubInfo.avatar_url = res.data.avatar_url;
            })
            // catchでエラー時の挙動を定義
            .catch(err => {
                console.log("err:", err);
            });

    }
    return {
        convert
    };
})();
//