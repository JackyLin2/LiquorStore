const liquorUrl = "http://localhost:3000/liquors"
const requestHeaders = {
    "accept": "application/json",
    "content-type": "application/json"
  }
document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/liquors")
    .then((resp) => resp.json())
    .then((liquors) =>
        liquors.forEach(liquor=>displayLiquor(liquor)))
        function displayLiquor(liquor){
            let image = document.getElementById("main-content")
            let liquorDiv = document.createElement("div")
            // liquorDiv.innerText = liquor.name
            liquorDiv.innerHTML+= `
           <div class = "card-image" data-id = "${liquor.id}">
           <img src="${liquor.imageUrl}"/>
           <p> ${liquor.likes} likes <p>
           <button class="like-btn">Like <3</button>
           <h2>Name: ${liquor.name}</h2>
           <h4>Cost Price: $${liquor.price}</h4>
           <button type="button" id= ${liquor.id} class = 'add-btn'>See Details</button>
           </div>
           `
           image.appendChild(liquorDiv)

           
           
           
           let addBtn = document.getElementById(`${liquor.id}`)
            addBtn.addEventListener('click',function(event){
                event.preventDefault()
                let addCart = document.getElementsByClassName("dropdown")[0]
                let cartList = document.createElement("li")
                addCart.innerHTML = `
                <li>
                  <span class="item">
                    <span class="item-left" data-set = ${liquor.id}>
                        <img src="${liquor.imageUrl}" alt="" />
                        <p> ${liquor.likes} likes <p>
                         <button class="like-btn">Like <3</button>
                        <span class="item-info" >
                            <h3>Name: ${liquor.name}</h3>
                            <h3> Price: $${liquor.price}</h3><br>
                            <h3> Origin: </h3>
                            <p> ${liquor.description} </p>
                            <h3> Comments: </h3>
                                <ul id= "list">
                                </ul>
                            <form class="comment-form">
                            <textarea></textarea>
                            <input type="submit" value="Submit">
                            </form>
                        </span>
                    </span>
                    <span class="item-right">
                        <button class="btn btn-danger  fa fa-close"> Close </button>
                    </span>
                </span>
              </li>
            
                `

                
               
            })
        }

    })
    // }
    
    const form =  document.querySelector('form');
  const input = document.querySelector('#searchTerm');
  // const btn = document.getElementsByClassName('btn btn-primary');
 
  form.addEventListener('submit', formSubmitted);
  function formSubmitted(event){
      //  debugger
      event.preventDefault();
      const searchTerm = input.value;
      // debugger
      //console.log(searchTerm);
      getResults(searchTerm);
}
function getResults(searchTerm){
fetch(liquorUrl)
.then(resp => resp.json())
.then(liquors => postResults(liquors))
function postResults(liquors){
    // let searchU = Object.entries(liquors)
    // newLiquors = Array.from(liquors)
    let image = document.getElementById("main-content")
    let search = liquors.filter(show => show.name === searchTerm)[0]
    // console.log(search)
    let searchContainer = document.querySelector("#search-container")
//   debugger
       image.innerHTML = `
       <img src="${search.imageUrl}"/>
       <h2>${search.name}</h2>
       <h4>$${search.price}</h4>
       <button type="button" class = 'add-btn'>See Details</button>
             </div>
            `
form.reset();
}
}


   
let commentForm = document.getElementsByClassName("comment-form")[0]
    document.addEventListener('submit', function(event){
        event.preventDefault()

        let commentId = event.target.parentElement.dataset.set
        let ul = document.getElementById("list")
        let li = document.createElement("li")
        let newComment = document.getElementsByTagName('textarea')[0].value
        li.innerText = newComment
        // debugger
        ul.appendChild(li)
        event.target.reset()

fetch(`${liquorUrl}/${commentId}`,{
       method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            comments: newComment
        })


    })

    
    })

//     let likeBtn = document.querySelector('.like-btn')
//     document.addEventListener('click',function(e){
    
//         e.preventDefault()
//         if(e.target.className === 'like-btn'){
// //   debugger
//             let likeId = e.target.parentNode.parentNode.dataset.id

//             let liquorLikes = e.target.parentNode.parentNode.children[1].innerText

//             let newLikes = parseInt(liquorLikes)+1

//             let likeString = `${newLikes} Likes`

//             e.target.parentNode.parentNode.children[1].innerText = likeString

//             fetch(`${liquorUrl}/${likeId}`,{
//                 method: "PATCH",
//                 headers: requestHeaders,
//                body: JSON.stringify({likes: newLikes})

//             })






        
//         }

//     })

    //     const btnScrollToTop = document.querySelector('#btnScrollToTop');
    // btnScrollToTop.addEventListener("click", function () {
    //     window.scroll({
    //         top: 0,
    //         left: 0,
    //         behavior: "smooth"
    //     });
    // })
        // })
