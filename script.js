// -----------default data-----------------
async function search(){
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let data=await res.json();
    let x = data.categories
    let display=""
    x.map((values)=>{
        display+=`<div id="pic">
        <img src="${values.strCategoryThumb}">
    </div>`
    })
    document.getElementById('print').innerHTML=display
   
}
search()

// -----------------get recipe of the day

 async function dayrecepie(){
    document.getElementById('print').innerHTML=""
    let res=await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    let data=await res.json();
    console.log(data);
    let x=data.meals
    let display=""
    x.map((values)=>{
        
        display+=` <div id="image">
        <h1>${values.strMeal}</h1>
        <img src=${values.strMealThumb}>
    </div>
    <div id="cards">
   <div class="card">
      <h1 class="title">Continental Area : ${values.strArea}</h1>
      <h1 class="title1">Ingredients used:</h1>
      <p class="details">${values.strIngredient1} : ${values.strMeasure1},${values.strIngredient2} : ${values.strMeasure2},
      ${values.strIngredient3} : ${values.strMeasure3},${values.strIngredient4} : ${values.strMeasure4},
      ${values.strIngredient5} : ${values.strMeasure5},${values.strIngredient6} : ${values.strMeasure6},${values.strIngredient7} : ${values.strMeasure7},
      ${values.strIngredient8} : ${values.strMeasure8},${values.strIngredient9} : ${values.strMeasure9},${values.strIngredient10} : ${values.strMeasure10},</p>
   <h1 class="list">Instructions to be followed :</h1>
   <p class="details">${values.strInstructions}</p>
  </div>
</div>`
    })
    
     document.getElementById('recepie').innerHTML=display
    
}
//------- latest recipes-----------------
async function search1(){
    document.getElementById('print').innerHTML=""
    let display=""
    for(var i=0;i<5;i++){
        let res=await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        let data=await res.json();
        var x=data.meals
        x.map((values)=>{
        
            display+=` <div id="image">
            <h1>${values.strMeal}</h1>
            <img src=${values.strMealThumb}>
        </div>
        <div id="cards">
       <div class="card">
          <h1 class="title">Continental Area : ${values.strArea}</h1>
          <h1 class="title1">Ingredients used:</h1>
          <p class="details">${values.strIngredient1} : ${values.strMeasure1},${values.strIngredient2} : ${values.strMeasure2},
          ${values.strIngredient3} : ${values.strMeasure3},${values.strIngredient4} : ${values.strMeasure4},
          ${values.strIngredient5} : ${values.strMeasure5},${values.strIngredient6} : ${values.strMeasure6},${values.strIngredient7} : ${values.strMeasure7},
          ${values.strIngredient8} : ${values.strMeasure8},${values.strIngredient9} : ${values.strMeasure9},${values.strIngredient10} : ${values.strMeasure10},</p>
       <h1 class="list">Instructions to be followed :</h1>
       <p class="details">${values.strInstructions}</p>
      </div>
    </div>`
        })
        document.getElementById('recepie').innerHTML=display
    
    }
}
//------ closure and get recipie by name
var timerId;
let movieDiv=document.getElementById("movies")
async function searchMovies(n){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${n}`) 
    let data= await res.json();
    let x= data.meals
    return x
}

function appendMovies(m){
  m.forEach( ({strMeal}) =>{
       let para=document.createElement('h2')
       para.setAttribute("class","para")
      
       para.innerText=strMeal
       movieDiv.append(para);
       para.addEventListener("click",async function(e){
           let text=e.target.textContent;
           console.log(text);
           var name=await searchMovies(text)
           let display=""
           name.map((values)=>{
               
               display+=` <div id="image">
               <h1>${values.strMeal}</h1>
               <img src=${values.strMealThumb}>
           </div>
           <div id="cards">
          <div class="card">
             <h1 class="title">Continental Area : ${values.strArea}</h1>
             <h1 class="title1">Ingredients used:</h1>
             <p class="details">${values.strIngredient1} : ${values.strMeasure1},${values.strIngredient2} : ${values.strMeasure2},
             ${values.strIngredient3} : ${values.strMeasure3},${values.strIngredient4} : ${values.strMeasure4},
             ${values.strIngredient5} : ${values.strMeasure5},${values.strIngredient6} : ${values.strMeasure6},${values.strIngredient7} : ${values.strMeasure7},
             ${values.strIngredient8} : ${values.strMeasure8},${values.strIngredient9} : ${values.strMeasure9},${values.strIngredient10} : ${values.strMeasure10},</p>
          <h1 class="list">Instructions to be followed :</h1>
          <p class="details">${values.strInstructions}</p>
         </div>
       </div>`
           })
           document.getElementById('print').innerHTML=""
            document.getElementById('recepie').innerHTML=display
            movieDiv.textContent=""
            document.getElementById("query").value=""
           
       })
  })
}

async function main(){
    var name=document.getElementById("query").value
   
    let movies = await searchMovies(name)
    if(movies==undefined){
        return false
    }
    appendMovies(movies)
    console.log(movies);
}

function debounce(func,delay){
    var name=document.getElementById("query").value
    if(name.length<3){
        movieDiv.innerHTML=""
        return false;
    }
    if(timerId){
        clearTimeout(timerId);
    }
   timerId= setTimeout(()=>{
        func();
    },delay)
}
if(name.length==0){
    movieDiv.textContent=""
}


