var currentTab = 0;
var loginRegister = 0;

var continuBtn = document.getElementById("continueBtn");
var previousBtn = document.getElementById("prevBtn");
var modal = document.getElementById("modalregcli");
var btnUpForm = document.getElementById("dhdem");
var ancLogReg = document.getElementById("logreganchor");
var loginForm = document.getElementById("loginform");

var myAccBtn = document.getElementById("myaccbtn");
var dpDownLogin = document.getElementById("dpdownlogin");
var btnLoginDpDown = document.getElementById("btnddlogin");
var btnRegisterDpDown = document.getElementById("btnddregister");

const registerAdvForm = document.getElementById("form-adv");
const registerCliForm = document.getElementById("form-cli");


function showTab(n) {
    var x = document.getElementsByClassName("changestep");
    x[n].style.display = "block";
    if (n == 0){
        document.getElementById("prevBtn").style.display = "none";
    }
    else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (x.length - 1)){
        document.getElementById("continueBtn").value = "Cadastrar";
    }
    else{ 
        document.getElementById("continueBtn").value = "Continuar";
    }

    switch(n){
        case 0:
            document.getElementById("regclisubtitle").innerHTML = "Informações Pessoais";
            document.getElementById("step").innerHTML = "Etapa 1";
            break;
        case 1:
            document.getElementById("regclisubtitle").innerHTML = "Informações Gerais";
            document.getElementById("step").innerHTML = "Etapa 2";
            break;
        case 2:
            document.getElementById("regclisubtitle").innerHTML = "Informações de Endereço";
            document.getElementById("step").innerHTML = "Etapa 3";
            break;
    }
}

function nextPrev(n) {  
    var x = document.getElementsByClassName("changestep");
    if (n == 1 && !validateForm()) 
        return false;

    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    
    if(currentTab>2){
        x[currentTab-1].style.display = "block";
        modal.style.display = "block";
        btnUpForm.addEventListener("click",function(){
            document.getElementById("formclireg").submit();
        });
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("changestep");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
        y[i].className += " invalid";
        valid = false;
        }
    }
    return valid;
}

myAccBtn.addEventListener("click", function() {
    if(dpDownLogin.style.display == "none" || dpDownLogin.style.display == ""){
        dpDownLogin.style.display = "block";
        
    }
    else{
        dpDownLogin.style.display = "none";
    }
    
 });

function changePositions(){
    if(registerCliForm.style.display == "none"){
        registerAdvForm.style.display = "none";
        registerCliForm.style.display = "flex";
    }   
    else{
        registerAdvForm.style.display="flex";
        registerCliForm.style.display="none";
    }
}

window.onload = function(){
    document.getElementById("pdf-input").addEventListener('change',getFileName);
}
const getFileName = (event) => {
    const files = event.target.files;
    const fileName = files[0].name;
    document.getElementById("pdfname").innerText = fileName;
    document.getElementById("pdfname").classList.remove("items-prob");
    document.getElementById("pdfname").classList.add("btndropdown");
    document.getElementById("pdfname").style.border = "2px solid #1a233d";
}
  
