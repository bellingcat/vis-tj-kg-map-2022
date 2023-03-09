const config = {
	title: "tj-kg",
	display_title: "Tajikistan - Kyrgyzstan border conflict 2022",
	//   SERVER_ROOT: "https://ukraine.bellingcat.com/ukraine-server",
	// MEDIA_EXT: "/api/media",

	app: {
		map: {
			// anchor: { lat: 39.936132, lon: 69.931180 },
			anchor: { lat: 40.135035, lon:  69.705028 },
			maxZoom: 18,
			minZoom: 4,
			startZoom: 17,
			wheelPxPerZoomLevel: 120,
			mapboxToken: "pk.eyJ1IjoiYmVsbGluZ2NhdC1tYXBib3giLCJhIjoiY2tleW0wbWliMDA1cTJ5bzdkbTRraHgwZSJ9.GJQkjPzj8554VhR5SPsfJg",
			tiles: {
				current: "bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy",
				default: "bellingcat-mapbox/cl0qnou2y003m15s8ieuyhgsy",
				satellite: "bellingcat-mapbox/cl1win2vp003914pdhateva6p"
			},
		},
		cluster: { radius: 50, minZoom: 5, maxZoom: 12 },
		toolbar: {
			panels: {
				categories: {
					// TRUE: {
					//   icon: "public",
					//   label: "Verified",
					//   description: "todo",
					// },
					// FALSE: {
					//   icon: "public",
					//   label: "Unverified",
					//   description: "todo",
					// }
				},
			},
		},
		spotlights: {},
	},
	ui: {
	},
	features: {
		EXAMPLE_FEATURE_ENABLED: true
	},
	data: {
		points: [
			{
				place: "Aksay",
				lat: 39.878436,
				lon: 70.517653
			},
			{
				place: "Aksay",
				lat: 39.903736379867006,
				lon: 70.50912809
			},
			{
				place: "Aksay",
				lat: 39.90254721,
				lon: 70.50651528
			},
			{
				place: "Aksay",
				lat: 39.89526892,
				lon: 70.50508899
			},
			{
				place: "near Vorukh",
				lat: 39.817128,
				lon: 70.563832
			},
			{
				place: "Aksay",
				lat: 39.88587735,
				lon: 70.52536937
			},
			{
				place: "Aksay",
				lat: 39.88079405,
				lon: 70.51990636
			},
			{
				place: "Batken",
				lat: 40.05573171,
				lon: 70.81563451
			},
			{
				place: "Batken",
				lat: 40.05481281,
				lon: 70.81469465
			},
			{
				place: "International",
				lat: 40.12198942,
				lon: 69.67022984
			},
			{
				place: "International",
				lat: 40.12198942,
				lon: 69.67022984
			},
			{
				place: "International",
				lat: 40.12061159,
				lon: 69.6695246
			},
			{
				place: "Ak-tatyr",
				lat: 39.95940483,
				lon: 70.49366866
			},
			{
				place: "Arka/Dostuk",
				lat: 40.19429693,
				lon: 69.88126146
			},
			{
				place: "Arka",
				lat: 40.20091346,
				lon: 69.88275196
			},
			{
				place: "Arka",
				lat: 40.20079005,
				lon: 69.88211026
			},
			{
				place: "Arka",
				lat: 40.18096749,
				lon: 69.79609889
			},
			{
				place: "Borborduk",
				lat: 40.18801267,
				lon: 69.8280565
			},
			{
				place: "Maksat",
				lat: 40.1285475,
				lon: 69.69366756
			},
			{
				place: "Maksat",
				lat: 40.12383212,
				lon: 69.68600073
			},
			{
				place: "Maksat",
				lat: 40.13500432,
				lon: 69.7034326
			},
			{
				place: "Maksat",
				lat: 40.12829971,
				lon: 69.69499181
			},
			{
				place: "Maksat",
				lat: 40.12860644,
				lon: 69.69572182
			},
			{
				place: "Maksat",
				lat: 40.12790328,
				lon: 69.69322378
			},
			{
				place: "Maksat",
				lat: 40.12723558,
				lon: 69.69370291
			},
			{
				place: "Min-Oruk",
				lat: 40.00122147,
				lon: 70.61968979
			},
			{
				place: "Kyzyl Bel",
				lat: 40.103436,
				lon: 70.74398419
			},
			{
				place: "Kyzyl Bel",
				lat: 40.11146421,
				lon: 70.73336293
			},
			{
				place: "Kyzyl Bel",
				lat: 40.10223794,
				lon: 70.74359423
			},
			{
				place: "Dostuk",
				lat: 40.05245461,
				lon: 70.63287747
			},
			{
				place: "Dostuk",
				lat: 40.05383139,
				lon: 70.62908358
			},
			{
				place: "Dostuk",
				lat: 40.05017637,
				lon: 70.62888497
			},
			{
				place: "Dostuk",
				lat: 40.05682534,
				lon: 70.62798257
			},
			{
				place: "Dostuk",
				lat: 40.05739489,
				lon: 70.62757329
			},
			{
				place: "Dostuk",
				lat: 40.05804754,
				lon: 70.62754259
			},
			{
				place: "Dostuk",
				lat: 40.05297909,
				lon: 70.63427886
			},
			{
				place: "Dostuk",
				lat: 40.05626627,
				lon: 70.62838991
			},
			{
				place: "Arka/Dostuk",
				lat: 40.18657375,
				lon: 69.88360858
			},
			{
				place: "Min-Bulak",
				lat: 39.97393841,
				lon: 70.60686414
			},
			{
				place: "Chorkuh",
				lat: 39.98055119,
				lon: 70.57441117
			},
			{
				place: "Ovchi-Kalacha",
				lat: 40.12627841,
				lon: 69.68420486
			},
			{
				place: "Lakkon",
				lat: 40.17148176,
				lon: 70.86439502
			}
		]
	}
};

export default config;
