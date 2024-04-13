// console-log statements >>> debugging only 

window.addEventListener('load', (event) => {console.log("win loaded", event) }); 
const gallery = document.getElementById('gallery');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('updateBtn');
const url = "https://comp125-a4-api.onrender.com/imagelist";

let images={};
let index=0; 

let timeout;

const fetchImg= ()=>{
    let req = new XMLHttpRequest();
    req.open('get',url);
    req.responseType= 'json';       // auto parsed to json 
    
    req.onload=()=>{ 
        if (req.status >= 200 && req.status < 300) {
            images= req.response.ImageList; 
            console.log("onload>>images: ",images);
            displayNextIMG();
        } else {
            console.error('error enc:', req.statusText);
        }
    }
    req.onerror=()=>console.log(`error>> onerror exec`);
    req.timeout=()=>console.log(`req >> timed-out`);
    req.send();
}


const displayNextIMG= ()=>{
    gallery.innerHTML= "";
    if (index>=images.length) {
        index=  0;
        console.log("end enc>>");
    }
    if (index<0) {
        index= images.length-1;
        console.log("neg enc>>");
    }

    const image = images[index];
    if (image){
        const img= document.createElement('img');
        img.src= image.name;
        img.alt= "who cares";
        gallery.appendChild(img);
        console.log(`index>>${index}`);
    }
    index++;
    console.log("display time>>",image.time);
    timeout = setTimeout(displayNextIMG, image.time|| 2000);

}

console.log("exec>>>");fetchImg();

const prevClick= ()=>{
    clearTimeout(timeout);
    index-=2;
    console.log("prev click >>>");
    displayNextIMG();

}
const nextClick=()=>{
    clearTimeout(timeout)
    // ++index;
    console.log("next click >>>");
    displayNextIMG();
    
};
const reset=()=>{
    clearTimeout(timeout);
    index=0;
    console.log("reset click >>>");
    displayNextIMG();
}
prevBtn.addEventListener('click',prevClick);
nextBtn.addEventListener('click',nextClick);
resetBtn.addEventListener('click',reset);



// >>>>>>>>>>>  alternate method 
// let mkReq= url=>{
//     return new Promise((done, reject)=>{
//         const resp = new XMLHttpRequest();
//         resp.open('get', url);
//         resp.onload= function(){
//             if (resp.status>=200 && resp.status<300){
//                 const data = JSON.parse(resp.responseText);
//                 done(data.ImageList)
//             } else {
//                 reject(new Error('Request failed'));
//             }
//         }
//         resp.onerror= ()=> reject(new Error('somethings wrong...'));
//         resp.send();
//     })
// }
 
// mkReq(url).then(imglst=>images=imglst).catch(err=> console.log("req failed:",error));
// console.log()

// >>>>>>>>>>>>> it works.. to update the global varialbe

