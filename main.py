from flask_socketio import SocketIO, emit, send
from flask import Flask, render_template, send_from_directory, make_response, request, Response


roomList = [
  {
    "name": "Room 1",
    "inputs": [],
    "outputs": []
  }
]

inputDict = {
  "0": {
    "name": "Input 1",
    "output_id": "0",
  }
}
  
outputDict = {
  "0": {
    "name": "Input 1",
    "type": "toggle",
    "value": 0,
    "s_id": None
  }
}

devices = []

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
  devices.append(request.sid)
  # roomObject = [{
  #     "name": room["name"],
  #     "inputs": [inputDict[i] for i in inputDict if i in room["inputs"]],
  #     "outputs": [outputDict[i] for i in outputDict if i in room["outputs"]],
  #   } for room in roomList]

@socketio.on('device io update')
def update_device_io(data):
  print("device io update", data)
  for input in data["inputs"]:
    inputDict[input["id"]] = { **input, "s_id": request.sid }
  for output in data["outputs"]:
    outputDict[output["id"]] = { **output, "s_id": request.sid }  
  # emit('output event', (id, value), broadcast=True)

@socketio.on('input event')
def input_event_handler(data):
  print("input event", data)
  outputDict[inputDict[data.id].output_id][value] = value
  
  emit('output event', (id, value), broadcast=True)

if __name__ == '__main__':
  main()