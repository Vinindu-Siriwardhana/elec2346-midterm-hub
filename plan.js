// Midterm study plan (Lectures 1–4 + op amp slides 1–9). Each item: [label, detail]. Ticks are stored under 'plan' in localStorage.
const PLAN = [
 {id:"days", title:"3-day schedule", icon:"📅", c:["#f59e0b","#f97316"], note:"Midterm Mon 26 Oct. One lecture block per day, then a final review.", items:[
   ["Fri 23 Oct","Lectures 1–2: T1 Q1, 2020 A1–A2, Sadiku Ch 1–2 picks"],
   ["Sat 24 Oct","Lecture 3: T1 Q2–Q5, 2016 Q1, 2017 Q2–Q3, 2018 Q2, 2019 Q1–Q2, Sadiku Ch 3 picks"],
   ["Sun 25 Oct","Lecture 4 + op amps: Tutorial 2, Thevenin/max-power past papers, op-amp slides 5–9, Sadiku Ch 4 picks"],
   ["Mon 26 Oct","Redo anything you got wrong; run the Equations tab in Quiz mode"]]},
 {id:"tut", title:"Tier 1 · Tutorials", icon:"📝", c:["#0f766e","#14b8a6"], note:"Your lecturer's own questions. Do all ten without notes.", items:[
   ["T1 Q1","$R_{eq}$ and $i_o$ (series–parallel)"],["T1 Q2","Nodal, four nodes"],["T1 Q3","Mesh: $v_{ab}$ and $i_o$"],["T1 Q4","Nodal with dependent sources"],["T1 Q5","Mesh with a shared current source"],
   ["T2 Q1","Superposition with a CCCS"],["T2 Q2","Source transformation"],["T2 Q3","Thevenin, then $i_x$"],["T2 Q4","Norton, then $i$"],["T2 Q5","Thevenin + Norton with a VCCS"]]},
 {id:"pp", title:"Tier 1 · Past-paper questions in range", icon:"📄", c:["#06b6d4","#3b82f6"], note:"All five papers are finals, so only these parts are midterm material.", items:[
   ["2016 Q1","Nodal with CCVS + supernode"],["2016 Q2","Thevenin & Norton"],["2016 Q3","Black box → max power"],
   ["2017 Q1","Max power + % of source power"],["2017 Q2","Node equations by inspection"],["2017 Q3","Nodal with two dependent sources"],
   ["2018 Q1","Bridge max power + %"],["2018 Q2","Mesh equations by inspection"],
   ["2019 Q1","R at dc"],["2019 Q2","Nodal: node voltages and $I_x$"],["2019 Q3","Superposition"],["2019 Q4","Thevenin/Norton/max power"],["2019 Q5","Circuit from Thevenin values"],
   ["2020 A1","Balanced bridge"],["2020 A2","LED driver KCL"],["2020 A3","Ideal op-amp properties"],["2020 B4","Norton with VCCS"],["2020 B5","Thevenin of a bridge"]]},
 {id:"oa", title:"Tier 1 · Op amp slides 1–9", icon:"🔺", c:["#10b981","#34d399"], note:"Rework each from a blank page before checking the slide.", items:[
   ["Slide 5","Ideal op-amp properties and the two rules"],["Slides 7–8","Example 1: non-ideal op amp, $v_o/v_s$ and $i$"],["Slide 9","Derive the inverting gain $-R_f/R_i$"]]},
 {id:"s1", title:"Tier 2 · Sadiku Ch 1 — basic concepts", icon:"🔋", c:["#64748b","#334155"], note:"", items:[["1.13",""],["1.17",""],["1.19",""]]},
 {id:"s2", title:"Tier 2 · Sadiku Ch 2 — basic laws", icon:"⚖️", c:["#64748b","#334155"], note:"", items:[["2.15",""],["2.21",""],["2.25",""],["2.35",""],["2.41",""],["2.43",""],["2.47",""]]},
 {id:"s3", title:"Tier 2 · Sadiku Ch 3 — nodal & mesh", icon:"🟢", c:["#64748b","#334155"], note:"", items:[["3.9",""],["3.13",""],["3.19",""],["3.21",""],["3.23",""],["3.49",""],["3.51",""],["3.67",""],["3.71",""]]},
 {id:"s4", title:"Tier 2 · Sadiku Ch 4 — theorems", icon:"🔌", c:["#64748b","#334155"], note:"", items:[["4.5",""],["4.13",""],["4.15",""],["4.17",""],["4.25",""],["4.33",""],["4.37",""],["4.47",""],["4.53",""],["4.63",""],["4.65",""],["4.71",""],["4.73",""],["4.83",""],["4.85",""]]},
 {id:"x", title:"Tier 3 · Extra odd-numbered practice", icon:"➕", c:["#94a3b8","#64748b"], note:"Only if you finish everything else. Answers are in the odd-number answer PDF (it drops minus signs).", items:[
   ["2.13",""],["2.17",""],["2.19",""],["2.23",""],["2.39",""],["2.45",""],["2.53",""],["2.57",""],["3.5",""],["3.7",""],["3.11",""],["3.15",""],["3.17",""],["3.27",""],["3.41",""],["3.45",""],["3.53",""],["3.69",""],
   ["4.1",""],["4.3",""],["4.7",""],["4.9",""],["4.19",""],["4.23",""],["4.31",""],["4.39",""],["4.41",""],["4.45",""],["4.49",""],["4.51",""],["4.59",""],["4.69",""],["4.75",""]]},
];
const PLAN_SKIP = "Skip: Sadiku 2.63–2.69 (meters), 3.75–3.93 (PSpice, transistors), 4.76–4.98 (PSpice, applications) and the \"design a problem\" ones; every past-paper part on capacitors, inductors, transients, phasors, filters, diodes, and op-amp circuits after slide 9 (summing, difference, integrator, comparator, Howland pump).";
