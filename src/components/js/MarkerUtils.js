import L from "leaflet";

// const MarkerConfig = {
//   "civinfra": {
//     fill: "#FEDC56",
//     stroke: "#444444"
//   }
// }

var MarkerUtils = {

  getMarkerSvg(markerClass, active) {
    const iconSize = 16;
    return L.divIcon({ className: `marker-pin-${markerClass}${active ? '-active' : ''}`, iconSize: [iconSize, iconSize] });
    /*
        const circleDiameter = 24;
        // const hoverClass = 'dotted-border';
        let config = MarkerConfig[markerClass];
        return L.divIcon({
          className: `marker-pin-${markerClass}${active ? '-active' : ''}`,
          html: `<svg width="${circleDiameter}" height="${circleDiameter}"><circle cx="${circleDiameter / 2}" cy="${circleDiameter / 2}" r="${circleDiameter / 2}" fill="${config.fill}" stroke="${config.fill}" stroke-width="2" /></svg>`,
          iconSize: [iconSize, iconSize],
          iconAnchor: [12, 12],
        }) */

  }
}

export default MarkerUtils;
