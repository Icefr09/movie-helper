import React from 'react';
import Iframe from 'react-iframe'


class NearbyTheatre extends React.Component {
    render() {
        return (
            <div>
                <div><a href={"https://nearbytheater.s3.amazonaws.com/index.html"}>link to original map api</a></div>
                <Iframe url="https://nearbytheater.s3.amazonaws.com/index.html"
                        width="1440px"
                        height="900px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"/>
            </div>
        )
    }
}

export default NearbyTheatre;
