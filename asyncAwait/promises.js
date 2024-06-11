const users = [
    {name : 'one', post : 'this is posy by user one'},
    {name : 'two', post : 'this is posy by user two'}
]
    
function getPost() {
    setTimeout(() => {
        let output = '';
        users.forEach((user, index, array) => {
            output += `<li> ${user.name} </li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            users.push(post);
            console.log(post);
            resolve();
        }, 5000);
    })
}

async function foo() {
    let a = true 
    while(a) {
    console.log('loding')
    await createPost({name : 'three', post : 'this is posy by user two'});
    a = false
    getPost();
    }
}

foo();