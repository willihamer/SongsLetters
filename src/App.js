import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Cancion from './components/Cancion';
import Formulario from './components/Formulario';
import Info from './components/Info';



function App() {

    const [busquedaLetra, setBusquedaLetra] = useState({});
    const [letra, setLetra] = useState('');
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (Object.keys(busquedaLetra).length === 0) {
            return;
        }

        const consultarApiLetra = async () => {

            const url = `https://api.lyrics.ovh/v1/${busquedaLetra.artista}/${busquedaLetra.cancion}`;
            const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busquedaLetra.artista}`;



            const [letra, informacion] = await Promise.all([
                Axios.get(url),
                Axios.get(url2),
            ]);

            setLetra(letra.data.lyrics);
            setInfo(informacion.data.artists[0]);

            setBusquedaLetra({});
        }

        consultarApiLetra();
    }, [busquedaLetra, info])

    return (
        <Fragment>
            <Formulario
                setBusquedaLetra={setBusquedaLetra}
            />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <Info info={info} />
                    </div>
                    <div className="col-md-6">
                        <Cancion letra={letra} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
