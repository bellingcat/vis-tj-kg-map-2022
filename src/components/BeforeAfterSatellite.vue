<template>
	THIS IS A BEFORE/AFTER
</template>
  
<script>
// import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import config from "../../config";

export default {
	props: {
		map: Object
	},
	data() {
		return {
			before: true
		}
	}, methods: {
		initBeforeAfterImages: function () {
			if(!this.map){
				console.log("NO MAP")
				return
			}
			let imagePane = this.map.createPane("satellite-pane")
			imagePane.style.zIndex = 650;
			// imagePane.style.pointerEvents = 'none';
			// map.getPane('labels').style.zIndex = 650;
			let visible = true;

			var imageUrl = '/satellite/maksat-2022-10-30.jpg';
			var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
			var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
			var latLngBounds = L.latLngBounds([[40.136035, 69.703028], [40.132874295141406, 69.71042909230056]]);

			let imageOverlay1 = L.imageOverlay(imageUrl, latLngBounds, {
				opacity: 1.0,
				errorOverlayUrl: errorOverlayUrl,
				alt: altText,
				interactive: true,
				pane: "satellite-pane"
			}).addTo(this.map);
			// this.map.on('click', (e)=>{
			//   console.log(e)
			// })
			console.log(imageOverlay1)
			let imageOverlay2 = L.imageOverlay('/satellite/maksat-2022-08-30.jpg', latLngBounds, {
				opacity: 1.0,
				errorOverlayUrl: errorOverlayUrl,
				alt: altText,
				interactive: true,
				pane: "satellite-pane"
			}).addTo(this.map);
			console.log(imageOverlay2)

			imagePane.addEventListener('click', (e) => {
				if (visible) {
					imageOverlay1.bringToFront()
				} else {
					imageOverlay2.bringToFront()

				}
				visible = !visible;
			});
		},
	},
	mounted: function () {
		console.log("MOUNTED")
		this.initBeforeAfterImages();
	}
}
</script>