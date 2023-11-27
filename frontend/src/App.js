import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import Axios from 'axios';



import {
    UlMensajes,
    LiMensaje,
    UlGrupos,
    LiGrupo,
    GrupoHeader,
    UsuariosList,
    UsuarioItem,
} from './ui-componentes';

const socket = io('https://enigmatic-headland-23898-58474ba765b2.herokuapp.com/');



function App() {

    const [isConnected, setIsConnected] = useState(false);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [groupId, setGroupId] = useState(null);
    const [username, setUsername] = useState('');
    const [groupName, setGroupName] = useState('');
    const [gruposList, setGruposList] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#ff0000');


    useEffect(() => {
        socket.on('connect', () => setIsConnected(true));

        socket.on('chat_message', (data) => {
            setMensajes((mensajes) => [...mensajes, data]);
        });

        return () => {
            socket.off('connect');
            socket.off('chat_message');
        };
    }, []);

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const enviarMensaje = () => {
        socket.emit('chat_message', {
            usuario: username,
            mensaje: nuevoMensaje,
            groupId: groupId,
            color: selectedColor,
        });
    };

    const handleJoinGroup = () => {
        setGroupId(groupName);
        socket.emit('join_group', { groupId: groupName, username, color: selectedColor });
    };

    const handleLeaveGroup = () => {
        socket.emit('leave_group', { groupId, username });
        setGroupId(null);
        setMensajes([]);
        document.querySelector(".inicio").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
    };

    const getGrupos = () => {
        Axios.get('https://enigmatic-headland-23898-58474ba765b2.herokuapp.com/grupos').then((response) => {
            if (Array.isArray(response.data)) {
                setGruposList(response.data);
                document.querySelector(".losGrupos").style.display = "block";
            } else {
                console.error("La respuesta del servidor no es un array:", response.data);
            }
        });
    };

    const volver = () => {
        document.querySelector(".losGrupos").style.display = "none";
    };


    const volver2 = () => {
        document.querySelector(".inicio").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
    }

    const volver3 = () => {
        document.querySelector(".crearGrupo").style.display = "none";
        document.querySelector(".menu").style.display = "flex";
    }

    const crearPartida = () => {
        document.querySelector(".menu").style.display = "none";
        document.querySelector(".crearGrupo").style.display = "block";
    };
    
    const unirsePartida = () => {
        document.querySelector(".menu").style.display = "none";
        document.querySelector(".inicio").style.display = "block";
    };

    const [tipoPartida, setTipoPartida] = useState('tiempo');

    const handleTipoPartidaChange = (e) => {
        setTipoPartida(e.target.value);
    };
    const redirectToHTMLPage = () => {
        window.location.href = process.env.PUBLIC_URL + '/snake1.html'; 
        };

        const redirectToHTMLPage2 = () => {
            window.location.href = process.env.PUBLIC_URL + '/index2.html'; 
            };

    const [maxJugadores, setMaxJugadores] = useState(2);
    
    const [tiempo, setTiempo] = useState(0);
    
    const [largo, setLargo] = useState(0);
    
    const handleCreateGroup = () => {
        socket.emit('create_group', {
            groupId: groupName,
            username,
            color: selectedColor,
            tipoPartida,
            maxJugadores: maxJugadores,
            tiempo: tiempo,
            largo: largo
        });
        setGroupId(groupName);
        //cerrar ventana y mostrar chat
        document.querySelector(".crearGrupo").style.display = "none";
        document.querySelector(".inicio").style.display = "block";

    };

    return (
        
        

        <div className="App">
            <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
            <div className="menu">
                <h1>Snake.IO</h1>
                <h2>¡Bienvenido!</h2>
                <button className="btn-main" onClick={crearPartida}>Crear una partida</button>
                <button className="btn-main" onClick={unirsePartida}>Unirse a una partida</button>
                <button className="btn-main">Ver ranking</button>
            </div>
            <div className="inicio">
                {groupId ? (
                    <div>
                        <h3>Conectado al Grupo: {groupId}</h3>
                        <button className="btn-main" onClick={handleLeaveGroup}>Salir del Grupo</button>
                        <button className="btn-main" onClick={redirectToHTMLPage}>Jugar por tiempo</button> 
                        <button className="btn-main" onClick={redirectToHTMLPage2}>Jugar por largo</button> 
                        <UlMensajes>
                            {mensajes.map((mensaje) => (
                                <LiMensaje key={mensaje.usuario + mensaje.mensaje}>
                                    <span style={{ color: mensaje.color }}>{mensaje.usuario}:</span> {mensaje.mensaje}
                                </LiMensaje>
                            ))}
                        </UlMensajes>
                        <input
                            type="text"
                            className='input'
                            onChange={(e) => setNuevoMensaje(e.target.value)}
                        />
                        <button className="btn-main" onClick={enviarMensaje}>Enviar</button>
                    </div>
                ) : (
                    <div className='datos'>
                        <label>
                            Ingrese su nombre de usuario:
                            <input className="input"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Ingrese el nombre del grupo:
                            <input className="input"
                                type="text"
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </label>
                        <br />
                        <div className='Color'>
                            <label htmlFor="colorPicker">Selecciona un color:</label>
                            <br />
                            <input
                                type="color"
                                id="colorPicker"
                                value={selectedColor}
                                onChange={handleColorChange}
                            />
                            <p>El color seleccionado es: <span style={{ color: selectedColor }}>{selectedColor}</span></p>
                        </div>
                        <button className="btn-main" onClick={handleJoinGroup}>Unirse a Grupo</button>
                        <button className="btn-main" onClick={volver2}>Volver</button>
                    </div>
                )}
                <button className="btn-main" onClick={getGrupos}>Ver Grupos</button>
                <div className="losGrupos">
                    <h1>Historial de Grupos</h1>
                    <div className="grupos">
                        <UlGrupos>
                            {gruposList?.map((grupo) => (
                                <LiGrupo key={grupo.id}>
                                    <GrupoHeader>Nombre de grupo: {grupo.id}</GrupoHeader>
                                    <p>Tipo: {grupo.tipo}</p>
                                    <p>Máximo de Jugadores: {grupo.maxJugadores}</p>
                                    <p>Usuarios conectados:</p>
                                    <UsuariosList>
                                        {grupo.jugadores.map((jugador) => (
                                            <UsuarioItem key={jugador.id} style={{ color: jugador.color }}>
                                                {jugador.nombre}
                                            </UsuarioItem>
                                        ))}
                                    </UsuariosList>
                                </LiGrupo>
                            ))}
                        </UlGrupos>
                    </div>

                    <button className="btn-main" onClick={volver}>Volver</button>
                </div>
            </div>

            <div className = "crearGrupo">
                <h1>Crear Grupo</h1>
                <div className = "datos">
                    <label>
                        Ingrese su nombre de usuario:
                        <input className="input"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Ingrese el nombre del grupo:
                        <input className="input"
                            type="text"
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </label>
                    <br />
                    <div className='Color'>
                        <label htmlFor="colorPicker">Selecciona un color:</label>
                        <br />
                        <input
                            type="color"
                            id="colorPicker"
                            value={selectedColor}
                            onChange={handleColorChange}
                        />
                        <p>El color seleccionado es: <span style={{ color: selectedColor }}>{selectedColor}</span></p>
                    </div>

                    {/*si elige tiempo se hace display del input para tiempo maximo, sino para largo maximo*/}
                    <label>
                        Elija el tipo de partida:
                        <select className="input" value={tipoPartida} onChange={handleTipoPartidaChange}>
                            <option value="tiempo">Por tiempo</option>
                            <option value="largo">Por largo</option>
                        </select>
                    </label>
                    <br />
                    {tipoPartida === 'tiempo' && (
                        <label className="tiempo">
                            Ingrese el tiempo máximo de la partida:
                            <input
                                className="input"
                                type="text"
                                pattern="[1-9]|1[0-5]"
                                onChange={(e) => setTiempo(e.target.value)}
                            />
                        </label>
                    )}
                    {tipoPartida === 'largo' && (
                        <label className="largo">
                            Ingrese el largo máximo de la partida:
                            <input
                                className="input"
                                type="text"
                                pattern="[1-9]|1[0-5]"
                                onChange={(e) => setLargo(e.target.value)}
                            />
                        </label>
                    )}
                    <br />
                    {/*input para maximo jugadores*/}
                    <label>
                        Ingrese el máximo de jugadores:
                        <input className="input"
                            type="text"
                            onChange={(e) => setMaxJugadores(e.target.value)}
                        />
                    </label>

                    <button className="btn-main" onClick={handleCreateGroup}>Crear Grupo</button>
                    <button className="btn-main" onClick={volver3}>Volver</button>
                </div>
            </div>

        </div>
    );
}

export default App;
