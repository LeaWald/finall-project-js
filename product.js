const categorys = document.querySelectorAll('.category');
const allProduct = document.getElementById('allProducts');
const searchPtoduct = document.querySelector('#search_form');
const h1 = document.querySelector('h1');
const circle = document.getElementById('circle');

if (!sessionStorage.getItem('circle'))
    sessionStorage.setItem('circle', circle.innerHTML);
circle.innerHTML = sessionStorage.getItem('circle');

const searchCategory = '';
const store = {
    product: []
}

const hello = sessionStorage.getItem('currentUser');
const helloObg = JSON.parse(hello);
document.getElementById('Name_user').innerHTML = helloObg.userName;


$.ajax({
    url: './Date/shoes.json',
    success: (data) => {
        const { shoes } = data;
        store.product = shoes;
        filter = filterProduct(store.product, '');
        setProduct(filter);
    }
});

searchPtoduct.onsubmit = (e) => {
    e.preventDefault();
    const searchBy = e.target['search'].value;
    const filterNames = filterName(store.product, searchBy);
    if (filterNames.length === 0) {
        h1.innerHTML = `לא נמצאו תוצאות עבור : ${searchBy}`;
    }
    else
        h1.innerHTML = `כל התוצאות עבור: ${searchBy}`;
    setProduct(filterNames);
}

const filterName = (products, searchName) => {
    return products.filter(product => product.name.includes(searchName));
}

categorys.forEach((e) => {
    e.onclick = () => {
        const searchCategory = e.innerHTML;
        document.title = `Panda - ${searchCategory}`;
        h1.innerHTML = `כל התוצאות עבור: ${searchCategory}`;
        if (searchCategory === "כל הנעליים")
            filterCategory = filterProduct(store.product, '');
        else
            filterCategory = filterProduct(store.product, searchCategory);
        setProduct(filterCategory);
    }
});

const filterProduct = (products, searchCategory) => {
    return products.filter(product => product.category.includes(searchCategory));
}

const setProduct = (filter) => {
    allProduct.innerHTML = '';
    filter.forEach((p) => {
        const { code, name, price, category, img, from_Size, until_Size } = p;
        const div = document.createElement('div');
        div.id = "datailProduct";
        div.classList.add('Product_img')
        div.innerHTML = `<a href="./DetailProduct.html?productCode=${code}"><img src="./pictures/${img}"> <br> <br> ${name} <br><br> ${price} ש"ח</a>`;
        allProduct.append(div);
    });
};

const addressMail = document.getElementById('get');
addressMail.onclick = () => {
    alert('הקטלוג נשלח אליכם!!');
}
