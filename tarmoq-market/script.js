const products = [
 {id:1,name:"Acer Aspire 5",category:"computer",label:"Kompyuter",price:6850000,desc:"Kundalik ish va o‘qish uchun noutbuk.",tag:"TOP",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&auto=format&fit=crop"},
 {id:2,name:"Gaming kompyuter",category:"computer",label:"Kompyuter",price:12400000,desc:"Yuqori unumdorlikdagi kompyuter.",tag:"POPULAR",image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop"},
 {id:3,name:"Smartfon X Pro",category:"phone",label:"Telefon",price:5200000,desc:"Zamonaviy dizayn va kuchli kamera.",tag:"NEW",image:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700&auto=format&fit=crop"},
 {id:4,name:"Smartfon Lite",category:"phone",label:"Telefon",price:2750000,desc:"Kundalik foydalanish uchun qulay.",tag:"",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop"},
 {id:5,name:"Wi-Fi 6 Router",category:"network",label:"Tarmoq qurilmasi",price:890000,desc:"Tezkor va barqaror simsiz aloqa.",tag:"TOP",image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=700&auto=format&fit=crop"},
 {id:6,name:"Gigabit Switch",category:"network",label:"Tarmoq qurilmasi",price:640000,desc:"Lokal tarmoq uchun 8 portli switch.",tag:"",image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop"},
 {id:7,name:"Full HD Monitor",category:"monitor",label:"Monitor",price:1890000,desc:"Aniq tasvir va qulay ish maydoni.",tag:"",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop"},
 {id:8,name:"Curved Monitor",category:"monitor",label:"Monitor",price:3250000,desc:"Keng ekranli zamonaviy monitor.",tag:"NEW",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop"},
 {id:9,name:"Wireless Mouse",category:"accessory",label:"Aksessuar",price:185000,desc:"Simsiz va ergonomik sichqoncha.",tag:"",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=700&auto=format&fit=crop"},
 {id:10,name:"Mechanical Keyboard",category:"accessory",label:"Aksessuar",price:420000,desc:"Qulay tugmalar va mustahkam korpus.",tag:"",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop"},
 {id:11,name:"Headphones",category:"accessory",label:"Aksessuar",price:350000,desc:"Kundalik foydalanish uchun quloqchin.",tag:"",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop"},
 {id:12,name:"Web kamera",category:"accessory",label:"Aksessuar",price:295000,desc:"Onlayn uchrashuvlar uchun kamera.",tag:"",image:"https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=700&auto=format&fit=crop"}
];
const money = n => new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";
let cart = JSON.parse(localStorage.getItem("tm-cart") || "[]");
let activeCategory = "all";
const grid = document.getElementById("productGrid");
const toast = document.getElementById("toast");

function renderProducts(){
 const term = document.getElementById("searchInput").value.trim().toLowerCase();
 const filtered = products.filter(p => (activeCategory==="all" || p.category===activeCategory) && (p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term) || p.label.toLowerCase().includes(term)));
 grid.innerHTML = filtered.length ? filtered.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback');this.parentElement.insertAdjacentHTML('beforeend','<span style=&quot;font-size:52px&quot;>▣</span>')">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}</div><div class="product-info"><div class="product-category">${p.label}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})" aria-label="${p.name} savatchaga qo‘shish">+</button></div></div></article>`).join("") : `<div class="empty-state">Hech narsa topilmadi. Boshqa nom bilan qidirib ko‘ring.</div>`;
}
function saveCart(){localStorage.setItem("tm-cart",JSON.stringify(cart));renderCart();}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("Mahsulot savatchaga qo‘shildi");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartCount").textContent=count;
 const wrap=document.getElementById("cartItems");
 wrap.innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div><b>${p.name}</b><small>${money(p.price)} × ${x.qty}</small></div><div class="qty-controls"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join(""):`<div class="empty-state">Savatcha hozircha bo‘sh.</div>`;
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));
}
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200);}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartOverlay").classList.add("show");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("show");}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("cartOverlay").addEventListener("click",closeCart);
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
const dialog=document.getElementById("orderDialog");
document.getElementById("checkoutBtn").addEventListener("click",()=>{if(!cart.length){showToast("Avval savatchaga mahsulot qo‘shing");return;}closeCart();dialog.showModal();});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
document.getElementById("orderForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.target);const summary=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `${p.name} — ${x.qty} dona`}).join(", ");document.getElementById("orderResult").textContent=`Rahmat, ${d.get("name")}! Demo buyurtmangiz qabul qilindi. Mahsulotlar: ${summary}. Jami: ${document.getElementById("cartTotal").textContent}. Bu namuna sayt: buyurtma do‘konga avtomatik yuborilmaydi.`;cart=[];saveCart();e.target.reset();});
document.getElementById("serviceForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.target);showToast(`Rahmat, ${d.get("name")}! Xizmat so‘rovi demo tarzida qabul qilindi.`);e.target.reset();});
renderProducts();renderCart();
