const {io}= require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Doble v'));
bands.addBand(new Band('metalica'));
bands.addBand(new Band('queen'));
bands.addBand(new Band('kase o'));

// mensajes de sockets
io.on('connection', client => {

    console.log("clitne conetado");

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => {
        console.log("clitne desconectado");
    });


    client.on("mensaje", (res)=>{
        console.log("mensaje !!!" , res['nombre']);
        io.emit("mensaje", {admin: "nuevo mensaje"});
    });


    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());

    });

    client.on('add-band', (payload)=>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());

    });

    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());

    });

    // client.on('emitir-mensaje', (payload)=>{
    //     client.broadcast.emit('nuevo-mensaje' , payload);
    // });

  });