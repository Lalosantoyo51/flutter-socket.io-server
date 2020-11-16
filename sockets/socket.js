const {io}= require('../index');
// mensajes de sockets
io.on('connection', client => {
    console.log("clitne conetado");
    client.on('disconnect', () => {
        console.log("clitne desconectado");
    });
    client.on("mensaje", (res)=>{
        console.log("mensaje !!!" , res['nombre']);
        io.emit("mensaje", {admin: "nuevo mensaje"});
    });

  });