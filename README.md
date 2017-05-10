# BackEnd
Backend for BuahTangan

### Api 
 
| routing | method | description | Params | 
| -------- | -------- | ---------- | -------|
| api/products/city_name/category | GET | Get All Products based on city name | - |
| api/featured/city | GET | Get Featued Product | - | 
| api/getTransactionNumber | GET | Get Transaction Number | - |
| api/checkout | POST | Checkout Transaction | transactionId, cartItems |
| api/login | POST | Login | username, password |
| api/register | POST | Register | username, email, password, photo |
| api/transaction | GET | Menampilkan Data Transaksi | - |
| api/transaction | POST | Menambahkan Transaksi | transactionId, username, status |
| api/transaction | PUT | Mengedit Transaksi | transactionId, username, status |



