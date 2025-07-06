
const hello = sessionStorage.getItem('currentUser');
const helloObg = JSON.parse(hello);
const showhelloObg = document.getElementById('Name_user').innerHTML = helloObg.userName;
const searchParams = new URLSearchParams(location.search);
const productCode = parseInt(searchParams.get('productCode'));
const circle = document.getElementById('circle');
let circleA = parseInt(sessionStorage.getItem('circle'));
circle.innerHTML = circleA;

$.ajax({
    url: './Date/shoes.json',
    success: (data) => {
        const currentProduct = data.shoes.find(pr => pr.code === productCode);
        document.title = `Panda - ${currentProduct.name}`;
        document.getElementById('name').innerHTML = currentProduct.name;
        document.getElementById('price').innerHTML += currentProduct.price + ` ש"ח `;
        const size = document.getElementById('choose_size');
        const option = document.querySelector('option');
        size.innerText = currentProduct.from_Size;
        for (let i = currentProduct.from_Size; i <= currentProduct.until_Size; i++) {
            const element = document.createElement('option');
            element.innerHTML = i;
            element.value = i;
            size.append(element);
        };
        const bthAddBag = document.getElementById('addBag');
        const qua = document.getElementById('quaNumber');

        document.getElementById('addBag').addEventListener('click', () => {
            const notification = document.getElementById('notification');
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        });


        document.getElementById('img').src = `./pictures/${currentProduct.img}`;
        bthAddBag.onclick = () => {

            const product = {
                "code": currentProduct.code,
                "name": currentProduct.name,
                "img": `./pictures/${currentProduct.img}`,
                "size": parseInt(size.value),
                "quantity": qua.valueAsNumber,
                "price": qua.valueAsNumber * currentProduct.price
            }
            const currentUser = sessionStorage.getItem('currentUser');
            const currentUserObg = JSON.parse(currentUser);
            const id = currentUserObg.password;
            const Users = localStorage.getItem('users');
            const UsersArr = JSON.parse(Users);
            UsersArr.forEach((e) => {
                let flag = true;
                if (e.password === id) {
                    e.basket.forEach((element) => {
                        if (element.size == parseInt(size.value) && element.code === currentProduct.code) {
                            element.quantity += qua.valueAsNumber;
                            element.price = currentProduct.price * element.quantity;
                            let circleA = parseInt(sessionStorage.getItem('circle'));
                            circleA += qua.valueAsNumber;
                            circle.innerHTML = circleA;
                            sessionStorage.setItem('circle', circleA);
                            flag = false;
                        }

                    });
                    if (flag) {
                        e.basket.push(product);
                        let circleA = parseInt(sessionStorage.getItem('circle'));
                        circleA += qua.valueAsNumber;
                        circle.innerHTML = circleA;
                        sessionStorage.setItem('circle', circleA);
                    }
                }
            });
            localStorage.setItem('users', JSON.stringify(UsersArr));
        }

    }
});
