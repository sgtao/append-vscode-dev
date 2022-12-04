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
        console.log(inputUserValue.value);
        init_githubInfo();
        resultTextArea.textContent = "";
        let inputProjectURL = new URL(inputUserValue.value);
        console.log(inputProjectURL);
        console.log(inputProjectURL.origin);
        if (inputProjectURL.origin === 'https://github.com') {
            devItem.path = inputProjectURL.pathname;
            console.log(devItem);
            get_githubapi(inputUserValue.value);
            let vscodeURL = devItem.url + "github.com" + devItem.path;
            resultTextArea.innerHTML = `<p>${devItem.name}</p><p>path : ${devItem.path};</p>`;
            resultTextArea.innerHTML += `<p>URL : <a href="${vscodeURL}" target="_blank">${vscodeURL}</a></p>`;
        } else {
            resultTextArea.textContent = "githubのレポジトリURLを入力してください";
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
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    if (error.response.status === 404) {
                        resultTextArea.textContent = "該当するユーザーはいません";
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }
    return {
        convert
    };
})();
//