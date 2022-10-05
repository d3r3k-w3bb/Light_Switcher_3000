from flask_socketio import SocketIO, emit, send
from flask import Flask, render_template, send_from_directory, make_response, request, Response

def main():
  socketio.run(app, host="0.0.0.0")
  pass


app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/static/<path:path>')
def send_js(path):
  return send_from_directory('static', path)

@socketio.on('connect')
def handle_connect():
  print("connected")
  
  # roomObject = [{
  #     "name": room["name"],
  #     "inputs": [inputDict[i] for i in inputDict if i in room["inputs"]],
  #     "outputs": [outputDict[i] for i in outputDict if i in room["outputs"]],
  #   } for room in roomList]

if __name__ == '__main__':
  main()