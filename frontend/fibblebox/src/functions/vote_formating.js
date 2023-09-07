const formatVote = (votes)=>{
    if(Number.isInteger(votes)){
        if(votes <= 9999){
            return votes
        }
        else if(votes >= 10000 && votes < 999999){
            const result = votes/1000;
            return result.toFixed(1)+"K"
        }
        else if(votes >= 1000000){
            const result = votes/1000000;
            return result.toFixed(1)+'M'
        }
    }
}

export default formatVote