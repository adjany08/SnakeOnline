// GroupComponent.js
import React from 'react';

function GroupComponent({ onJoinGroup, setUsername, setGroupName, selectedColor, handleColorChange }) {
    return (
        <div className='datos'>
            <label>
                Ingrese su nombre de usuario:
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Ingrese el nombre del grupo:
                <input
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
                <p>El color seleccionado es: <span style={{ color: selectedColor, backgroundColor: 'white', padding: '4px' }}>
            {selectedColor}
        </span></p>

            </div>
            <button onClick={onJoinGroup}>Unirse a Grupo</button>
        </div>
    );
}

export default GroupComponent;
