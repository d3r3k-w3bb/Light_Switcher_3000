#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define LED0 D0

// Replace with your network credentials
const char* ssid = "Ludwig WAN Beethoven";
const char* password = "V4dR\\nYXn-6B%MNv";

const char *mqtt_broker = "192.168.0.152"; // Enter your WiFi or Ethernet IP
const int mqtt_port = 1883;
WiFiClient espClient;
PubSubClient client(espClient);
const String topic = WiFi.macAddress() + "/io_update";

struct input_device {
  String name;
  String output_id;
};

enum kInputTypes {
  toggle,
};

struct output_device {
  String name;
  kInputTypes input_type;
  bool value;
};

void setup() {
  pinMode(LED0, OUTPUT);
  // Set software serial baud to 115200;
  Serial.begin(115200);

  // connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
 
  while (!client.connected()) {
    String client_id = "esp8266-client-";
    client_id += String(WiFi.macAddress());

    Serial.printf("The client %s connects to mosquitto mqtt broker\n", client_id.c_str());
  
    if (client.connect(client_id.c_str())) {
      Serial.println("Public emqx mqtt broker connected");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  // publish and subscribe
  client.subscribe((WiFi.macAddress() + "\*\status").c_str());

  // 
  client.publish(topic.c_str(), "{\"inputs\":[{\"name\":\"Input1\",\"output_id\":-1}],\"outputs\":[]}");
}

void callback(char *topic, byte *payload, unsigned int length) {
 Serial.print("Message arrived in topic: ");
 Serial.println(topic);
 Serial.print("Message:");
 
 for (int i = 0; i < length; i++) {
  Serial.print((char) payload[i]);
 }
 
 Serial.println();
 Serial.println(" - - - - - - - - - - - -");
}
void loop() {
 client.loop();
}