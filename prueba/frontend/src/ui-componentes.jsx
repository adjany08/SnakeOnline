import styled from 'styled-components';

const UlMensajes = styled.ul`
    max-width: 800px;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const LiMensaje = styled.li`
    background-color: transparent;
    border: 2px solid dodgerblue;
    padding: 10px 20px;
`;


const UlGrupos = styled.ul`
    max-width: 800px;
    margin: 20px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const LiGrupo = styled.li`
    background-color: #080808;
    border: 2px solid #ccc;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const GrupoHeader = styled.h4`
    font-size: 1.2em;
    color: #ffffff;
    margin-bottom: 5px;
`;

const UsuariosList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 10px;
`;

const UsuarioItem = styled.li`
    font-size: 1.0em;
    color: #f1f1f1;
    margin-bottom: 5px;
`;

export {
    UlMensajes, 
    LiMensaje,
    UlGrupos,
    LiGrupo,
    GrupoHeader,
    UsuariosList,
    UsuarioItem
}