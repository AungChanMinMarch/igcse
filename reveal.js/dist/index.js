function shuffle(){
    document.getElementById('test').innerHTML = '<img src="/img/22March1_05.jpg">'
	location.hash = "";

	const slides = Array.from(document.querySelectorAll("section"));

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
const menuConfig = {
    side: 'left',
    width: 'full',
    numbers: "true",
    titleSelector: 'h1, h2, h3, h4, h5, h6',
    useTextContentForMissingTitles: false,

    // Hide slides from the menu that do not have a title.
    // Set to 'true' to only list slides with titles.
    hideMissingTitles: 'true',

    // Adds markers to the slide titles to indicate the
    // progress through the presentation. Set to 'false'
    // to hide the markers.
    markers: false,

    // Specifies the themes that will be available in the themes
    // menu panel. Set to 'true' to show the themes menu panel
    // with the default themes list. Alternatively, provide an
    // array to specify the themes to make available in the
    // themes menu panel, for example...
    //
    // [
    //     { name: 'Black', theme: 'dist/theme/black.css' },
    //     { name: 'White', theme: 'dist/theme/white.css' },
    //     { name: 'League', theme: 'dist/theme/league.css' },
    //     {
    //       name: 'Dark',
    //       theme: 'lib/reveal.js/dist/theme/black.css',
    //       highlightTheme: 'lib/reveal.js/plugin/highlight/monokai.css'
    //     },
    //     {
    //       name: 'Code: Zenburn',
    //       highlightTheme: 'lib/reveal.js/plugin/highlight/zenburn.css'
    //     }
    // ]
    //
    // Note: specifying highlightTheme without a theme will
    // change the code highlight theme while leaving the
    // presentation theme unchanged.
    themes: true,

    // Specifies the path to the default theme files. If your
    // presentation uses a different path to the standard reveal
    // layout then you need to provide this option, but only
    // when 'themes' is set to 'true'. If you provide your own
    // list of themes or 'themes' is set to 'false' the
    // 'themesPath' option is ignored.
    themesPath: 'dist/theme/',

    // Specifies if the transitions menu panel will be shown.
    // Set to 'true' to show the transitions menu panel with
    // the default transitions list. Alternatively, provide an
    // array to specify the transitions to make available in
    // the transitions panel, for example...
    // ['None', 'Fade', 'Slide']
    transitions: true,

    // Adds a menu button to the slides to open the menu panel.
    // Set to 'false' to hide the button.
    openButton: true,

    // If 'true' allows the slide number in the presentation to
    // open the menu panel. The reveal.js slideNumber option must
    // be displayed for this to take effect
    openSlideNumber: true,

    // If true allows the user to open and navigate the menu using
    // the keyboard. Standard keyboard interaction with reveal
    // will be disabled while the menu is open.
    keyboard: true,

    // Normally the menu will close on user actions such as
    // selecting a menu item, or clicking the presentation area.
    // If 'true', the sticky option will leave the menu open
    // until it is explicitly closed, that is, using the close
    // button or pressing the ESC or m key (when the keyboard
    // interaction option is enabled).
    sticky: false,

    // If 'true' standard menu items will be automatically opened
    // when navigating using the keyboard. Note: this only takes
    // effect when both the 'keyboard' and 'sticky' options are enabled.
    autoOpen: true,

    // If 'true' the menu will not be created until it is explicitly
    // requested by calling RevealMenu.init(). Note this will delay
    // the creation of all menu panels, including custom panels, and
    // the menu button.
    delayInit: false,

    // If 'true' the menu will be shown when the menu is initialised.
    openOnInit: false,

    // By default the menu will load it's own font-awesome library
    // icons. If your presentation needs to load a different
    // font-awesome library the 'loadIcons' option can be set to false
    // and the menu will not attempt to load the font-awesome library.
    loadIcons: true
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
	plugins: [ RevealMath.MathJax3, RevealHighlight, RevealNotes, RevealPointer, RevealDrawer ],
    dependencies: [
    	{
    		src: '/plugin/external/reveal_external.js', 
    		condition: function() { return !!document.querySelector('[data-external-replace], [data-external]'); } 
    	}
    ]
}

Reveal.initialize(revealConfig) 