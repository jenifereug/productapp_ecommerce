import Productdetails from "./productdetails";
import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import searchcontext from "./createcontext";

function Cart(){
  const searchName = useContext(searchcontext);

  const navigate=useNavigate();
const[Cartlist,setCartList]=useState([]); //setCartList(10)
const[subtotal,setsubtotal]=useState(0);
  const getlist=()=>{
    fetch("http://localhost:3000/carts")
    .then(res=>res.json())
.then(result=>{
  setCartList(result); 
  console.log(Cartlist);
})
  }

  const goToDetails=(id)=>{
    navigate('/productdetails/'+id)
  }
  const goToCart=()=>{
    navigate('/cart')
  }
  const addToCart=(id)=>{
    const data={"productid":id};
    fetch("http://localhost:3000/carts",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({"Productid":id})
    }).then(res=>res.json()).then(result=>alert(result.id))

    
  }
  const updateCart=(obj,op)=>{
    if(obj)
    {
      var flag=false;
      if(op=='-' && obj.qty>1){
        obj.qty=obj.qty-1;
        flag=true;
      }
      else if(op=='+'){
      obj.qty=obj.qty+1;
      flag=true;
      }
  if(flag)
      fetch("http://localhost:3000/carts/"+obj.id,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({"id":obj.id,"productid":obj.productid,"qty":obj.qty,"price":obj.price,"total":obj.qty*obj.price})
      }).then(res=>res.json()).then(result=>getlist())
    }
    
  }

  const removeCart=(obj)=>{
    fetch("http://localhost:3000/carts/"+obj.id,{
      method:"DELETE",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({"id":obj.id,"productid":obj.productid,"qty":obj.qty,"price":obj.price,"total":obj.qty*obj.price})
    }).then(res=>res.json()).then(result=>getlist())
  } 
  const clearcart=()=>{
    Cartlist.map((obj)=>{
      removeCart(obj)
    })
  } 
  useEffect(()=>{
    if(Cartlist.length==0)
    getlist();
    else
    {
      setsubtotal(null);
      let st=0;
      Cartlist.map((obj)=>{
        st=st+obj.total;
      })
      setsubtotal(st);
    }
  },)
    return(
    <div>
      {searchName}
      {Cartlist.length>0?
    <div>
      <table>
      <thead>
          <tr><th>PRODUCT</th><th>NAME OF PRODUCT</th><th>PRICE</th><th>QUANTITY</th><th>REMOVE</th><th>TOTAL</th></tr>
          </thead>
          <tbody>
       {Cartlist!=null && Cartlist.map((obj,index)=>(
          <tr>
             <td><img src="img/phone.jpeg" class="card-img-top" height="50" width="50" alt="..." /></td>
             <td>{obj.id}</td>
             <td>{obj.price}</td>
             <td><button onClick={()=>updateCart(obj,'-')}>-</button>{obj.qty}<button onClick={()=>updateCart(obj,'+')}>+</button></td>
             <td><button onClick={()=>removeCart(obj)}>Remove</button></td>
             <td>{obj.total}</td>
       </tr>
       ))
      }
  </tbody>
      </table>
      <div style={{textAlign:"right"}}>
      <button className="btn btn-danger" onClick={()=>clearcart()}>Clear cart</button><br />
     <span>subtotal: {subtotal}</span>
     </div>
     </div>:'Cart is empty'}
  </div>
    );
}

export default Cart;