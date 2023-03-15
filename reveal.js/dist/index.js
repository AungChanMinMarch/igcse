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
const indexJSON = [{
},{
  '1.0': 'Motions',
  '1.1': 'Making measurements',
  '1.2': 'Distance-time graphs',
  '1.3': 'More about speed',
  '1.4': 'Acceleration',
  '1.5': 'More about acceleration',
  '1.6': 'Free fall'
},{
  '2.0': 'Forces and their effects',
  '2.1':'Mass and weight',
  '2.2':'Density',
  '2.3':'Force and shape',
  '2.4':'Force and motion',
  '2.5':'More about force and motion',
  '2.6':'Momentum',
  '2.7':'Explosions',
  '2.8': 'Impact forces'
},{
  '3.0': 'Forces in equilibrium',
  '3.1': 'Moments',
  '3.2': 'Moments in balance',
  '3.3': 'The Principle of Moments',
  '3.4': 'Centre of gravity',
  '3.5': 'Stability',
  '3.6': 'More about vectors'
},{
  '4.0': 'Energy',
  '4.1': 'Energy transfers',
  '4.2': 'Conservation of energy',
  '4.3': 'Fuel for electricity',
  '4.4': 'Nuclear energy',
  '4.5': 'Energy from wind and water',
  '4.6': 'Energy from the Sun and the Earth',
  '4.7': 'Energy and the environment',
  '4.8': 'Energy and work',
  '4.9': 'Power'
},{
  '5.0': 'Pressure',
  '5.1': 'Under pressure',
  '5.2': 'Pressure at work',
  '5.3': 'Pressure in a liquid at rest',
  '5.4': 'Solids, liquids and gases',
  '5.5': 'More about solids, liquids and gases',
  '5.6': 'Gas pressure and temperature',
  '5.7': 'Evaporation',
  '5.8': 'Gas pressure and volume',
},{
  '6.0': 'Thermal physics',
  '6.1': 'Thermal expansion',
  '6.2': 'Thermometers',
  '6.3': 'Specific heat capacity',
  '6.4': 'Change of state',
  '6.5': 'Thermal conduction',
  '6.6': 'Convection',
  '6.7': 'Infrared radiation',
  '6.8': 'More about infrared radiation',
  '6.9': 'Thermal energy at work'
}];
const parts = location.pathname.split('/')
const lastpoint = parts.pop();
const endpoint = (lastpoint !== '') ? lastpoint : parts.pop();
function buildChapterMenu() {
  const chapter = endpoint.split('.')[0];
  const chapterJSON = indexJSON[chapter];
  let chapterMenu = {
    title: `Chapter ${chapter}`,
    icon: '<i class="fa fa-link">',
    content: `
      <h1>Past papers</h1>
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
      <h2>Chapter ${chapter} ${chapterJSON[`${chapter}.0`]}</h2>
      <ul class="slide-menu-items">
    `
  }
  for(let key in chapterJSON){
    if(key.split('.')[1] == '0') continue;
    chapterMenu.content += `
      <li class="slide-menu-item">
        <a href="/physics/ch/${key}">${key} ${chapterJSON[key]}</a>
      </li>
    `
  }
  chapterMenu.content += '</ul>' 
  return chapterMenu;
}
function buildMainMenu(){
  let mainMenu = {
    title: 'Main Menu',
    icon: '<i class="fa fa-info">',
    content: '<h1>IGCSE PHYSICS</h1><ul class="slide-menu-items">'
  }
  indexJSON.map(function(chapterJSON, index){
    if(index === 0) return;
    mainMenu.content += `
      <li class="slide-menu-item">
        <h1><a href="/physics/ch/${index}">${index} ${chapterJSON[`${index}.1`]}</a></h1>
        <ul class="slide-menu-items">
    `
    for(let key in chapterJSON){
      if(key.split('.')[1] == '0') continue;
      mainMenu.content += `
        <li class="slide-menu-item">
          <a href="/physics/ch/${key}">${key} ${chapterJSON[key]}</a>
        </li>
      `
    }
    mainMenu.content += '</ul></li>' 
  })
  mainMenu.content += '</ul>';
  return mainMenu;
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
    custom: []
}
if(['ch', 'cq', 'sq', 'pq'].includes(parts.pop())){
    menuConfig.custom.push(buildChapterMenu());
}
menuConfig.custom.push(buildMainMenu());
menuConfig.custom.push({
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
});   
console.log(menuConfig)
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

const radioInputs = document.querySelectorAll('input[type="radio"]');

function handleRadioKeyDown(event) {
  if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    event.preventDefault();
  }
}

radioInputs.forEach((radio) => {
  radio.addEventListener("keydown", handleRadioKeyDown);
  radio.addEventListener("click", function () {
    radio.blur();
    radio.parentElement.classList.add("prevent-arrow-key-selection");
  });
  radio.addEventListener("blur", function () {
    radio.parentElement.classList.remove("prevent-arrow-key-selection");
  });
});

let choiceNumber = 0;
const choices = ['A', 'B', 'C', 'D'];
Array.from(document.querySelectorAll( '[data-choice-box]')).map(choiceBox=>{
  Array.from(choiceBox.getElementsByTagName('label')).map((label,index)=>{
    const id = choiceNumber+choices[index];
    label.setAttribute('for', id);
    label.querySelector('input').setAttribute('id', id);
    label.querySelector('input').setAttribute('name', choiceNumber);
    label.querySelector('input').setAttribute('value', choices[index]);
  })
  choiceNumber +=1;
})