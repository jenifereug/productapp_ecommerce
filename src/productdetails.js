import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
function Productdetails(){
    let { id } = useParams();
    const[productlist,setProductList]=useState();
    const navigate=useNavigate();
    const goToproduct=(id)=>{
        navigate('/product')
      }
      const goTocart=(id)=>{
        navigate('/cart')
      }
      useEffect(()=>{ 
        if(productlist==null){
        fetch("http://localhost:3000/products/"+id)
            .then(res=>res.json())
        .then(result=>{
          setProductList(result)})
        }

      })
      
      
    return(
<div>
    {(productlist!=null)?<div>
 <h2>{productlist.model}</h2>
 <h2>{productlist.madeby}</h2>
 <h2>Price:{productlist.price}</h2>
<p>{productlist.desc}</p>
<button type="button" onClick={()=>goTocart()}>Add to Cart</button>
<button type="button" onClick={()=>goToproduct()}>Back to product</button>
</div>:''}
</div>



    );
}

export default Productdetails;