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
      {Cartlist.length>0?
    <div>
      <h4 style={{marginTop:"2%"}}>Cart List</h4>
      <hr/>
      <table className="table">
      <thead className="thead-dark">
          <tr><th>PRODUCT</th><th>NAME OF PRODUCT</th><th>PRICE</th><th>QUANTITY</th><th>REMOVE</th><th>TOTAL</th></tr>
          </thead>
          <tbody>
       {Cartlist!=null && Cartlist.map((obj,index)=>(
          <tr>
             <td>
             <img src={obj.productimage} height="50" style={{width:"35%"}}></img>
              {/* <img src="img/phone.jpeg" class="card-img-top" height="50" style={{width:"35%"}} alt="..." /> */}
              </td>
             <td>{obj.id}</td>
             <td>{obj.price}</td>
             <td><button className="btn btn-secondary" onClick={()=>updateCart(obj,'-')}>-</button>{obj.qty}<button className="btn btn-secondary" onClick={()=>updateCart(obj,'+')}>+</button></td>
             <td><svg style={{cursor:"pointer"}} onClick={()=>removeCart(obj)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D20103"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
             {/* <button className="btn btn-danger" onClick={()=>removeCart(obj)}>Remove</button> */}
             </td>
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