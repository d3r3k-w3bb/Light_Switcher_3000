#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <Servo.h>
#include <TaskScheduler.h>
#include "conf.h"
//#include "SocketIOClient.h"
#include <Hash.h>
#include <stdio.h>

//SocketIOClient socket;
//Derek is cool
Servo switch1;
Servo switch2;

#define B1 D1
#define B2 D2
#define s1 D5
#define s2 D6
#define AN_IN A0
#define LED D7 //changing this
#define built_in_led D0
#define builtin2 D4

bool B1_state = LOW;
bool B2_state = LOW;
bool leds_onoff = HIGH;

bool onoff = 0;

int count = 0;

Scheduler runner;

bool debounceB1() {
  static uint16_t state = 0;
  state = (state<<1) | digitalRead(B1) | 0xfe00;
  return (state == 0xff00);
}

bool debounceB2() {
  static uint16_t state2 = 0;
  state2 = (state2<<1) | digitalRead(B2) | 0xfe00;
  return (state2 == 0xff00);
}

void check_buttons(){
  if (debounceB1()){
    static bool b1_state = HIGH;
    b1_state ? switch1.write(0) : switch1.write(78);
    if (b1_state){
      analogWrite(LED, 150);
      leds_onoff = LOW;
    }
    else{
      leds_onoff = HIGH;
    }
    b1_state = !b1_state;
  }
  if (debounceB2()){
    static bool b2_state = HIGH;
    b2_state ? switch2.write(7) : switch2.write(82);
    b2_state = !b2_state;
  }
}

void sense_light(){
  static int duty = 150;
  static int value = 0;
  if(!leds_onoff){
    int sensor = analogRead(AN_IN);
    int value = map(sensor, 0, 650, 3, 254);
    if(duty < value){
      analogWrite(LED, ++duty);  
    }
    if(duty > value){
      analogWrite(LED, --duty);
    }
    else{
      analogWrite(LED, duty);
    }
  }
  else{
    analogWrite(LED,0);
  }
}

Task Sense(200,TASK_FOREVER, &sense_light);

// Replace with your network credentials
const char* ssid = SECRET_SSID;
const char* password = SECRET_PASS;

//-------------------------------------------------------------------

void setup() {

  digitalWrite(builtin2, HIGH);
  Serial.begin(115200);
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }

  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnderm");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  pinMode(B1, INPUT_PULLUP);
  pinMode(B2, INPUT_PULLUP);

  switch1.attach(s1);
  switch2.attach(s2);
  switch1.write(78);
  switch2.write(82);
  pinMode(built_in_led, OUTPUT);
  digitalWrite(built_in_led, HIGH);

  runner.addTask(Sense);
  //runner.addTask(Buttons);
  Sense.enable();

}

void loop() {
  ArduinoOTA.handle();
  runner.execute();
  //socket.monitor();
  if (count % 50 == 0){  
    check_buttons();
  }
  count++;
}
