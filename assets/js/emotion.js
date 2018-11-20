//emotions returned:
//anger, fear, joy, sadness, surprise

function getEmotion(inputStr) {
    queryURL = "https://apiv2.indico.io/emotion";
    $.post(
        queryURL,
        JSON.stringify({
            api_key: "c5c34def9818712f9e2e69d42dd85f63",
            data: inputStr,
            //only return values more than 0.1
            threshold: 0.1
        })
    ).then(function (response) {
        console.log(response.results);
        let obj = response.results;
        //return the name of the key with the highest value
        let x = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
        console.log(x);
    });
}
