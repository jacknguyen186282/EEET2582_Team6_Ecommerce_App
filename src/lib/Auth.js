export const authDomain = "https://nguyenlong-testing.auth.ap-southeast-1.amazoncognito.com";
export const clientId = "4mpuhie909kgds8i0pcie8kaif";
export const redirectEncodedUrl = encodeURIComponent("http://localhost:3000/?action=auth&originUrl=http://localhost:3000");
export const redirectUrl = "http://localhost:3000/?action=auth&originUrl=http://localhost:3000"
export const logoutUrl = "http://localhost:3000/"
export const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
export const responseType = "code";

export async function refreshToken() {
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
    console.log(body);
    localStorage.setItem("access_token", body.access_token);
    localStorage.setItem("id_token", body.id_token);
}

export async function getUserInfo() {
    const accessToken = localStorage.getItem("access_token");
    
    const response = await fetch(`${authDomain}/oauth2/userInfo` , {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const body = await response.json();
    console.log(body);
}