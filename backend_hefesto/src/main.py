from fastapi import FastAPI,WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from models.index import ConnectionManager

app = FastAPI()

app.add_middleware(CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las fuentes (puedes restringirlo)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],)

manager=ConnectionManager()
@app.websocket("/ws")
async def send_msg_user(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data= await websocket.receive_text()
            await manager.broadcast(data)
    except WebSocketDisconnect:
       manager.disconnect(websocket)