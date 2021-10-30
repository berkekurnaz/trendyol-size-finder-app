exports.findUserPerfectSize = function(user_weight, user_height, result){

    result.sort((a,b) => b.estimatedHeight - a.estimatedHeight);
    result = result.filter(x => parseInt(x.estimatedHeight) <= (user_height + 5) && x.estimatedHeight >= (user_height - 5))
    result = result.filter(x => parseInt(x.estimatedWeight) <= (user_weight + 5) && x.estimatedWeight >= (user_weight - 5))
    result.sort((a,b) => Math.abs(user_height) - b.estimatedHeight);

    if(result.length == 0){
        return "";
    }else{
        return result[0].estimatedSize;
    }
}