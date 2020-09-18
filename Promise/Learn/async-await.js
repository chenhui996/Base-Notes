function getJson() {
  return new Promise((reslove, reject) => {
    setTimeout(function () {
      console.log(2);
      reslove(2);
    }, 2000);
  });
}

// async function testAsync(){
//     await getJson();
//     console.log(3);
// }

// testAsync();

//等同于

function testAsync() {
  return new Promise((reslove, reject) => {
    getJson().then(function (res) {
      console.log(3);
    });
  });
}

testAsync();
