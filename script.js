// variáveis globais
let userName = {name: prompt('Bem vindo! Qual o seu nome?')};

let messages = [];
let newMessage = {};

// let userName = document.getElementById("textinput").value;
// let sidebar = document.querySelector('.sidebar');
// let contacts = document.querySelector('.contacts');
// let enter = document.querySelector('.home-screen');
//let selectAnother = document.querySelector('.option .selecionado');
//let selectOne = document.querySelector('.contact-name .selecionado');
//


function login() {
    console.log('userName');
    const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName);

    post.then(getMessages); //caso de sucesso, solicita mensagens
    post.catch(error); //caso de erro

    setInterval(userOn, 5000); //mostra ao servidor que o usuário continua online
}

function userOn(){
    const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userName);

    post.then(getMessages); //caso de sucesso, solicita mensagens
    post.catch(error); //caso de erro

}

function getMessages(resposta) { 
    // enter.classList.add('home-off'); //oculta a tela de entrada
    console.log(resposta);


    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages"); //solicita os dados do servidor
    promise.then(rendMessages); //caso de sucesso, renderiza as mensagens
    promise.catch(error); //caso de erro, chama a função de erro
}

getMessages();

function rendMessages(resposta) {
    console.log("Resposta completa do get", resposta);
    messages = resposta.data;
    const historic = document.querySelector(".messagesList");

    historic.innerHTML = "";
    
    for (let i = 0; i < messages.length; i++) { //atualiza e insere as mensagens no historico de mensagens
        historic.innerHTML += `
            <li> <div class="mensagem ${messages[i].type}"> 
            <p><span>(${messages[i].time})</span> 
            <strong>${messages[i].from}</strong>
            para <strong>${messages[i].to}</strong>: ${messages[i].text}</div>          
            </li>
        `}

    const showLastMessages = document.querySelector('historic.lastchild');
    showLastMessages.scrollIntoView();
}

setInterval(rendMessages, 3000); //atualiza o historico de mensagens a cada 3 segundos

function error(err) {
    console.log(err.response);

    if(err.response.status === 400){
        alert('Ops! Esse nome não está disponível! Por favor, digite outro nome.');
        window.location.reload();
    }
    if(err.response.status === 404){
        alert("Ocorreu um erro, tente novamente mais tarde");
        window.location.reload();
    }
}

function postMessages() { //requisição envia um novo dado para o servidor (mensagem)
    newMessage = document.getElementById("new").value;
    
    const addMessage = {
        from: userName,
        to: "Todos",
        text: newMessage,
        type: "message"
    }
    
    const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", addMessage);
    post.then(rendMessages); //caso de sucesso, solicitar historico de mensagens novamente atualizando o chat
    post.catch(window.location.reload()); //caso de erro, atualizar página para o prompt incical do nome
}

/* Funções bônus

function rendContacts() {
    console.log(0);

    for (let i = 0; i < messages.length; i++) { //insere o nome dos usuários na lista de contatos
        contacts.innerHTML += `
            <div onclick="selectContact('${messages[i].from}')" class="${messages[i].from}contact-name" >
                <ion-icon name="person-circle"></ion-icon>
                <h1>${messages[i].from}</h1>
                <img src="./img/check.png" class="check" />
            </div>
        `
    }
}

function showSidebar() {
    sidebar.classList.add('sidebar-on');
    if (selectAnother && selectAnother !== null){ //limpa opções selecionadas anteriormente
        selectOne.classList.remove('selecionado');
        selectAnother.classList.remove('selecionado');
    }
}

function selectContact(classContact) {

    if (selectOne !== null) {
        selectOne.classList.remove('selecionado');
    }

    const selected1 = ('.' + classContact) + ' .check';
    const destination = document.querySelector(selected1);
    console.log(selected1);
    destination.classList.add('selecionado');

    closeSidebar();
}

function selectVisibility(classVisible) {

    if (selectAnother !== null) {
        selectAnother.classList.remove('selecionado');
    }

    const selected2 = ('.' + classVisible) + ' .check';
    const visible = document.querySelector(selected2);
    console.log(selected2);
    visible.classList.add('selecionado');

    closeSidebar();
}

function closeSidebar() {
    const friend = document.querySelector('.contacts .contact-name .selecionado');
    const privacy = document.querySelector('.visibility .option .selecionado');

    if (friend && privacy !== null) {
        sidebar.classList.remove('sidebar-on');
    }
}

*/