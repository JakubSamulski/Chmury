const {post} = require("axios");


const jwkToPem = require('jwk-to-pem');


const jsonwebtoken = require('jsonwebtoken');
const fetch = require("sync-fetch");
const jsonWebKeys = [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "0UXWILHSENhRssE8z8J5HQYE8Mll4O1L357bjQYKK6g=",
      "kty": "RSA",
      "n": "vey7qX6f52DZ4doMoMn18an4CkQXa--8EOtD4-WmJSoH2P3Y3x9b3-_dVv_ERe-FaGobYtILu_AB-Cs9ebP5F_VtiMuhMXCyW92DxjVYXkAgN1WLD8dAEMwKSH7LOoiQYV1iPAiNu2omZMdJGcAiaKhY7Zj7gcYwYCdeIPGb_Hz7LWu9SFSNtp5ECurxnZlL87Hg2mXhbS8N6cU0R2CLwagmFBSIbJN-Flduf5CfJ7cEFg0YorOY9sik9F-WQNoHMsIqyiIjgLHLWRljcAyUzKg18lPi5dA8B2MRARREcAOhXn5_aZWHfZyQk8yhJTueWE6DejmPTPP3iHvcgb8swQ",
      "use": "sig"
    }
  ];
function decodeTokenHeader(token) {
  const [headerEncoded] = token.split('.');
  const buff = new Buffer(headerEncoded, 'base64');
  const text = buff.toString('ascii');
  return JSON.parse(text);
}

function getJsonWebKeyWithKID(kid) {
  for (let jwk of jsonWebKeys) {
      if (jwk.kid === kid) {
          return jwk;
      }
  }
  return null
}

function verifyJsonWebTokenSignature(token, jsonWebKey) {
    const pem = jwkToPem(jsonWebKey);
    try {
        jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] });
        return true;
    } catch (err) {
        return false;
    }
}

function validateToken(token) {
    token = token.split(' ')[1];
    const header = decodeTokenHeader(token);
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);
    return verifyJsonWebTokenSignature(token, jsonWebKey);
}


async function postData(url, data, headers) {
    try {
        const response = await post(url, data, { headers: headers });
        console.log("exchanged code")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

 function getIp(){
    const data = fetch('https://api.ipify.org?format=json')
    .json()
     return data.ip;
}


let ip = ""
if(process.env.VITE_DEPLOYMENT_TYPE==="local"){
    ip = "localhost";
}else if(process.env.VITE_DEPLOYMENT_TYPE==="remote"){
    ip = getIp();
}

async function  exchange_code(code) {
    const url =
        "https://tictactoekuba.auth.us-east-1.amazoncognito.com/oauth2/token";
    const client_id = process.env. VITE_CLIENT_ID;
    const client_secret = process.env.VITE_CLIENT_SECRET;
    const port = process.env.VITE_CLIENT_PORT;


    let redirect_uri;
    if(port==="80"){
        redirect_uri = "http://"+ip+"/login";
    }
    else if (port==="443"){
        redirect_uri = "https://"+ip+"/login";
    }
    else
    {
        redirect_uri = "http://"+ip+":"+port+"/login";
    }
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    };
    const data = {
        grant_type: "authorization_code",
        client_id: client_id,
        code: code,
        redirect_uri: redirect_uri,
    };
    try {
        return await postData(url, data, headers);
    } catch (error) {
        return error
    }

}


module.exports = { exchange_code,validateToken };
