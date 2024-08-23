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
const[modeltitle,setmodelTitle]=useState('');
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
  const addToCart=(id,name,price,img)=>{
    fetch("http://localhost:3000/carts")
    .then(r=>r.json())
    .then(r=>{
     var output= r.filter((i)=>{
        return i.productid==id
      }
      )
      if(output.length==0)
      {
        fetch("http://localhost:3000/carts",{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({"productid":id,"qty":1,"price":price,"total":1*price,"productimage":img})
        }).then(res=>res.json()).then(result=>{setmodelTitle(name);})
      }
      else{
        fetch("http://localhost:3000/carts/"+output[0].id,{
          method:"PUT",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({"id":output[0].id,"productid":id,"qty":output[0].qty+1,"price":price,"total":1*price,"productimage":img})
        }).then(res=>res.json()).then(result=>{setmodelTitle(name);})

        console.log(output);
      }
    });
    
    
    
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
      <h4 style={{marginTop:"2%"}}>Products</h4>
      <hr/>
      <div className="row">
      {productlist!=null && productlist.map((obj,index)=>(
        <div className="col-md-3" >
            <div class="card" style={{cursor:"pointer"}}>
  {/* <img src="img/phone.jpeg" class="card-img-top" alt="..." onClick={()=>goToDetails(obj.id)} /> */}
  <div class="card-body">
    <img src={obj.productimage} height="250" width="250" onClick={()=>goToDetails(obj.id)}></img>
    <p class="card-text"><span style={{float:"left"}}>{obj.model}</span> <span style={{float:"right"}}>$ {obj.price}</span></p>
    <br/><hr/><a href="#" data-toggle="modal" data-target="#addtocartModal" onClick={()=>addToCart(obj.id,obj.model,obj.price,obj.productimage)}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
    </a>
    {/* <button class="btn btn-primary" data-toggle="modal" data-target="#addtocartModal" onClick={()=>addToCart(obj.id,obj.name,obj.price)}>Add to cart</button> */}
  </div>
</div>
<hr></hr>
        </div>
      ))}
      </div>


      <div class="modal fade" id="addtocartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{modeltitle}</h5>
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