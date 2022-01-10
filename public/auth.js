const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
const clientId = "4mpuhie909kgds8i0pcie8kaif";
const redirectUrl = "http://localhost:3000/?action=auth&originUrl=http://localhost:3000";
const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
const gatewayUrl = "http://localhost:8084"

const urlParams = new URLSearchParams(window.location.search);
const originalUrl = urlParams.get("originUrl");

window.onload = async () => {
    // If there is no redirect from sign in or sign up, redirect to original url
    if (urlParams.get('action') !== 'auth') {
        return;
    }
    
    // Obtaining access token and id token with provided code 
    const code = urlParams.get('code');
    await getToken(code);

    // Obtaining user info from Cognito with token
    let userInfo = await getUserInfo();

    if (userInfo === null) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("id_token");
        redirect(originalUrl);
    }
    window.localStorage.setItem("cognito_userInfo", userInfo);
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Add user to database if not exist
    const addUserResponse = await fetch(`${gatewayUrl}/api/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")} ${localStorage.getItem("id_token")}`
        },
        body: JSON.stringify(userInfo)
    })

    if (!addUserResponse.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("id_token");
        redirect(originalUrl);
    }
    
    const body = await addUserResponse.json();
    console.log(body);
    if (body && body.data) localStorage.setItem("isAdmin", body.data);

    window.location.replace(originalUrl);
}

async function getToken(code) {
    var content = {
        "grant_type": "authorization_code",
        "code": `${code}`,
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
    
    // When response is not ok redirect
    if (!response.ok) {
        redirect(originalUrl);
    }

    // Store access, refresh and id token into local storage
    const body = await response.json();
    console.log(body);
    localStorage.setItem("access_token", body.access_token);
    localStorage.setItem("refresh_token", body.refresh_token);
    localStorage.setItem("id_token", body.id_token);
}

async function getUserInfo() {
    const accessToken = localStorage.getItem("access_token");

    const response = await fetch(`${authDomain}/oauth2/userInfo` , {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if (!response.ok) {
        return null;
    }
    const body = await response.json();
    return body;
}

function redirect(redirectUrl) {
    if (redirectUrl == "") {
        window.location.replace(location.hostname);
    }
    window.location.replace(redirectUrl);
}
