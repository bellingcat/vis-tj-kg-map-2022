import L from "leaflet";

const ImpactConfig = {
  "civinfra": {
    svgPath: `<path d="M21 10H17V8L12.5 6.2V4H15V2H11.5V6.2L7 8V10H3C2.45 10 2 10.45 2 11V22H10V17H14V22H22V11C22 10.45 21.55 10 21 10M8 20H4V17H8V20M8 15H4V12H8V15M12 8C12.55 8 13 8.45 13 9S12.55 10 12 10 11 9.55 11 9 11.45 8 12 8M14 15H10V12H14V15M20 20H16V17H20V20M20 15H16V12H20V15Z" />`
  },
  "privateprop": {
    svgPath: `<path d="M0,21V10L7.5,5L15,10V21H10V14H5V21H0M24,2V21H17V8.93L16,8.27V6H14V6.93L10,4.27V2H24M21,14H19V16H21V14M21,10H19V12H21V10M21,6H19V8H21V6Z" />`
  },
  "borderpost": {
    svgPath: `<path d="M2,3H22V13H18V21H16V13H8V21H6V13H2V3M18.97,11L20,9.97V7.15L16.15,11H18.97M13.32,11L19.32,5H16.5L10.5,11H13.32M7.66,11L13.66,5H10.83L4.83,11H7.66M5.18,5L4,6.18V9L8,5H5.18Z" />`
  }
}

const TagConfig = {
  "socialmedia": {
    fill: "#00E5FF",
    stroke: "#2979FF",
  },
  "satellite": {
    fill: "#81C784",
    stroke: "#33691E",
  },
}

const iconSize = 18;
const circleDiameter = 24;
const defaultIcon = L.divIcon({ className: `marker-pin`, iconSize: [iconSize, iconSize] });

var MarkerUtils = {

  getMarkerSvg(incident, active) {
    // return L.divIcon({ className: `marker-pin-${markerClass}${active ? '-active' : ''}`, iconSize: [iconSize, iconSize] });
    // const hoverClass = 'dotted-border';
    if (!ImpactConfig[incident.impact]) {
      console.error(`Unknown incident impact: ${JSON.stringify(incident)}`);
      return defaultIcon;
    }

    let { svgPath } = ImpactConfig[incident.impact];
    if (!TagConfig[incident.tag]) {
      console.error(`Unknown incident building tag: ${JSON.stringify(incident)}`);
      return defaultIcon;
    }
    let { fill, stroke } = TagConfig[incident.tag];
    return L.divIcon({
      className: `marker-pin-${incident.impact}${active ? '-active' : ''}`,
      // html: `<svg width="${circleDiameter}" height="${circleDiameter}"><circle cx="${circleDiameter / 2}" cy="${circleDiameter / 2}" r="${circleDiameter / 2}" fill="red" stroke="blue" stroke-width="2" /></svg>`,
      html: `<svg fill="${fill}" stroke="${stroke}" stroke-width="1"  width="${circleDiameter}" height="${circleDiameter}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${circleDiameter} ${circleDiameter}">${svgPath}</svg>`,
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize, iconSize],
    })


  }
}

export default MarkerUtils;
