import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

const LocationMap = () => {
    const { geoLocationData } = useSelector((state) => state.geoLocation);
    const position = [geoLocationData.lat, geoLocationData.lng];
    return (
        <div className="w-full h-[300px]">
            <MapContainer
                center={position}
                zoom={8}
                maxZoom={18}
                minZoom={3}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="">
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
            ,
        </div>
    );
};

export default LocationMap;
