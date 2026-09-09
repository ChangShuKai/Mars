const fs = require('fs');
const code = fs.readFileSync('g:/Mars/components/sections/MarsMapSection.tsx', 'utf8');

const exportIndex = code.indexOf('export default function MarsMapSection() {');
const newComponent = `import MarsGlobe from '../ui/map/MarsGlobe';

export default function MarsMapSection() {
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);
  const [selected, setSelected] = useState<Mission | null>(null);
  const [isGlobe, setIsGlobe] = useState(true);
  const [hd, setHd] = useState(false);

  useEffect(() => {
    fetch('/api/rover-location')
      .then((res) => res.json())
      .then((telemetry) => {
        if (telemetry?.rovers) {
          const { perseverance: p, curiosity: c } = telemetry.rovers;
          setMissions((prev) =>
            prev.map((m) => {
              if (m.id === 'perseverance' && p) {
                return { ...m, lat: p.coordinates?.lat ?? m.lat, lon: p.coordinates?.lon ?? m.lon, sol: p.sol ?? m.sol, elevation: p.coordinates?.elevation, distKm: p.distance?.total_km, driveId: p.drive, isLiveTelemetry: true };
              }
              if (m.id === 'curiosity' && c) {
                return { ...m, lat: c.coordinates?.lat ?? m.lat, lon: c.coordinates?.lon ?? m.lon, sol: c.sol ?? m.sol, elevation: c.coordinates?.elevation, distKm: c.distance?.total_km, driveId: c.drive, isLiveTelemetry: true };
              }
              return m;
            })
          );
        }
      })
      .catch((err) => console.warn('Rover telemetry sync warning:', err));

    fetch('/api/weather')
      .then((res) => res.json())
      .then((wData) => {
        if (wData?.stations) {
          const { perseverance: pw, curiosity: cw } = wData.stations;
          setMissions((prev) =>
            prev.map((m) => {
              if (m.id === 'perseverance' && pw?.latest) {
                const l = pw.latest;
                return { ...m, temp: l.temperature ?? m.temp, pressure: l.pressure ?? m.pressure, wind: l.wind ?? m.wind, groundTemp: l.ground_temperature };
              }
              if (m.id === 'curiosity' && cw?.latest) {
                const l = cw.latest;
                return { ...m, temp: l.temperature ?? m.temp, pressure: l.pressure ?? m.pressure, wind: l.wind ?? m.wind, groundTemp: l.ground_temperature };
              }
              return m;
            })
          );
        }
      })
      .catch((err) => console.warn('Weather sync warning:', err));
  }, []);

  return (
    <section id='map' className='relative py-20 bg-space-950 overflow-hidden select-none'>
      <div className='section-padding mb-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className='flex flex-wrap items-center justify-between gap-4 mb-3'>
            <div className='flex items-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full bg-mars-500 animate-ping' />
              <p className='font-mono text-xs text-mars-400 tracking-[0.25em] uppercase'>
                Interactive Mars High-Resolution Surface Radar
              </p>
            </div>
            
            <button
              onClick={() => setHd(!hd)}
              className='glass-card border border-mars-500/30 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 font-mono text-[10px] text-mars-300 hover:text-white hover:border-mars-400 transition-all shadow-lg z-20'
            >
              <DownloadCloud size={12} className='text-orange-400' />
              <span>{hd ? '8K 航圖 (現行)' : '升級 8K'}</span>
            </button>
          </div>

          <h2 className='text-3xl sm:text-5xl font-display font-bold text-gradient mb-3'>
            火星即時地表航圖 · 探測器追蹤
          </h2>
          <p className='text-[var(--text-secondary)] font-display text-base sm:text-lg max-w-3xl leading-relaxed'>
            以高解析度衛星圖為基底。精準鎖定歷史著名探測車、著陸器與機智號直升機飛行基地。使用 WebGL 即時演算 3D 星體投影，並回傳現役探測器遙測氣象數據。
          </p>
        </motion.div>
      </div>

      <div className='relative w-full' style={{ height: '78vh' }}>
         <MarsGlobe missions={missions} selected={selected} onSelect={setSelected} hd={hd} isGlobe={isGlobe} setIsGlobe={setIsGlobe} />
         
         {/* HUD Overlay Bottom-Right: Interaction Guide */}
         <div className='absolute bottom-5 right-4 z-10 glass-card rounded-full px-4 py-1.5 font-mono text-[11px] text-white border border-white/20 pointer-events-none hidden sm:block shadow-lg bg-black/50'>
           🖱️ 滑鼠拖曳移動 · 滾輪自由縮放 · 點擊探測器查看數據
         </div>
      </div>
      
      {/* ── Mission Detail Telemetry Modal (Slide-in) ────────────────────── */}
      <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='absolute top-24 right-4 z-40 w-84 sm:w-96 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto'
              style={{
                border: \`1px solid \${selected.color}40\`,
                background: 'rgba(10, 6, 8, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className='h-1.5 w-full'
                style={{
                  background: \`linear-gradient(90deg, \${selected.color}, transparent)\`,
                }}
              />

              <div
                className='p-5 pb-3 flex items-start justify-between'
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div>
                  <div className='flex items-center gap-2 mb-1'>
                    <span
                      className={\`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold \${
                        STATUS[selected.status].badge
                      }\`}
                    >
                      {STATUS[selected.status].label}
                    </span>
                    <span className='font-mono text-[10px] text-[var(--text-muted)]'>
                      Sol {selected.sol}
                    </span>
                  </div>

                  {selected.isLiveTelemetry && (
                    <div className='flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] mb-1.5'>
                      <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                      NASA JPL 即時遙測已同步 · Drive #{selected.driveId ?? '---'}
                    </div>
                  )}

                  <h3 className='font-display font-bold text-white text-2xl leading-snug flex items-center gap-2'>
                    {selected.name}
                    {selected.category === 'helicopter' && (
                      <Plane size={18} className='text-emerald-400' />
                    )}
                  </h3>
                  <p className='font-mono text-xs text-mars-400'>
                    {selected.nameEn} · {selected.agency}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className='text-[var(--text-muted)] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors'
                >
                  <X size={18} />
                </button>
              </div>

              <div className='p-5 space-y-4 text-xs'>
                <div className='grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-[11px]'>
                  <div>
                    <span className='text-[var(--text-muted)] block text-[10px]'>
                      {selected.isLiveTelemetry ? '當前即時坐標' : '著陸坐標'}
                    </span>
                    <span className='text-slate-200'>
                      {Math.abs(selected.lat).toFixed(4)}°
                      {selected.lat >= 0 ? 'N' : 'S'},{' '}
                      {Math.abs(selected.lon).toFixed(4)}°
                      {selected.lon >= 0 ? 'E' : 'W'}
                    </span>
                  </div>
                  <div>
                    <span className='text-[var(--text-muted)] block text-[10px]'>
                      {selected.distKm !== undefined ? '累計行駛距離' : '著陸日期'}
                    </span>
                    <span className='text-slate-200'>
                      {selected.distKm !== undefined ? \`\${selected.distKm} km\` : selected.landed}
                    </span>
                  </div>
                  {selected.elevation !== undefined && (
                    <div>
                      <span className='text-[var(--text-muted)] block text-[10px]'>火星大地高程</span>
                      <span className='text-slate-200'>{selected.elevation} m</span>
                    </div>
                  )}
                  <div className={selected.elevation !== undefined ? '' : 'col-span-2 pt-1 border-t border-white/5'}>
                    <span className='text-[var(--text-muted)] block text-[10px]'>探測區域</span>
                    <span className='text-orange-300'>{selected.location}</span>
                  </div>
                </div>

                <p className='text-[var(--text-secondary)] font-display leading-relaxed text-sm'>
                  {selected.desc}
                </p>

                {selected.stats && (
                  <div className='p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5'>
                    <span className='font-mono text-[10px] text-mars-400 uppercase tracking-wider block mb-1 font-bold'>
                      任務成就與航行數據
                    </span>
                    {Object.entries(selected.stats).map(([k, v]) => (
                      <div
                        key={k}
                        className='flex justify-between items-center text-[11px] font-mono'
                      >
                        <span className='text-[var(--text-muted)]'>{k}</span>
                        <span className='text-slate-200 font-semibold'>{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className='rounded-xl p-3.5 space-y-2.5'
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(232,93,26,0.08) 0%, rgba(10,6,8,0.4) 100%)',
                    border: '1px solid rgba(232,93,26,0.2)',
                  }}
                >
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-[10px] text-orange-400 tracking-wider uppercase font-bold flex items-center gap-1.5'>
                      <Radio size={12} className='animate-pulse text-orange-400' />
                      {selected.status === 'active'
                        ? '實測氣象遙測 · LIVE WEATHER'
                        : '最終氣象記錄 · LAST TELEMETRY'}
                    </span>
                    <span className='font-mono text-[9px] text-[var(--text-muted)]'>
                      光延遲 ~16.8分
                    </span>
                  </div>

                  <div className='grid grid-cols-3 gap-2 text-center pt-1'>
                    <div className='p-2 rounded-lg bg-black/40 border border-white/5'>
                      <Thermometer size={14} className='text-blue-400 mx-auto mb-1' />
                      <div className='font-mono text-[9px] text-[var(--text-muted)]'>平均氣溫</div>
                      <div className='font-display font-bold text-base text-blue-300'>
                        {selected.temp.avg}
                        {selected.temp.unit}
                      </div>
                      <div className='font-mono text-[8px] text-[var(--text-muted)]'>
                        {selected.temp.min} ~ {selected.temp.max}
                      </div>
                    </div>

                    <div className='p-2 rounded-lg bg-black/40 border border-white/5'>
                      <Gauge size={14} className='text-emerald-400 mx-auto mb-1' />
                      <div className='font-mono text-[9px] text-[var(--text-muted)]'>大氣壓強</div>
                      <div className='font-display font-bold text-base text-emerald-300'>
                        {selected.pressure.avg} {selected.pressure.unit}
                      </div>
                    </div>

                    <div className='p-2 rounded-lg bg-black/40 border border-white/5'>
                      <Wind size={14} className='text-cyan-400 mx-auto mb-1' />
                      <div className='font-mono text-[9px] text-[var(--text-muted)]'>
                        風速 ({selected.wind.dir})
                      </div>
                      <div className='font-display font-bold text-base text-cyan-300'>
                        {selected.wind.avg} {selected.wind.unit}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  );
}`;

const newCode = code.substring(0, exportIndex) + newComponent;
fs.writeFileSync('g:/Mars/components/sections/MarsMapSection.tsx', newCode, 'utf8');
console.log('done');
