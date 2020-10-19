const f = (x: number): Promise<number | void> => {
    return new Promise<number | void>((resolve, reject) => {
        (x === 0) ? reject(x) : resolve(1 / x);
    })
        .then((ans) => ans)
        .catch((error) => console.log("not allowed divide by " + error));
}
//in the task you ask to console.log the error... I could return a string instead

const g = (x: number): Promise<number> => {
    return new Promise<number>((resolve) => {
        resolve(x * x);
    })
        .then((ans) => ans);
}

const h = (x: number): Promise<number | void> => { //f(g(x))
    return g(x).then((gx) => f(gx));
}


function slower(p0: Promise<any>, p1: Promise<any>): Promise<any[]> {
    let isSlower = false;
    return new Promise<any[]>((resolve) => {
        p0.then((ans) => isSlower ? resolve([0, ans]) : isSlower = true)
            .catch((error) => console.log("first Promise not succeed " + error));
        p1.then((ans) => isSlower ? resolve([1, ans]) : isSlower = true)
            .catch((error) => console.log("second Promise not succeed " + error));
    })
}

//for your testing
// const promise1 = new Promise(function(resolve,reject){setTimeout(resolve,500,'one');});
// const promise2 = new Promise(function(resolve,reject){setTimeout(resolve,600,'two');});
// slower(promise1, promise2).then(function(val){console.log(val);});