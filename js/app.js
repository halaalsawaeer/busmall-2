var names = ["bag.jpg","banana.jpg","bathroom.jpg","boots.jpg","breakfast.jpg",
"bubblegum.jpg","chair.jpg","cthulhu.jpg","dog-duck.jpg","dragon.jpg","pen.jpg","pet-sweep.jpg","scissors.jpg","shark.jpg","sweep.png","tauntaun.jpg","unicorn.jpg","usb.gif","water-can.jpg","wine-glass.jpg"
    
  ];
  
  var leftImage = document.getElementById('leftImage');  
  var rightImage = document.querySelector('#rightImage');
  var middleImage=document.getElementById('middleImage');
  
  console.log(leftImage);
  console.log(rightImage);
  
  
  Product.all = []; 
  
  function Product(pName) {     ///// constructor
    this.productName = pName;
    this.imagePath = `assets/${pName}`;
    this.seen = 0;
    this.votes = 0;
    Product.all.push(this);
  }
  
 
  

  for (var i = 0; i < names.length; i++) {
    new Product(names[i]);

  }
  
  console.log(Product.all);

  
  
  
  var leftPro, rightPro, middlePro ;
  function render() { /////////// for showing images in the website
    do {
    leftPro = Product.all[randomNumber(0, Product.all.length - 1)];
    rightPro = Product.all[randomNumber(0, Product.all.length - 1)];
    middlePro = Product.all[randomNumber(0, Product.all.length - 1)];
   
  
    leftImage.setAttribute('src', leftPro.imagePath);
    leftImage.setAttribute('alt', leftPro.productName);
    leftImage.setAttribute('title', leftPro.productName);
  
    rightImage.setAttribute('src', rightPro.imagePath);
    rightImage.setAttribute('alt', rightPro.productName);
    rightImage.setAttribute('title', rightPro.productName);

    middleImage.setAttribute('src', middlePro.imagePath);
    middleImage.setAttribute('alt', middlePro.productName);
    middleImage.setAttribute('title', middlePro.productName);
    }
    ///////this for making every image unique from the other
while( leftPro===middlePro || leftPro === rightPro || middlePro ===rightPro) ; 
 

leftImage.setAttribute('src', leftPro.imagePath);
leftImage.setAttribute('alt', leftPro.productName);
leftImage.setAttribute('title', leftPro.productName);

rightImage.setAttribute('src', rightPro.imagePath);
rightImage.setAttribute('alt', rightPro.productName);
rightImage.setAttribute('title', rightPro.productName);

middleImage.setAttribute('src', middlePro.imagePath);
middleImage.setAttribute('alt', middlePro.productName);
middleImage.setAttribute('title', middlePro.productName);








  } 

  render ();
  
  var totalClicks = 0;
  
  
  
  var imagesSection = document.querySelector('#imagesSection'); /// this is  another way of getting the element by id
  imagesSection.addEventListener('click', handleClickonPro);
  
  function handleClickonPro(event) {
  
    console.log(event.target.id);
  
    if (totalClicks < 25) {
      if (event.target.id !== 'imagesSection') {
        totalClicks++;
        console.log(totalClicks);
        rightPro.seen++;
        leftPro.seen++;
        middlePro.seen++;
  
        
  
        if (event.target.id === 'leftImage') {
          leftPro.votes++;
          
        }
        if (event.target.id === 'rightImage') {
          rightPro.votes++;
        }
        if(event.target.id === 'middleImage') {
          middlePro.votes++;
        }
  
        render();
      }
    } else if (totalClicks === 25){
      renderSummary();   // we render the summeries after clicking 25 clicks
      createChartSummary();
      console.log(totalClicks);
    }
  
  }
  
  function renderSummary() {
    imagesSection.removeEventListener('click',handleClickonPro); 
    console.log('you voted 25 times already!!');
    var ulE1 = document.getElementById('finalResults');
    for(var i=0; i<Product.all.length; i++) {
      var liE = document.createElement('li');
      ulE1.appendChild(liE);
      
      liE.textContent = `${Product.all[i].productName} has ${Product.all[i].votes} votes and ${Product.all[i].seen} seen`;
    }
  }
  
  
 
  
  
  //helper functions
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /////////////

  function createChartSummary() {
    // var productsArr = [];
    // for (var i = 0; i < Product.all.length; i++) {
    //   productsArr.push(Product.all[i].productName);
    // }
    // var clicksArr = [];
    // for (var i = 0; i < Product.all.length; i++) {
    //   clicksArr.push(Product.all[i].clicks);
    // }
    // var viewsArr = [];
    // for (var i = 0; i < Product.all.length; i++) {
    //   viewsArr.push(Product.all[i].views);
    // }
    var clicksArr = [];
    var shownArr = [];
  for(var i = 0; i<Product.all.length; i++){
    var totalResult = Product.all[i];
    clicksArr.push(totalResult.votes);
    shownArr.push(totalResult.seen);
  }
    var ctx = document.getElementById('myChart').getContext('2d');
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:["bag.jpg","banana.jpg","bathroom.jpg","boots.jpg","breakfast.jpg",
        "bubblegum.jpg","chair.jpg","cthulhu.jpg","dog-duck.jpg","dragon.jpg","pen.jpg","pet-sweep.jpg","scissors.jpg","shark.jpg","sweep.png","tauntaun.jpg","unicorn.jpg","usb.gif","water-can.jpg","wine-glass.jpg"
            
          ],
        datasets: [{
          label: '# of clicks',
          data: clicksArr,
          backgroundColor:
            'rgba(178,34,34)', // we can play around here with the colors
         
         
        },
        {
          label: '# of Views',
          data: shownArr,
          backgroundColor:
            'rgba(1, 100, 111, 1)',
         
        }]
      },
      options: {
        scales: {
    
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  

        
