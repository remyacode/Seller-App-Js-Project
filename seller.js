
var form = document.getElementById('my-form');
var itemList = document.getElementById('items');
var total=document.getElementById('tot');
var count=0;
//var editId = document.getElementById('editId');
// Form submit event
btn=document.querySelector('#my-form .btn');
btn.addEventListener('click', addItem);

// Delete event
itemList.addEventListener('click', removeItem);


let crudid = '90990b255aae42b2b9b9ddd17567a9ce';
/*
window.onload = () => {
   
    axios.get(`https://crudcrud.com/api/${crudid}/seller`)
        .then((res) => {
            res.data.forEach(e => {
                
                showOutput(e)
            });
        })
          
}
*/
window.onload = async () => {
    try {
      const response = await axios.get(`https://crudcrud.com/api/${crudid}/seller`);
      const data = response.data;
      data.forEach(e => {
        showOutput(e);
      });
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };
// Add item
async function addItem(e) {
    e.preventDefault();
    let newPrice = document.getElementById('price').value;
    let newName = document.getElementById('name').value;
    

    class Myobj {
        constructor(price,name) {
            this.price = price;
            this.name = name;
            //count=count+this.price;
        }
    }
    let postObj = new Myobj(newPrice, newName)
    /*
    if (editId && editId.textContent) {
        axios.put(`https://crudcrud.com/api/${crudid}/seller/${editId.textContent}`, postObj)
        showOutput(postObj)

    } else { }
        */
       /*
        axios.post(`https://crudcrud.com/api/${crudid}/seller`, postObj)
            .then(res => showOutput(res.data))
   */
            try {
                const response = await axios.post(`https://crudcrud.com/api/${crudid}/seller`, postObj);
                const data = response.data;
                showOutput(data);
              } catch (error) {
                // Handle any errors that occurred during the request
                console.error(error);
              }
    form.reset()
}
// Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {

        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
            var p=li.innerText.split('-');
            count=count-p[0];
            total.innerHTML=`Total value of products: Rs.${count}`;
            let editobjkey = li.classList[1];
            

            axios.delete(`https://crudcrud.com/api/${crudid}/seller/${editobjkey}`)
        }
    }
}

    
    function showOutput(data) {
        itemList.insertAdjacentHTML("beforeend", `
            <li class="list-group-item ${data._id}">${data.price}-${data.name}<button class="btn btn-danger btn-sm float-right delete">Delete</button></li>`);
        count+=parseInt(data.price)
            total.innerHTML=`Total value of products: Rs.${count}`;
    
    }


/*
// edit item
function editItem(e) {
    

    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        let editData = li.innerText.split("-");
        let editobjkey = li.classList[1];
        editId.textContent = editobjkey;
        //console.log(editData)
        document.getElementById('name').value = editData[0];
        document.getElementById('femail').value = editData[1];
        document.getElementById('phone').value = editData[2].split(0,10)[0];
        itemList.removeChild(li);
    
    }
}
*/
