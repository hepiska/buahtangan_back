# BackEnd
Backend for BuahTangan

### Api

| routing | method | description | req Params | res param |
| -------- | -------- | ---------- | -------|
| api/products/city_name/category | GET | Get All Products based on city name | -|[{id,name,price,image_url,desc,city_name,category_name}]|
| api/featured/city | GET | Get Featued Product | - |[{id,name,price,image_url,desc,city_name,featured}]
| api/checkout | POST | Checkout Transaction | token, cartItems |{massage,transaction_id}|
| api/login | POST | Login | username, password |{sendUser:{id,name,profilpicture},token}|
| api/register | POST | Register | username, email, password, photo |{massage}|
| api/transaction | GET | Menampilkan Data Transaksi | - |{transactionId, username, user_id, status}|
| api/transaction | PUT | Mengedit Transaksi | transactionId, user_id, status |
| api/fblogin|post|-|name.username,email,profil_picture_url|{sendUser:{id,name,profilpicture},token}|
|api/products|POST|create product for seller|name,price,image_url,desc,city,category,featured|massage|
|api/products/:id|delete|create product for seller|-|massage|
|api/products/:id|put|create product for seller|name/price/image_url/desc/featured|massage|
