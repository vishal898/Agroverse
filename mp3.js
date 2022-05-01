// 1-most
// 2-2nd most
// 3-worst
// 4-previous same
// 5-no problem

const inf = -1000;
// let feild = [];
let feild = [0,4,1,5,2,4,3,2,1,3,2,1,5,2,4,3,2,1,3,2];
let dis = 0;

const  compareFun = (a1,a2) =>
{
    let s1 =  4 * a1.g + 2 * a1.y + 1 * a1.r ;
    let s2 =  4 * a2.g + 2 * a2.y + 1 * a2.r ;

    if (s1 > s2) {
        return a1;
    } else {
        return a2;
    }
}

const make_obj = (m,n,o,a) => {
    let obj = {g:m, y:m,r:o ,v:a};
    return obj;
}

const solve = (n,reqCnt,reqGap) => {
    if (n <= 0 && reqCnt > 0){
        return make_obj(inf,inf,inf,[]);
    }
    if (n <= 0){
        return make_obj(0,0,0,[]);
    }

    if (reqGap > 0 && feild[n] == 4){
        return make_obj(inf,inf,inf,[]);
    }

    if (reqCnt <= 0 && reqGap > 0){
        return solve(n - 1, reqCnt, reqGap - 1);
    }

    if (reqCnt <= 0){
        return make_obj(0,0,0,[]);
    }
    
    if (feild[n] == 4){
        return solve(n - 1, reqCnt, dis);
    }

    if (reqGap > 0 || feild[n] == 5){
        return solve(n - 1, reqCnt, Math.max(0, reqGap - 1));
    }

    let ans = make_obj(inf,inf,inf,[]);

    if (feild[n] == 3)
    {
        let a1 = solve(n - 1, reqCnt - 1, dis);
        let a2 = solve(n - 1, reqCnt, 0);
        a1.r++;
        a1.v.push(n);
        ans = compareFun(a1, a2);
    }

    if (feild[n] == 2)
    {
        let a1 = solve(n - 1, reqCnt - 1, dis);
        let a2 = solve(n - 1, reqCnt, 0);
        a1.y++;
        a1.v.push(n);
        ans = compareFun(a1, a2);
    }

    if (feild[n] == 1)
    {
        let a1 = solve(n - 1, reqCnt - 1, dis);
        let a2 = solve(n - 1, reqCnt, 0);
        a1.g++;
        a1.v.push(n);
        ans = compareFun(a1, a2);

    }
    return ans;
}

const  main = () =>{
    let n =19;
    let reqCnt = 3;
    dis = 1;
    let field = [4,1,5,2,4,3,2,1,3,2];
    // for (let i=0; i<n; i++) feild.push(0);
    console.log(...feild);
    
    let finalAns = solve(n, reqCnt, 0);
    
    console.log(finalAns);
    if (finalAns.g < 0 || finalAns.y < 0 || finalAns.r< 0)
        return 0;
        
    console.log(...finalAns.v);
    return 0;
}

main();