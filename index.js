let image__Container=document.getElementsByClassName("image__Container")[0]
let k=1;
let searchQueryActive=false

let loadImages=async()=>{

    let res= await fetch(`https://api.unsplash.com/photos?per_page=50&page=${k}&client_id=USH3MEa-iG7YTelgxJSN3VuhTzig51QLlvarqAet0VM`).catch((err)=>{
       console.log(err)
    })

    if(res.status!=403){
        let data= await res.json()
 
    
    
    data.forEach((dataobj)=>{
     let EachImage__Container=document.createElement("div");
           EachImage__Container.className="EachImage__Container";
           let newImage=document.createElement("img")
           newImage.src=dataobj.urls.small;
           image__Container.appendChild(EachImage__Container)
           EachImage__Container.appendChild(newImage)
    })
     imgclick()
    }

    
 }

let loadImagesBySearch= async(query)=>{
    let res= await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=50&client_id=USH3MEa-iG7YTelgxJSN3VuhTzig51QLlvarqAet0VM`).catch((err)=>{
      console.log(err)
   })

   if(res.status===403){
    let data= await res.json()

   console.log(res)

   data.results.forEach((dataobj)=>{
    let EachImage__Container=document.createElement("div");
          EachImage__Container.className="EachImage__Container";
          let newImage=document.createElement("img")
          newImage.src=dataobj.urls.small;
          image__Container.appendChild(EachImage__Container)
          EachImage__Container.appendChild(newImage)
   })
   
    imgclick()
   }
   
}


let searchBar=document.getElementById("searchBar")
searchBar.addEventListener('input',()=>{
    image__Container.innerHTML=""
    console.log(searchBar.value);
    if(searchBar.value===""){
        loadImages()
        searchQueryActive=false
    }else{
        loadImagesBySearch(searchBar.value)
        searchQueryActive=true
    }
    
})





loadImages()
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    k++    
    if(searchQueryActive===false){
        loadImages();
    }
        
    
    }
    
})

function imgclick(){
let eachImg=document.querySelectorAll(".EachImage__Container > img");
let canclePreviewBtn=document.querySelectorAll(".preview > span");

    eachImg.forEach((img)=>{
        
        img.addEventListener('click',()=>{
            document.getElementById('previewImg').src=img.src;
            document.getElementsByClassName('previewContainer')[0].classList.remove('d-none')
            document.getElementsByClassName('gallery')[0].classList.add('opa')
        })
    })
    canclePreviewBtn.forEach((cancleBtn)=>{
        cancleBtn.addEventListener('click',()=>{
            document.getElementsByClassName('previewContainer')[0].classList.add('d-none')
            document.getElementsByClassName('gallery')[0].classList.remove('opa')
        })
    })
    document.getElementsByClassName('previewContainer')[0].addEventListener('click',()=>{
        document.getElementsByClassName('previewContainer')[0].classList.add('d-none')
        document.getElementsByClassName('gallery')[0].classList.remove('opa')
    },false)
    
}