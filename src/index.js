import React from 'react';
import ReactDOM from 'react-dom';
import ShakaPlayer from 'shaka-player-react';
import Shaka from '/Users/sanketkumarpanda/Desktop/shaka-player-demo/public/dist/shaka-player.compiled.js';

const STREAMS = [
  {
    name: 'Angel One MPEG-DASH',
    src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'
  },
  {
    name: 'Big Buck Bunny HLS',
    src: 'https://voothls.cdn.jio.com/vod/_definst_/smil:vod/2/53/bfc6afc03d6611eb9a0e8ba59fd6ddcf.smil/playlist_voot_web_premium.m3u8?__hdnea__=st=1608027272~exp=1608030872~acl=/vod/_definst_/smil:vod/2/53/bfc6afc03d6611eb9a0e8ba59fd6ddcf.smil/*~hmac=3485b88a10885bfe277b29c523260531127ed78627ab70afcb79080c88b9e9d4'
  }
];

function App() {
  const [show, setShow] = React.useState(false);
  const [chromeless, setChromeless] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    window.getShakaInst = () => ref.current;
  }, []);

  function onToggle() {
    setShow(!show);
  }

  function onChromeless() {
    setChromeless(!chromeless);
  }

  const [src, setSrc] = React.useState(STREAMS[0].src);

  function onSelectSrc(event) {
    setSrc(event.target.value);
  }

  return (
    <div>
      <div>
        <button onClick={onToggle}>{show ? 'Hide' : 'Show'}</button>
      </div>
      <div>
        <input type="checkbox" onChange={onChromeless} /> Chromeless
      </div>
      <div>
        <select value={src} onChange={onSelectSrc}>
          {STREAMS.map(stream => (
            <option value={stream.src}>{stream.name}</option>
          ))}
        </select>
      </div>
      {show && (
        <ShakaPlayer ref={ref} autoPlay src={src} chromeless={chromeless} width = {300} height = {400} muted/>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));