const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
// sourcery skip: avoid-using-var
var upd;
form.addEventListener('submit', (e) => {

    e.preventDefault();
    if (upd) {
        clearTimeout(upd);
    }

    const type = form.elements.coinType.value;

    fetchPrice(type);

});


const fetchPrice = async (type) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${type}?currency=USD`);
    console.log(r.data.coin.price);
    const { price } = r.data.coin;
    // sourcery skip: use-object-destructuring
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = 'USD';


    res.innerHTML = `<tr style="background-color:blue; color:white; font-weight:700">
     <td>
         Property
     </td>
     <td>Value</td>
 </tr>
 <tr>
     <td>
         ${base}
     </td>
     <td>${price} ${target}</td>
 </tr>
 <tr>
     <td>
         Volume
     </td>
     <td>${volume}</td>
 </tr>
 <tr>
     <td>
         Change
     </td>
     <td>${change}</td>
 </tr>`

    upd = setTimeout(() => fetchPrice(type), 10000);

}