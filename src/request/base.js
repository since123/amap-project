// let url1 = "http://localhost:8080";
let url1 = location.origin;

let url2 = "";
let baseUrl = {
  baseUrl1: url1,
  baseUrl2: url2,
};

console.log("baseUrl", baseUrl.baseUrl1);
export default baseUrl;
