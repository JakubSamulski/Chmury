const {response} = require("express");
const {post} = require("axios");



const jwkToPem = require('jwk-to-pem');


const jsonwebtoken = require('jsonwebtoken');
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
    const header = decodeTokenHeader(token);  // {"kid":"XYZAAAAAAAAAAAAAAA/1A2B3CZ5x6y7MA56Cy+6abc=", "alg": "RS256"}
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);
    return verifyJsonWebTokenSignature(token, jsonWebKey);
}


async function postData(url, data, headers) {
    try {
        const response = await post(url, data, { headers: headers });
        console.log("OKAJ");
        return response.data;
    } catch (error) {
        console.log("ERROR");
        // Optional: re-throw the error to handle it further up the call stack
    }
}
async function  exchange_code(code) {
    const url =
        "https://tictactoekuba.auth.us-east-1.amazoncognito.com/oauth2/token";
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    };
    const data = {
        grant_type: "authorization_code",
        client_id: client_id,
        code: code,
        redirect_uri: "http://localhost:5173/login",
    };
    try {
        return await postData(url, data, headers);
    } catch (error) {

    }

}


module.exports = { exchange_code,validateToken };
