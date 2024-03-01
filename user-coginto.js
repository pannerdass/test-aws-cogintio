import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import jwtDecode from "jwt-decode";

const awsConfig = {
  UserPoolId: "ap-south-1_ZKEVAeF5c", // Your user pool id here
  ClientId: "2kh2pgt2qcmp87bo7km03v5akp", // Your client id here
};
const userPool = new CognitoUserPool(awsConfig);

export function signUp(email, password, userAttribute) {
  //  userPool.signUp("asdasd", "Pass@1234!");
  var attributeList = [];
  var dataName = {
    Name: "name",
    Value: "TestUser",
  };
  var attributeName = new CognitoUserAttribute(dataName);
  attributeList.push(attributeName);

  userPool.signUp(email, password, attributeList, null, function (err, result) {
    if (err) {
      debugger;
      console.log(err.message || JSON.stringify(err));

      return;
    }
    var cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
  });
}

export function emailVerification(email, code) {
  var userData = {
    Username: email,
    Pool: userPool,
  };
  var cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log("call result: " + result);
  });
}

export function getRandomValues() {
  const array = new Uint32Array(10);
  // return crypto.get
}

export function signIn(userName, passWord) {
  var userData = {
    Username: userName,
    Pool: userPool,
  };
  var cognitoUser = new CognitoUser(userData);
  // cognitoUser.getAttributeVerificationCode();
  var authenticationData = {
    Username: userName,
    Password: passWord,
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise(function (resolve, reject) {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        var id_Token = result.getIdToken();
        resolve(id_Token);
        //      console.log(decodeJWTToken(accessToken));
      },
      onFailure: function (error) {
        debugger;
        reject(error.message);
      },
    });
  });
}
function decodeJWTToken(token) {
  const { email, exp, auth_time, token_use, sub } = jwtDecode(token);
  return { token, email, exp, uid: sub, auth_time, token_use };
}
//getUserPool();

//console.log("its 💪 worked");
