import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom'
import Cart from './cart';
import Product from './product';
import Productdetails from './productdetails';
import { useState } from 'react';
import searchcontext from './createcontext';
//Testing
function App() {
  const[search,setSearch]=useState('');
  //usecontext
  const readKeywords=(e)=>{
    //usecontext=e.target.value
    //alert(search);
    //setSearch(e.target.value);
    setSearch(document.getElementById('txtsearch').value)
  }
    return (
      <searchcontext.Provider value={search}>
        <div>
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
      
  <a class="navbar-brand" href="#">PRODUCT DETAILS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link class="nav-link" to={"/"}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M80-160v-160h160v160H80Zm240 0v-160h560v160H320ZM80-400v-160h160v160H80Zm240 0v-160h560v160H320ZM80-640v-160h160v160H80Zm240 0v-160h560v160H320Z"/></svg>Product <span class="sr-only">(current)</span></Link>
      </li>
      
      <li class="nav-item">
        <Link class="nav-link" to={"/cart"}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>Cart</Link>
     </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" id="txtsearch" onChange={()=>readKeywords()} value={search} placeholder="Search product" />
    </form>
  </div>
  </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Product search={search}></Product>}></Route>
                    <Route path="/cart" element={<Cart></Cart>}></Route>
                    <Route path="/productdetails/:id" element={<Productdetails></Productdetails>}></Route>
                </Routes>
            </div>
        </div>
        </searchcontext.Provider>
    );
}

export default App;