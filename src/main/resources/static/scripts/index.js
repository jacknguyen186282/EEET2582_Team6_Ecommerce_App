const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
const clientId = "4mpuhie909kgds8i0pcie8kaif";
const redirectUrl = "http://localhost:5500/pages/authenticate.html";
const logoutUrl = "http://localhost:5500"
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

const testBtn = document.querySelector("#test-btn");
testBtn.addEventListener("click", async () => {
    await obtainData();
})

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", () => {
    logout();
})

const signUpBtn = document.querySelector("#signup-btn");
signUpBtn.addEventListener("click", async () => {
    signUp();
})

function login() {
    localStorage.setItem("redirectUrl", window.location.href);
    window.location.href = `${authDomain}/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}`;
}

function signUp() {
    localStorage.setItem("redirectUrl", window.location.href);
    window.location.href = `${authDomain}/signup?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}`;
}

function logout() {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    window.location.href = `${authDomain}/logout?client_id=${clientId}&logout_uri=${logoutUrl}`;
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

async function obtainData() {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    const response = await fetch(`http://localhost:8080/api/authorize`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken} ${idToken}`
        }
    });

    const body = await response.json();
    console.log(body);
}