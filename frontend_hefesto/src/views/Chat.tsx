import { useEffect, useRef, useState } from "react"
import styles from "./css/Chat.module.css"

type Props = {}

function Chat({}: Props) {
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [userText,setUserText]=useState<string>("")

    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket("ws://localhost:8000/ws");

            ws.current.onmessage = (event) => {
                setMessages((prev) => [...prev, event.data]);
            };

            ws.current.onclose = () => {
                console.warn("WebSocket cerrado. Intentando reconectar...");
                setTimeout(connectWebSocket, 3000); // Intenta reconectar después de 3 segundos
            };
        };

        connectWebSocket();
        return () => ws.current?.close();
    }, []);
    const handleClick=async()=>{
        if(userText.length<=0){
            return
        }
        try {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(userText);
                setUserText("")
            }
            
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema con la solicitud.");
        }

    };
    return (
        <div className={styles.div__main__container}>
            <section className={styles.div__container__chat}>
                {messages.map((item,index)=>(
                    <div className={styles.div__msg} key={index}>{item}</div>
                ))}
            </section>
            <section className={styles.div__container__msg}>
                <div className={styles.div__contianer__input}>
                    <input onChange={e=>setUserText(e.target.value)} value={userText} type="text" placeholder="Ingrese su mensaje aqui" className={styles.input__main} />
                    <button type="button" onClick={handleClick} className={styles.btn__send}>send</button>
                </div>
            </section>
        </div>
    )
}

export default Chat