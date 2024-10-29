import { Text, View, Animated, Touchable, TouchableOpacity} from "react-native";
import React, {useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import mapViewStyle from "./mapViewStyle";
import MapView, { Geojson, Marker, Polygon } from "react-native-maps";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import useSupercluster from 'use-supercluster'
import PlannedOutageMarker from "./customMarker/plannedOutageMarker";
import UnPlannedOutageMarker from "./customMarker/unplannedOutageMarker";
import ClusteringMap from 'react-native-animated-map-clusters';
import CurrentLocationMarker from "./customMarker/currentLocationMarker";
import MyLocationIcon from "./customIcon/myLocationIcon";
import FutureOutageIcon from "./customIcon/futureOutageIcon";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { wholeMapOverlay } from "../../constants/constant";
import OutageInfoModal from "./outageInfo/outageInfoModal";
import Entypo from '@expo/vector-icons/Entypo';

function convertCoordinates(coordinatesArray) {
  return coordinatesArray.map(([longitude, latitude]) => ({
    latitude: latitude,
    longitude: longitude
  }));
}

function modifyGeoJson(geoJsonData) {
  let features = geoJsonData.features;
  for (let i = 0; i < features.length; i++) {
    let feature = features[i];
    let geometry = feature.geometry;
    let geometryType = geometry.type;

    if (geometryType === "Polygon") {
      let coordinates = geometry.coordinates;

      if (coordinates.length === 1) {
        let wholeMap = [
          [-179.99, 89.99],
          [-179.99, 0],
          [-179.99, -89.99],
          [0, -89.99],
          [179.99, -89.99],
          [179.99, 0],
          [179.99, 89.99],
          [0, 89.99],
          [-179.99, 89.99]
        ];
        coordinates.unshift(wholeMap);
      }
    }
  }

  return geoJsonData;
}

const regionToBoundingBox = (region)=> {
  let lngD;
  if (region.longitudeDelta < 0) lngD = region.longitudeDelta + 360;
  else lngD = region.longitudeDelta;

  return [
    region.longitude - lngD, // westLng - min lng
    region.latitude - region.latitudeDelta, // southLat - min lat
    region.longitude + lngD, // eastLng - max lng
    region.latitude + region.latitudeDelta, // northLat - max lat
  ];
};

export default function MapViewMain() {
  const {currentPlanned, currentUnPlanned, serviceArea, futurePlanned} = useSelector((state) => state.jsonReducer);


  const {currentLocation} = useSelector((state) => state.locationReducer)

  const [expand, setExpand] = useState(false) 
  const [isSelected, setSelection] = useState(0);
  const [zoomOutageInfo, setZoomOutageInfo] = useState();
  const [extend, setExtend] = useState(false)
  const bottomSheetOutage = useRef();

  const [groupedData, setGroupedData] = useState([])
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapRef = useRef(null)
  const [bounds, setBounds] = useState()
  const [zoom, setZoom] = useState(12)

  const global = useGlobalSearchParams();
  const [fadeAnim] = useState(new Animated.Value(1));


  // 

  // console.log("tab: ", global.showTabBar)
  // console.log("ID: ", global.mapID)

  // console.log(currentLocation)
  
  const handleExpandModal =  () => {
    bottomSheetOutage.current?.present()
  };

  const handleDismissModal =  () => {
    bottomSheetOutage.current?.dismiss()
  };


  const onRegionChangeComplete = async (region) => {
    const mapBounds = regionToBoundingBox(region);
    setBounds(mapBounds);
    const camera = await mapRef.current?.getCamera();
    setZoom(camera?.zoom ?? 10);
  }

  const onPressMarker = (point) =>{
    handleExpandModal()
    router.setParams({mapID: point.properties.EVENT_ID})
    router.setParams({showTabBar: false})
  }

  const onPressRegion = () => { 
    setZoomOutageInfo(null);
    router.setParams({showTabBar: true})
    handleDismissModal()
    setExtend(false)
  }

 const points =  useMemo(() => {
    return groupedData?.map((m) => (
      { 
      type:'Feature',
      geometry: (m.properties.TYPE === "PLANNED") ? m.geometry : m.geometry.geometries[0],
      properties:{
        cluster: false, 
        category: 'markers',
        ...m.properties,
        polygon: (m.properties.TYPE === "PLANNED") ? [] : m.geometry.geometries[1]
      }
    }
  ));
  }, [groupedData?.length]) 

  
  const {clusters, supercluster } = useSupercluster({
    points: points ? points : {},
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  })

  const handleClusterPress = (cluster_id) => {
    // Zoom to cluster
    const leaves = supercluster?.getLeaves(cluster_id);
    if (!leaves) return
    const coords = leaves?.map((l) => ({
      longitude: l.geometry.coordinates[0],
      latitude: l.geometry.coordinates[1],
    }))
    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: {
        top: 200,
        right: 50,
        bottom: 250,
        left: 50,
      },
      animated: true,
    });
  };

  const goToMyLocation = () => {
    const region = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.035,
      longitudeDelta: 0.035,
    };
    region && mapRef.current?.animateToRegion(region, 1000);
  }

  useEffect(() => { 
    if (global.showTabBar==="true") {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
      } else if (global.showTabBar==="false") {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
      }
  }, [global.showTabBar])

  useEffect(() =>{ 
    if(global.showTabBar === "false"){
      const event = groupedData?.find(event => event.properties.EVENT_ID === global.mapID);
      setZoomOutageInfo(event);
      const coords = (event.properties.TYPE === "PLANNED") ? 
      {
        longitude: event.geometry.coordinates[0],
        latitude: event.geometry.coordinates[1]-0.006,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }:
      {
        longitude: event.geometry.geometries[0].coordinates[0],
        latitude: event.geometry.geometries[0].coordinates[1]-0.006,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      coords && mapRef.current?.animateToRegion(coords, 500);
      handleExpandModal()
    } else if(global.showTabBar === "true"){
      handleDismissModal()
    }
  },[global.mapID, global.showTabBar])



  useEffect(() => { 
    let outage = [...(currentPlanned.features || []), ...(currentUnPlanned.features || [])];
    isSelected === 0 ? setGroupedData(Array.isArray(outage) ? outage : [])
    : setGroupedData(Array.isArray(futurePlanned.features) ? futurePlanned.features : []);   
  }, [currentPlanned, currentUnPlanned, futurePlanned, isSelected])

  return (
    <SafeAreaView style={mapViewStyle.mv_container}>
      <MaskedView
                style={{flex:1}}
                maskElement={<LinearGradient style={{flex: 1}} colors={global.showTabBar === "false" ?  ['white', 'white'] : ['white', 'white','white', 'white','white','white','white','white','white','transparent'] }/>}
            >
        <MapView style={mapViewStyle.mv_map}
          showsCompass={false}
          minZoomLevel={1}
          onRegionChangeComplete={onRegionChangeComplete}
          ref={mapRef}
          onTouchStart={onPressRegion}
          initialRegion={{
            latitude: -27.470125,
            longitude: 153.021072,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}
        >
          
          {serviceArea.type ? <Geojson
            geojson={modifyGeoJson(serviceArea)}
            strokeColor="black"
            fillColor="rgba(0, 0, 0, 0.3)"
            strokeWidth={2}/> : <></>}

          {global.showTabBar === "false" ? <Geojson
            geojson={wholeMapOverlay}
            fillColor="rgba(0, 0, 0, 0.2)"
            /> : <></>}

            {clusters?.map((point, index) => {
              const properties = point.properties;
              const [longitude, latitude] = point.geometry.coordinates;
              const coordinates = { latitude, longitude };
              
              

              if (properties?.cluster) {
                const size = 25 + (properties.point_count * 75) / points.length
                return (
                  <Marker
                    key={index}
                    coordinate={coordinates}
                    tracksViewChanges={false}
                    onPress={() => handleClusterPress(properties.cluster_id)}
                    >
                    <View style={[mapViewStyle.mv_supercluserContainer, { width: size > 40 ? 40: size, height: size > 40 ? 40: size}]}>
                      <View style={mapViewStyle.mv_supercluser}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold',}}>{properties.point_count}</Text>
                      </View>
                    </View>
                  </Marker>
                );
              } else {
                if (properties.TYPE === "PLANNED"){
                  return (
                    <PlannedOutageMarker
                      key={index}
                      coordinate={coordinates}
                      properties={properties} 
                      onPressMarker={() => onPressMarker(point)}/>
                  )
                }else{
                  return (
                    <View key={index}>
                      <Polygon coordinates={convertCoordinates(properties.polygon.coordinates[0])}
                        fillColor={global.showTabBar === "false" ? "rgba(255,80,80,0.5)": "rgba(255,150,150,0.2)"}
                        strokeWidth={0}
                    />
                      <UnPlannedOutageMarker
                        key={index}
                        coordinate={coordinates}
                        properties={properties} 
                        onPressMarker={() => onPressMarker(point)}/>
                    </View>
                  )
                }
                  
              }
              
            
            })}

            {currentLocation.coords ? <CurrentLocationMarker coordinate={currentLocation.coords}/>: <></>}
            
          
        </MapView>

        {/* <ClusteringMap  style={mapViewStyle.mv_map}
        minZoomLevel={1}
        showsUserLocation
        ref={mapRef}
        initialRegion={{
          latitude: -27.470125,
          longitude: 153.021072,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
        minDistance={40}
        moveDuration={200}
        >
          {currentPlanned?.features?.map((m, index) => { 
            const [longitude, latitude] = m.geometry.coordinates;
            const coordinates = { latitude, longitude };
            return(
              <Marker
                coordinate={coordinates}
              >
              </Marker>
            )
          })

          }

        </ClusteringMap> */}
      </MaskedView>
      <SafeAreaView  style={{position:"absolute", top:15, left:15}}>
        <Link push href="/menu" asChild>
          <TouchableOpacity onPress={() => onPressRegion()}>
            <Entypo name="menu" size={35} color="black" />
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
      <OutageInfoModal ref={bottomSheetOutage} outage={zoomOutageInfo} extend={extend} setExtend={setExtend}/>
      {currentLocation.length != 0 && <MyLocationIcon onPress={goToMyLocation} fadeAnim={fadeAnim}/>}
      <FutureOutageIcon mbottom={currentLocation.length != 0 ? 50 : 0} setExpand={setExpand} expand={expand} isSelected={isSelected} setSelection={setSelection} fadeAnim={fadeAnim}/> 
    </SafeAreaView>

  )
}
