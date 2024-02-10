const balance = Document.getElementById('balance');
const money_plus= Document.getElementById('money_plus');
const money_minus = Document.getElementById('money_minus');
const list = Document.getElementById('list');
const form = Document.getElementById('form');
const text = Document.getElementById('text');
const amount = Document.getElementById('amount');
const incomeText = Document.getElementById('incomeText');
const expenseText = Document.getElementById('expenseText');

const localStorageTransactions = Json.prase(
    localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('tranasactions') !== null?localStorageTransactions :

function addTransacation(e){
    e.preventDeafult();

    if (incomeText.value.trim() !== " "){
        const incomeTransaction = {
            id :genratedId(),
            text: 'Income',
            amount: +incomeText.value
        };
        transactions.push(incomeTransaction);
        addTransacationDOM(incomeTransaction);


    }

    if (expenseText.value.trim() !== " "){
        const expenseTransaction = {
            id :genratedId(),
            text: 'Expense',
            amount: +incomeText.value
        };
        transactions.push(expenseTransaction);
        addTransacationDOM(expenseTransaction);
    }

        updateValues();
        updateLocalStorage();

        incomeText.value = "";
        expenseText.value = "";
        document.getElementById('text').value = '';
    
}

function genratedId(){
    return Math.floor(Math.randam() * 100000000);
}

function addTransacationDOM(transaction){
    const sign = transaction.amount < 0 ? '-':'+';

    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML=`
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class = 'delete-btn' onclick = "removeTransaction(${transaction.id})"> x </button>
    `;
    list.appendChild(item);
}
function updateValues(){
    const amounts = transactions.map(transactions => transaction.amount);

    const total = amount.reduce((acc,item) => (acc+=item),0).toFixed(2);

    const income = amounts 
    .filter(item => item > 0)
    .reduce((acc, item) => (acc+= item),0)
    .toFixed(2);

    balance.innerText = '$${total}';
    money_plus.innerText = '$${income}';
    money_minus.innerText = '$${expense}'

    function removeTransaction(id){
        transactions = transactions.filter(transaction => transaction.id !==id);

        updateLocalStorage();
        init();
    }
}


function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

function init(){
    list.innerHTML = '';

    transactions.forEach(addTransacationDOM);
    updateValues;
}


init();

document.addEventListener('DOMContentLoaded', function(){
    form.addEventListener('submit',function(e){
        e.preventDefault();

        addTransacation();

        incomeText.value= '';
        expenseText.value= '';

    });
});

form.addEventListener('submit', addTransacation);