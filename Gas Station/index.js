var A = [1,1,1,2,2];
var B = [1,1,2,1,2];

//check if the sum of A is not less than sum of B
var sumA=0, sumB=0;

//get value of sumA
for (i = 0; i < A.length; i++){
    sumA += A[i];
}
//get value of sumB
for (i = 0; i < B.length; i++) {
    sumB += B[i];
}
console.log("SUM:",sumA,sumB);
if (sumB > sumA) {
    console.log('-1');
    var ele = document.createElement('h1');
    ele.innerHTML = "Not possible: -1";
    document.body.appendChild(ele);
} else {
    console.log(A,B);
    
    //outside loop iterating through A
    for (i = 0; i < A.length; i++) {
        console.log("ITERATION:",i)
            var gas = 0;
            var gasNeeded = 0;
            var overflow;
            var up;
            var stopLoop;
            var method;
            //try increment up
            for(j=0;j < B.length;j++) {
                //if index reaches outside of loop length
                if (A[i+j] == undefined){
                    overflow = i+j - (A.length);
                    gas += A[overflow];
                } else {
                   gas += A[i+j]; 
                }
                //if index reaches outside of loop length
                if (B[(i+j)+1] == undefined) {
                    overflow = (i+j)+1 - (B.length);
                    gasNeeded += B[overflow];
                } else {
                    gasNeeded += B[(i+j)+1];
                }
                
                if (j == B.length-1) {
                    console.log("end - increment up possible", i);
                    method = "Incrementing up from index ";
                    stopLoop = true;
                    up = true;
                }
                if (gasNeeded > gas) {
                    console.log("increment up not possible");
                    up = false;
                    break;
                }
            }
            // else try increment down
            if (up == false) {
                //reset variables
                gas = 0;
                gasNeeded = 0;
                
                for (j=0;j < B.length;j++){
                    //if index reaches outside of loop length
                    if (A[i-j] == undefined){
                    overflow = (i-j) + (A.length);
                    gas += A[overflow];
                    } else {
                       gas += A[i-j]; 
                    }
                    //if index reaches outside of loop length
                    if (B[(i-j)-1] == undefined) {
                        overflow = (i-j)-1 + (B.length);
                        gasNeeded += B[overflow];
                    } else {
                        gasNeeded += B[(i-j)-1];
                    }

                    if (j == B.length-1) {
                        console.log("end - increment down possible", i);
                        method = "Incrementing down from index ";
                        stopLoop = true;
                    }
                    if (gasNeeded > gas) {
                        console.log("increment down not possible");
                        var up = false;
                        break;
                    }
                }
                
            }
        console.log(i);
        //attach message to DOM is found a correct iteration
        if (stopLoop) {
            var ele = document.createElement('h1');
            ele.innerHTML = `Minimum index: ${i}`;
            var ele2 = document.createElement('p');
            ele2.innerHTML = method + i;
            document.body.appendChild(ele);
            document.body.appendChild(ele2);
            break;
        }
    }
}