declare const CryptoJS: any;

export const publicKey = 'e34409617668f5c83119a972696fc299';
const privateKey = 'af0862f2f2990fbe576eb4a89469980bb5165159';
export const ts = Date.now().toString();

export const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

console.log("Hash:", hash);
console.log("URL:", url);

