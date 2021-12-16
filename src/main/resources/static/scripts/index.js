const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
const clientId = "4mpuhie909kgds8i0pcie8kaif";
const redirectUrl = "http://localhost:5500/pages/authenticate.html";
const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
const responseType = "code";

const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("click", () => {
    login();
})

const refreshBtn = document.querySelector("#refresh-btn");
refreshBtn.addEventListener("click", async () => {
    await refreshToken();
})

function login() {
    localStorage.setItem("redirectUrl", window.location.href);
    window.location.href = `${authDomain}/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}`;
}

async function refreshToken() {
    var content = {
        "grant_type": "refresh_token",
        "refresh_token": localStorage.getItem("refresh_token"),
        "client_id": clientId,
        "redirect_uri": redirectUrl
    }

    var formBody = [];
    for (var property in content) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(content[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch(`${authDomain}/oauth2/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    });
    
    const body = await response.json();
    localStorage.setItem("access_token", body.access_token);
    localStorage.setItem("id_token", body.id_token);
}