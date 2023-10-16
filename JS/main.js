var productName=document.getElementById("productName");
var productCat=document.getElementById("productCat");
var productPrice=document.getElementById("productPrice");
var productDes=document.getElementById("productDes");
var products=[];
var indexOfUpdateElemnt;
if(localStorage.getItem("products") != null)
{
    products = JSON.parse(localStorage.getItem("products"));
    display(products);

};
function addProduct() {
    if (validation(productName.value,productCat.value,productPrice.value,productDes.value)== true)
    {
        var product ={
            name:productName.value,
            category:productCat.value,
            price:productPrice.value,
            description:productDes.value,
        }
        products.push(product);
        localStorage.setItem("products",JSON.stringify(products));
        display(products);
        clearForm();
    }
   
};



function display(products)
{
var productBox=``
for(var i=0 ; i<products.length;i++)
{
    
    productBox+= `

         <tr>
           <td>${i+1}</td>
           <td>${products[i].newName?products[i].newName:products[i].name}</td>
           <td>${products[i].category}</td>
           <td>${products[i].price}</td>
           <td>${products[i].description}</td>
           <td><button onclick="dataUpForUpdate(${i})" class="mainTable btn table-w border-0 btn-outline-info">Update</button></td>
           <td><button class="mainTable btn table-w border-0 btn-outline-danger" onclick="deleteProduct(${i});">Delete</button></td>
         </tr>
     `
}
document.getElementById("tableBody").innerHTML=productBox;
};

function clearForm()
{
    productName.value='';
    productCat.value='';
    productPrice.value='';
    productDes.value='';
};

function deleteProduct (i)
{
    products.splice(i,1);
    localStorage.setItem("products",JSON.stringify(products));
    display(products);
    
};

function dataUpForUpdate (i)
{
    indexOfUpdateElemnt=i;
    productName.value=products[i].name;
    productCat.value=products[i].category;
    productDes.value=products[i].description;
    productPrice.value=products[i].price;
    document.getElementById("addBtn").classList.add("d-none");
    document.getElementById("updateBtn").classList.remove("d-none");
};
function Update(indexOfUpdateElemnt)
{
    var updatedProduct ={name:productName.value,price:productPrice.value,category:productCat.value,description:productDes.value};
    if(validation(updatedProduct.name,updatedProduct.category,updatedProduct.price,updatedProduct.description))
    {
        products.splice(indexOfUpdateElemnt,1,updatedProduct);
       display(products);
       localStorage.setItem("products",JSON.stringify(products));
        document.getElementById("addBtn").classList.remove("d-none");
       document.getElementById("updateBtn").classList.add("d-none");
       clearForm();
    }
    
};

function formValidation (name)
{
    var regex = /^[A-Z][a-z]{3,8}/;
    if(regex.test(name))
    {
        productName.style.border="none";
        document.getElementById('guidName').classList.add("d-none");
        return true;
    }else
    {
        productName.style.border=" 5px solid red";
        document.getElementById('guidName').classList.remove("d-none");
        return false;
    }
};

function search (searchName)
{
    var productSearch =[];
  for(var i=0;i<products.length;i++)
  {
     if(products[i].name.toLowerCase().includes(searchName.toLowerCase()))
     {
        products[i].newName=products[i].name.toLowerCase().replace(searchName.toLowerCase(),`<span class="text-danger">${searchName}</span>`);
         productSearch.push(products[i]);
     }
  }

  console.log(productSearch);

  display(productSearch);

}; 

function priceValidation(price)
{
    var regex =/^[1-9][0-9]{3,5}$/
   if(regex.test(price)){
    productPrice.style.border="none";
    document.getElementById("guidPrice").classList.add("d-none");
    return true;
   }else{
    productPrice.style.border="red 5px solid";
    document.getElementById("guidPrice").classList.remove("d-none");
    return false;
   }
};
function categoryValidation(category)
{
    var regex =/(Tv)|(Mobile Phone)|Television/
    if(regex.test(category)){
        productCat.style.border="none";
        document.getElementById("guidCat").classList.add("d-none");
        return true;
    }else
    {
        productCat.style.border="5px solid red";
        document.getElementById("guidCat").classList.remove("d-none");
        return false;
    }
};

function descriptionValidation(desc)
{
    var regex =/^[a-zA-z]{4,}/
    if(regex.test(desc))
    {
        productDes.style.border="none";
        document.getElementById("guidDes").classList.add("d-none");
        return true;
    }else
    {
        productDes.style.border="5px solid red";
        document.getElementById("guidDes").classList.remove("d-none");
        return false;
    }
};

function validation (name , category , price ,des)
{
    if(formValidation(name) && categoryValidation(category) && priceValidation(price) && descriptionValidation(des))
    {
        return true;
    }else{
        return false;
    }
};
















