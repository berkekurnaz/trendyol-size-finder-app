exports.findSizes = function (data) {

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    
    let allComments = data.reviews.content;
    let numberComments = [];

    let result = [];

    // 1- bu adimda icerisinde sayi olan ve icinde beden yazan yorumlari filtrele
    allComments.forEach(element => {
        if (numbers.some(el => element.comment.includes(el)) && element.comment.includes("beden")) {
            numberComments.push(element);
        }
    });

    // 2- bu adımda boy ve kilo degeri gecen yorumlari filtrele
    numberComments.forEach(element => {
        let currentElement = element.comment.split(" ");
        let findNumericValues = [];

        currentElement.forEach(value => {
            if (numbers.some(el => value.includes(el)) && value > 10) {
                findNumericValues.push(value);
            }
        });
        element.numericValues = findNumericValues;

        // 3 - buyuk olan degeri boy, kucugu kilo olarak ayarladim. genelde dogrudur ama bu adimda supheliyim.
        if (element.numericValues.length == 2) {
            var findWeight = 0;
            var findHeight = 0;
            if (parseInt(element.numericValues[0]) >= parseInt(element.numericValues[1])) {
                findHeight = element.numericValues[0];
                findWeight = element.numericValues[1];
            } else {
                findWeight = element.numericValues[0];
                findHeight = element.numericValues[1];
            }
            element.estimatedWeight = findWeight;
            element.estimatedHeight = findHeight;
        }

        // 4 - simdi bedeni bulma zamani
        let sizes = ["s", "m", "l", "xl", "xxl", "xs", "S", "M", "L", "XL", "XXL", "XS"];
        if (element.estimatedHeight !== undefined) {
            currentElement.forEach(value => {
                sizes.forEach(sizeValue => {
                    if (sizeValue === value) {
                        element.estimatedSize = sizeValue;
                    }
                });
            });
        }

    });

    numberComments.forEach(element => {
        element.comments = [];
    });

    numberComments.forEach(element => {
        if (element.estimatedSize !== undefined) {
            let comment = element.estimatedHeight + " boyundaki ve " + element.estimatedWeight + " kilosundaki kullanıcı " + element.estimatedSize + " almış.";
            element.comments.push(comment);
            result.push(element);
        }
    });

    return result;
}