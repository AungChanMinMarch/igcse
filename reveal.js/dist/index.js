function shuffle(){
	location.hash = "";

	const slides = Array.from(document.querySelectorAll(".slides > section"));

	// Start from the element before last one and swap
	// beacuse we don't want to move the first element that's why i > 0
	for (var i = slides.length - 1; i > 0; i--) {
		// Pick a random index from 0 to i inclusive
		let j = Math.floor(Math.random() * (i + 1));
		if(j == 0) continue;
		slides[j].before(slides[i])
		slides[i-1].after(slides[j])
	}
}
const pointerConfig = {
    key: "q", // key to enable pointer, default "q", not case-sensitive
    color: "red", // color of a cursor, default "red" any valid CSS color
    opacity: 0.8, // opacity of cursor, default 0.8
    pointerSize: 15, // pointer size in px, default 12
    alwaysVisible: false, // should pointer mode be always visible? default "false"
    tailLength: 10, // NOT IMPLEMENTED YET!!! how long the "tail" should be? default 10
}
const endpoint =location.pathname.split('/').pop();
const menuConfig = {
    side: 'left', //left or right
    width: '80%',// 'normal', 'wide', 'third', 'half', 'full', or any valid css length value
    numbers: "true",
    titleSelector: 'h1, h2, h3, h4, h5, h6',
    useTextContentForMissingTitles: false,
    hideMissingTitles: 'true',

    // Adds markers to the slide titles to indicate the
    // progress through the presentation. Set to 'false'
    // to hide the markers.
    markers: false,
    themes: [
        { name: 'Black', theme: '/dist/theme/black.css' },
        { name: 'White', theme: '/dist/theme/white.css' },
        { name: 'League', theme: '/dist/theme/league.css' },
        {
          name: 'Dark',
          theme: '/dist/theme/black.css',
          highlightTheme: '/plugin/highlight/monokai.css'
        },
        {
          name: 'Code: Zenburn',
          highlightTheme: '/plugin/highlight/zenburn.css'
        }
    ],
    transitions: true,
    openButton: true,
    openSlideNumber: true,
    keyboard: true,
    sticky: false,
    autoOpen: true,
    delayInit: false,
    openOnInit: false,
    loadIcons: true,
    custom: [
      {
        title: '4',
        icon: '<i class="fa fa-link">',
        content: `<h1>Past papers</h1>
<ul class="slide-menu-items">
  <li class="slide-menu-item">
    <a href="/physics/cq/${endpoint}">Choice Questions</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/sq/${endpoint}">Short Questions</a>
  </li>
   <li class="slide-menu-item">
    <a href="/physics/pq/${endpoint}">Practical Questions</a>
  </li>
</ul>
<h2>Chapter 4</h2>
<ul class="slide-menu-items">
  <li class="slide-menu-item">
    <a href="/physics/ch/4.1">4.1 Energy</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.2">4.2 Conservation of energy</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.3">4.3 Fuel for Electricity</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.4">4.4 Nuclear Energy</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.5">4.5 Energy from the wind and water</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.6">4.6 Energy from the Sun and Earth</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.7">4.7 Energy and the environment</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.8">4.8 Energy and Work</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/4.9">4.9 Power</a>
  </li>
</ul>`
      },
      {
        title: 'Main Menu',
        icon: '<i class="fa fa-info">',
        content: `<h1>IGCSE PHYSICS</h1>
<ul class="slide-menu-items">
  <li class="slide-menu-item">
    <a href="/physics/ch/1">1 Motion</a>
    <ul class="slide-menu-items">
      <li class="slide-menu-item">
        <a href="/physics/ch/1.1">1.1 making measurements</a>
      </li>
      <li class="slide-menu-item">
        <a href="/physics/ch/1.2">1.2 velocity</a>
      </li>
    </ul>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/ch/2">2. Forces and their effects</a>
  </li>
   <li class="slide-menu-item">
    <a href="/physics/ch/3">3 Force in equilibrium</a>
  </li>
  </li>
   <li class="slide-menu-item">
    <a href="/physics/ch/4">4 Energy</a>
  </li>
</ul>`
      },
      {
        title: 'Past Papers',
        icon: '<i class="fa fa-info">',
        content: `<h1>IGCSE PHYSICS</h1>
        <h2>2022 Oct</h2>
<ul class="slide-menu-items">
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022oct1">1 choice Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022oct2">2 choice Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022oct3">3 short Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022oct4">4 short Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022oct5">5 Practical Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022oct6">6 Practical Question</a>
  </li>
</ul>

<h2>2022 May</h2>
<ul class="slide-menu-items">
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022may1">1 choice Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022may2">2 choice Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022may3">3 short Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022may4">4 short Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022may5">5 Practical Question</a>
  </li>
  <li class="slide-menu-item">
    <a href="/physics/igcse/2022may6">6 Practical Question</a>
  </li>
</ul>
`
      }

    ]
}

const drawerConfig = {
    toggleDrawKey: "d", // (optional) key to enable drawing, default "d"
    toggleBoardKey: "t", // (optional) key to show drawing board, default "t"
    colors: ["#fa1e0e", "#8ac926", "#1982c4", "#ffca3a"], // (optional) list of colors avaiable (hex color codes)
    color: "#FF0000", // (optional) color of a cursor, first color from `codes` is a default
    pathSize: 4, // (optional) path size in px, default 4
}
const mathjax3Config = {
    mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    tex: {
      inlineMath: [ [ '$', '$' ], [ '\\(', '\\)' ]  ]
    },
    options: {
      skipHtmlTags: [ 'script', 'noscript', 'style', 'textarea', 'pre' ]
    }
}
// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
const revealConfig = {
	hash: true,
	slideNumber: true,
	pdfSeparateFragments: false,
	pointer: pointerConfig,
	menu: menuConfig,
	drawer: drawerConfig,
	mathjax3: mathjax3Config, 
	plugins: [ RevealMath.MathJax3, RevealHighlight, RevealNotes, RevealPointer, RevealDrawer, RevealMenu ],
    dependencies: [
    	{
    		src: '/plugin/external/deck_from_params.js', 
    		// condition: function() { return !!document.querySelector('[data-external-replace], [data-external]'); } 
    	}
    ]
}

Reveal.initialize(revealConfig)

function resetSlideScrolling(slide) {
    slide?.classList.remove('scrollable-slide');
}

function handleSlideScrolling(slide) {
    if (slide.clientHeight >= 800) {
        slide.classList.add('scrollable-slide');
    }
}

Reveal.addEventListener('ready', function (event) {
    handleSlideScrolling(event.currentSlide);
});

Reveal.addEventListener('slidechanged', function (event) {
    resetSlideScrolling(event.previousSlide)
    handleSlideScrolling(event.currentSlide);
});