const form = document.querySelector('form');
const error = document.getElementById('error');
const circle = document.getElementById('circle');



if (!sessionStorage.getItem('circle'))
    sessionStorage.setItem('circle', circle.innerHTML);

circle.innerHTML = sessionStorage.getItem('circle');

let users = []

if (localStorage.getItem('users'))
    users = JSON.parse(localStorage.getItem('users'));

console.log(users);

form.onsubmit = (e) => {
    e.preventDefault();
    location.href = './home.html';
    sessionStorage.setItem('exist', true);
    const currentUser = {
        userName: e.target['userName'].value,
        password: e.target['password'].value,
        basket: []
    };

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));

    const check = localStorage.getItem('users');
    const checkArr = JSON.parse(check);

    if (isEquals(checkArr, currentUser)) {
        closePopUp();
    }
    else {
        if (isEqualsId(checkArr, currentUser)) {
            error.innerHTML = 'הסיסמה בשימוש הכנס סיסמה חדשה';
        }
        else {
            users.push(currentUser);
            localStorage.setItem('users', JSON.stringify(users))
            closePopUp();
        }
    }
    function isEquals(checkArr, currentUser) {
        for (let i = 0; i < checkArr.length; i++) {
            if (checkArr[i].userName === currentUser.userName && checkArr[i].password === currentUser.password)
                return true;
        }
        return false;
    }

    function isEqualsId(checkArr, currentUser) {
        for (let i = 0; i < checkArr.length; i++) {
            if (checkArr[i].password === currentUser.password)
                return true;
        }
        return false;
    }
    if (sessionStorage.getItem('currentUser')) {
        const hello = sessionStorage.getItem('currentUser');
        const helloObg = JSON.parse(hello);
        document.getElementById('Name_user').innerHTML = helloObg.userName;

        const currentUser = sessionStorage.getItem('currentUser');
        const currentUserObg = JSON.parse(currentUser);
        const id = currentUserObg.password;
        const Users = localStorage.getItem('users');
        const UsersArr = JSON.parse(Users);

        UsersArr.forEach((e) => {
            if (e.password === id) {
                let amount = 0;
                e.basket.forEach(element => {
                    amount += element.quantity;
                });
                sessionStorage.setItem('circle', JSON.stringify(amount));
            }
        });
    }
};
if (sessionStorage.getItem('currentUser')) {
    const hello = sessionStorage.getItem('currentUser');
    const helloObg = JSON.parse(hello);
    document.getElementById('Name_user').innerHTML = helloObg.userName;
    circle.innerHTML = sessionStorage.getItem('circle');
}

function shoePopup() {
    const popshown = sessionStorage.getItem('exist');
    if (!popshown) {
        document.getElementById('popUp').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
};
function closePopUp() {
    document.getElementById('popUp').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
setTimeout(shoePopup, 2000);

const connectForm = document.getElementById('sent');
connectForm.onclick = () => {
    alert('הנתונים נשמרו בהצלחה, ונשוב אליכם בהקדם!!');
};

const addressMail = document.getElementById('get');
addressMail.onclick = () => {
    alert('הקטלוג נשלח אליכם!!');
}
