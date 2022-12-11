// convertToVScodeDev.js
'use strict';
//
const convertToVScodeDev = (() => {
    const inputUserValue = document.querySelector("#sampleUserInput");
    const resultTextArea = document.querySelector("#resultTextArea");
    const devItem = {
        name : "vscode-dev",
        url  : "https://vscode.dev",
        path : "/",
        label: "Visual Studio Code",
    }
    const githubInfo = {
        user: '',
        project: '',
        hostname: '',
        email: '',
        avatar_url: '',
        name: '',
        repos_url: '',
    };
    const init_githubInfo = () => {
        let keys = Object.keys(githubInfo)
        keys.forEach((key) => githubInfo[key] = '');
    };
    const deleteUserInput = () => {
        inputUserValue.value = "";
    }
    const convert = async () => {
        console.log(inputUserValue.value);
        await init_githubInfo();
        // no input return early.
        if (! inputUserValue.value) {
            resultTextArea.textContent = "githubのレポジトリURLを入力してください";
            return;
        }
        resultTextArea.textContent = "";
        let inputProjectURL = new URL(inputUserValue.value);
        console.log(inputProjectURL);
        console.log(inputProjectURL.origin);
        if (inputProjectURL.origin === 'https://github.com') {
            devItem.path = inputProjectURL.pathname;
            console.log(devItem);
            await getGithubInfo(inputUserValue.value);
            {
                let keys = Object.keys(githubInfo)
                keys.forEach((key) => console.log(`${key} : ${githubInfo[key]}`));
            }
        } else {
            resultTextArea.textContent = "githubのレポジトリURLを入力してください";
        }
    };
    const getGithubInfo = async (inputUserValue) => {
        console.log('inputUserValue: ' + inputUserValue);
        inputUserValue.split('/').map((path, index)=>{
            switch(index) {
                case 2:
                    console.log(path);
                    githubInfo.hostname = path;
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
        resultTextArea.innerHTML = '';
        // GETリクエスト（通信）
        await axios.get(githubaUserURL)

            // thenで成功した場合の処理
            .then((res) => {
                console.dir(res.data);
                githubInfo.email = res.data.email;
                githubInfo.name  = res.data.name;
                githubInfo.repos_url  = res.data.repos_url;
                githubInfo.avatar_url = res.data.avatar_url;
                insertResultTextArea(devItem);
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
    };
    const insertResultTextArea = (devItem) => {
        let vscodeURL = devItem.url + '/' +
                        githubInfo.hostname + '/' +
                        githubInfo.user + '/' +
                        githubInfo.project + '/';
        resultTextArea.innerHTML += `<p>user : ${githubInfo.user}(${githubInfo.name}, ${githubInfo.email})</p>`;
        resultTextArea.innerHTML += `<p>project : ${githubInfo.project}</p>`;
        resultTextArea.innerHTML += `<p>URL : <a href="${vscodeURL}" target="_blank" class="tooltip">
                                    <span class="tooltip-text">${vscodeURL}</span>
                                    ${devItem.label}</a></p>`;
    };
    return {
        deleteUserInput, convert,
    };
})();
//