const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
const clientId = "4mpuhie909kgds8i0pcie8kaif";
const redirectUrl = "http://localhost:5500/pages/signup.html";
const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
const gatewayUrl = "http://localhost:8080"

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const originalUrl = localStorage.getItem("redirectUrl");

    console.log(code);

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
    
    if (!response.ok) {
        // window.location.replace(originalUrl);
    }

    const body = await response.json();
    let accessToken = body.access_token;
    let idToken = body.id_token;
    localStorage.setItem("access_token", body.access_token);
    localStorage.setItem("refresh_token", body.refresh_token);
    localStorage.setItem("id_token", body.id_token);

    //TO-DO: map userInfo to User Object
    let userInfo = await getUserInfo();
    if (userInfo === null) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("id_token");
        // window.location.replace(originalUrl);
    }

    const signUpResponse = await fetch(`${gatewayUrl}/api/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken} ${idToken}`
        },
        body: JSON.stringify(userInfo)
    })

    if (!signUpResponse.ok) {
        // window.location.replace(originalUrl);
    }

    // window.location.replace(originalUrl);
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