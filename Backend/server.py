import json
import paho.mqtt.client as mqtt

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
  }
}

devices = []

def on_device_io_update(device_id, data):
    for index, input in enumerate(data["inputs"]):
        inputDict[f'{device_id}-{index}'] = input
    for index, output in enumerate(data["outputs"]):
        outputDict[output[f'{device_id}-{index}']] = output

def input_event_handler(device_id, data):
  print("input event", data)
  outputDict[inputDict[device_id + data["input_id"]].output_id].value = data.value

callbackMap = {
    "io_update": on_device_io_update,
    "io_event": input_event_handler
}

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # add the client's id to the devices list
    devices.append(client._client_id)
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    # check if the message is a device io update
    action = msg.topic.split("/")[1]
    if action in callbackMap:
        callbackMap[action](msg.topic.split("/")[0], json.loads(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("192.168.0.152", 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()