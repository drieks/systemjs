}

// auto-load Promise and URL polyfills if needed in the browser
try {
  var hasURL = typeof URLPolyfill != 'undefined' || new URL('test:///').protocol == 'test:';
}
catch(e) {}

if (typeof Promise === 'undefined' || !hasURL) {
  // document.createElement('script')
  if (typeof document !== 'undefined') {
    var head = document.getElementsByTagName('head')[0];
    var scripts = document.getElementsByTagName('script');
    $__curScript = scripts[scripts.length - 1];
    var curPath = $__curScript.src;
    var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
    var script = document.createElement('script');
    var src = document.createAttribute('src');
    src.value = basePath + 'system-polyfills.js';
    script.setAttributeNode(src);
    if (script.addEventListener) {
        script.addEventListener('load', bootstrap, false);
    } else {
        script.onreadystatechange = bootstrap;
    }
    head.appendChild(script);
  }
  // importScripts
  else if (typeof importScripts !== 'undefined') {
    var basePath = '';
    try {
      throw new Error('_');
    } catch (e) {
      e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
        basePath = url.replace(/\/[^\/]*$/, '/');
      });
    }
    importScripts(basePath + 'system-polyfills.js');
    bootstrap();
  }
  else {
    bootstrap();
  }
}
else {
  bootstrap();
}


})();