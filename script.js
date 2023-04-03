let elUserList = document.querySelector("#list__user");
let elUserPost = document.querySelector("#list__post");
let elUserCommit = document.querySelector("#list__commit");


// User  

async function userRenderFanc(elment){
    let data = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
    console.log(data);
    
    
    
    if(data){
        data.forEach(user =>{
            let newLi = document.createElement("li");
            let p = document.createElement("p");
            
            p.textContent = user.name;
            p.setAttribute("style", "pointer-events: none;");
            newLi.setAttribute("style","padding: 10px; border: 2px solid #000;");
            newLi.dataset.id = user.id;
            newLi.append(p);
            
            newLi.addEventListener("click", (evt)=>{
                let id = evt.target.dataset.id;
                postRenderFanc(id, elUserPost);
            });
            
            elment.appendChild(newLi)
            
        });
    }
}
userRenderFanc(elUserList);


// Posts 

async function postRenderFanc(id, elment){
    let data = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
    
    
    let userPosts = data.filter((post) => post.userId == id);
    if(userPosts){
        console.log(userPosts);
        userPosts.forEach(post =>{
            let newLi = document.createElement("li");
            let elH4 = document.createElement("h4");
            let elH3 = document.createElement("h3");
            let p = document.createElement("p");
            
            elH4.textContent = post.userId;
            elH3.textContent = post.title;
            p.textContent = post.body;
            newLi.setAttribute("style","padding: 10px; border: 2px solid #000;");
            p.setAttribute("style","pointer-events: none;");
            elH3.setAttribute("style","pointer-events: none;");
            elH4.setAttribute("style","pointer-events: none;");
            elH3.setAttribute("style","color: red");
            elH4.setAttribute("style","color: blue");
            newLi.dataset.id = post.id;
            newLi.append(elH4,elH3,p);
            
            newLi.addEventListener("click", (evt)=>{
                let id = evt.target.dataset.id;
                commitRenderFanc(id, elUserCommit)
            })
            elment.appendChild(newLi);
        })
    }
}

// Comments

async function commitRenderFanc(id, elment){
    let data = await fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
    
    let postComments = data.filter((commit) => commit.postId == id);
    console.log(postComments);
    if(postComments){
        postComments.forEach(commit =>{
            let newLi = document.createElement("li");
            let elH4 = document.createElement("h4");
            let elH3 = document.createElement("h3");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");
            
            elH4.textContent = commit.postId;
            elH3.textContent = commit.name;
            h3.textContent = commit.body;
            p.textContent = commit.email;
            newLi.setAttribute("style","padding: 10px; border: 2px solid #000;");
            elH3.setAttribute("style","color: red");
            elH4.setAttribute("style","color: blue");
            newLi.dataset.id = commit.id;
            newLi.append(elH4,elH3,p,h3);
            
            
            elment.appendChild(newLi);
        });
    }
}                 
