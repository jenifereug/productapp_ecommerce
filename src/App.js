import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom'
import Cart from './cart';
import Home from './home';
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
        <div className="container-fluid">
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
      
  <a class="navbar-brand" href="#">PRODUCT DETAILS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to={"/"}>Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to={"/product"}>product</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to={"/cart"}>cart</Link>
     </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" id="txtsearch" onChange={()=>readKeywords()} value={search} placeholder="Search product" />
    </form>
  </div>
  </nav>
            <div className="container">
                <Routes>
                  <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/product" element={<Product search={search}></Product>}></Route>
                    <Route path="/cart" element={<Cart></Cart>}></Route>
                    <Route path="/productdetails/:id" element={<Productdetails></Productdetails>}></Route>
                </Routes>
            </div>
        </div>
        </searchcontext.Provider>
    );
}

export default App;