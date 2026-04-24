import { useState, useEffect } from "react";

// CONFIG — paste your Apps Script Web App URL here
const SHEET_ENDPOINT = "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
const STUDENT_NAME   = "Demo Student";
const DORM_CLASS     = "Dorm 4B";

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SETUP: Google Sheet → Extensions → Apps Script → paste this
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data  = JSON.parse(e.postData.contents);
  const rows  = sheet.getDataRange().getValues();
  let rowIdx  = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.student && rows[i][1] === data.dorm) { rowIdx = i + 1; break; }
  }
  const newRow = [data.student, data.dorm, data.xp,
    data.dishes||0, data.laundry||0, data.garbage||0,
    data.organisation||0, data.kitchen||0, data.community||0,
    new Date().toLocaleString()];
  if (rowIdx === -1) {
    if (rows.length === 0) sheet.appendRow(["Student","Dorm","XP","Dishes","Laundry","Garbage","Organisation","Kitchen","Community","Last Updated"]);
    sheet.appendRow(newRow);
  } else {
    sheet.getRange(rowIdx, 1, 1, 10).setValues([newRow]);
  }
  return ContentService.createTextOutput(JSON.stringify({status:"ok"})).setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({status:"ok"})).setMimeType(ContentService.MimeType.JSON);
}

Then: Deploy → New deployment → Web App → Execute as Me, Anyone can access → Copy URL above
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const MODULES = [
  { id:"dishes",       emoji:"🍽️", title:"Dish Duty",      sub:"Clean plates = clean slate", color:"#c8ff3f",
    tips:[{icon:"💧",h:"Rinse before washing",b:"Remove loose food first — saves water and makes scrubbing way easier."},{icon:"🌡️",h:"Hot water is the move",b:"Hot water breaks down grease and kills bacteria. Use the hottest you can handle."},{icon:"📐",h:"Order matters",b:"Glasses → plates → pots. Cleanest to dirtiest keeps the water usable longer."},{icon:"🌬️",h:"Air dry > towel dry",b:"Towels spread bacteria. Air drying is actually more hygienic — and zero effort."}],
    quiz:[{q:"Correct dish washing order?",opts:["Pots → plates → glasses","Glasses → plates → pots","All at once","Doesn't matter"],a:1},{q:"Why use hot water for dishes?",opts:["Looks shinier","Breaks grease + kills bacteria","Uses more electricity","More bubbles"],a:1},{q:"More hygienic drying method?",opts:["Towel dry immediately","Air dry on rack","Paper towels","Leave in the sink"],a:1},{q:"Why rinse before washing?",opts:["Required by rules","Removes food, easier cleaning","To waste water","No real reason"],a:1},{q:"When should the drying rack be cleaned?",opts:["Never","When it smells","Regularly to prevent mold","Once a year"],a:2}],
    choreNote:"Wash all dishes, wipe the rack, clean the sink", badge:"Dish Master" },
  { id:"laundry",      emoji:"👕", title:"Laundry Lab",     sub:"Fresh fits, fresh life",     color:"#3fddff",
    tips:[{icon:"🏷️",h:"Read the care label",b:"That tag inside every garment tells you exactly how to wash it. 2 seconds = saved clothes."},{icon:"🌡️",h:"Cold for most, hot for linens",b:"Cold protects colors and fabrics. Reserve hot for towels, sheets, and gym kit."},{icon:"⚖️",h:"Don't overload",b:"Half to ¾ full is the sweet spot. Cramming causes poor washing and machine wear."},{icon:"⚡",h:"Move it promptly",b:"Wet laundry sitting too long = mildew. That smell does not wash out easily."}],
    quiz:[{q:"Where are washing instructions for clothes?",opts:["Price tag","Care label inside","Google it","Just guess"],a:1},{q:"Safest water temp for most fabrics?",opts:["Boiling","Hot","Cold","Warm only"],a:2},{q:"Ideal washing machine fill level?",opts:["Packed full","Half to ¾ full","Just a few items","Doesn't matter"],a:1},{q:"Wet laundry left too long:",opts:["Gets cleaner","Develops mildew smell","Nothing happens","Auto-dryes"],a:1},{q:"Hot water is best for:",opts:["Delicate silk","Dark denim","Towels and bedsheets","Wool sweaters"],a:2}],
    choreNote:"Run a full load, transfer to dryer, fold and put away", badge:"Fresh & Clean" },
  { id:"garbage",      emoji:"🗑️", title:"Trash Talk",      sub:"Take it out, level up",      color:"#ff9f3f",
    tips:[{icon:"♻️",h:"Separate your waste",b:"Recycling, general, and food waste go in different bins. Check local rules — it matters."},{icon:"📅",h:"Know collection days",b:"Set a recurring reminder. Missing bin day and living with overflow is a choice you're making."},{icon:"🧹",h:"Clean the bin itself",b:"Rinse it out occasionally. A dirty bin is a smell factory even when it's empty."},{icon:"🪢",h:"Tie bags properly",b:"Compress trash and secure the bag before removing. Nobody wants a spill trail."}],
    quiz:[{q:"What to do with recyclables?",opts:["Mix with general waste","Separate into recycling bin","Leave on the street","Ignore them"],a:1},{q:"When should you take trash out?",opts:["When unbearable","On schedule, before overflow","Monthly","When asked"],a:1},{q:"Why clean the bin itself?",opts:["Dorm regulation","Prevents smell + bacteria","Aesthetic only","No reason"],a:1},{q:"How to prepare a bag for removal?",opts:["Leave open","Securely tie it closed","Use tape","Fold the top"],a:1},{q:"Food waste should go:",opts:["In recycling","Food waste bin if available","Down the sink","Outside the building"],a:1}],
    choreNote:"Empty all bins, replace bags, sort recycling correctly", badge:"Trash Hero" },
  { id:"organisation", emoji:"📦", title:"Space Zen",        sub:"Your space, your peace",      color:"#c084fc",
    tips:[{icon:"🗂️",h:"Everything has a home",b:"Give every item a specific spot. No designated spot = lives on the floor permanently."},{icon:"🔄",h:"One in, one out",b:"Bring something new in? Retire something old. The only rule stopping slow-motion hoarding."},{icon:"🌙",h:"5-min night reset",b:"Spend 5 minutes returning things before bed. Stops mess compounding into disaster."},{icon:"🤝",h:"Shared spaces are everyone's",b:"Common areas don't clean themselves. It's everyone's job, including yours."}],
    quiz:[{q:"\"Everything has a home\" means:",opts:["Get more storage","Each item has a set place","You own too much","Decorate more"],a:1},{q:"\"One in, one out\" prevents:",opts:["Saving money","Clutter accumulation","Losing items","Arguments"],a:1},{q:"Best time for a 5-minute reset?",opts:["Weekly on Sunday","Randomly","Every night before bed","Before guests only"],a:2},{q:"In shared spaces, who tidies?",opts:["The RA","Whoever made the mess","Everyone who uses the space","Cleaning staff"],a:2},{q:"Best approach for items you don't need?",opts:["Pile in corner","Donate, sell, or recycle","Give to RA","Hide in wardrobe"],a:1}],
    choreNote:"Clear all surfaces, put items in their places, vacuum floor", badge:"Space Zen Master" },
  { id:"kitchen",      emoji:"🍳", title:"Kitchen Clean",   sub:"Cook it. Clean it. Own it.",  color:"#ff3f80",
    tips:[{icon:"🔪",h:"Clean as you go",b:"Wipe surfaces mid-cook. 30 seconds now > 30 minutes of hardened grease later."},{icon:"🧴",h:"Use proper degreaser",b:"Water alone won't cut kitchen grease. Use actual kitchen spray on stovetops and counters."},{icon:"🧊",h:"Fridge etiquette is law",b:"Label your food with name + date. Remove anything expired. Don't be the mystery smell."},{icon:"🔥",h:"Never leave cooking unattended",b:"Kitchen fires are the #1 dorm emergency. Stay with your food. Full stop."}],
    quiz:[{q:"Best time to clean kitchen surfaces?",opts:["Weekend only","As you cook, not just after","When RA inspects","Never"],a:1},{q:"What removes kitchen grease?",opts:["Just water","Kitchen degreaser/spray","Toilet cleaner","Air freshener"],a:1},{q:"Why label food in the shared fridge?",opts:["For fun","Others know it's yours + when it expires","Required","Decoration"],a:1},{q:"#1 dorm kitchen emergency cause?",opts:["Dirty dishes","Leaving cooking unattended","Loud music","Too many snacks"],a:1},{q:"When to remove food from shared fridge?",opts:["Never","Before or on the use-by date","Only if it smells","When full"],a:1}],
    choreNote:"Wipe counters and stovetop, clear and clean sink, check fridge", badge:"Kitchen Pro" },
  { id:"community",    emoji:"🤝", title:"Good Neighbor",   sub:"Community > everything",      color:"#3fffd4",
    tips:[{icon:"🔊",h:"Sound travels in dorms",b:"Walls are thin. After 10pm, headphones exist. Be the neighbour you wish you had."},{icon:"💬",h:"Communicate before conflict",b:"Have an issue? Say something — kindly, early. Small problems become big resentments fast."},{icon:"🫙",h:"Never borrow without asking",b:"Food. Chargers. Clothes. Assume everything belongs to someone. Always ask first."},{icon:"🌟",h:"Be the vibe",b:"Say hi. Invite people. The culture of your dorm is built by how each person shows up daily."}],
    quiz:[{q:"Typical quiet hours start time?",opts:["8pm","10pm","Midnight","No such thing"],a:1},{q:"Small conflict with a dorm mate. Best action?",opts:["Post on socials","Ignore until it explodes","Raise it kindly + directly","Tell the whole floor"],a:2},{q:"Before borrowing something:",opts:["Just take it","Always ask permission first","Leave a note after","Wait till they're out"],a:1},{q:"Positive dorm culture is created by:",opts:["Just the RA","Everyone's daily small actions","Strict rules","Avoiding each other"],a:1},{q:"Which best describes a good dorm member?",opts:["Stay isolated","Help friends only","Be inclusive, clean shared spaces","Report everyone to RA"],a:2}],
    choreNote:"Tidy the common area, check the notice board, say hi to someone", badge:"Community Star" },
];

const STUDENTS = [
  {id:1,name:"Zara M.",  av:"👩‍🦱",xp:520,m:{dishes:3,laundry:3,garbage:2,organisation:1,kitchen:3,community:2}},
  {id:2,name:"Leo T.",   av:"🧑‍🦰",xp:380,m:{dishes:3,laundry:2,garbage:0,organisation:2,kitchen:1,community:3}},
  {id:3,name:"Priya K.", av:"👩‍💻",xp:290,m:{dishes:1,laundry:3,garbage:3,organisation:0,kitchen:0,community:1}},
  {id:4,name:"Marcus B.",av:"🧑‍🎤",xp:150,m:{dishes:1,laundry:0,garbage:1,organisation:0,kitchen:0,community:1}},
  {id:5,name:"Nina S.",  av:"👩‍🎨",xp:640,m:{dishes:3,laundry:3,garbage:3,organisation:3,kitchen:2,community:3}},
  {id:6,name:"Finn O.",  av:"🧑‍🚀",xp: 70,m:{dishes:0,laundry:1,garbage:0,organisation:0,kitchen:0,community:0}},
];

const XP_LEARN=50,XP_QUIZ=100,XP_CHORE=150;

export default function DormApp() {
  const [mode,setMode]=useState("student");
  const [tab,setTab]=useState("home");
  const [activeMod,setActiveMod]=useState(null);
  const [modTab,setModTab]=useState("learn");
  const [progress,setProgress]=useState({});
  const [xp,setXp]=useState(0);
  const [pinged,setPinged]=useState({});
  const [sync,setSync]=useState(null);
  const [flash,setFlash]=useState(false);
  const [qIdx,setQIdx]=useState(0);
  const [qSel,setQSel]=useState(null);
  const [qFeed,setQFeed]=useState(false);
  const [qAns,setQAns]=useState([]);
  const [qDone,setQDone]=useState(false);

  useEffect(()=>{
    if(!document.getElementById("df")){
      const l=document.createElement("link");l.id="df";l.rel="stylesheet";
      l.href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
    (async()=>{try{const r=await window.storage.get("dorm-v5");if(r){const d=JSON.parse(r.value);setProgress(d.p||{});setXp(d.x||0);}}catch{}})();
  },[]);

  const save=async(p,x)=>{
    try{await window.storage.set("dorm-v5",JSON.stringify({p,x}));}catch{}
    if(!SHEET_ENDPOINT.includes("YOUR_")){
      setSync("syncing");
      try{
        await fetch(SHEET_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({student:STUDENT_NAME,dorm:DORM_CLASS,xp:x,
            ...Object.fromEntries(MODULES.map(m=>[m.id,getLv2(p,m.id)]))})});
        setSync("ok");setTimeout(()=>setSync(null),2500);
      }catch{setSync("offline");setTimeout(()=>setSync(null),3000);}
    }
  };

  const getLv2=(p,id)=>{const v=p[id]||{};if(v.chore)return 3;if(v.quiz)return 2;if(v.learn)return 1;return 0;};
  const getLv=(id)=>getLv2(progress,id);

  const openMod=(m)=>{setActiveMod(m);setModTab("learn");setQIdx(0);setQSel(null);setQFeed(false);setQAns([]);setQDone(false);setFlash(false);};

  const markLearn=()=>{
    if(progress[activeMod.id]?.learn)return;
    const p2={...progress,[activeMod.id]:{...(progress[activeMod.id]||{}),learn:true}};
    const x2=xp+XP_LEARN;setProgress(p2);setXp(x2);save(p2,x2);
  };
  const markChore=()=>{
    if(progress[activeMod.id]?.chore)return;
    const p2={...progress,[activeMod.id]:{...(progress[activeMod.id]||{}),chore:true}};
    const x2=xp+XP_CHORE;setProgress(p2);setXp(x2);save(p2,x2);setFlash(true);
  };
  const pickAnswer=(i)=>{
    if(qFeed)return;setQSel(i);setQFeed(true);
    const a2=[...qAns,i];setQAns(a2);
    setTimeout(()=>{
      if(qIdx<activeMod.quiz.length-1){setQIdx(q=>q+1);setQSel(null);setQFeed(false);}
      else{
        setQDone(true);
        const sc=a2.filter((a,j)=>a===activeMod.quiz[j].a).length;
        if(sc>=3&&!progress[activeMod.id]?.quiz){
          const p2={...progress,[activeMod.id]:{...(progress[activeMod.id]||{}),quiz:true,score:sc}};
          const x2=xp+XP_QUIZ;setProgress(p2);setXp(x2);save(p2,x2);
        }
      }
    },800);
  };

  const totalDone=MODULES.filter(m=>getLv(m.id)===3).length;
  const lvNum=Math.floor(xp/300)+1;
  const xpPct=((xp%300)/300)*100;

  const css=`
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{background:#07070f;}
    .da{font-family:'DM Sans',sans-serif;background:#07070f;color:#f0f0ff;min-height:100vh;max-width:430px;margin:0 auto;display:flex;flex-direction:column;}
    .da *{-webkit-tap-highlight-color:transparent;}
    .hd{font-family:'Unbounded',sans-serif;}
    .app-hd{padding:13px 16px 11px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0;gap:8px;}
    .logo{font-family:'Unbounded',sans-serif;font-size:15px;color:#c8ff3f;letter-spacing:-.5px;}
    .sync{font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;}
    .sy{background:rgba(255,159,63,.14);color:#ff9f3f;border:1px solid rgba(255,159,63,.3);}
    .ok{background:rgba(200,255,63,.1);color:#c8ff3f;border:1px solid rgba(200,255,63,.3);}
    .of{background:rgba(255,63,120,.1);color:#ff3f78;border:1px solid rgba(255,63,120,.3);}
    .xp-p{background:rgba(200,255,63,.09);border:1px solid rgba(200,255,63,.22);border-radius:20px;padding:5px 12px;font-size:13px;font-weight:700;color:#c8ff3f;}
    .mode-b{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:5px 12px;font-size:11px;font-weight:700;color:#9090c0;cursor:pointer;transition:all .2s;}
    .mode-b:hover{color:#fff;}
    .mode-b.ra{background:rgba(63,221,255,.1);border-color:rgba(63,221,255,.28);color:#3fddff;}
    .main{flex:1;overflow-y:auto;padding-bottom:88px;scrollbar-width:none;}
    .main::-webkit-scrollbar{display:none;}
    .hero{padding:22px 16px 16px;}
    .lv-row{display:flex;align-items:baseline;gap:8px;margin-bottom:6px;}
    .lv-bg{background:rgba(255,255,255,.06);border-radius:8px;height:8px;overflow:hidden;margin-bottom:4px;}
    .lv-fill{height:100%;background:linear-gradient(90deg,#c8ff3f,#3fddff);border-radius:8px;transition:width .6s;}
    .lv-cap{font-size:11px;color:#5555aa;}
    .stat-row{display:flex;gap:9px;margin-top:18px;}
    .stat-c{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:13px;text-align:center;}
    .stat-n{font-family:'Unbounded',sans-serif;font-size:22px;font-weight:900;color:#c8ff3f;}
    .stat-l{font-size:9px;color:#5555aa;margin-top:3px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
    .sec-ttl{font-family:'Unbounded',sans-serif;font-size:10px;color:#5555aa;letter-spacing:1.2px;text-transform:uppercase;padding:0 16px;margin-bottom:11px;}
    .mod-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px;}
    .mod-c{border-radius:18px;padding:17px 14px;cursor:pointer;position:relative;overflow:hidden;background:#0d0d1a;border:1px solid rgba(255,255,255,.06);transition:transform .14s;}
    .mod-c:active{transform:scale(.97);}.mod-c:hover{transform:scale(1.02);}
    .m-em{font-size:25px;display:block;margin-bottom:8px;}
    .m-nm{font-family:'Unbounded',sans-serif;font-size:10px;font-weight:700;line-height:1.3;margin-bottom:3px;}
    .m-sb{font-size:10px;color:rgba(255,255,255,.4);margin-bottom:10px;}
    .m-dots{display:flex;gap:5px;}
    .dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.1);transition:background .3s;}
    .dot.on{background:currentColor;}
    .m-blob{position:absolute;top:0;right:0;width:52px;height:52px;border-radius:0 18px 0 52px;opacity:.12;}
    .bot-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(7,7,15,.93);backdrop-filter:blur(18px);border-top:1px solid rgba(255,255,255,.07);display:flex;padding:8px 0 14px;z-index:100;}
    .nav-b{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;color:#44448a;transition:color .2s;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
    .nav-b.on{color:#c8ff3f;}.nav-ic{font-size:20px;}
    .mod-hd{position:relative;padding:16px 16px 36px;overflow:hidden;}
    .back-b{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,.5);cursor:pointer;margin-bottom:16px;font-weight:600;width:fit-content;}
    .back-b:hover{color:#fff;}
    .m-big-em{font-size:46px;}.m-big-nm{font-family:'Unbounded',sans-serif;font-size:19px;font-weight:900;margin:8px 0 3px;}.m-big-sb{font-size:13px;opacity:.5;}
    .m-blob2{position:absolute;top:-40px;right:-40px;width:170px;height:170px;border-radius:50%;opacity:.13;filter:blur(48px);}
    .xp-tags{display:flex;gap:5px;margin-top:13px;flex-wrap:wrap;}.xp-tag{border-radius:20px;padding:4px 10px;font-size:10px;font-weight:700;}
    .tabs{display:flex;gap:3px;margin:0 16px 16px;background:rgba(255,255,255,.05);border-radius:13px;padding:4px;}
    .tab-b{flex:1;padding:9px 4px;border-radius:10px;font-size:11px;font-weight:700;text-align:center;cursor:pointer;transition:all .2s;color:#55558a;}
    .tab-b.on{background:rgba(255,255,255,.09);color:#f0f0ff;}
    .tips-list{padding:0 16px;display:flex;flex-direction:column;gap:10px;}
    .tip-c{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:14px;display:flex;gap:11px;align-items:flex-start;}
    .tip-ic{font-size:21px;flex-shrink:0;}.tip-h{font-weight:700;font-size:14px;margin-bottom:3px;}.tip-b{font-size:12px;color:#7777aa;line-height:1.55;}
    .mark-b{margin:16px 16px 0;padding:15px;border-radius:13px;font-family:'Unbounded',sans-serif;font-size:12px;font-weight:700;text-align:center;cursor:pointer;transition:all .2s;}
    .mark-b.done{background:rgba(200,255,63,.09);border:1px solid rgba(200,255,63,.28);color:#c8ff3f;}
    .mark-b.go{background:#c8ff3f;color:#000;}.mark-b.go:hover{background:#d4ff60;}
    .quiz-w{padding:0 16px;}
    .q-bar{display:flex;gap:5px;margin-bottom:17px;}.q-pip{flex:1;height:4px;border-radius:4px;background:rgba(255,255,255,.08);}
    .q-pip.d{background:#c8ff3f;}.q-pip.c{background:rgba(200,255,63,.3);}
    .q-txt{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;line-height:1.4;margin-bottom:17px;}
    .q-opts{display:flex;flex-direction:column;gap:8px;}
    .q-opt{padding:14px;border-radius:11px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;}
    .q-opt:hover:not(.lk){background:rgba(255,255,255,.08);}
    .q-opt.ok{background:rgba(63,255,160,.12);border-color:rgba(63,255,160,.4);color:#3fffa0;}
    .q-opt.no{background:rgba(255,63,120,.12);border-color:rgba(255,63,120,.38);color:#ff3f78;}
    .q-opt.lk{cursor:default;}
    .qr-w{padding:26px 16px;text-align:center;}.qr-em{font-size:56px;margin-bottom:13px;}
    .qr-title{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;margin-bottom:6px;}
    .qr-sub{color:#7777aa;font-size:13px;margin-bottom:20px;}
    .qr-score{font-family:'Unbounded',sans-serif;font-size:50px;font-weight:900;color:#c8ff3f;line-height:1;}
    .qr-lbl{font-size:10px;color:#5555aa;margin-bottom:20px;font-weight:700;text-transform:uppercase;}
    .retry-b{display:inline-block;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:11px;padding:11px 22px;font-size:13px;font-weight:700;cursor:pointer;}
    .retry-b:hover{background:rgba(255,255,255,.11);}
    .ci-w{padding:0 16px;}
    .ci-note{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:13px;padding:15px;margin-bottom:15px;}
    .ci-note-h{font-weight:700;font-size:13px;margin-bottom:5px;color:#c0c0e0;}.ci-note-b{font-size:13px;color:#7777aa;line-height:1.6;}
    .done-b{width:100%;padding:17px;border-radius:15px;font-family:'Unbounded',sans-serif;font-size:12px;font-weight:900;cursor:pointer;transition:all .2s;text-align:center;}
    .done-b.go{background:#c8ff3f;color:#000;}.done-b.go:hover{background:#d4ff60;transform:scale(1.01);}
    .done-b.done{background:rgba(200,255,63,.09);border:1.5px solid rgba(200,255,63,.3);color:#c8ff3f;cursor:default;}
    .ci-confirm{background:rgba(200,255,63,.09);border:1.5px solid rgba(200,255,63,.3);border-radius:13px;padding:15px;margin-top:13px;text-align:center;}
    .ci-conf-em{font-size:30px;margin-bottom:5px;}.ci-conf-h{font-family:'Unbounded',sans-serif;font-size:13px;font-weight:900;color:#c8ff3f;}.ci-conf-s{font-size:11px;color:#7777aa;margin-top:3px;}
    .sheet-note{background:rgba(63,221,255,.06);border:1px solid rgba(63,221,255,.18);border-radius:10px;padding:10px 13px;font-size:11px;color:#5599cc;margin-top:10px;line-height:1.55;}
    .ch-list{padding:0 16px;display:flex;flex-direction:column;gap:9px;}
    .ch-row{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:14px;display:flex;align-items:center;gap:11px;cursor:pointer;transition:all .2s;}
    .ch-row.dn{background:rgba(200,255,63,.05);border-color:rgba(200,255,63,.18);}
    .ch-row:hover:not(.dn){border-color:rgba(255,255,255,.13);}
    .chk-c{width:25px;height:25px;border-radius:50%;border:2px solid rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;transition:all .2s;}
    .chk-c.dn{background:#c8ff3f;border-color:#c8ff3f;color:#000;}
    .ch-nm{font-weight:700;font-size:14px;margin-bottom:2px;}.ch-ht{font-size:11px;color:#5555aa;}
    .bg-w{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px;}
    .bg-c{border-radius:17px;padding:17px;text-align:center;border:1px solid rgba(255,255,255,.07);transition:transform .14s;}
    .bg-c.on{background:rgba(255,255,255,.05);}.bg-c.off{background:rgba(255,255,255,.02);opacity:.42;filter:grayscale(.8);}
    .bg-c:hover{transform:scale(1.02);}
    .bg-em{font-size:32px;margin-bottom:6px;display:block;}.bg-nm{font-family:'Unbounded',sans-serif;font-size:10px;font-weight:700;margin-bottom:3px;}
    .bg-st{font-size:10px;font-weight:700;}.bg-st.on{color:#c8ff3f;}.bg-st.off{color:#5555aa;}
    .pro-b{margin:0 16px 13px;background:rgba(200,255,63,.09);border:1.5px solid rgba(200,255,63,.28);border-radius:13px;padding:13px 16px;text-align:center;}
    .ra-hd{padding:17px 16px 13px;}.ra-ttl{font-family:'Unbounded',sans-serif;font-size:18px;font-weight:900;margin-bottom:3px;}.ra-sub{font-size:12px;color:#5555aa;}
    .ra-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:0 16px 17px;}
    .ra-sc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:11px;padding:12px 7px;text-align:center;}
    .ra-sn{font-family:'Unbounded',sans-serif;font-size:19px;font-weight:900;margin-bottom:2px;}.ra-sl{font-size:9px;color:#5555aa;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
    .stu-list{padding:0 16px;display:flex;flex-direction:column;gap:9px;}
    .stu-c{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:15px;padding:14px;}
    .stu-row{display:flex;align-items:center;gap:9px;margin-bottom:10px;}
    .stu-av{font-size:25px;}.stu-nm{font-weight:700;font-size:14px;}.stu-xp{font-size:11px;color:#c8ff3f;font-weight:600;}
    .stu-mods{display:flex;gap:5px;flex-wrap:wrap;}
    .sm-b{width:29px;height:29px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;position:relative;}
    .sm-lv{position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-radius:50%;font-size:7px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1.5px solid #07070f;}
    .ping-b{margin-left:auto;border-radius:8px;padding:5px 10px;font-size:10px;font-weight:700;cursor:pointer;transition:all .2s;}
    .ping-b.need{background:rgba(255,63,120,.12);border:1px solid rgba(255,63,120,.28);color:#ff3f78;}
    .ping-b.need:hover{background:rgba(255,63,120,.2);}
    .ping-b.sent{background:rgba(200,255,63,.08);border:1px solid rgba(200,255,63,.22);color:#c8ff3f;cursor:default;}
    .ra-leg{padding:12px 16px;font-size:10px;color:#44449a;text-align:center;}
    @keyframes pop{from{transform:scale(.88);opacity:0;}to{transform:scale(1);opacity:1;}}
    @keyframes sup{from{transform:translateY(14px);opacity:0;}to{transform:translateY(0);opacity:1;}}
    .pop{animation:pop .22s ease forwards;}.sup{animation:sup .26s ease forwards;}
  `;

  const HomeView=()=>(
    <>
      <div className="hero">
        <div className="lv-row"><span className="hd" style={{fontSize:26,fontWeight:900}}>Level {lvNum}</span><span style={{fontSize:13,color:"#5555aa"}}>{xp} XP</span></div>
        <div className="lv-bg"><div className="lv-fill" style={{width:`${xpPct}%`}}/></div>
        <div className="lv-cap">{300-(xp%300)} XP to next level</div>
        <div className="stat-row">
          <div className="stat-c"><div className="stat-n">{totalDone}</div><div className="stat-l">Skills Done</div></div>
          <div className="stat-c"><div className="stat-n">{MODULES.filter(m=>getLv(m.id)>=2).length}</div><div className="stat-l">Quizzes ✓</div></div>
          <div className="stat-c"><div className="stat-n">{xp}</div><div className="stat-l">Total XP</div></div>
        </div>
      </div>
      <div className="sec-ttl" style={{marginTop:6}}>Your Skills</div>
      <div className="mod-grid">
        {MODULES.map(m=>{const lv=getLv(m.id);return(
          <div key={m.id} className="mod-c" onClick={()=>openMod(m)}>
            <div className="m-blob" style={{background:m.color}}/><span className="m-em">{m.emoji}</span>
            <div className="m-nm">{m.title}</div><div className="m-sb">{m.sub}</div>
            <div className="m-dots" style={{color:m.color}}>
              {[0,1,2].map(i=><div key={i} className={`dot ${lv>i?"on":""}`}/>)}
              {lv===3&&<span style={{fontSize:9,marginLeft:4,fontWeight:700}}>Done!</span>}
            </div>
          </div>
        );})}
      </div>
    </>
  );

  const ChoresView=()=>(
    <>
      <div style={{padding:"20px 16px 13px"}}>
        <div className="hd" style={{fontSize:21,fontWeight:900,marginBottom:3}}>Daily Chores</div>
        <div style={{fontSize:12,color:"#5555aa"}}>Mark done when complete — synced to teacher's sheet</div>
      </div>
      <div className="ch-list">
        {MODULES.map(m=>{const done=getLv(m.id)===3;return(
          <div key={m.id} className={`ch-row ${done?"dn":""}`} onClick={()=>{openMod(m);setModTab("checkin");}}>
            <div className={`chk-c ${done?"dn":""}`}>{done?"✓":""}</div>
            <div style={{flex:1}}>
              <div className="ch-nm">{m.emoji} {m.title}</div>
              <div className="ch-ht">{done?`✓ Complete · +${XP_CHORE} XP`:m.choreNote}</div>
            </div>
            {!done&&<span style={{fontSize:15,color:"#44448a"}}>›</span>}
          </div>
        );})}
      </div>
    </>
  );

  const BadgesView=()=>{const allDone=MODULES.every(m=>getLv(m.id)===3);return(
    <>
      <div style={{padding:"20px 16px 13px"}}>
        <div className="hd" style={{fontSize:21,fontWeight:900,marginBottom:3}}>Micro-Credentials</div>
        <div style={{fontSize:12,color:"#5555aa"}}>{MODULES.filter(m=>getLv(m.id)===3).length}/{MODULES.length} badges earned</div>
      </div>
      {allDone&&<div className="pro-b"><div style={{fontSize:26,marginBottom:5}}>🏆</div><div className="hd" style={{fontSize:12,color:"#c8ff3f",fontWeight:900}}>LIFE SKILLS PRO</div><div style={{fontSize:11,color:"#7777aa",marginTop:3}}>All modules complete</div></div>}
      <div className="bg-w">
        {MODULES.map(m=>{const lv=getLv(m.id);const earned=lv===3;return(
          <div key={m.id} className={`bg-c ${earned?"on":"off"}`} style={earned?{borderColor:m.color+"30"}:{}}>
            <span className="bg-em" style={earned?{}:{filter:"grayscale(1)"}}>{m.emoji}</span>
            <div className="bg-nm">{m.badge}</div>
            <div className={`bg-st ${earned?"on":"off"}`}>{earned?"✓ Earned":lv===0?"Locked":`${lv}/3 steps`}</div>
            {earned&&<div style={{fontSize:10,color:"#5555aa",marginTop:3}}>+{XP_CHORE} XP</div>}
          </div>
        );})}
      </div>
      <div style={{height:20}}/>
    </>
  );};

  const TeacherView=()=>{
    const totalTasks=STUDENTS.reduce((a,s)=>a+Object.values(s.m).filter(v=>v===3).length,0);
    const needNudge=STUDENTS.filter(s=>Object.values(s.m).reduce((a,v)=>a+v,0)<3).length;
    return(
      <>
        <div className="ra-hd"><div className="ra-ttl">RA Dashboard 📋</div><div className="ra-sub">{DORM_CLASS} · auto-syncs to Google Sheets</div></div>
        <div className="ra-stats">
          <div className="ra-sc"><div className="ra-sn" style={{color:"#c8ff3f"}}>{STUDENTS.length}</div><div className="ra-sl">Students</div></div>
          <div className="ra-sc"><div className="ra-sn" style={{color:"#3fddff"}}>{totalTasks}</div><div className="ra-sl">Tasks Done</div></div>
          <div className="ra-sc"><div className="ra-sn" style={{color:"#ff3f78"}}>{needNudge}</div><div className="ra-sl">Need Nudge</div></div>
        </div>
        <div className="sec-ttl">Student Progress</div>
        <div className="stu-list">
          {STUDENTS.map(s=>{const done=Object.values(s.m).filter(v=>v===3).length;const behind=done<2;const isPinged=pinged[s.id];return(
            <div key={s.id} className="stu-c">
              <div className="stu-row">
                <div className="stu-av">{s.av}</div>
                <div><div className="stu-nm">{s.name}</div><div className="stu-xp">⚡ {s.xp} XP · {done}/6 done</div></div>
                {behind&&<div className={`ping-b ${isPinged?"sent":"need"}`} onClick={()=>!isPinged&&setPinged(p=>({...p,[s.id]:true}))}>{isPinged?"✓ Pinged":"Ping 🔔"}</div>}
              </div>
              <div className="stu-mods">
                {MODULES.map(m=>{const lv=s.m[m.id]||0;const bg=["rgba(255,255,255,.06)","rgba(200,255,63,.14)","rgba(63,221,255,.18)","rgba(200,255,63,.32)"][lv];const lvc=lv===3?"#c8ff3f":lv===2?"#3fddff":"#666699";return(
                  <div key={m.id} className="sm-b" style={{background:bg}}>
                    {m.emoji}{lv>0&&<div className="sm-lv" style={{background:lvc,color:"#000"}}>{["","L","Q","✓"][lv]}</div>}
                  </div>
                );})}
              </div>
            </div>
          );})}
        </div>
        <div className="ra-leg">L = Learned · Q = Quiz passed · ✓ = Chore done</div>
      </>
    );
  };

  const ModuleDetail=()=>{
    if(!activeMod)return null;
    const lv=getLv(activeMod.id);
    const LearnTab=()=>(
      <>
        <div className="tips-list">
          {activeMod.tips.map((t,i)=>(
            <div key={i} className="tip-c sup" style={{animationDelay:`${i*.07}s`,opacity:0,animationFillMode:"forwards"}}>
              <div className="tip-ic">{t.icon}</div><div><div className="tip-h">{t.h}</div><div className="tip-b">{t.b}</div></div>
            </div>
          ))}
        </div>
        <div className={`mark-b ${lv>=1?"done":"go"}`} onClick={markLearn}>{lv>=1?"✓ Learned (+50 XP)":"Mark as Learned →"}</div>
        <div style={{height:20}}/>
      </>
    );
    const QuizTab=()=>{
      if(qDone){const sc=qAns.filter((a,i)=>a===activeMod.quiz[i].a).length;const passed=sc>=3;return(
        <div className="qr-w pop">
          <div className="qr-em">{passed?"🎉":"😤"}</div><div className="qr-title">{passed?"Nailed it!":"Not quite…"}</div>
          <div className="qr-sub">{passed?"Quiz passed · +100 XP":"Need 3/5 to pass. You've got this."}</div>
          <div className="qr-score">{sc}/5</div><div className="qr-lbl">Correct Answers</div>
          {!passed&&<div className="retry-b" onClick={()=>{setQIdx(0);setQSel(null);setQFeed(false);setQAns([]);setQDone(false);}}>Try Again</div>}
        </div>
      );}
      const q=activeMod.quiz[qIdx];
      return(
        <div className="quiz-w">
          <div className="q-bar">{activeMod.quiz.map((_,i)=><div key={i} className={`q-pip ${i<qIdx?"d":i===qIdx?"c":""}`}/>)}</div>
          <div className="q-txt" key={qIdx}>Q{qIdx+1}: {q.q}</div>
          <div className="q-opts">
            {q.opts.map((opt,i)=>{let cls="q-opt";if(qFeed){cls+=" lk";if(i===q.a)cls+=" ok";else if(i===qSel&&i!==q.a)cls+=" no";}return<div key={i} className={cls} onClick={()=>pickAnswer(i)}>{opt}</div>;})}
          </div>
        </div>
      );
    };
    const CheckinTab=()=>(
      <div className="ci-w">
        <div className="ci-note"><div className="ci-note-h">📋 Today's task</div><div className="ci-note-b">{activeMod.choreNote}</div></div>
        <div className={`done-b ${progress[activeMod.id]?.chore?"done":"go"}`} onClick={markChore}>
          {progress[activeMod.id]?.chore?"✓ Chore Complete! (+150 XP)":"✅ Mark as Done"}
        </div>
        {flash&&<div className="ci-confirm pop"><div className="ci-conf-em">🎉</div><div className="ci-conf-h">Chore logged!</div><div className="ci-conf-s">+150 XP · sent to teacher's Google Sheet</div></div>}
        <div className="sheet-note">📊 Completions are automatically logged to your teacher's Google Sheet in real time.</div>
        <div style={{height:20}}/>
      </div>
    );
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div className="mod-hd" style={{background:`${activeMod.color}12`}}>
          <div className="m-blob2" style={{background:activeMod.color}}/>
          <div className="back-b" onClick={()=>setActiveMod(null)}>← Back</div>
          <div className="m-big-em">{activeMod.emoji}</div><div className="m-big-nm">{activeMod.title}</div><div className="m-big-sb">{activeMod.sub}</div>
          <div className="xp-tags">
            {[["📖 Learn","50",1],["🧠 Quiz","100",2],["✅ Done","150",3]].map(([lb,pts,th])=>(
              <div key={lb} className="xp-tag" style={{background:lv>=th?`${activeMod.color}1a`:"rgba(255,255,255,.04)",border:`1px solid ${lv>=th?activeMod.color+"3a":"rgba(255,255,255,.08)"}`,color:lv>=th?activeMod.color:"#55558a"}}>{lb} +{pts}</div>
            ))}
          </div>
        </div>
        <div className="tabs">
          {[["learn","📖 Learn"],["quiz","🧠 Quiz"],["checkin","✅ Check-in"]].map(([id,lb])=>(
            <div key={id} className={`tab-b ${modTab===id?"on":""}`} onClick={()=>setModTab(id)}>{lb}</div>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",scrollbarWidth:"none"}}>
          {modTab==="learn"&&<LearnTab/>}{modTab==="quiz"&&<QuizTab/>}{modTab==="checkin"&&<CheckinTab/>}
        </div>
      </div>
    );
  };

  const syncLabel={syncing:"⟳ Syncing…",ok:"✓ Synced",offline:"Offline"}[sync];
  const syncCls={syncing:"sync sy",ok:"sync ok",offline:"sync of"}[sync];

  return(
    <div className="da">
      <style>{css}</style>
      <div className="app-hd">
        <div className="logo">dormlife.</div>
        {sync&&<div className={syncCls}>{syncLabel}</div>}
        <div className="xp-p">⚡ {xp} XP</div>
        <div className={`mode-b ${mode==="teacher"?"ra":""}`} onClick={()=>{setMode(m=>m==="student"?"teacher":"student");setActiveMod(null);setTab("home");}}>RA View</div>
      </div>
      {activeMod?(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}><ModuleDetail/></div>
      ):(
        <>
          <div className="main">
            {mode==="teacher"?<TeacherView/>:(
              <>{tab==="home"&&<HomeView/>}{tab==="chores"&&<ChoresView/>}{tab==="badges"&&<BadgesView/>}</>
            )}
          </div>
          {mode==="student"&&(
            <div className="bot-nav">
              {[["home","🏠","Home"],["chores","✅","Chores"],["badges","🏅","Badges"]].map(([id,ic,lb])=>(
                <div key={id} className={`nav-b ${tab===id?"on":""}`} onClick={()=>setTab(id)}><div className="nav-ic">{ic}</div>{lb}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
