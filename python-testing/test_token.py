import base64

import requests

# Define the URL
url = "https://tictactoekuba.auth.us-east-1.amazoncognito.com/oauth2/token"

client_id = "12gmsopd070ifi6qhtto3u4arp"
client_secret = "eelenruoukvui9322gi8bci11ii9j9up1sdgorsd1nohnuio8pj"
authorization_code = "63b4bd37-ab15-4eb0-8e65-307813cbb725"
# Define the headers
headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + base64.b64encode(b'12gmsopd070ifi6qhtto3u4arp:eelenruoukvui9322gi8bci11ii9j9up1sdgorsd1nohnuio8pj').decode('utf-8')
}

data = {
    'grant_type': 'authorization_code',
    'client_id': client_id,
    'code': authorization_code,
    'redirect_uri': 'http://localhost:80/login'
}

# Make the POST request
response = requests.post(url, headers=headers, data=data)

# Print the response
print(response.status_code)
print(response.json()['id_token'])