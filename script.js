var currentTab = 0;
var logregadv = 0;
showTab(currentTab);
showTab(logregadv);

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
        document.getElementById("continueBtn").innerHTML = "Continuar";
    }

    switch(n){
        case 0:
            document.getElementById("regclisubtitle").innerHTML = "Informações Pessoais";
            break;
        case 1:
            document.getElementById("regclisubtitle").innerHTML = "Informações Gerais";
            break;
        case 2:
            document.getElementById("regclisubtitle").innerHTML = "Informações de Endereço";
            break;
    }
}

function nextPrev(n) {  
    var x = document.getElementsByClassName("changestep");
    if (n == 1 && !validateForm()) 
        return false;

    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        document.getElementById("formclireg").submit();
        return false;
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
