import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class DocumentConsumer(JsonWebsocketConsumer):
    def update_availability(self, event):
        message = event["message"]
        self.send_json(message)

    def connect(self):
        self.doc_id = self.scope.get("url_route").get("kwargs").get("docID")
        self.room_group_name = f"doc_{self.doc_id}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": str("Message received ")}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))


