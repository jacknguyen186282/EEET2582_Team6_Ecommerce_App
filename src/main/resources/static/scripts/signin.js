const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
const clientId = "4mpuhie909kgds8i0pcie8kaif";
const redirectUrl = "http://localhost:5500/pages/signin.html";
const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
const gatewayUrl = "http://localhost:8080"

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const originalUrl = localStorage.getItem("redirectUrl");
    localStorage.removeItem("redirectUrl")

    // Request access and refresh token with provided code
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
    
    if (response.ok) {
        const body = await response.json();
        let accessToken = body.access_token;
        let idToken = body.id_token;
        localStorage.setItem("access_token", body.access_token);
        localStorage.setItem("refresh_token", body.refresh_token);
        localStorage.setItem("id_token", body.id_token);

        const isAdminResponse = await fetch(`${gatewayUrl}/api/verifyAdmin`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken} ${idToken}`
            }
        })
        console.log(isAdminResponse);
        const isAdminResponseBody = await isAdminResponse.json();
        if (isAdminResponseBody.data.isAdmin === true) {
            window.location.replace("http://localhost:5500/pages/admin.html");
        }
        window.location.replace(originalUrl);
    }

    // Checking if the user is admin
    window.location.replace(originalUrl);
}
    