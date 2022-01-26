const koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const fs = require("fs");
const app = new koa();
const router = new Router();
const port = 300;

app.use(cors());
// doc data tu file JSON truoc de toi uu tai nguyen 
const  dataDevices= JSON.parse(
  // fs.readFileSync(`${__dirname}\\dev-data\\data\\devices.json`)
  fs.readFileSync(`./dev-data/data/devices.json`)
);
const  dataUsers= JSON.parse(
  // fs.readFileSync(`${__dirname}\\dev-data\\data\\devices.json`)
  fs.readFileSync(`./dev-data/data/users.json`)
);

router
///////////user////////////////////////////////
.get("/api/v1/users/gets", (ctx) => {
  let { _user, _pass } = ctx.request.query;
  // search
  let checkUser=dataUsers.findIndex((item) => item.user===_user&&item.pass===_pass );
  console.log(checkUser);
  ctx.body = {
    status: "success",
    comment: "check user account",
    data:{
      id:checkUser,
      user:checkUser!=-1?_user:"",
      pass:checkUser!=-1?_pass:"",
    }
  };
})
// add new Object in file Users.json
.post("/api/v1/users/get-all", (ctx) => {
    // create new device
    
     let { user, pass } = ctx.request.body;
     let checkUser=dataUsers.findIndex((item) => item.user===user );
     console.log(checkUser);
     let status="";
     let comment="";
     if(checkUser===-1){
        const newID = dataUsers[dataUsers.length-1].id + 1;
        const newUser = Object.assign({ id: newID },ctx.request.body);
        dataUsers.push(newUser);
        status="Success"
        comment="create account success"
        // add new device for array and file Users.json
        fs.writeFile(
          `./dev-data/data/users.json`,
          JSON.stringify(dataUsers),
          (err) => {
              if(err){
                  status="Fail"
                  comment="add to file json fail"
              }
          }
        );
     }else{
      status="Fail"
      comment="Have account same name"
     }
     

      ctx.body={
          status: status,
          comment:comment,
          data:dataUsers
        };
})
////////////devices/////////////////////////////
  // respone all data in file devices.json
  .get("/api/v1/devices/get-all", (ctx) => {
    ctx.body = {
      status: "success",
      comment: "get data success",
      data: dataDevices
    };
  })
  // pagination
  .get("/api/v1/devices/gets", (ctx) => {
    let { _limit, _page ,_titleLike} = ctx.request.query;
    
    _limit=Number.parseInt(_limit);
    _page=Number.parseInt(_page);

    // search
    let dataReturn=[];
    dataDevices.forEach((item) => {
      if (
        item.name
          .toLocaleLowerCase()
          .indexOf(_titleLike.toLocaleLowerCase()) != -1
      ) {
        dataReturn.push(item);
      }
    });
    let _totalRows=dataReturn.length;
    // pagination
    dataReturn=dataReturn.slice((_page-1)*_limit,Math.min(_page*_limit,_totalRows));
    ctx.body = {
      status: "success",
      comment: "pagination success",
      data: dataReturn,
      pagination:{
        _limit:_limit,
        _page:_page,
        _totalRows:_totalRows
      }
    };
  })
  // add new Object in file devices.json
  .post("/api/v1/devices/get-all", (ctx) => {
      // create new device
       const newID = dataDevices[dataDevices.length-1].id + 1;
       const newTour = Object.assign({ id: newID },ctx.request.body);
      // add new device for array and file devices.json
       dataDevices.push(newTour);
      fs.writeFile(
        `./dev-data/data/devices.json`,
        JSON.stringify(dataDevices),
        (err) => {
            if(err){
                console.log("Write");
            }else{
                console.log("Sucess");
            }

        }
      );

        ctx.body={
            status: 'success',
            comment:'add device success',
            data:dataDevices
          };
  });

app
  .use(require("koa-body")())
  .use(router.allowedMethods())
  .use(router.routes());
app.listen(port, () => {
  console.log(`Listening in port : ${port}`);
});
