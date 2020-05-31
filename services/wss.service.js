const SocketIO = require('socket.io');
const { get } = require('lodash');

let io;

class WssService {
    static async init(app) {
      io = SocketIO(app);
    
      io.on('connection', (socket) => {
        console.log('connect soscket, success');
        // const uuid = get(socket, 'handshake.query.uuid', false);
        // if(uuid) {
          // console.log('connect soscket^ success', uuid);
        //   socket.join(uuid);
        // }
      });
    }


    static async sendMessage({ event, data }) {
      io.sockets.emit(event, data);
    }
}


module.exports = WssService;
