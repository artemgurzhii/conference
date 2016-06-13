const geolocator = (() => {
  let onSuccess;
  let onError;
  let mCanvasId;
  const googleLoaderURL = 'https://www.google.com/jsapi';
  const mapsVersion = '3.18';

  const ipGeoSources = [{
    url: '//freegeoip.net/json/',
    cbParam: 'callback'
  },
  {
    url: '//www.geoplugin.net/json.gp',
    cbParam: 'jsoncallback'
  },
  {
    url: '//geoiplookup.wikimedia.org/',
    cbParam: ''
  }];

  const defaultSourceIndex = 1;
  let sourceIndex;

  const loadScript = (url, callback, removeOnCallback) => {
    const script = document.createElement('script');
    script.async = true;

    const execCb = (cb, data) => {
      if (removeOnCallback && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (typeof cb === 'function') {
        cb(data);
      }
    };

    if (script.readyState) {
      script.onreadystatechange = e => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          execCb(callback);
        }
      };
    } else {
      script.onload = e => execCb(callback);
    }

    script.onerror = e => {
      const errMsg = `Could not load source at ${String(url).replace(/\?.*$/, '')}`;
      execCb(onError, new Error(errMsg));
    };

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  const loadGoogleMaps = callback => {
    const loadMaps = () => {
      if (geolocator.__glcb) delete geolocator.__glcb;
      google.load('maps', mapsVersion, {other_params: '', callback});
    };
    if (window.google !== undefined && google.maps !== undefined) {
      if (callback) callback();
    } else {
      if (window.google !== undefined && google.maps !== undefined) {
        loadMaps();
      } else {
        geolocator.__glcb = loadMaps;
        loadScript(`${googleLoaderURL}?callback=geolocator.__glcb`);
      }
    }
  };

  const drawMap = (elemId, mapOptions, infoContent) => {
    let map;
    let marker;
    let infowindow;
    const elem = document.getElementById(elemId);
    if (elem) {
      map = new google.maps.Map(elem, mapOptions);
      marker = new google.maps.Marker({
        position: mapOptions.center,
        map
      });
      infowindow = new google.maps.InfoWindow();
      infowindow.setContent(infoContent);
      google.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });
      geolocator.location.map = {
        canvas: elem,
        map,
        options: mapOptions,
        marker,
        infoWindow: infowindow
      };
    } else {
      geolocator.location.map = null;
    }
  };

  const reverseGeoLookup = (latlng, callback) => {
    const geocoder = new google.maps.Geocoder();
    const onReverseGeo = (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (callback) { callback(results); }
      }
    };
    geocoder.geocode({'latLng': latlng}, onReverseGeo);
  };

  const fetchDetailsFromLookup = data => {
    if (data && data.length > 0) {
      let i;
      let c;
      const o = {};
      const comps = data[0].address_components;
      for (i = 0; i < comps.length; i += 1) {
        c = comps[i];
        if (c.types && c.types.length > 0) {
          o[c.types[0]] = c.long_name;
          o[`${c.types[0]}_s`] = c.short_name;
        }
      }
      geolocator.location.formattedAddress = data[0].formatted_address;
      geolocator.location.address = {
        street: o.route || '',
        neighborhood: o.neighborhood || '',
        town: o.sublocality || '',
        city: o.locality || '',
        region: o.administrative_area_level_1 || '',
        country: o.country || '',
        countryCode: o.country_s || '',
        postalCode: o.postal_code || '',
        streetNumber: o.street_number || ''
      };
    }
  };

  const finalize = coords => {
    const latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    const onGeoLookup = data => {
      fetchDetailsFromLookup(data);
      const zoom = geolocator.location.ipGeoSource === null ? 14 : 7,
      mapOptions = {
        zoom,
        center: latlng,
        mapTypeId: 'roadmap'
      };
      drawMap(mCanvasId, mapOptions, data[0].formatted_address);
      if (onSuccess) onSuccess.call(null, geolocator.location);
    };
    reverseGeoLookup(latlng, onGeoLookup);
  };

  const getPosition = (fallbackToIP, html5Options) => {
    geolocator.location = null;
    const fallback = error => {
      const ipsIndex = fallbackToIP === true ? 0 : (typeof fallbackToIP === 'number' ? fallbackToIP : -1);
      if (ipsIndex >= 0) {
        geolocator.locateByIP(onSuccess, onError, ipsIndex, mCanvasId);
      } else {
        if (onError) onError(error);
      }
    };

    const geoSuccess = position => {
      geolocator.location = {
        ipGeoSource: null,
        coords: position.coords,
        timestamp: (new Date()).getTime()
      };
      finalize(geolocator.location.coords);
    };

    const geoError = error => fallback(error);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, html5Options);
    } else {
      fallback(new Error('geolocation is not supported.'));
    }
  };

  const buildLocation = (ipSourceIndex, data) => {
    switch (ipSourceIndex) {
      case 0:
        geolocator.location = {
          coords: {
            latitude: data.latitude,
            longitude: data.longitude
          },
          address: {
            city: data.city,
            country: data.country_name,
            countryCode: data.country_code,
            region: data.region_name
          }
        };
      break;
      case 1:
        geolocator.location = {
          coords: {
            latitude: data.geoplugin_latitude,
            longitude: data.geoplugin_longitude
          },
          address: {
            city: data.geoplugin_city,
            country: data.geoplugin_countryName,
            countryCode: data.geoplugin_countryCode,
            region: data.geoplugin_regionName
          }
        };
      break;
      case 2:
        geolocator.location = {
          coords: {
            latitude: data.lat,
            longitude: data.lon
          },
          address: {
            city: data.city,
            country: '',
            countryCode: data.country,
            region: ''
          }
        };
      break;
    }
    if (geolocator.location) {
      geolocator.location.coords.accuracy = null;
      geolocator.location.coords.altitude = null;
      geolocator.location.coords.altitudeAccuracy = null;
      geolocator.location.coords.heading = null;
      geolocator.location.coords.speed = null;
      geolocator.location.timestamp = new Date().getTime();
      geolocator.location.ipGeoSource = ipGeoSources[ipSourceIndex];
      geolocator.location.ipGeoSource.data = data;
    }
  };

  const onGeoSourceCallback = data => {
    let initialized = false;
    geolocator.location = null;
    delete geolocator.__ipscb;

    const gLoadCallback = () => {
      if (sourceIndex === 2) {
        if (window.Geo !== undefined) {
          buildLocation(sourceIndex, window.Geo);
          delete window.Geo;
          initialized = true;
        }
      } else {
        if (data !== undefined && typeof data !== 'string') {
          buildLocation(sourceIndex, data);
          initialized = true;
        }
      }

      if (initialized === true) {
        finalize(geolocator.location.coords);
      } else {
        if (onError) { onError(new Error(data || 'Could not get location.')); }
      }
    };

    loadGoogleMaps(gLoadCallback);
  };

  const loadIpGeoSource = source => {
    if (source.cbParam === undefined || source.cbParam === null || source.cbParam === '') {
      loadScript(source.url, onGeoSourceCallback, true);
    } else {
      loadScript(`${source.url}?${source.cbParam}=geolocator.__ipscb`, undefined, true);
    }
  };

  return {

    location: null,

    locate(successCallback, errorCallback, fallbackToIP, html5Options, mapCanvasId) {
      onSuccess = successCallback;
      onError = errorCallback;
      mCanvasId = mapCanvasId;
      function gLoadCallback() { getPosition(fallbackToIP, html5Options); }
      loadGoogleMaps(gLoadCallback);
    },

    locateByIP(successCallback, errorCallback, ipSourceIndex, mapCanvasId) {
      sourceIndex = (typeof ipSourceIndex !== 'number' ||
      (ipSourceIndex < 0 || ipSourceIndex >= ipGeoSources.length)) ? defaultSourceIndex : ipSourceIndex;
      onSuccess = successCallback;
      onError = errorCallback;
      mCanvasId = mapCanvasId;
      geolocator.__ipscb = onGeoSourceCallback;
      loadIpGeoSource(ipGeoSources[sourceIndex]);
    },

    isPositionError(error) {
      return Object.prototype.toString.call(error) === '[object PositionError]';
    }
  };
})();
