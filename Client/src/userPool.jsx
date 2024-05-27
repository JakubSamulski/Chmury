import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_bLezccPLi',
    ClientId: '4emetb25s327uiqu9ip07jqeme'
}

export default new CognitoUserPool(poolData);