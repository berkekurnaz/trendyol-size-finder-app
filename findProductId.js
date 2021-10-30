exports.findId = function (link) {

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    let productLink = link;
    let productId = 0;
    let parsedLink = productLink.split("-");
    parsedLink.forEach(element => {
        if (numbers.some(el => element.includes(el))) {
            if (element.includes("?")) {
                productId = element.split("?")[0];
            } else {
                productId = element;
            }
        }
    });

    return productId;
}