import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import GoldButton from '../ui/GoldButton';
import {
  HiArrowRight, HiArrowTopRightOnSquare, HiCheckBadge, HiXMark,
} from 'react-icons/hi2';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiPython, SiBootstrap, SiTailwindcss,
  SiGit, SiDocker, SiPostgresql, SiHtml5,
  SiFigma, SiRedux, SiVite, SiTypescript,
} from 'react-icons/si';
import './Hero.css';

/* ── Cursor ─────────────────────────────────────────────────────── */
const AdvancedCursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x:-300,y:-300 }), rp = useRef({ x:-300,y:-300 });
  const raf = useRef(null);
  useEffect(() => {
    const d = dot.current, r = ring.current;
    if (!d||!r) return;
    const loop = () => {
      rp.current.x += (pos.current.x - rp.current.x) * 0.11;
      rp.current.y += (pos.current.y - rp.current.y) * 0.11;
      r.style.left = rp.current.x+'px'; r.style.top = rp.current.y+'px';
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    const mv = ({clientX:x,clientY:y}) => {
      pos.current={x,y};
      d.style.left=x+'px'; d.style.top=y+'px';
      d.style.opacity='1'; r.style.opacity='1';
    };
    const ml = () => { d.style.opacity='0'; r.style.opacity='0'; };
    const mo = ({target}) => { if(target.closest('a,button,[role="button"],input,textarea')){ d.classList.add('cur-dot--hover'); r.classList.add('cur-ring--hover'); }};
    const mu = ({target}) => { if(target.closest('a,button,[role="button"],input,textarea')){ d.classList.remove('cur-dot--hover'); r.classList.remove('cur-ring--hover'); }};
    window.addEventListener('mousemove',mv,{passive:true});
    document.body.addEventListener('mouseleave',ml);
    document.addEventListener('mouseover',mo,{passive:true});
    document.addEventListener('mouseout',mu,{passive:true});
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('mousemove',mv); document.body.removeEventListener('mouseleave',ml); document.removeEventListener('mouseover',mo); document.removeEventListener('mouseout',mu); };
  },[]);
  return <><div ref={dot} className="cur-dot"/><div ref={ring} className="cur-ring"/></>;
};

/* ── Typing hook ─────────────────────────────────────────────────── */
const useTyping = (words, tMs=75, dMs=40, pMs=1800) => {
  const [text,setText]=useState('');
  const [idx,setIdx]=useState(0);
  const [del,setDel]=useState(false);
  useEffect(()=>{
    const word=words[idx]; let t;
    if(!del&&text===word) t=setTimeout(()=>setDel(true),pMs);
    else if(del&&text===''){setDel(false);setIdx(i=>(i+1)%words.length);}
    else t=setTimeout(()=>setText(del?word.slice(0,text.length-1):word.slice(0,text.length+1)),del?dMs:tMs);
    return()=>clearTimeout(t);
  },[text,del,idx,words,tMs,dMs,pMs]);
  return text;
};

/* ── Particles canvas ─────────────────────────────────────────────
   Soft falling effect — low alpha so text stays readable
─────────────────────────────────────────────────────────────────── */
const ParticlesCanvas = () => {
  const cvs = useRef(null);
  const mouse = useRef({x:-9999,y:-9999});
  useEffect(()=>{
    const onM=(e)=>{mouse.current={x:e.clientX,y:e.clientY};};
    window.addEventListener('mousemove',onM,{passive:true});
    return()=>window.removeEventListener('mousemove',onM);
  },[]);
  useEffect(()=>{
    const canvas=cvs.current, ctx=canvas.getContext('2d');
    let W=0,H=0,raf;
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    resize(); window.addEventListener('resize',resize,{passive:true});
    const spawn=(yInit)=>{
      const roll=Math.random();
      const type=roll<0.58?0:roll<0.82?1:2;
      return {
        type, x:Math.random()*W,
        y:yInit!==undefined?yInit:-8,
        vx:(Math.random()-.5)*.22,
        vy:type===1?.25+Math.random()*.38:type===2?.42+Math.random()*.45:.52+Math.random()*.85,
        r: type===1?1.5+Math.random()*1.8:type===2?.8+Math.random()*.9:.5+Math.random()*1.1,
        a: type===1?.14+Math.random()*.18:type===2?.08+Math.random()*.11:.05+Math.random()*.08,
        wt:Math.random()*Math.PI*2, wspd:.006+Math.random()*.005, wamp:.18+Math.random()*.35,
        tw:Math.random()*Math.PI*2, twspd:.028+Math.random()*.035,
      };
    };
    let pts=Array.from({length:260},()=>{const p=spawn();p.y=Math.random()*H;return p;});
    const REPEL=120;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      const mx=mouse.current.x,my=mouse.current.y;
      for(let i=0;i<pts.length;i++){
        const p=pts[i];
        p.wt+=p.wspd; p.vx+=Math.sin(p.wt)*.0018*p.wamp; p.vx*=.99;
        const dx=p.x-mx,dy=p.y-my,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<REPEL&&dist>0){const f=(REPEL-dist)/REPEL;p.vx+=(dx/dist)*f*.7;p.vy+=(dy/dist)*f*.22;}
        p.vy+=p.type===1?.005:.009;
        const spd=Math.sqrt(p.vx*p.vx+p.vy*p.vy);
        if(spd>3){p.vx=(p.vx/spd)*3;p.vy=(p.vy/spd)*3;}
        p.x+=p.vx; p.y+=p.vy;
        if(p.y>H+10){pts[i]=spawn();continue;}
        if(p.x<-5)p.x=W+5; if(p.x>W+5)p.x=-5;
        p.tw+=p.twspd;
        const tA=p.type===0?p.a:p.a*(0.68+0.32*Math.sin(p.tw));
        ctx.save();
        if(p.type===1){
          const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*2.6);
          g.addColorStop(0,`rgba(240,210,110,${tA})`);
          g.addColorStop(.45,`rgba(201,168,76,${tA*.4})`);
          g.addColorStop(1,'rgba(201,168,76,0)');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*2.6,0,Math.PI*2); ctx.fill();
          ctx.fillStyle=`rgba(255,242,160,${Math.min(tA*1.2,.45)})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*.45,0,Math.PI*2); ctx.fill();
        } else if(p.type===2){
          const s=p.r*1.2;
          ctx.strokeStyle=`rgba(220,228,248,${tA})`; ctx.lineWidth=.6;
          ctx.beginPath(); ctx.moveTo(p.x-s,p.y); ctx.lineTo(p.x+s,p.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p.x,p.y-s); ctx.lineTo(p.x,p.y+s); ctx.stroke();
        } else {
          ctx.fillStyle=`rgba(210,220,240,${tA})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
      }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={cvs} className="particles-canvas"/>;
};

/* ── Photo lightbox ──────────────────────────────────────────────── */
const Lightbox = ({open,onClose}) => (
  <AnimatePresence>
    {open&&(
      <motion.div className="lb-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
        <motion.div className="lb-box" initial={{scale:.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.85,opacity:0}} transition={{duration:.32,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}>
          <img src="/assets/images/profile.jpg" alt="Kathiravan" className="lb-img"/>
          <button className="lb-close" onClick={onClose}><HiXMark/></button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────────────────────────
   COMMAND CENTER
   Architecture:
   • .cc-scene  — 420×420 square, the single coordinate system
     - All rings, orbit icons, hex photo are positioned within this
     - top:50% left:50% on rings = center of cc-scene
     - orbit icons: top:50% left:50% then translated by JS
   • .cc-meta   — below cc-scene, contains NxtWave + status
   • .cc-outer  — outer flex column container (cc-scene + cc-meta)
─────────────────────────────────────────────────────────────────── */

const ORBIT_ICONS = [
  { Icon: SiMongodb,    color:'#47A248', label:'MongoDB'   , angle:0   },
  { Icon: SiExpress,    color:'#CCCCCC', label:'Express'   , angle:45  },
  { Icon: SiReact,      color:'#61DAFB', label:'React'     , angle:90  },
  { Icon: SiNodedotjs,  color:'#6cc24a', label:'Node.js'   , angle:135 },
  { Icon: SiJavascript, color:'#F7DF1E', label:'JavaScript', angle:180 },
  { Icon: SiPython,     color:'#3776AB', label:'Python'    , angle:225 },
  { Icon: SiBootstrap,  color:'#7952B3', label:'Bootstrap' , angle:270 },
  { Icon: SiTailwindcss,color:'#38BDF8', label:'Tailwind'  , angle:315 },
];

// Orbit radius in px from center of cc-scene (160px = fits inside 420px)
const ORBIT_R = 158;
// Hex size
const HEX_SIZE = 230; // px — the photo container

const CommandCenter = () => {
  const wrapRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef   = useRef(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [scanPct,    setScanPct]    = useState(0);
  const [imgErr,     setImgErr]     = useState(false);
  const [lightbox,   setLightbox]   = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my,[-0.5,0.5],[7,-7]),{damping:20,stiffness:200});
  const rotY = useSpring(useTransform(mx,[-0.5,0.5],[-9,9]),{damping:20,stiffness:200});

  // rAF loop — orbit rotation + scan beam
  useEffect(()=>{
    let prev=0, scanV=0;
    const tick=(ts)=>{
      const dt=prev?ts-prev:0; prev=ts;
      angleRef.current=(angleRef.current+dt*0.015)%360;
      scanV=(scanV+dt*0.065)%100;
      setOrbitAngle(angleRef.current);
      setScanPct(scanV);
      rafRef.current=requestAnimationFrame(tick);
    };
    rafRef.current=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(rafRef.current);
  },[]);

  const onMove=(e)=>{
    const r=wrapRef.current?.getBoundingClientRect();
    if(!r) return;
    mx.set((e.clientX-r.left)/r.width-.5);
    my.set((e.clientY-r.top)/r.height-.5);
  };

  return(
    <>
      <motion.div
        ref={wrapRef}
        className="cc-outer"
        style={{rotateX:rotX,rotateY:rotY,transformStyle:'preserve-3d',perspective:900}}
        onMouseMove={onMove}
        onMouseLeave={()=>{mx.set(0);my.set(0);}}
        initial={{opacity:0,x:45,scale:.9}}
        animate={{opacity:1,x:0,scale:1}}
        transition={{duration:1.2,delay:.35,ease:[.16,1,.3,1]}}
      >
        {/* ── Scene: 420×420, single coordinate system ── */}
        <div className="cc-scene">

          {/* Spinning rings — all centered on cc-scene */}
          <div className="cc-ring cc-ring--r3"/>
          <div className="cc-ring cc-ring--r2"/>
          <div className="cc-ring cc-ring--r1"/>

          {/* Orbit icons — JS positions them relative to scene center */}
          {ORBIT_ICONS.map((item)=>{
            const deg = item.angle + orbitAngle;
            const rad = (deg * Math.PI) / 180;
            const x   = ORBIT_R * Math.cos(rad);
            const y   = ORBIT_R * Math.sin(rad);
            // opacity: bright at bottom (sin>0), dim at top
            const op  = 0.35 + 0.65 * ((Math.sin(rad)+1)/2);
            return(
              <div
                key={item.label}
                className="cc-icon"
                title={item.label}
                style={{
                  // Anchor to center of cc-scene (210,210)
                  // then offset by orbit radius
                  left: `calc(50% + ${x}px)`,
                  top:  `calc(50% + ${y}px)`,
                  opacity: op,
                }}
              >
                <item.Icon style={{color:item.color,width:15,height:15}}/>
              </div>
            );
          })}

          {/* Hex photo — centered in scene */}
          <div
            className="cc-hex-wrap"
            style={{width:HEX_SIZE,height:HEX_SIZE}}
            onClick={()=>setLightbox(true)}
            title="Click to view full photo"
          >
            {/* Hex clip frame */}
            <div className="cc-hex-frame">
              <div className="cc-scan" style={{top:`${scanPct}%`}}/>
              {!imgErr?(
                <img
                  src="/assets/images/profile.jpg"
                  alt="Kathiravan"
                  className="cc-photo"
                  onError={()=>setImgErr(true)}
                />
              ):(
                <div className="cc-fallback">K</div>
              )}
              <div className="cc-hex-gloss"/>
              {/* Hover hint */}
              <div className="cc-hint"><span>View Full Photo</span></div>
            </div>

            {/* SVG hex border sits outside the clip */}
            <svg className="cc-hex-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="50,2 97,26 97,74 50,98 3,74 3,26"
                fill="none" stroke="rgba(201,168,76,0.55)" strokeWidth="1"
                strokeDasharray="5 4" vectorEffect="non-scaling-stroke"/>
              <polygon points="50,6 93,28 93,72 50,94 7,72 7,28"
                fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"/>
            </svg>
          </div>

          {/* Stat chips — positioned in scene corners */}
          <motion.div className="cc-chip" style={{left:14,top:'35%'}} animate={{y:[0,-6,0]}} transition={{duration:3.2,repeat:Infinity,ease:'easeInOut',delay:0}}>
            <span className="cc-chip-n">2+</span>
            <span className="cc-chip-l">Years</span>
          </motion.div>
          <motion.div className="cc-chip" style={{right:14,top:'35%'}} animate={{y:[0,-6,0]}} transition={{duration:3.8,repeat:Infinity,ease:'easeInOut',delay:.7}}>
            <span className="cc-chip-n">15+</span>
            <span className="cc-chip-l">Projects</span>
          </motion.div>
          <motion.div className="cc-chip" style={{left:14,top:'60%'}} animate={{y:[0,-6,0]}} transition={{duration:4.2,repeat:Infinity,ease:'easeInOut',delay:1.3}}>
            <span className="cc-chip-n">10+</span>
            <span className="cc-chip-l">Certs</span>
          </motion.div>

          {/* Available dot — top of scene */}
          <div className="cc-avail">
            <span className="cc-avail-dot"/>
            <span>Available · 2026</span>
          </div>
        </div>{/* end cc-scene */}

        {/* ── Meta row: below the scene ── */}
        <motion.a
          href="https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1"
          target="_blank"
          rel="noopener noreferrer"
          className="cc-nxtwave"
          initial={{opacity:0,y:14}}
          animate={{opacity:1,y:0}}
          transition={{delay:1.1,duration:.6}}
          whileHover={{y:-2,transition:{duration:.2}}}
        >
          <div className="cc-nw-shine"/>
          <div className="cc-nw-icon"><HiCheckBadge/></div>
          <div className="cc-nw-text">
            <span className="cc-nw-title">NxtWave Profile</span>
            <span className="cc-nw-sub">Verified · View Learning Progress</span>
          </div>
          <HiArrowTopRightOnSquare className="cc-nw-ext"/>
        </motion.a>

      </motion.div>

      <Lightbox open={lightbox} onClose={()=>setLightbox(false)}/>
    </>
  );
};

/* ── Skill marquee ───────────────────────────────────────────────── */
const ROW_1 = [
  {Icon:SiReact,      label:'React',      color:'#61DAFB'},
  {Icon:SiNodedotjs,  label:'Node.js',    color:'#6cc24a'},
  {Icon:SiMongodb,    label:'MongoDB',    color:'#47A248'},
  {Icon:SiTailwindcss,label:'Tailwind',   color:'#38BDF8'},
  {Icon:SiJavascript, label:'JavaScript', color:'#F7DF1E'},
  {Icon:SiExpress,    label:'Express',    color:'#CCCCCC'},
  {Icon:SiBootstrap,  label:'Bootstrap',  color:'#7952B3'},
  {Icon:SiPython,     label:'Python',     color:'#3776AB'},
];
const ROW_2 = [
  {Icon:SiTypescript, label:'TypeScript', color:'#3178C6'},
  {Icon:SiGit,        label:'Git',        color:'#F05032'},
  {Icon:SiDocker,     label:'Docker',     color:'#2496ED'},
  {Icon:SiPostgresql, label:'PostgreSQL', color:'#4169E1'},
  {Icon:SiHtml5,      label:'HTML5',      color:'#E34F26'},
  {Icon:SiVite,       label:'Vite',       color:'#646CFF'},
  {Icon:SiFigma,      label:'Figma',      color:'#F24E1E'},
  {Icon:SiRedux,      label:'Redux',      color:'#764ABC'},
];

const Pill=({Icon,label,color})=>(
  <div className="skill-pill">
    <Icon style={{color,width:15,height:15,flexShrink:0}}/>
    <span className="skill-pill-label">{label}</span>
  </div>
);

const MRow=({items,dir='fwd'})=>{
  const trip=[...items,...items,...items];
  return(
    <div style={{overflow:'hidden',padding:'4px 0'}}>
      <div className={`mq-track mq-track--${dir}`}>
        {trip.map((it,i)=><Pill key={`${it.label}-${i}`} {...it}/>)}
      </div>
    </div>
  );
};

const SkillMarquee=()=>(
  <motion.div className="mq-wrap" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:2.2,duration:.9,ease:[.16,1,.3,1]}}>
    <div className="mq-header">
      <div className="mq-line"/>
      <span className="mq-label"><span className="mq-dot"/>Tech Stack<span className="mq-dot"/></span>
      <div className="mq-line"/>
    </div>
    <div className="mq-section"><MRow items={ROW_1} dir="fwd"/></div>
    <div className="mq-section" style={{marginTop:6}}><MRow items={ROW_2} dir="rev"/></div>
    <div className="mq-bottom"/>
  </motion.div>
);

/* ── Hero ─────────────────────────────────────────────────────────── */
const ROLES=['Full-Stack Developer','MERN Stack Engineer','UI/UX Architect','Software Dev Engineer'];

const Hero=()=>{
  const role=useTyping(ROLES);
  const c={hidden:{},show:{transition:{staggerChildren:.09,delayChildren:.2}}};
  const up={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.7,ease:[.16,1,.3,1]}}};

  return(
    <>
      <AdvancedCursor/>
      <section id="hero" className="hero-section">
        <ParticlesCanvas/>
        <div className="hero-dot-grid"/>
        <div className="hero-top-rule"/>

        <div className="hero-grid">

          {/* Mobile: image first */}
          <div className="hero-mobile-img">
            <CommandCenter/>
          </div>

          {/* Left text */}
          <div className="hero-left">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-eyebrow"><span className="hero-eyebrow-dot"/>Available for hire · 2026</div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hero-h1"
            >
              Hi, I'm<br/><span className="hero-name-gold">Kathiravan</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hero-role-row"
            >
              <span className="hero-role-bar"/>
              <span className="hero-role-text">
                {role}
                <motion.span className="hero-blink" animate={{opacity:[1,0,1]}} transition={{duration:.75,repeat:Infinity}}/>
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '3rem' }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hero-rule"
            />

            <motion.h2 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hero-tagline"
            >
              Building digital<br/><em className="hero-tagline-accent">experiences that matter.</em>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hero-bio"
            >
              Passionate MERN Stack Developer crafting modern, performant web
              applications with clean architecture and polished interfaces.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hero-stats"
            >
              {[['2+','Years'],['15+','Projects'],['10+','Certs']].map(([n,l])=>(
                <div key={l} className="hero-stat-item">
                  <span className="hero-stat-n">{n}</span>
                  <span className="hero-stat-l">{l}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <GoldButton variant="filled" icon={HiArrowRight} href="#projects">View Projects</GoldButton>
              <GoldButton variant="outline" href="/assets/Kathiravan_Resume.pdf">Download Resume</GoldButton>
              <GoldButton variant="ghost" href="#contact">Hire Me</GoldButton>
            </motion.div>
          </div>

          {/* Desktop right panel */}
          <div className="hero-right">
            <CommandCenter/>
          </div>

        </div>

        <SkillMarquee/>

        <motion.div className="hero-scroll-cue" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.2,duration:1}} onClick={()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>
          <span className="hero-scroll-txt">Scroll</span>
          <motion.span className="hero-scroll-line" animate={{scaleY:[.6,1,.6],opacity:[.4,1,.4]}} transition={{duration:1.6,repeat:Infinity,ease:'easeInOut'}}/>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;