class Bank{
    validateAccountNumber(account_number){
        return account_number in localStorage?true:false
    }


    accountCreate(){
        let account_number=bk_acno.value;
        let email=bk_email.value;
        let phone=bk_phone.value;
        let password=bk_pwd.value;
        let balance=2000;
        let account={
            account_number,
            email,
            phone,
            balance,
            password
        }
        if(this.validateAccountNumber(account_number)){
            alert("Already Exist")
        }
        else{

            localStorage.setItem(account_number,JSON.stringify(account))
            alert("Account Created")


        }


    }



    authenticate(acno,password){
        if(this.validateAccountNumber(acno)){
       let user=JSON.parse(localStorage.getItem(acno))
        if(user.password==password){
        return 1;//login success
   }
else{
    return 0;// 
}
        }
        else{
            return -1;// invalid account number
        }
    }

    login(){
        let username=bk_username.value;
        let password=bk_password.value;
        let user=this.authenticate(username,password)
        console.log(user);
        if(user==1){
           
            sessionStorage.setItem("user",username)
            alert("Access Granted")
            window.location.href="./userhome.html"
        }
        else{
            alert("Access Denied")
        }
    }



   logout(){
       if("user"in sessionStorage){
           sessionStorage.removeItem("user")
           window.location.href="./login.html"
       }
       else{
           alert("Invalid session u must login first")
       }
    }



getUser(){
    let user=sessionStorage.getItem("user")
    let div=document.createElement("div");
    div.innerHTML=`Welcome <p> ${user}   </p>`
    document.querySelector("body").append(div)
}
getUserDataFromLocalStorage(acno){
    return JSON.parse(localStorage.getItem(acno))
}




balanceEnquiry(){
let loggeduser=sessionStorage.getItem("user")
let loggeduserdata=this.getUserDataFromLocalStorage(loggeduser)
let bal=loggeduserdata.balance;
return bal
}



fundTransfer(){
    let payee_acno=sessionStorage.getItem("user")
    let to_acno=bk_toacno.value;
    let confirm_toacno=bk_ctoacno.value;
    let amount=Number(bk_amt.value);
    if(to_acno==confirm_toacno){
        if(this.validateAccountNumber(to_acno)){
         let aval_bal=this.balanceEnquiry()
         if(amount>aval_bal){
             alert("Insufficient balance")
         }
         else{
             // fetch payee account details from local storage
                 let payee=this.getUserDataFromLocalStorage(payee_acno)
                 // fetch to account details from local storage

                 let to_account=this.getUserDataFromLocalStorage(to_acno)

                 let bal=aval_bal-amount
                 payee.balance=bal
                 localStorage.setItem(payee_acno,JSON.stringify(payee))
                 let to_cur_bal=Number(to_account.balance)
                 to_cur_bal+=amount
                 to_account.balance=to_cur_bal
                 localStorage.setItem(to_acno,JSON.stringify(to_account))


         }
        }
        else{
            alert("Invalid to_account number")
        }
    }
    else{
        alert("account number mismatch")
    }
}

}
var bank=new Bank();
