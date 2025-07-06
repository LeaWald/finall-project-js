const AllBasket = document.getElementById('AllBag');
const empty = document.getElementById('empty');
const circle = document.getElementById('circle');
let sumPay = parseInt(document.getElementById('sumPay').innerHTML);
const currentUser = sessionStorage.getItem('currentUser');
const currentUserObg = JSON.parse(currentUser);
const id = currentUserObg.password;
const Users = localStorage.getItem('users');
const UsersArr = JSON.parse(Users);


circle.innerHTML = sessionStorage.getItem('circle');

const hello = sessionStorage.getItem('currentUser');
const helloObg = JSON.parse(hello);
document.getElementById('Name_user').innerHTML = helloObg.userName;

const setProduct = (ArrBasket) => {
    if (ArrBasket.length === 0) {
        AllBasket.innerHTML = '';
        empty.innerHTML = "הסל שלך ריק :("
        document.getElementById('sumPay').innerHTML = 0;
    }
    else {
        AllBasket.innerHTML = '';
    }
    ArrBasket.forEach((p) => {
        const { code, img, name, price, quantity, size } = p;
        const div = document.createElement('div');
        div.id = "datailProduct";
        div.classList.add('Product_img')
        div.innerHTML = `<img src="${img}"> `;
        const divText = document.createElement('div');
        divText.id = "datailText"
        divText.innerHTML = ` שם מוצר:  ${name} <br><br> מחיר: ${price} ש"ח  <br><br> כמות: ${quantity} <br><br> מידה: ${size}`;
        div.append(divText);
        const removeAndupdate = document.createElement('div');
        removeAndupdate.id = 'removeAndupdate';
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = `<img src="./pictures/icon/delete.png">`;
        removeBtn.id = "BtnBasket";
        removeAndupdate.append(removeBtn);
        const updateBtn = document.createElement('button');
        updateBtn.innerHTML = `<img src="./pictures/icon/update.gif">`;
        updateBtn.id = "updateBtn"
        removeAndupdate.append(updateBtn);
        div.append(removeAndupdate);
        AllBasket.append(div);

        removeBtn.onclick = () => {
            remove(size,code, ArrBasket);
        };
        updateBtn.onclick = () => {
            remove(size,code, ArrBasket);
            location.href = `./DetailProduct.html?productCode=${code}`;
        }

    });

    const currentUserObg = JSON.parse(currentUser);
    const id = currentUserObg.password;
    const Users = localStorage.getItem('users');
    const UsersArr = JSON.parse(Users);
    UsersArr.forEach((e) => {
        sumPay = 0;
        if (e.password === id) {
            e.basket.forEach(element => {
                sumPay += element.price;
                document.getElementById('sumPay').innerHTML = sumPay;
                localStorage.setItem('users', JSON.stringify(UsersArr));
            });
        }
    });

};
UsersArr.forEach((e) => {
    if (e.password === id) {
        setProduct(e.basket);
    }
});

const btnPay = document.getElementById('btnPay');
const payment_form = document.getElementById('payment-form');
const gif = document.getElementById('gif');
const formX = document.getElementById('formX');

btnPay.onclick = () => {
    payment_form.style.display = 'block';
}

payment_form.addEventListener('submit', function (event) {
    event.preventDefault();
    gif.style.display = 'block';
    event.target.reset();
    sessionStorage.setItem('circle','0');
    circle.innerHTML = sessionStorage.getItem('circle');
    UsersArr.forEach((e) => {
        if (e.password === id) {
            e.basket = [];
            localStorage.setItem('users', JSON.stringify(UsersArr));
            setProduct (e.basket);
        }
    });

});

formX.onclick = () => {
    payment_form.style.display = 'none';
    gif.style.display = 'none';
}



const remove = (size,code, ArrBasket) => {
    if (ArrBasket.length === 0) {
        document.getElementById('sumPay').innerHTML = 0;
    }
    else {
        ArrBasket.forEach(element => {
            if (element.code === code && element.size == size) {
                sumPay -= element.price;
                circle.innerHTML -= element.quantity;
                let circleQun = parseInt(sessionStorage.getItem('circle'));
                circleQun -= element.quantity;
                sessionStorage.setItem('circle', JSON.stringify(circleQun))
                document.getElementById('sumPay').innerHTML = sumPay;
            }
        });
    }
    const index = ArrBasket.findIndex(item => item.code === code);
    ArrBasket.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(UsersArr));
    UsersArr.forEach((element) => {
        if (element.password === id)
            element.basket = ArrBasket;
    });

    const addressMail = document.getElementById('get');
    addressMail.onclick = () => {
        alert('הקטלוג נשלח אליכם!!');
    }
    setProduct(ArrBasket);
}
