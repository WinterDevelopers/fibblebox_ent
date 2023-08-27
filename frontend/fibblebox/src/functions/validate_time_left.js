

const ifTimeRemaining =(time,func1,func2)=>{
    const now = new Date().getTime();
    const time_left = time - now;
    
    if(time_left > 0){
       func1()
    }
    else{
        func2()
    }
}

export default ifTimeRemaining