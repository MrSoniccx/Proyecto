

class Node {
  constructor(value)
  { 
    this.value = value
    this.left = null
    this.right = null
  }

 
}

class Stack {
  constructor(){
      this.data = [];
      this.top = 0;
  }
  
  push(element) {
    this.data[this.top] = element;
    this.top = this.top + 1;
  }
 length() {
    return this.top;
 }
 peek() {
    return this.data[this.top-1];
 }
 isEmpty() {
   return this.top === 0;
 }
 pop() {
  if( this.isEmpty() === false ) {
     this.top = this.top -1;
     return this.data.pop(); // removes the last element
   }
 }
 print() {
    var top = this.top - 1; // because top points to index where new    element to be inserted
    while(top >= 0) { // print upto 0th index
        console.log(this.data[top]);
         top--;
     }
  }
  reverse() {
     this._reverse(this.top - 1 );
  }
  _reverse(index) {
     if(index != 0) {
        this._reverse(index-1);
     }
     console.log(this.data[index]);
  }
}


function infixToPostfix(infix){
    const presedences = ["-", "+", "*", "/"];
    
	var opsStack = [],
    	postfix = [];
    
    for(let token of infix){
    	// Step 1
    	if("number" === typeof token){
        	postfix.push(token); continue;
        }
        let topOfStack = opsStack[opsStack.length - 1];
        // Step 2
        if(!opsStack.length || topOfStack == "("){
        	opsStack.push(token); continue;
        }
        // Step 3
        if(token == "("){
	        opsStack.push(token); continue;
        }
        // Step 4
        if(token == ")"){
        	while(opsStack.length){
            	let op = opsStack.pop();
                if(op == "(")	break;
                postfix.push(op);
            }
            continue;
        }
        // Step 5
		let prevPresedence = presedences.indexOf(topOfStack),
        	currPresedence = presedences.indexOf(token);
        while(currPresedence < prevPresedence){
            let op = opsStack.pop();
            postfix.push(op);
            prevPresedence = presedences.indexOf(opsStack[opsStack.length - 1]);
        }
        opsStack.push(token);
	}
    // Step 6
    while(opsStack.length){
        let op = opsStack.pop();
        if(op == "(")	break;
        postfix.push(op);
    }
    
    return postfix;
}

function tokenize(exp){
	return exp
    	.replace(/\s/g, "")
        .split("")
        .map((token, i) => /^\d$/.test(token) ? +token : token);
}

function log(obj){
	document.querySelector("pre").textContent += JSON.stringify(obj) + "\n";
}

 
class ExpressionTree {
 
    // A utility function to check if 'c'
    // is an operator
 
     isOperator(c) {
        if (c == '+' || c == '-'
                || c == '*' || c == '/'
                || c == '^') {
            return true;
        }
        return false;
    }
 
    // Utility function to do inorder traversal
    inorder(t) {
        if (t != null) {
            this.inorder(t.left);
            console.log(t.value);
            this.inorder(t.right);
        }
    }

    preorder(t) {
      if (t != null) {
          
          console.log(t.value);
          this.preorder(t.left);
          this.preorder(t.right);
      }

    }
    
    postorder(t) {
      if (t != null) {
          this.postorder(t.left);
          this.postorder(t.right);
          console.log(t.value);
      }

      
    
  }
 

    constructTree(postfix) {
        let st = new Stack();
        let t, t1, t2
        // Traverse through every character of
        // input expression
        for (let i = 0; i < postfix.length; i++) {
 
            // If operand, simply push into stack
            if (!this.isOperator(postfix[i])) {
                t = new Node(postfix[i]);
                st.push(t);
            } else // operator
            {
                t = new Node(postfix[i]);
 
                // Pop two top nodes
                // Store top
                t1 = st.pop();      // Remove top
                t2 = st.pop();
 
                //  make them children
                t.right = t1;
                t.left = t2;
 
                // System.out.println(t1 + "" + t2);
                // Add this subexpression to stack
                st.push(t);
            }
        }
 
        //  only element will be root of expression
        // tree
        t = st.peek();
        st.pop();
 
        return t;
    }
  }






 
        let et = new ExpressionTree();

        let Expression = "1+2"
        let charArray = (infixToPostfix(tokenize(Expression)));
        let root = et.constructTree(charArray);
        console.log("Recorrido en Preorden");
        et.preorder(root);
        console.log("Recorrido en Postorden");
        et.postorder(root);
        console.log("Y el resultado es:")
        console.log(eval(Expression))
 


