import {
  emailVerification,
  getRandomValues,
  signIn,
  signUp,
} from "./user-coginto.js";

//const result = await signIn("pannerdash@lookman.in", "Pass@1234!");
const result = await signUp("pannerdash@lookman.in", "Pass@1234!");
console.log("its worked💪..");
console.log(result);
//console.log(emailVerification("pannerdash@lookman.in", "299341"));
//console.log(getRandomValues());
