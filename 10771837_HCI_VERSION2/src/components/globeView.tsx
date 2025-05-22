// src/components/GlobeView.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import types
import { GlobeViewProps, Earthquake } from '../types/navigation';
import { styles } from '../styles/globeViewStyles';

const GlobeView: React.FC<GlobeViewProps> = ({ earthquakes, is3D, onMarkerPress }) => {
  const webViewRef = useRef<WebView | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 30,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
  });

  // Format earthquake data for the 3D globe
  const formattedEarthquakes = earthquakes.map(quake => ({
    id: quake.id,
    latitude: quake.latitude,
    longitude: quake.longitude,
    magnitude: quake.magnitude,
    color: quake.color,
  }));

  // Send updated earthquake data to the WebView
  const updateEarthquakeData = (): void => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: 'UPDATE_EARTHQUAKES',
          data: formattedEarthquakes
        })
      );
    }
  };

  useEffect(() => {
    if (is3D) {
      updateEarthquakeData();
    }
  }, [earthquakes, is3D]);

  // Handle marker press in 2D map
  const handleMarkerPress = (earthquakeId: string): void => {
    onMarkerPress(earthquakeId);
  };

  // HTML content for the 3D globe using three.js
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <style>
        body {
          margin: 0;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          background-color: #f0f0f0;
        }
        canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    </head>
    <body>
      <script>
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create Earth sphere
        const earthRadius = 5;
        const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
        
        // Load Earth texture
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/land_ocean_ice_cloud_2048.jpg');
        const earthMaterial = new THREE.MeshPhongMaterial({ 
          map: earthTexture,
          specular: new THREE.Color('grey'),
          shininess: 10
        });
        
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // Position camera
        camera.position.z = 15;

        // Add earthquake markers
        const earthquakes = ${JSON.stringify(formattedEarthquakes)};
        const markers = [];
        
        function addEarthquakeMarkers(quakes) {
          // Remove existing markers
          markers.forEach(marker => scene.remove(marker));
          markers.length = 0;
          
          // Add new markers
          quakes.forEach(quake => {
            // Convert lat/long to 3D coordinates
            const phi = (90 - quake.latitude) * (Math.PI / 180);
            const theta = (quake.longitude + 180) * (Math.PI / 180);
            
            const x = -earthRadius * Math.sin(phi) * Math.cos(theta);
            const y = earthRadius * Math.cos(phi);
            const z = earthRadius * Math.sin(phi) * Math.sin(theta);
            
            // Create marker based on magnitude
            const size = Math.max(0.05, Math.min(0.2, quake.magnitude / 10));
            const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
            const markerMaterial = new THREE.MeshBasicMaterial({ color: quake.color });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            
            marker.position.set(x, y, z);
            marker.userData = { id: quake.id };
            scene.add(marker);
            markers.push(marker);
          });
        }
        
        addEarthquakeMarkers(earthquakes);

        // Add rotation animation
        let rotationSpeed = 0.001;
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        // Handle touch/mouse events for rotation
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('touchend', onDocumentTouchEnd, false);
        
        function onDocumentMouseDown(event) {
          isDragging = true;
          previousMousePosition = {
            x: event.clientX,
            y: event.clientY
          };
          event.preventDefault();
        }
        
        function onDocumentTouchStart(event) {
          if (event.touches.length === 1) {
            isDragging = true;
            previousMousePosition = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY
            };
            event.preventDefault();
          }
        }
        
        function onDocumentMouseMove(event) {
          if (isDragging) {
            const deltaMove = {
              x: event.clientX - previousMousePosition.x,
              y: event.clientY - previousMousePosition.y
            };
            
            earth.rotation.y += deltaMove.x * 0.005;
            earth.rotation.x += deltaMove.y * 0.005;
          }
        }
        
        function onDocumentTouchMove(event) {
          if (isDragging) {
            const deltaMove = {
              x: event.touches[0].clientX - previousMousePosition.x,
              y: event.touches[0].clientY - previousMousePosition.y
            };
            
            earth.rotation.y += deltaMove.x * 0.005;
            earth.rotation.x += deltaMove.y * 0.005;
          }
        }
        
        function onDocumentMouseUp(event) {
          isDragging = false;
        }
        
        function onDocumentTouchEnd(event) {
          isDragging = false;
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles.webView}
      />
    </View>
  );
};

export default GlobeView;