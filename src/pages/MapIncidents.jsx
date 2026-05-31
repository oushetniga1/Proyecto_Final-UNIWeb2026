import { useEffect, useState } from "react";

import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase/config";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

});

export default function MapIncidents() {

    const [incidentes, setIncidentes] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    const [filtroEstado, setFiltroEstado] = useState("Todos");

    useEffect(() => {

        const cargar = async () => {

            const querySnapshot =
                await getDocs(
                    collection(db, "incidentes")
                );

            const datos = [];

            querySnapshot.forEach((doc) => {

                datos.push({
                    id: doc.id,
                    ...doc.data(),
                });

            });

            setIncidentes(datos);

        };

        cargar();

    }, []);

    // FILTROS
    const incidentesFiltrados = incidentes.filter((inc) => {

        const coincideBusqueda =

            inc.tipo
                ?.toLowerCase()
                .includes(busqueda.toLowerCase())

            ||

            inc.descripcion
                ?.toLowerCase()
                .includes(busqueda.toLowerCase());

        const coincideEstado =

            filtroEstado === "Todos"

            ||

            inc.estado === filtroEstado;

        return coincideBusqueda && coincideEstado;

    });

    return (

        <div className="relative w-full h-[calc(100vh-100px)] mt-6 px-6">

            {/* PANEL SUPERIOR */}
            <div
                className="
          absolute
          top-6
          left-1/2
          -translate-x-1/2
          z-[1000]
          flex
          gap-4
          bg-slate-900/90
          backdrop-blur-xl
          p-5
          rounded-3xl
          border
          border-white/10
        "
            >

                {/* BUSCADOR */}
                <input
                    type="text"
                    placeholder="Buscar incidencia..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                    className="
            px-5
            py-3
            rounded-2xl
            bg-slate-800
            border
            border-white/10
            text-white
            w-72
          "
                />

                {/* FILTRO */}
                <select
                    value={filtroEstado}
                    onChange={(e) =>
                        setFiltroEstado(e.target.value)
                    }
                    className="
            px-5
            py-3
            rounded-2xl
            bg-slate-800
            border
            border-white/10
            text-white
          "
                >

                    <option>
                        Todos
                    </option>

                    <option>
                        Reportado
                    </option>

                    <option>
                        En proceso
                    </option>

                    <option>
                        Resuelto
                    </option>

                </select>

            </div>

            {/* MAPA */}
            <MapContainer
                center={[1.6144, -75.6062]}
                zoom={15}
                scrollWheelZoom={true}
                 className="
                    h-full
                    w-full
                    rounded-3xl
                    border
                    border-white/10
                    shadow-2xl
                    "
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {incidentesFiltrados.map((inc) => (

                    <Marker
                        key={inc.id}
                        position={[
                            inc.latitud || 1.6144,
                            inc.longitud || -75.6062
                        ]}
                    >

                        <Popup>

                            <div className="space-y-2">

                                <img
                                    src={inc.imagenURL}
                                    alt=""
                                    className="
                    w-52
                    h-32
                    object-cover
                    rounded-xl
                  "
                                />

                                <h2 className="font-bold text-lg">
                                    {inc.tipo}
                                </h2>

                                <p>
                                    {inc.descripcion}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {inc.ubicacionTexto}
                                </p>

                                <div
                                    className="
                    inline-block
                    px-3
                    py-1
                    rounded-xl
                    bg-cyan-500/20
                    text-cyan-400
                    text-sm
                  "
                                >
                                    {inc.estado}
                                </div>

                            </div>

                        </Popup>

                    </Marker>

                ))}

            </MapContainer>

        </div>

    );

}