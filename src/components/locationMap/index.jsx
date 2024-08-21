import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const LocationMap = ({ location, address }) => {
    const position = [location[1], location[0]];
    return (
        <div className="w-full h-[300px]">
            <MapContainer
                center={position}
                zoom={16}
                maxZoom={18}
                minZoom={3}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="">{address}</div>
                        <br />
                        <a
                            href={'https://maps.google.com?q=' + address}
                            target="_blank"
                        >
                            Open address in google map
                        </a>
                    </Popup>
                </Marker>
            </MapContainer>
            ,
        </div>
    );
};

export default LocationMap;
