import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import searchcontext from "./createcontext";
import Cart from "./cart";
function Product(props){
  const searchName = useContext(searchcontext);

  const navigate=useNavigate();
const[productlist,setProductList]=useState(null);
const[setSearchName,setSearch]=useState('');
  const getlist=()=>{
    fetch("http://localhost:3000/products")
    .then(res=>res.json())
.then(result=>{
  setProductList(result)
})
  }
  const getSearchlist=()=>{
    fetch("http://localhost:3000/products")
    .then(res=>res.json())
.then(result=>{
 var output= result.filter((obj)=>{
   return obj.model.includes(searchName);
  })
  //console.log(output);
  setProductList(output)
})
  }

  const goToDetails=(id)=>{
    navigate('/productdetails/'+id)
  }
  const goToCart=()=>{
    navigate('/cart')
  }
  const addToCart=(id,name,price)=>{
    fetch("http://localhost:3000/carts",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({"productid":id,"qty":1,"price":price,"total":1*price})
    }).then(res=>res.json()).then(result=>alert(result.id))

    
  }
  useEffect(()=>{
    if(productlist==null)
    getlist();
    else if(searchName!='' && searchName!=setSearchName){
      getSearchlist();
    // setSearch(searchName);
    }
    else{
      getlist();
      setSearch('abc');
    }
      
    
  })
    return(
     
  <div>
      <h1>product</h1>
      <hr/>
      {searchName}
      <div className="row">
      {productlist!=null && productlist.map((obj,index)=>(
        <div className="col-md-3" >
            <div class="card">
  <img src="img/phone.jpeg" class="card-img-top" alt="..." onClick={()=>goToDetails(obj.id)} />
  <div class="card-body">
    <p class="card-text">{obj.model+ " "+obj.price}</p>
    <button class="btn btn-primary" data-toggle="modal" data-target="#addtocartModal" onClick={()=>addToCart(obj.id,obj.name,obj.price)}>Add to cart</button>
  </div>
</div>
        </div>
      ))}
      </div>


      <div class="modal fade" id="addtocartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <h1>Items Added To The Cart</h1>
          <img src="img/phone.jpeg" class="card-img-top" alt="img"></img>
          <h1>Google pixel-Black</h1>
          <h2>price:$10</h2>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>goToCart()}>Go to cart</button>
      </div>
    </div>
  </div>
</div>

  </div>
    );
}

export default Product;