var usfqMap;
var infowindow;
var usfqCampus = [];
var usfqEntrances = [];
var restaurants = [];
var busStops = [];
var puntosEncuentro = [];
var healthServices = [];
var handicapServices = [];
var studentServices = [];
var emergencyExits = [];
var parkingLots = [];
var satelliteCheck = false;
var campusCheck = true;
var commercialPlacesCheck = false;
var restaurantsCheck = true;
var studentServicesCheck = true;
var healthServicesCheck = true;
var handicapServicesCheck = false;
var emergencyExitsCheck = false;
var entrancesCheck = true;
var meetingPointsCheck = false;
var busStopsCheck = true;
var commercialFilter = [{
  "featureType": "administrative.land_parcel",
  "elementType": "labels",
  "stylers": [
    {
      "visibility": "off"
    }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];
  
function initMap() {}

$(document).ready(function() {
  initMap = function() {

    var lat = -0.197737,
      lng = -78.436029,
      diff = -0.00033;
  
    var options = {
      center: {lat: lat, lng: lng},
      zoom: 18,
      mapType: 'roadmap',
      styles: commercialFilter
    }
  
    usfqMap = new google.maps.Map(document.getElementById('usfqMap'), options);
    infowindow = new google.maps.InfoWindow();
    BuildingLbl.prototype = new google.maps.OverlayView();

    var userInnerCircle = new google.maps.Circle({
      radius: 5,
      fillColor: '#2584ff',
      fillOpacity: 0.8,
      strokeColor: '#fff',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    var userOuterCircle = new google.maps.Circle({
      radius: 15,
      fillColor: '#2584ff',
      fillOpacity: 0.2,
      strokeColor: '#2584ff',
      strokeOpacity: 1.0,
      strokeWeight: 1
    });

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log("pos", pos);     
        userInnerCircle.setCenter(pos);
        userInnerCircle.setMap(usfqMap);
        userOuterCircle.setCenter(pos);
        userOuterCircle.setMap(usfqMap);
      }, () => {
        handleLocationError(true);
      });
    } else {
      handleLocationError(false);
    }

    BuildingLbl.prototype.onAdd = function() {
      var div = document.createElement('div');
      div.className = 'building-label';
      div.style.borderStyle = 'solid';
      div.style.borderWidth = '2px';
      div.style.borderColor = 'black';
      div.style.width = 'auto';
      div.style.height = '20px';
      div.style.textAlign = "center";
      div.style.lineHeight = '20px';
      div.style.position = 'absolute';
      div.style.background = '#ffff';
      div.style.zIndex = '50';
      div.style.fontSize = '0.8em';
      div.style.padding = "0 5px";
      div.innerHTML = this.title_;
  
      this.div_ = div;
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    }
    
    BuildingLbl.prototype.draw = function() {
      var div = this.div_;
      // console.log("lat", this.location_.lat() );
      // console.log("lng", this.location_.lng());
  
      var pos = this.getProjection().fromLatLngToDivPixel(this.location_);
      // console.log('position', pos);
      
      if(pos) {
        div.style.left = (pos.x-10) + 'px';
        div.style.top = (pos.y) + 'px';
      }
    }
  
    BuildingLbl.prototype.onRemove = function() {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  
  
  
      /* 
    ###############################
      Herramientas de dibujo
    ###############################
    */
  
    // Poligono para dibujar todos los edificios
    // var polygonCoordinates = [
    //   { lat: lat - diff, lng: lng - diff },
    //   { lat: lat + diff, lng: lng - diff },
    //   { lat: lat + diff, lng: lng + diff },
    //   { lat: lat - diff, lng: lng + diff },
    // ];
  
    // var polygon = new google.maps.Polygon({
    //   map: usfqMap,
    //   paths: polygonCoordinates,
    //   strokeColor: 'blue',
    //   fillColor: 'blue',
    //   fillOpacity: 0.1,
    //   draggable: true,
    //   editable: true
    // });
  
    // google.maps.event.addListener(polygon.getPath(), 'set_at', function() {
    //   logArray(polygon.getPath());
    // });
    // google.maps.event.addListener(polygon.getPath(), 'insert_at', function() {
    //   logArray(polygon.getPath());
    // });
  
    /* 
    ###############################
      Edificios USFQ
    ###############################
    */
  
    // Entrada Principal
    var mainEntranceCoor = [
      {lat: -0.19695102716760357, lng: -78.43660290443802},
      {lat: -0.1971443255863778, lng: -78.43659754001999},
      {lat: -0.19714164339324192, lng: -78.43668086508183},
      {lat: -0.19695907374710023, lng: -78.43667818287281}
    ];
  
    var mainEntrance = new google.maps.Polygon({
      map: usfqMap,
      paths: mainEntranceCoor,
      strokeColor: 'red',
      fillColor: 'red',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(mainEntrance, 'click', function(e) {
      var name = "Entrada Principal"
      showBuildingInfo(name, [], e.latLng);
    });
  
    var mainEntranceLblLocation = new google.maps.LatLng(-0.197053, -78.436643);
    var mainEntranceLbl = new BuildingLbl(mainEntranceLblLocation, "Entrance", usfqMap);
    
  
    // Miguel de santiago
    var miguelDeSantiagoCoor = [
      {lat: -0.19715026396405783, lng: -78.43642189699364},
      {lat: -0.19722956919780107, lng: -78.43642055588913},
      {lat: -0.19723174847970967, lng: -78.43653523136095},
      {lat: -0.19729159491365778, lng: -78.43653323074057},
      {lat: -0.19729058909124136, lng: -78.43658555588911},
      {lat: -0.19722956919780107, lng: -78.43658828224375},
      {lat: -0.19722554590811, lng: -78.43670370552252},
      {lat: -0.19715026396405783, lng: -78.43670236441801}
    ];
  
    var miguelDeSantiago = new google.maps.Polygon({
      map: usfqMap,
      paths: miguelDeSantiagoCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(miguelDeSantiago, 'click', function(e) {
      var name = "Miguel de Santiago"
      var services = ["Colegio Cocoa", "Aulas Cocoa", "Radio Cocoa", "Oficinas Cocoa", "Colegio Cadi - Arquitectura y Diseño Interior"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var miguelDeSantiagoLblLocation = new google.maps.LatLng(-0.197191, -78.436564);
    var miguelDeSantiagoLbl = new BuildingLbl(miguelDeSantiagoLblLocation, "Miguel de Santiago", usfqMap);
  
    // edificio mozart
    var mozartCoor = [
      {lat: -0.1973889791514836, lng: -78.43619793254089},
      {lat: -0.19760909952044542, lng: -78.4362354834671},
      {lat: -0.19760105294125407, lng: -78.43633624288748},
      {lat: -0.1973809325721905, lng: -78.43630271527479}
    ]
  
    var mozart = new google.maps.Polygon({
      map: usfqMap,
      paths: mozartCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(mozart, 'click', function(e) {
      var name = "Mozart";
      var services = ["Aulas Música", "Oficinas Profesores COM"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var mozartLblLocation = new google.maps.LatLng(-0.197493, -78.436271);
    var mozartLbl = new BuildingLbl(mozartLblLocation, "Mozart", usfqMap);
  
    // edificio aristoteles
    var aristotelesCoor = [
      {lat: -0.19737959147564801, lng: -78.43660562831116},
      {lat: -0.19774991465561306, lng: -78.43680411177826},
      {lat: -0.1976801776364468, lng: -78.4370054540367},
      {lat: -0.1972830325237872, lng: -78.4368257460327}
    ];
  
    var aristoteles = new google.maps.Polygon({
      map: usfqMap,
      paths: aristotelesCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(aristoteles, 'click', function(e){
      var name = "Aristoteles";
      var services = ["Talleres de Artes Plásticas", "Clases de Arquitectura", "Oficinas profesores Arquitectura y Cocoa", "Copiadoras Xerox para planos"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var aristotelesLblLocation = new google.maps.LatLng(-0.197534, -78.436810);
    var aristotelesLbl = new BuildingLbl(aristotelesLblLocation, "Aristóteles", usfqMap);
  
    // edificio socrates
    var socratesCoor = [
      {lat: -0.19774571082967415, lng: -78.43638971048546},
      {lat: -0.1979582971938077, lng: -78.43640127751183},
      {lat: -0.19795094373008715, lng: -78.43651476848078},
      {lat: -0.19788527513539272, lng: -78.43651242154789},
      {lat: -0.1978800010175248, lng: -78.43667670685005},
      {lat: -0.19780624070935443, lng: -78.43684586260031},
      {lat: -0.1976276943354744, lng: -78.4367372331352},
      {lat: -0.1976960902583526, lng: -78.43655810739233}
    ];
  
    var socrates = new google.maps.Polygon({
      map: usfqMap,
      paths: socratesCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(socrates, 'click', function(e) {
      var name = "Sócrates";
      var services = ["Talleres de Artes Plásticas", "Taller de Tejido", "Taller de Grabado", "Aulas de Autoconocimiento"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var socratesLblLocation = new google.maps.LatLng(-0.197800, -78.436645);
    var socratesLbl = new BuildingLbl(socratesLblLocation, "Sócrates", usfqMap);
  
    // edificio laotze
    var laotzeCoor = [
      {lat: -0.1976437874938316, lng: -78.43629315096092},
      {lat: -0.1980154517644106, lng: -78.43631058531952},
      {lat: -0.19798058325541268, lng: -78.4364126858444},
      {lat: -0.19763439981812322, lng: -78.43640866253088}
    ];
  
    var laotze = new google.maps.Polygon({
      map: usfqMap,
      paths: laotzeCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(laotze, 'click', function(e) {
      var name = "Lao Tze";
      var services = ["Deportes - Sala de Aeróbicos", "Sala de danza", "Taller de acuarela", "Oficinas de Deportes"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var laotzeLblLocation = new google.maps.LatLng(-0.197825, -78.436391);
    var laotzeLbl = new BuildingLbl(laotzeLblLocation, "Lao Tze", usfqMap);
  
  
    // Hall principal
    var hallPrincipalCoor = [
      {lat: -0.1960907976415737, lng: -78.4356601496334},
      {lat: -0.19643698111094857, lng: -78.43579828339767},
      {lat: -0.19637797285932596, lng: -78.4359620747299},
      {lat: -0.19627452788206742, lng: -78.4359258649082},
      {lat: -0.19621820182314811, lng: -78.43604513491823},
      {lat: -0.1961390771210218, lng: -78.43602564475725},
      {lat: -0.19613035999280223, lng: -78.43575438429787},
      {lat: -0.19608241578749294, lng: -78.4357501823099}
    ];
  
    var hallPrincipal = new google.maps.Polygon({
      map: usfqMap,
      paths: hallPrincipalCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(hallPrincipal, 'click', function(e) {
      var name = "Hall Principal";
      var services = ["Información"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var hallPrincipalLblLocation = new google.maps.LatLng(-0.196294, -78.435836);
    var hallPrincipalLbl = new BuildingLbl(hallPrincipalLblLocation, "Hall Principal", usfqMap);
  
    // edifico eugenio espejo
    var eugenioEspejoCoor = [
      {lat: -0.19613505383107627, lng: -78.43603163558197},
      {lat: -0.19640077150201135, lng: -78.43610673743439},
      {lat: -0.19634712763678766, lng: -78.4362678465576},
      {lat: -0.19614041821767877, lng: -78.4362142023773}
    ];
  
    var eugenioEspejo = new google.maps.Polygon({
      map: usfqMap,
      paths: eugenioEspejoCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(eugenioEspejo, 'click', function(e) {
      var name = "Eugenio Espejo";
      var services = ["Instituto de Microbiología", "Postgrados", "Veterinaria"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var eugenioEspejoLblLocation = new google.maps.LatLng(-0.196195, -78.436131);
    var eugenioEspejoLbl = new BuildingLbl(eugenioEspejoLblLocation, "Eugenio Espejo", usfqMap);
  
    // cuadrantes USFQ
    var cuadrantesCoor = [
      {lat: -0.19645557592728793, lng: -78.43606784540367},
      {lat: -0.19695598549695006, lng: -78.43628644543838},
      {lat: -0.19685406215626033, lng: -78.43654277298162},
      {lat: -0.1964235250106157, lng: -78.43636842939566},
      {lat: -0.19645298400226327, lng: -78.43630137417028},
      {lat: -0.19637779232291272, lng: -78.4362691876621}
    ];
  
    var cuadrantes = new google.maps.Polygon({
      map: usfqMap,
      paths: cuadrantesCoor,
      strokeColor: '#87d17b',
      fillColor: '#87d17b',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(cuadrantes, 'click', function(e) {
      showBuildingInfo("Cuadrantes", [], e.latLng);
    });
  
    var cuadrantesLblLocation = new google.maps.LatLng(-0.196654, -78.436293);
    var cuadrantesLbl = new BuildingLbl(cuadrantesLblLocation, "Cuadrantes", usfqMap);
  
    // planta fisica
    var plantaFisicaCoor = [
      {lat: -0.19640193206224238, lng: -78.4363803227539},
      {lat: -0.19666764972894096, lng: -78.43648627001},
      {lat: -0.19663680450694976, lng: -78.43654411408613},
      {lat: -0.19650931006038108, lng: -78.43648175272654},
      {lat: -0.1963764512262812, lng: -78.436430120203}
    ];
  
    var plantaFisica = new google.maps.Polygon({
      map: usfqMap,
      paths: plantaFisicaCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(plantaFisica, 'click', function(e) {
      var name = " Planta Física";
      var services = ["Oficina de Seguridad", "Bodega de Materiales", "Cuarto de Monitoreo", "Planta Física"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var plantaFisicaLblLocation = new google.maps.LatLng(-0.196522, -78.436466);
    var plantaFisicaLbl = new BuildingLbl(plantaFisicaLblLocation, "Planta Física", usfqMap);
  
    // clinica veterinaria 
    var veterinariaCoor = [
      {lat: -0.19580447195635067, lng: -78.43634567513612},
      {lat: -0.1959843594217861, lng: -78.43642077698854},
      {lat: -0.19583952098168617, lng: -78.43677098184736},
      {lat: -0.19567974996499876, lng: -78.43670124441297}
    ];
  
    var veterinaria = new google.maps.Polygon({
      map: usfqMap,
      paths: veterinariaCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(veterinaria, 'click', function(e) {
      var name = "Clínica Veterinaria";
  
      showBuildingInfo(name, [], e.latLng);
    });
  
    var veterinariaLblLocation = new google.maps.LatLng(-0.195781, -78.436666);
    var veterinariaLbl = new BuildingLbl(veterinariaLblLocation, 'Clínica Veterinaria', usfqMap);
  
      // tesoreria
      var tesoreriaCoor = [
        {lat: -0.1961806511171086, lng: -78.43541740971756},
        {lat: -0.19625056867896015, lng: -78.43544691401672},
        {lat: -0.19615132752727157, lng: -78.43568312499235},
        {lat: -0.19608945654492943, lng: -78.43565362069319}
      ];
    
      var tesoreria = new google.maps.Polygon({
        map: usfqMap,
        paths: tesoreriaCoor,
        strokeColor: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.6
      });
  
    google.maps.event.addListener(tesoreria, 'click', function(e) {
      var name = "Tesorería";
  
      showBuildingInfo(name, [], e.latLng);
    });
  
    var tesoreriaLblLocation = new google.maps.LatLng(-0.196166, -78.435546);
    var tesoreriaLbl = new BuildingLbl(tesoreriaLblLocation, 'Tesorería', usfqMap);
    
    // edificio ciceron
    var ciceronCoor = [
      {lat: -0.19557715761550895, lng: -78.4356950183506},
      {lat: -0.19561148412988577, lng: -78.43569594035995},
      {lat: -0.19561898871038488, lng: -78.43574514213157},
      {lat: -0.19575737876639612, lng: -78.43574162173223},
      {lat: -0.1957605751545149, lng: -78.43567557233524},
      {lat: -0.19599227217137866, lng: -78.43566685515594},
      {lat: -0.19598896456384268, lng: -78.43579962450218},
      {lat: -0.1961325521741882, lng: -78.43579426008415},
      {lat: -0.196137916560778, lng: -78.43621017906378},
      {lat: -0.19594595920240246, lng: -78.4362128612728},
      {lat: -0.19593187768741502, lng: -78.4360397705002},
      {lat: -0.19556944630951498, lng: -78.43602564475725},
      {lat: -0.19557074549693165, lng: -78.43577912746679},
      {lat: -0.1955586337174095, lng: -78.4357793734057},
      {lat: -0.19556123209225557, lng: -78.43572890331222}
    ];
  
    var ciceron = new google.maps.Polygon({
      map: usfqMap,
      paths: ciceronCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(ciceron, 'click', function(e) {
      var name = "Cicerón";
      var services = ["Biblioteca", 
        "Auditorio Biblioteca", 
        "Teatro Calderón de la Barca", 
        "Oficinas Estación de Biodiversidad Tiputini",
        "Restaurante Tratoría",
        "Restaurante Vía Bonita",
        "Cafetería No Sea Malito",
        "Restaurante Marcus",
        "Panadería Ambrosía"
      ];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var ciceronLblLocation = new google.maps.LatLng(-0.195974, -78.436007);
    var ciceronLbl = new BuildingLbl(ciceronLblLocation, 'Cicerón', usfqMap);
  
  
    // edificio epicuro
    var epicuroCoor = [
      {lat: -0.1956053206460691, lng: -78.43603163558197},
      {lat: -0.19593004657883, lng: -78.4360383411045},
      {lat: -0.19594748083547267, lng: -78.43621956679533},
      {lat: -0.19577409895659273, lng: -78.43616692844341},
      {lat: -0.19569057055402378, lng: -78.43617061648081},
      {lat: -0.1956012973559836, lng: -78.43612703058432}
    ];
  
    var epicuro = new google.maps.Polygon({
      map: usfqMap,
      paths: epicuroCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(epicuro, 'click', function(e) {
      var name = "Epicuro";
      var services = ["Oficinas profesores CHAT", "Aulas CHAT", "Cocinas", "Teatro Epicuro", "Educación en Línea"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var epicuroLblLocation = new google.maps.LatLng(-0.195790, -78.436127);
    var epicuroLbl = new BuildingLbl(epicuroLblLocation, 'Epicuro', usfqMap);
  
    // restaurante la piramide
    var piramideCoor = [
      {lat: -0.1963201251677181, lng: -78.43562125760269},
      {lat: -0.19643295782106665, lng: -78.43567490178299},
      {lat: -0.19638736053573405, lng: -78.43577432009886},
      {lat: -0.19627452788206742, lng: -78.43572335812758}
    ];
  
    var piramide = new google.maps.Polygon({
      map: usfqMap,
      paths: piramideCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(piramide, 'click', function(e) {
      var name = "La Pirámide";
  
      showBuildingInfo(name, [], e.latLng);
    });
  
    var piramideLblLocation = new google.maps.LatLng(-0.196337, -78.435696);
    var piramideLbl = new BuildingLbl(piramideLblLocation, 'La Pirámide', usfqMap);
  
    // edificio einstein
    var einsteinCoor = [
      {lat: -0.1962477059492711, lng: -78.43546300727081},
      {lat: -0.19637721204282266, lng: -78.43552603918266},
      {lat: -0.19650940032856862, lng: -78.43557297784042},
      {lat: -0.19646614996252568, lng: -78.4356692462344},
      {lat: -0.19639490420427058, lng: -78.43564898410153},
      {lat: -0.1963196351558028, lng: -78.4356166520281},
      {lat: -0.1962653207419962, lng: -78.4357287225456},
      {lat: -0.19614578260426857, lng: -78.43568446609686}
    ];
  
    var einstein = new google.maps.Polygon({
      map: usfqMap,
      paths: einsteinCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(einstein, 'click', function(e) {
      var name = "Einstein";
      var services = ["Tesorería", "Balcón de Servicios", "OCAA", "OASA", "Colegio General", "Service Desk", "Departamento de Sistemas", "Recursos Humanos"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var einsteinLblLocation = new google.maps.LatLng(-0.196392, -78.435579);
    var einstienLbl = new BuildingLbl(einsteinLblLocation, "Einstein", usfqMap);
  
    // edificio darwin
    var darwinCoor = [
      {lat: -0.19636572245324155, lng: -78.43525915938568},
      {lat: -0.19649733045898649, lng: -78.43530743914795},
      {lat: -0.19647386126811253, lng: -78.43536045692156},
      {lat: -0.19649598936236765, lng: -78.43537324156},
      {lat: -0.19643698111094857, lng: -78.43550475809286},
      {lat: -0.19638865649828455, lng: -78.43547793600271},
      {lat: -0.1963684949147176, lng: -78.43551951024244},
      {lat: -0.19625307033583547, lng: -78.43545245501707},
      {lat: -0.19627452788206742, lng: -78.43540408696367},
      {lat: -0.19630134981481284, lng: -78.43542281828115}
    ]
  
    var darwin = new google.maps.Polygon({
      map: usfqMap,
      paths: darwinCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(darwin, 'click', function(e) {
      var name = "Charles Darwin";
      var services = ["Colegio de Música", "Salón Azul", "Laboratorios de Biotecnología", "Biología", "Laboratorios de Botánica", "Laboratorio de Acuática", "Zoología / Zoología Terrestre", "Ecología", "Laboratorio de Cultivos", "Laboratorio de Microbiologia"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var darwinLblLocation = new google.maps.LatLng(-0.196375, -78.435417);
    var darwinLbl = new BuildingLbl(darwinLblLocation, "Charles Darwin", usfqMap);
  
    // edificio davinci 
    var davinciCoor = [
      {lat: -0.1958587879189602, lng: -78.43501507836532},
      {lat: -0.19619692481325304, lng: -78.43516394096565},
      {lat: -0.19606817953486896, lng: -78.43548061821173},
      {lat: -0.1957233371545559, lng: -78.43534516665648}
    ];
  
    var davinci = new google.maps.Polygon({
      map: usfqMap,
      paths: davinciCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(davinci, 'click', function(e) {
      var name = "Da Vinci";
      var services = ["Decanato de Administración", "Decanato de Economía", "Plaza Interna Da Vinci", "Oficina ASERTEC", "ECOLAP", "Oficinas Profesores", "Aulas", "Laboratorio de Odontología", "Plaza Académica Da Vinci"];
  
      showBuildingInfo(name, services, e.latLng);
    });
  
    var davinciLblLocation = new google.maps.LatLng(-0.195954, -78.435238);
    var davinciLbl = new BuildingLbl(davinciLblLocation, "Da Vinci", usfqMap);
  
    var maxwellCoor = [
      {lat: -0.19601628282224792, lng: -78.43469987714195},
      {lat: -0.19624444976454883, lng: -78.43479107224846},
      {lat: -0.19623226464428548, lng: -78.43484301271747},
      {lat: -0.19638101112038012, lng: -78.4349003176045},
      {lat: -0.196363346363202, lng: -78.43493580221258},
      {lat: -0.19649967721707293, lng: -78.4349906781747},
      {lat: -0.19647729766721053, lng: -78.43504142150056},
      {lat: -0.196606881127831, lng: -78.43508926397197},
      {lat: -0.19657905337311446, lng: -78.43515812682472},
      {lat: -0.1965126690905781, lng: -78.43512955557134},
      {lat: -0.1964550019358542, lng: -78.43525480327753},
      {lat: -0.196390629297769, lng: -78.43522634895231},
      {lat: -0.19630211692001062, lng: -78.4354162035313},
      {lat: -0.19613295823118979, lng: -78.43532903173832},
      {lat: -0.19621610622327437, lng: -78.43513448329355},
      {lat: -0.19613496987616255, lng: -78.43509621766952},
      {lat: -0.19617017366317954, lng: -78.43501673515465},
      {lat: -0.19601142134684724, lng: -78.43494011352323},
      {lat: -0.19605743772591885, lng: -78.43482066588484},
      {lat: -0.19598522805270654, lng: -78.43479044636484}
    ];
  
    var maxwell = new google.maps.Polygon({
      map: usfqMap,
      paths: maxwellCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(maxwell, 'click', function(e) {
      var name = "Maxwell";
      var services = ["Colegio COCIBA", "Laboratorio CADE", "Laboratorio Música", "Laboratorio Mecánica", "Laboratorio Veterinaria", "Laboratorio COCIBA", "Laboratorio Ing. Ambiental", "Laboratorio Diseño COCOA", "Laboratorio Instituto Medición Atmosférica", "Laboratorio Computación", "Planta Piloto", "Aulas y oficinas de profesores", "Plaza Maxwell", "Plaza Obelisco de Maxwell"]
      showBuildingInfo(name, services, e.latLng);
    });
  
    var maxwellLblLocation = new google.maps.LatLng(-0.196340, -78.435006);
    var maxwellLbl = new BuildingLbl(maxwellLblLocation, "Maxwell", usfqMap);
  
    var bsCoor = [
      {lat: -0.19632339395439596, lng: -78.43459661209488},
      {lat: -0.1965703362451239, lng: -78.43465293848419},
      {lat: -0.19648718825479503, lng: -78.4349830267754},
      {lat: -0.19637482628445666, lng: -78.434934411737},
      {lat: -0.19638234738901872, lng: -78.4348913287547},
      {lat: -0.19627989856961592, lng: -78.43486165681747},
      {lat: -0.19627750652255543, lng: -78.43484589883951},
      {lat: -0.19625351185613624, lng: -78.43484472537307},
      {lat: -0.19627571248724096, lng: -78.43475093187658},
      {lat: -0.196296572021676, lng: -78.43468530157475}
    ];
  
    var bs = new google.maps.Polygon({
      map: usfqMap,
      paths: bsCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(bs, 'click', function(e) {
      var name = "Brillat Savarín";
      var services = ["Laboratorios de Alimentos", "Oficinas Politécnico"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var bsLblLocation = new google.maps.LatLng(-0.196420, -78.434745);
    var bsLbl = new BuildingLbl(bsLblLocation, "Brillat Savarín", usfqMap);
  
    var odontologiaCoor = [
      {lat: -0.19603371707880152, lng: -78.43451480471992},
      {lat: -0.19632223336953472, lng: -78.43458990657234},
      {lat: -0.1962685895040693, lng: -78.43476442674068},
      {lat: -0.1959881197923748, lng: -78.43467993715672}
    ];
  
    var odontologia = new google.maps.Polygon({
      map: usfqMap,
      paths: odontologiaCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(odontologia, 'click', function(e) {
      var name = "Escuela de Odontología";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var odontologiaLblLocation = new google.maps.LatLng(-0.196188, -78.434662);
    var odontologiaLbl = new BuildingLbl(odontologiaLblLocation, "Escuela de Odontología", usfqMap);
  
    var casaCoronaCoor = [
      {lat: -0.1963408282106315, lng: -78.43442360961342},
      {lat: -0.1965864294044862, lng: -78.43444774949455},
      {lat: -0.19655960747219878, lng: -78.43465177396206},
      {lat: -0.19632473505102752, lng: -78.43459947088627}
    ];
  
    var casaCorona = new google.maps.Polygon({
      map: usfqMap,
      paths: casaCoronaCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(casaCorona, 'click', function(e) {
      var name = "Casa Corona";
      var services = ["Oficina de Programas Internaciones (OPI)", "Aulas GAIAS"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var casaCoronaLblLocation = new google.maps.LatLng(-0.196436, -78.434530);
    casaCoronaLbl = new BuildingLbl(
      casaCoronaLblLocation, 
      'Casa Corona',
      usfqMap
    );
  
    var casaBlancaCoor = [
      {lat: -0.19668414894520303, lng: -78.43497480356598},
      {lat: -0.19684391995229789, lng: -78.43501637780571},
      {lat: -0.19678357060550677, lng: -78.43522442558674},
      {lat: -0.1966345283707264, lng: -78.43517480471996}
    ];
  
    var casaBlanca = new google.maps.Polygon({
      map: usfqMap,
      paths: casaBlancaCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(casaBlanca, 'click', function(e) {
      var name = "Casa Blanca";
      var services = ["Instituto Confusio", "Teatro Casa Blanca"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var casaBlancaLblLocation = new google.maps.LatLng(-0.196757, -78.435067);
    var casaBlancaLbl = new BuildingLbl(casaBlancaLblLocation, 'Casa Blanca', usfqMap);
  
    var casaTomateCoor = [
      {lat: -0.19654199270440922, lng: -78.43479107224846},
      {lat: -0.19672456235510546, lng: -78.43482728207016},
      {lat: -0.19665683697654823, lng: -78.435080168561},
      {lat: -0.1965783828247987, lng: -78.4350554464188},
      {lat: -0.19657426927909524, lng: -78.43502728322414},
      {lat: -0.19649773651598804, lng: -78.43500850776104}
    ]
  
    var casaTomate = new google.maps.Polygon({
      map: usfqMap,
      paths: casaTomateCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(casaTomate, 'click', function(e) {
      var name = "Casa Tomate";
      var services = ["Contacto empresarial", "Alumni", "Work and Travel", "IAESTE"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var casaTomateLblLocation = new google.maps.LatLng(-0.196625, -78.434950);
    var casaTomateLbl = new BuildingLbl(casaTomateLblLocation, "Casa Tomate", usfqMap);
  
  
    // edificio galileo
    var galileoCoor = [
      {lat: -0.1965199485651187, lng: -78.4355689545269},
      {lat: -0.1968393100937459, lng: -78.43569233614159},
      {lat: -0.1967481155251544, lng: -78.43590977165411},
      {lat: -0.19643680057454807, lng: -78.4357635912628}
    ];
  
    var galileo = new google.maps.Polygon({
      map: usfqMap,
      paths: galileoCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(galileo, 'click', function(e) {
      var name = "Galileo";
      var services = ["Tesorería", "Balcón de Servicios", "OCAA", "OASA", "Colegio General", "Service Desk", "Departamento de Sistemas", "Recursos Humanos", "Admisiones", "Registro", "Asistencia Financiera", "Decanato de Pregrado", "Observatorio"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var galileoLblLocation = new google.maps.LatLng(-0.196619, -78.435645);
    var galileoLbl = new BuildingLbl(galileoLblLocation, "Galileo", usfqMap);
  
    // edificio newton
    var newtonCoor = [
      {lat: -0.1965199485651187, lng: -78.43533157902908},
      {lat: -0.19669505194117853, lng: -78.43538522320938},
      {lat: -0.196746774428561, lng: -78.43527122932625},
      {lat: -0.19687149641194884, lng: -78.43532295014097},
      {lat: -0.19683461625567544, lng: -78.43544000565481},
      {lat: -0.1967454333319549, lng: -78.43565764400671},
      {lat: -0.19642473070490232, lng: -78.43553828570555}
    ];
  
    var newton = new google.maps.Polygon({
      map: usfqMap,
      paths: newtonCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(newton, 'click', function(e) {
      var name = "Newton";
      var services = ["Cancillería", "Prink", "Laboratorios de Química", "Oficinas", "Aulas", "Aulas Computación CISCO"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var newtonLblLocation = new google.maps.LatLng(-0.196674, -78.435473);
    var newtonLbl = new BuildingLbl(newtonLblLocation, "Newton", usfqMap)
  
    // caseta gastro challenge
    var gastroChallengeCoor = [
      {lat: -0.1968324240743785, lng: -78.43583717542839},
      {lat: -0.19692111698572576, lng: -78.43587874966812},
      {lat: -0.19688758957103122, lng: -78.43593927595327},
      {lat: -0.19679755556291248, lng: -78.43590038392256}
    ];
  
    var gastroChallenge = new google.maps.Polygon({
      map: usfqMap,
      paths: gastroChallengeCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(gastroChallenge, 'click', function(e) {
      var name = "Gastro Challenge";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var gastroChallengeLblLocation = new google.maps.LatLng(-0.196867, -78.435888);
    var gastroChallengeLbl = new BuildingLbl(gastroChallengeLblLocation, "Gastro Challenge", usfqMap);
  
  
    // la pagoda
    var pagodaCoor = [ 
      {lat: -0.1971998845370078, lng: -78.43543350297165},
      {lat: -0.19730198841197338, lng: -78.43543618518066},
      {lat: -0.19729930621886296, lng: -78.43565898511122},
      {lat: -0.19719720234388466, lng: -78.4356563029022}
    ]
  
    var pagoda = new google.maps.Polygon({
      map: usfqMap,
      paths: pagodaCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(pagoda, 'click', function(e) {
      var name = "La Pagoda";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var pagodaLblLocation = new google.maps.LatLng(-0.197283, -78.435559);
    var pagodaLbl = new BuildingLbl(pagodaLblLocation, "La Pagoda", usfqMap);
  
  
    // coliseo
    var coliseoCoor = [
      {lat: -0.1974010490204169, lng: -78.43536644774628},
      {lat: -0.19778075987554328, lng: -78.43536778885078},
      {lat: -0.197772713296441, lng: -78.43573811027716},
      {lat: -0.1974023901169721, lng: -78.43572604033659},
    ];
  
    var coliseo = new google.maps.Polygon({
      map: usfqMap,
      paths: coliseoCoor ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(coliseo, 'click', function(e) {
      var name = "Coliseo Alexandros";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var coliseoLblLocation = new google.maps.LatLng(-0.197555, -78.435571);
    var coliseoLbl = new BuildingLbl(coliseoLblLocation, "Coliseo Alexandros", usfqMap);
  
    // el obelisco
    var obeliscoCoor = [
      {lat: -0.1975016312612182, lng: -78.43587204414558},
      {lat: -0.19752595153530716, lng: -78.43587070304108},
      {lat: -0.19754740907989796, lng: -78.43588017906382},
      {lat: -0.19750449399069095, lng: -78.43595268699835},
      {lat: -0.19747212713730883, lng: -78.43595000478933}
    ];
  
    var obelisco = new google.maps.Polygon({
      map: usfqMap,
      paths: obeliscoCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(obelisco, 'click', function(e) {
      var name = "Obelisco";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var obeliscoLblLocation = new google.maps.LatLng(-0.197529, -78.435893);
    var obeliscoLbl = new BuildingLbl(obeliscoLblLocation, "Obelisco", usfqMap);
  
  
    // aulas com
    var aulasComCoor = [
      {lat: -0.19743189424099597, lng: -78.43577414351654},
      {lat: -0.19754875017644044, lng: -78.43577414351654},
      {lat: -0.19754405633856081, lng: -78.43586504749248},
      {lat: -0.19749644741144873, lng: -78.43586609746649},
      {lat: -0.197489741928749, lng: -78.43584808084677},
      {lat: -0.19743055314445349, lng: -78.43584942195127}
    ];
  
    var aulasCom = new google.maps.Polygon({
      map: usfqMap,
      paths: aulasComCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(aulasCom, 'click', function(e) {
      var name = "Aulas COM";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var aulasComLblLocation = new google.maps.LatLng(-0.197498, -78.435821);
    var aulasComLbl = new BuildingLbl(aulasComLblLocation, "Aulas COM", usfqMap);
  
    // canchas volley
    var canchasVolleyCoor = [
      {lat: -0.19739568463423424, lng: -78.43595921593857},
      {lat: -0.19763458035452372, lng: -78.43596860367012},
      {lat: -0.1976278748718749, lng: -78.43620213243673},
      {lat: -0.197394343537679, lng: -78.4361967680187}
    ];
  
    var canchasVolley = new google.maps.Polygon({
      map: usfqMap,
      paths: canchasVolleyCoor,
      strokeColor: '#87d17b',
      fillColor: '#87d17b',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(canchasVolley, 'click', function(e) {
      var name = "Canchas Volley";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var canchasVolleyLblLocation = new google.maps.LatLng(-0.197512, -78.436082);
    var canchasVolleyLbl = new BuildingLbl(canchasVolleyLblLocation, "Canchas Volley", usfqMap);
  
    // canchas tennis
    var canchasTennisCoor = [
      {lat: -0.19768402038962288, lng: -78.43594580489349},
      {lat: -0.1980074051854228, lng: -78.4359645803566},
      {lat: -0.19800069970292664, lng: -78.4362678465576},
      {lat: -0.19767865600352924, lng: -78.43625577661703}
    ];
  
    var canchasTennis = new google.maps.Polygon({
      map: usfqMap,
      paths: canchasTennisCoor,
      strokeColor: '#87d17b',
      fillColor: '#87d17b',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(canchasTennis, 'click', function(e) {
      var name = "Canchas Tennis";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var canchasTennisLblLocation = new google.maps.LatLng(-0.197837, -78.436095);
    var canchasTennisLbl = new BuildingLbl(canchasTennisLblLocation, "Canchas Tennis", usfqMap);
  
    // taller de mecanica
    var tallerMetalesCoor = [
      {lat: -0.19801661232452714, lng: -78.4359833558197},
      {lat: -0.19810664632604305, lng: -78.43599408465576},
      {lat: -0.19810798742253466, lng: -78.4360746392174},
      {lat: -0.19808049494445046, lng: -78.43607937722874},
      {lat: -0.19805836685230724, lng: -78.43629869196127},
      {lat: -0.19800990684203096, lng: -78.43629466864775},
    ];
  
    var tallerMetales = new google.maps.Polygon({
      map: usfqMap,
      paths: tallerMetalesCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(tallerMetales, 'click', function(e) {
      var name = "Taller de Metales";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var tallerMetalesLblLocation = new google.maps.LatLng(-0.198043, -78.436082);
    var tallerMetalesLbl = new BuildingLbl(tallerMetalesLblLocation, "Taller de Metales", usfqMap);
  
    // canchas de futbol
    var canchaFutbolSinthCoor = [
      {lat: -0.1977443697331571, lng: -78.43577816683006},
      {lat: -0.1977779874143344, lng: -78.43578219014358},
      {lat: -0.19780284283399985, lng: -78.43577347296429},
      {lat: -0.19781795273680308, lng: -78.43575168001604},
      {lat: -0.1978154494643841, lng: -78.4357381013329},
      {lat: -0.1978061512490914, lng: -78.43572728867781},
      {lat: -0.19780418433443464, lng: -78.43571517682773},
      {lat: -0.19808921207165223, lng: -78.43572184044075},
      {lat: -0.19807915384795885, lng: -78.43585700086544},
      {lat: -0.19806507233477796, lng: -78.43585536863043},
      {lat: -0.19806373123828636, lng: -78.4359620747299},
      {lat: -0.1977416875401103, lng: -78.43595000478933}
    ];
  
    var canchasFutbolSinth = new google.maps.Polygon({
      map: usfqMap,
      paths: canchaFutbolSinthCoor ,
      strokeColor: '#87d17b',
      fillColor: '#87d17b',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(canchasFutbolSinth, 'click', function(e) {
      var name = "Cancha de Fútbol Sintético";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var canchasFutbolSinthLblLocation = new google.maps.LatLng(-0.197912, -78.435831);
    var canchasFutbolSinthLbl = new BuildingLbl(canchasFutbolSinthLblLocation, "Canchas de Fútbol Sintético", usfqMap);
  
    // green house
    var greenHouseCoor = [
      {lat: -0.19808232605280646, lng: -78.43575268584442},
      {lat: -0.1981374915453117, lng: -78.43575134473991},
      {lat: -0.19813212715935805, lng: -78.43585612747381},
      {lat: -0.19808500824578965, lng: -78.43585612747381}
    ];
  
    var greenHouse = new google.maps.Polygon({
      map: usfqMap,
      paths: greenHouseCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
  
    google.maps.event.addListener(greenHouse, 'click', function(e) {
      var name = "Green House";
      var services = ["Clases de Arte", "Laboratorio de Música - Batería"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var greenHouseLblLocation = new google.maps.LatLng(-0.198109, -78.435796);
    var greenHouseLbl = new BuildingLbl(greenHouseLblLocation, "Green House", usfqMap);
  
    // cancha de futbol regular
    var canchasFutbolCoor = [
      {lat: -0.19781142455903483, lng: -78.43539192873192},
      {lat: -0.19790120549029036, lng: -78.43541162620437},
      {lat: -0.19790381514828137, lng: -78.43545680466246},
      {lat: -0.19802570985998694, lng: -78.43546669530821},
      {lat: -0.19802810191296324, lng: -78.43542880910587},
      {lat: -0.19822332172034166, lng: -78.43546971279335},
      {lat: -0.1982099107555274, lng: -78.43569921824644},
      {lat: -0.19780203688341552, lng: -78.43567776057432}
    ];
  
    var canchasFutbol = new google.maps.Polygon({
      map: usfqMap,
      paths: canchasFutbolCoor  ,
      strokeColor: '#87d17b',
      fillColor: '#87d17b',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(canchasFutbol, 'click', function(e) {
      var name = "Cancha de Fútbol";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var canchasFutbolLblLocation = new google.maps.LatLng(-0.197987, -78.435570);
    var canchasFutbolLbl = new BuildingLbl(canchasFutbolLblLocation, "Cancha de Fútbol", usfqMap);
  
    // invernadero biotec
    var invernaderoCoor = [
      {lat: -0.1979012780252698, lng: -78.43539326983642},
      {lat: -0.1980261805363943, lng: -78.43542277413559},
      {lat: -0.19802081615040246, lng: -78.43546720716665},
      {lat: -0.19790396021829118, lng: -78.4354564783306}
    ];
  
    var invernadero = new google.maps.Polygon({
      map: usfqMap,
      paths: invernaderoCoor  ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(invernadero, 'click', function(e) {
      var name = "Invernadero Biotecnología";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var invernaderoLblLocation = new google.maps.LatLng(-0.197974, -78.435441);
    var invernaderoLbl = new BuildingLbl(invernaderoLblLocation, "Invernadero Biotecnología", usfqMap);
  
    var entradaPuenteCoor = [
      {lat: -0.19817142501445065, lng: -78.43569765889549},
      {lat: -0.19820379184184125, lng: -78.43571509325409},
      {lat: -0.1981581945613558, lng: -78.43585474470524},
      {lat: -0.19812850992684664, lng: -78.43583731034664}
    ];
  
    var entradaPuente = new google.maps.Polygon({
      map: usfqMap,
      paths: entradaPuenteCoor,
      strokeColor: 'red',
      fillColor: 'red',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(entradaPuente, 'click', function(e) {
      var name = "Entrada Puente";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var entradaPuenteLblLocation = new google.maps.LatLng(-0.198166, -78.435780);
    var entradaPuenteLbl = new BuildingLbl(entradaPuenteLblLocation, "Entrada Puente", usfqMap);
  
    // puente peatonal
    var puenteCoor = [
      {lat: -0.19866302082405188, lng: -78.43596994477463},
      {lat: -0.1986806356142198, lng: -78.43593373495293},
      {lat: -0.19886637747073055, lng: -78.4360035606785},
      {lat: -0.19886034253679186, lng: -78.43602912995527},
      {lat: -0.19870590407944333, lng: -78.43597095954726},
      {lat: -0.1986212026361849, lng: -78.43616759899567},
      {lat: -0.19858590939405737, lng: -78.4361504999132},
      {lat: -0.19865747913348478, lng: -78.43598755571554},
      {lat: -0.1982051717837703, lng: -78.43577700230787},
      {lat: -0.19817361088228294, lng: -78.43590038392256},
      {lat: -0.19813731100892396, lng: -78.43589501950453},
      {lat: -0.1981855904824435, lng: -78.43573936309053}
    ];
  
    var puente = new google.maps.Polygon({
      map: usfqMap,
      paths: puenteCoor  ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(puente, 'click', function(e) {
      var name = "Puente Peatonal";
      showBuildingInfo(name, [], e.latLng);
    });
  
    var puenteLblLocation = new google.maps.LatLng(-0.198445, -78.435878);
    var puenteLbl = new BuildingLbl(puenteLblLocation, "Puente Peatonal", usfqMap);
  
  
    // com
    var comCoor = [
      {lat: -0.19829958368323727, lng: -78.43582778769684},
      {lat: -0.19842985057721121, lng: -78.43588545519066},
      {lat: -0.19838157110441684, lng: -78.43598353240202},
      {lat: -0.19826203298187955, lng: -78.43593257043074}
    ];
  
    var com = new google.maps.Polygon({
      map: usfqMap,
      paths: comCoor  ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(com, 'click', function(e) {
      var name = "COM";
      var services = ["Aulas Música", "Coordinación COM"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var comLblLocation = new google.maps.LatLng(-0.198343, -78.435877);
    var comLbl = new BuildingLbl(comLblLocation, "COM", usfqMap);
  
    // edificio hayek
    var hayek1Coor = [
      {lat: -0.1989392866895919, lng: -78.43589886623573},
      {lat: -0.1990975812009036, lng: -78.43596726256561},
      {lat: -0.19925051132509114, lng: -78.43588277298164},
      {lat: -0.1993417961480793, lng: -78.43591764169884},
      {lat: -0.1991701358091768, lng: -78.43638854596327},
      {lat: -0.19880115375740712, lng: -78.43624102446745}
    ];
  
    var hayek1 = new google.maps.Polygon({
      map: usfqMap,
      paths: hayek1Coor  ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(hayek1, 'click', function(e) {
      var name = "Hayek";
      var services = ["Instituto Idea - Shift", "Educación Continua", "Escuela de Empresas", "Clínicas Jurídicas", "Cafetería Ápice", "Student Union", "GOBE", "Decanato de Estudiantes", "Programa de Diversidad Étnica", "Colegio Vespertino", "Dragon Shop", "Librería OWL"];
      
      showBuildingInfo(name, services, e.latLng);
    });
  
    var hayek2Coor = [
      {lat: -0.19912033470575488, lng: -78.43548982936096},
      {lat: -0.19944774276259547, lng: -78.43568428951454},
      {lat: -0.19935654820836735, lng: -78.43589904281805},
      {lat: -0.199245231565937, lng: -78.43583651382039},
      {lat: -0.19920231083934944, lng: -78.43584908667515},
      {lat: -0.19918084201335665, lng: -78.4358635035486},
      {lat: -0.19915669099457148, lng: -78.43590742472122},
      {lat: -0.1990856016014046, lng: -78.43592854711721},
      {lat: -0.19903995918925532, lng: -78.43594598147581},
      {lat: -0.19894330997886314, lng: -78.43590038392256}
    ];
  
    var hayek2 = new google.maps.Polygon({
      map: usfqMap,
      paths: hayek2Coor  ,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(hayek2, 'click', function(e) {
      var name = "Hayek";
      var services = ["Colegio Jurisprudencia", "Colegio COCISOH", "Colegio Salud Pública", "Business School", "Biblioteca", "Departamento de Lenguas Extranjeras", "SIME", "Teatro Shakespeare", "Oficinas profesores", "Laboratorio de Hormigón", "Laboratorio de Química"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var hayek3Coor = [
      {lat: -0.1994569499008983, lng: -78.43569099503708},
      {lat: -0.19959392226759776, lng: -78.43577682572555},
      {lat: -0.1993780057505918, lng: -78.43628514847944},
      {lat: -0.19930692764188027, lng: -78.43626507605745},
      {lat: -0.19926937694282526, lng: -78.43635367724607},
      {lat: -0.19919409500807303, lng: -78.43631746742437}
    ];
  
    var hayek3 = new google.maps.Polygon({
      map: usfqMap,
      paths: hayek3Coor  ,
      strokeColor: '#87d17b',
      fillColor: '#87d17b',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(hayek3, 'click', function(e) {
      var name = "Hayek";
      var services = ["Colegio Ciencias e Ingenierías", "Oficinas y aulas", "Instituto de Geografía", "Learning Center", "Laboratorio de Animación", "Clínica Odontológica", "Zona de deportes", "Sala de Cine - COCOA", "Antropología", "Laboratorio Física", "Laboratorio Electrónica", "Laboratorio Mecánica", "Arqueología"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var hayekLblLocation = new google.maps.LatLng(-0.199215, -78.436147);
    var hayekLbl = new BuildingLbl(hayekLblLocation, "Hayek", usfqMap);
  
    var hospitalDeLosVallesCoor = [
      {lat: -0.20725601007948505, lng: -78.42456246817017},
      {lat: -0.20799647541864164, lng: -78.42477168047333},
      {lat: -0.20857314654644196, lng: -78.42492465467836},
      {lat: -0.20871932596850812, lng: -78.42502259945297},
      {lat: -0.208790404035618, lng: -78.42514200189976},
      {lat: -0.20944476842043566, lng: -78.42472894171146},
      {lat: -0.2093427549026877, lng: -78.42348439672855},
      {lat: -0.20766638536856938, lng: -78.42299614639666}
    ];
  
    var hospitalDeLosValles = new google.maps.Polygon({
      map: usfqMap,
      paths: hospitalDeLosVallesCoor,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.6
    });
  
    google.maps.event.addListener(hospitalDeLosValles, 'click', function(e) {
      var name = "Hospital de Los Valles (HDLV)";
      var services = ["Facultad de Medicina", "Servicios Médicos"];
      showBuildingInfo(name, services, e.latLng);
    });
  
    var hospitalDeLosVallesLblLocation = new google.maps.LatLng(-0.208367, -78.424344);
    var hospitalDeLosVallesLbl = new BuildingLbl(hospitalDeLosVallesLblLocation, "Hospital de Los Valles(HDLV)")
  
    usfqCampus = [
      mainEntrance,
      miguelDeSantiago,
      mozart,
      aristoteles,
      socrates,
      laotze,
      hallPrincipal,
      eugenioEspejo,
      cuadrantes,
      plantaFisica,
      veterinaria,
      tesoreria,
      ciceron,	
      epicuro,
      piramide,
      einstein,
      darwin,
      davinci,
      maxwell,
      bs,
      odontologia,
      casaCorona,
      casaTomate,
      casaBlanca,
      galileo,
      newton,
      gastroChallenge,
      pagoda,
      coliseo,
      obelisco,
      aulasCom,
      canchasVolley,
      canchasTennis,
      tallerMetales,
      canchasFutbolSinth,
      greenHouse,
      canchasFutbol,
      invernadero,
      entradaPuente,
      puente,
      com,
      hayek1,
      hayek2,
      hayek3,
      hospitalDeLosValles,
    ];

    console.log("Building Num", usfqCampus.length);
    

    var buildingLbls = [
      mainEntranceLbl,
      miguelDeSantiagoLbl,
      mozartLbl,
      aristotelesLbl,
      socratesLbl,
      laotzeLbl,
      hallPrincipalLbl,
      eugenioEspejoLbl,
      cuadrantesLbl,
      plantaFisicaLbl,
      veterinariaLbl,
      tesoreriaLbl,
      ciceronLbl,
      epicuroLbl,
      piramideLbl,
      einstienLbl,
      darwinLbl,
      davinciLbl,
      maxwellLbl,
      bsLbl,
      odontologiaLbl,
      casaCoronaLbl,
      casaBlancaLbl,
      casaTomateLbl,
      galileoLbl,
      newtonLbl,
      gastroChallengeLbl,
      pagodaLbl,
      coliseoLbl,
      obeliscoLbl,
      aulasComLbl,
      canchasVolleyLbl,
      canchasTennisLbl,
      tallerMetalesLbl,
      canchasFutbolSinthLbl,
      canchasFutbolSinthLbl,
      greenHouseLbl,	
      canchasFutbolLbl,
      invernaderoLbl,
      entradaPuenteLbl,
      puenteLbl,
      comLbl,
      hayekLbl,
      hospitalDeLosVallesLbl,
    ];    

    buildingLbls.forEach(lbl => lbl.setMap(null));
  
      /* 
    ###############################
      Marcadores  
    ###############################
    */
  
    // Entradas Campus
    var mainEntranceMarker = new google.maps.Marker({
      position: {lat: -0.197055, lng:-78.436645},
      map: usfqMap,
      label: 'A',
      title: 'Main Entrance'
    });
    
    var bridgeEntranceMarker = new google.maps.Marker({
      position: {lat:-0.198156, lng:-78.435807},
      map: usfqMap,
      label: 'B',
      title: "Bridge Entrance"
    });
  
    // Casa Corona
    var casaCoronaMarker = new google.maps.Marker({
      position: {lat: -0.196434, lng:-78.434529},
      map: usfqMap,
      title: "Casa Corona"
    });
  
    usfqEntrances = [
      mainEntranceMarker,
      bridgeEntranceMarker
    ];
  
    // Paradas de buses
    var busLocations = [
      {
        position: new google.maps.LatLng(-0.198277, -78.436516)
      }, {
        position: new google.maps.LatLng(-0.198511, -78.436193)
      }, {
        position: new google.maps.LatLng(-0.209706, -78.424789)
      }
    ];
    var busLen = busLocations.length;
    busStops = new Array(busLen);
  
    for(var i = 0; i < busLen; i++) {
      busStops[i] = new google.maps.Marker({
        position: busLocations[i].position,
        icon: 'img/bus-logo.png',
        map: usfqMap,
        title: 'Bus Stop'
      });
    }
  
    // Puntos de encuentro
    var puntosEncuentroLocations = [
      {
        position: new google.maps.LatLng(-0.195293, -78.435994)
      }, {
        position: new google.maps.LatLng(-0.195801, -78.434546)
      }, {
        position: new google.maps.LatLng(-0.195820, -78.435532)
      }, {
        position: new google.maps.LatLng(-0.195764, -78.436252)
      }, {
        position: new google.maps.LatLng(-0.197531, -78.436093)
      }, {
        position: new google.maps.LatLng(-0.198966, -78.435425)
      }, {
        position: new google.maps.LatLng(-0.199363, -78.434526)
      }, {
        position: new google.maps.LatLng(-0.208957, -78.424842)
      }
    ];
  
    var length = puntosEncuentroLocations.length
  
    puntosEncuentro = new Array(length);
  
    for(var i = 0; i < length; i++) {
      puntosEncuentro[i] = new google.maps.Marker({
        position: puntosEncuentroLocations[i].position,
        icon: 'img/encuentro-logo.png',
        map: null,
        title: 'Meeting Point'
      });
    }
  
    // Servicios para discapacitados
    var handicapServicesLocations = [
      {
        position: new google.maps.LatLng(-0.196015, -78.435870)
      }, {
        position: new google.maps.LatLng(-0.195989, -78.435418)
      }, {
        position: new google.maps.LatLng(-0.196228, -78.435151)
      }, {
        position: new google.maps.LatLng(-0.196400, -78.435621)
      }, {
        position: new google.maps.LatLng(-0.196522, -78.435806)
      }, {
        position: new google.maps.LatLng(-0.197140, -78.436581)
      }, {
        position: new google.maps.LatLng(-0.197682, -78.436617)
      }, {
        position: new google.maps.LatLng(-0.197585, -78.435903)
      }, {
        position: new google.maps.LatLng(-0.198142, -78.435789)
      }, {
        position: new google.maps.LatLng(-0.199032, -78.436072)
      }, {
        position: new google.maps.LatLng(-0.199017, -78.435789)
      }, {
        position: new google.maps.LatLng(-0.199385, -78.435835)
      }, {
        position: new google.maps.LatLng(-0.208766, -78.424744)
      }, {
        position: new google.maps.LatLng(-0.208882, -78.424545)
      }
    ];
    var handicapLength = handicapServicesLocations.length;
    handicapServices = new Array(handicapLength);
  
    for(var i = 0; i < handicapLength; i++){
      handicapServices[i] = new google.maps.Marker({
        position: handicapServicesLocations[i].position,
        icon: 'img/handicap-logo.png',
        map: null,
        title: 'Handicap Service'
      });
    }
  
    // Salidas de emergencia
    var emergencyExitsLocations = [
      {
        position: new google.maps.LatLng(-0.195423, -78.435933)
      }, {
        position: new google.maps.LatLng(-0.195660, -78.435397)
      }, {
        position: new google.maps.LatLng(-0.195912, -78.434737)
      }, {
        position: new google.maps.LatLng(-0.195814, -78.436226)
      }, {
        position: new google.maps.LatLng(-0.195754, -78.436540)
      }, {
        position: new google.maps.LatLng(-0.196127, -78.435760)
      }, {
        position: new google.maps.LatLng(-0.196257, -78.435430)
      }, {
        position: new google.maps.LatLng(-0.196440, -78.435842)
      }, {
        position: new google.maps.LatLng(-0.196786, -78.435780)
      }, {
        position: new google.maps.LatLng(-0.197009, -78.436648)
      }, {
        position: new google.maps.LatLng(-0.197658, -78.436733)
      }, {
        position: new google.maps.LatLng(-0.197720, -78.436594)
      }, {
        position: new google.maps.LatLng(-0.197630, -78.436361)
      }, {
        position: new google.maps.LatLng(-0.197400, -78.436232)
      }, {
        position: new google.maps.LatLng(-0.197621, -78.435760)
      }, {
        position: new google.maps.LatLng(-0.198171, -78.435805)
      }, {
        position: new google.maps.LatLng(-0.198394, -78.435857)
      }, {
        position: new google.maps.LatLng(-0.198903, -78.435963)
      }, {
        position: new google.maps.LatLng(-0.199423, -78.435953)
      }, {
        position: new google.maps.LatLng(-0.208625, -78.424724)
      }, {
        position: new google.maps.LatLng(-0.208944, -78.424555)
      }, {
        position: new google.maps.LatLng(-0.199448, -78.434497)
      }
    ];
  
    var emergencyLen = emergencyExitsLocations.length;
    emergencyExits = new Array(emergencyLen);
  
    for(var i = 0; i < emergencyLen; i++) {
      emergencyExits[i] = new google.maps.Marker({
        position: emergencyExitsLocations[i].position,
        icon: 'img/emergency-logo.png',
        map: null,
        title: 'Emergency Exit'
      });
    }
  
    // Restaurantes
    var restaurantInfo = [
      {
        position: new google.maps.LatLng(-0.195577, -78.435860),
        title: 'Marcus',
        icon: 'img/marcus-logo.png'
      }, {
        position: new google.maps.LatLng(-0.195481, -78.435850),
        title: 'Ambrosía',
        icon: 'img/ambrosia-logo.png'
      }, {
        position: new google.maps.LatLng(-0.195848, -78.435774),
        title: 'Vía Bonita',
        icon: 'img/viabonita-logo.png'
      }, {
        position: new google.maps.LatLng(-0.195936, -78.435759),
        title: 'No sea Malito',
        icon: 'img/nsm-logo.png'
      }, {
        position: new google.maps.LatLng(-0.195956, -78.435677),
        title: 'La Tratoría',
        icon: 'img/tratoria-logo.png'
      }, {
        position: new google.maps.LatLng(-0.199107, -78.435800),
        title: 'Ápice',
        icon: 'img/apice-logo.png'
      }, {
        position: new google.maps.LatLng(-0.196367, -78.435704),
        title: 'Pirámide',
        icon: 'img/piramide-logo.png'
      }, {
        position: new google.maps.LatLng(-0.196316, -78.435792),
        title: 'Cafetería',
        icon: 'img/coffee-logo.png'
      }
    ];
    var restaurantNum = restaurantInfo.length;
    restaurants = new Array(restaurantNum);
  
    for(var i = 0; i < restaurantNum; i++) {
      restaurants[i] = new google.maps.Marker({
        position: restaurantInfo[i].position,
        icon: restaurantInfo[i].icon,
        title: restaurantInfo[i].title,
        map: null
      });
    }
  
    // Servicios Estudiantiles
    var studentServicesInfo = [
      {
        position: new google.maps.LatLng(-0.196512, -78.435550),
        icon: 'img/prink-logo.png',
        title: "Prink"
      }, {
        position: new google.maps.LatLng(-0.196498, -78.435600),
        icon: 'img/diners-logo.png',
        title: 'Diners'
      }, {
        position: new google.maps.LatLng(-0.196405, -78.435554),
        icon: 'img/usfq-logo.png',
        title: 'OASA'
      }, {
        position: new google.maps.LatLng(-0.196762, -78.435746),
        icon: 'img/usfq-logo.png',
        title: 'Registro'
      }, {
        position: new google.maps.LatLng(-0.196189, -78.435487),
        icon: 'img/usfq-logo.png',
        title: 'Tesorería'
      }, {
        position: new google.maps.LatLng(-0.196221, -78.435628),
        icon: 'img/usfq-logo.png',
        title: 'Contabilidad'
      }, {
        position: new google.maps.LatLng(-0.196566, -78.435708),
        icon: 'img/usfq-logo.png',
        title: 'Admisiones'
      }, {
        position: new google.maps.LatLng(-0.196257, -78.435658),
        icon: 'img/usfq-logo.png',
        title: 'Tecnologías de la Información'
      }, {
        position: new google.maps.LatLng(-0.196433, -78.435548),
        icon: 'img/service-desk-logo.png',
        title: 'Service Desk'
      }, {
        position: new google.maps.LatLng(-0.199067, -78.436175),
        icon: 'img/usfq-logo.png',
        title: 'Decanato de Estudiantes'
      }, {
        position: new google.maps.LatLng(-0.199339, -78.436272),
        icon: 'img/lc-usfq-logo.png',
        title: 'Learning Center'
      }, {
        position: new google.maps.LatLng(-0.199417, -78.435811),
        icon: 'img/wc-logo.png',
        title: 'Writing Center'
      }, {
        position: new google.maps.LatLng(-0.198988, -78.436232),
        icon: 'img/usfq-logo.png',
        title: 'Student Union'
      }, {
        position: new google.maps.LatLng(-0.198982, -78.436174),
        icon: 'img/gobe-usfq-logo.png',
        title: 'Gobe USFQ'
      }, {
        position: new google.maps.LatLng(-0.199127, -78.436030),
        icon: 'img/dragon-shop-icon.png',
        title: 'Dragon Shop'
      }
    ];
  
    var studentServicesNum = studentServicesInfo.length;
    studentServices = new Array(studentServicesNum);
  
    for(var i = 0; i < studentServicesNum; i++) {
      studentServices[i] = new google.maps.Marker({
        position: studentServicesInfo[i].position,
        icon: studentServicesInfo[i].icon,
        title: studentServicesInfo[i].title,
        map: null
      })
    }
  
    // Servicios de salud
    var healthServicesInfo = [
      {
        position: new google.maps.LatLng(-0.196175, -78.434587),
        icon: 'img/logo-odontologia.png',
        title: 'Odontología USFQ'
      }, {
        position: new google.maps.LatLng(-0.199415, -78.435882),
        icon: 'img/logo-odontologia.png',
        title: 'Odontología USFQ'
      }, {
        position: new google.maps.LatLng(-0.199384, -78.435759),
        icon: 'img/sime-logo.png',
        title: 'Sistemas Médicos (SIME)'
      }, {
        position: new google.maps.LatLng(-0.208282, -78.424398),
        icon: 'img/hdvl-logo.png',
        title: 'Hospital de Los Valles (HDLV)'
      }
    ];
    var healthServicesNum = healthServicesInfo.length;
    healthServices = new Array(healthServicesNum);
  
    for(var i = 0; i < healthServicesNum; i++) {
      healthServices[i] = new google.maps.Marker({
        position: healthServicesInfo[i].position,
        icon: healthServicesInfo[i].icon,
        title: healthServicesInfo[i].title,
        map: null
      });
    }

    google.maps.event.addListener(usfqMap, 'zoom_changed', function() {
      var zoomLevel = usfqMap.getZoom();
      console.log("Zoom level", zoomLevel);

      if(zoomLevel >= 20) {
        console.log("buildings on");

        // for(var i = 0; i < usfqEntrances.length; i++){
        //   if(usfqEntrances[i].getMap() === null) {
        //     usfqEntrances.forEach(entrance => entrance.setMap(usfqMap));
        //   }
        // }
        for(var i = 0; i < buildingLbls.length; i++){
          if(buildingLbls[i].getMap() === null) {
            buildingLbls[i].setMap(usfqMap);
          }
        }

        for(var i = 0; i < restaurants.length; i++){
          if(restaurants[i].getMap() === null && restaurantsCheck){
            restaurants.forEach(restaurant => restaurant.setMap(usfqMap));
            console.log("restaurants checked", restaurantsCheck);
          }
        }

        // for(var i = 0; i< busStops.length; i++){
        //   if(busStops[i].getMap() === null){
        //     busStops.forEach(stop => stop.setMap(usfqMap));
        //   }
        // }

        for(var i = 0; i < puntosEncuentro.length; i++){
          if(puntosEncuentro[i].getMap() === null && meetingPointsCheck){
            puntosEncuentro.forEach(puntos => puntos.setMap(usfqMap));
          }
        }

        for(var i = 0; i < healthServices.length; i++){
          if(healthServices[i].getMap() === null && healthServicesCheck) {
            healthServices.forEach(service => service.setMap(usfqMap));
          }
        }

        for(var i = 0; i < handicapServices.length; i++){
          if(handicapServices[i].getMap() === null && handicapServicesCheck) {
            handicapServices.forEach(service => service.setMap(usfqMap));
          }
        }

        for(var i = 0; i < studentServices.length; i++){
          if(studentServices[i].getMap() === null && studentServicesCheck) {
            studentServices.forEach(service => service.setMap(usfqMap));
          }
        }

        for(var i = 0; i < emergencyExits.length; i++){
          if(emergencyExits[i].getMap() === null && emergencyExitsCheck) {
            emergencyExits.forEach(exit => exit.setMap(usfqMap));
          }
        }
      } else {
        console.log("buildings off");   
        
        // for(var i = 0; i < usfqEntrances.length; i++){
        //   if(usfqEntrances[i].getMap() !== null) {
        //     usfqEntrances.forEach(entrance => entrance.setMap(null));
        //   }
        // }

        for(var i = 0; i < buildingLbls.length; i++){
          if(buildingLbls[i].getMap() !== null) {
            buildingLbls[i].setMap(null);
          }
        }

        for(var i = 0; i < restaurants.length; i++){
          if(restaurants[i].getMap() !== null && restaurantsCheck){
            console.log("restaurants checked", restaurantsCheck);
            
            restaurants.forEach(restaurant => restaurant.setMap(null));
          }
        }

        // for(var i = 0; i< busStops.length; i++){
        //   if(busStops[i].getMap() !== null){
        //     busStops.forEach(stop => stop.setMap(null));
        //   }
        // }

        for(var i = 0; i < puntosEncuentro.length; i++){
          if(puntosEncuentro[i].getMap() !== null && meetingPointsCheck){
            puntosEncuentro.forEach(puntos => puntos.setMap(null));
          }
        }

        for(var i = 0; i < healthServices.length; i++){
          if(healthServices[i].getMap() !== null && healthServicesCheck) {
            healthServices.forEach(service => service.setMap(null));
          }
        }

        for(var i = 0; i < handicapServices.length; i++){
          if(handicapServices[i].getMap() !== null && handicapServicesCheck) {
            handicapServices.forEach(service => service.setMap(null));
          }
        }

        for(var i = 0; i < studentServices.length; i++){
          if(studentServices[i].getMap() !== null && studentServicesCheck) {
            studentServices.forEach(service => service.setMap(null));
          }
        }

        for(var i = 0; i < emergencyExits.length; i++){
          if(emergencyExits[i].getMap() !== null && emergencyExitsCheck) {
            emergencyExits.forEach(exit => exit.setMap(null));
          }
        }
      }
    });
  }
  google.maps.event.addDomListener(window, 'load', initMap);
});

// metodo usado para obtener coordenadas del poligono
function logArray(array) {
  var vertices = [];

  for (var i = 0; i < array.getLength(); i++) {
    vertices.push({
      lat: array.getAt(i).lat(),
      lng: array.getAt(i).lng()
    });
  }

  console.log(vertices);
}

// muestra la informacion de los edificios
function showBuildingInfo(buildingName, buildingServices, position){
  var contentString = '<div class="buildingInfo">' +
    '<h1 class="buildingName">' + buildingName + '</h1>' +
    '<div class="buildingDescription">' + '<ul>';
  
  buildingServices.forEach(item => contentString += "<li>" + item + "</li>");
  
  contentString += '</ul>' + '</div>' + '</div>';

  infowindow.setContent(contentString);
  infowindow.setPosition(position);
  infowindow.open(usfqMap);
}

// funcion para filtrar mapa 
function mapOptions(option){
  if(option === 'satellite') {
    satelliteCheck = true;
    usfqMap.setMapTypeId(option);
  } else if(option === 'roadmap') {
    satelliteCheck = false;
    usfqMap.setMapTypeId(option);
  }

  if(option === 'map') {
    usfqCampus.forEach(building => building.setMap(usfqMap));
    campusCheck = true;
  }

  if(option === 'null') {
    usfqCampus.forEach(building => building.setMap(null));
    campusCheck = false;
  }

  if(option === 'commercial') {
    usfqMap.setOptions({styles: []});
    commercialPlacesCheck = true;
  }

  if(option === 'no commercial') {
    usfqMap.setOptions({styles: commercialFilter});
    commercialPlacesCheck = false;
  }

  if(option === 'emergency') {
    emergencyExits.forEach(exit => exit.setMap(usfqMap));
    emergencyExitsCheck = true;
  }

  if(option === 'no emergency exits') {
    emergencyExits.forEach(exit => exit.setMap(null));
    emergencyExitsCheck = false; 
  }

  if(option === 'handicap') {
    handicapServices.forEach(service => service.setMap(usfqMap));
    handicapServicesCheck = true;
  }

  if(option === 'no handicap') {
    handicapServices.forEach(service => service.setMap(null));
    handicapServicesCheck = false; 
  }

  if(option === 'entrances') {
    usfqEntrances.forEach(entrance => entrance.setMap(usfqMap));
    entrancesCheck = true;
  }

  if(option === 'no entrances') {
    usfqEntrances.forEach(entrance => entrance.setMap(null));
    entrancesCheck = false; 
  }

  if(option === 'meeting points'){
    puntosEncuentro.forEach(punto => punto.setMap(usfqMap));
    meetingPointsCheck = true;
  }

  if(option === 'no meeting'){
    puntosEncuentro.forEach(punto => punto.setMap(null));
    meetingPointsCheck = false; 
  }

  if(option === 'bus stops') {
    busStops.forEach(busStop => busStop.setMap(usfqMap));
    busStopsCheck = true;
  }

  if(option === 'no bus stops'){
    busStops.forEach(busStop => busStop.setMap(null));
    busStopsCheck = false; 
  }

  if(option === 'restaurants') {
    restaurants.forEach(restaurant => restaurant.setMap(usfqMap));
    restaurantsCheck = true;
  }

  if(option === 'no restaurants') {
    restaurants.forEach(restaurant => restaurant.setMap(null));
    restaurantsCheck = false; 
  }

  if(option === 'student services') {
    studentServices.forEach(service => service.setMap(usfqMap));
    studentServicesCheck = true;
  }

  if(option === 'no student services') {
    studentServices.forEach(service => service.setMap(null));
    studentServicesCheck = false; 
  }

  if(option === 'health services') {
    healthServices.forEach(service => service.setMap(usfqMap));
    healthServicesCheck = true;
  }

  if(option === 'no health services') {
    healthServices.forEach(service => service.setMap(null));
    healthServicesCheck = false; 
  }
}

function BuildingLbl(location, title, map) {
  this.location_ = location;
  this.title_ = title;
  this.map_ = map;

  this.div_ = null;

  this.setMap(map);
}

function handleLocationError(hasGeoLocation){
  console.log(hasGeoLocation ?   
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}