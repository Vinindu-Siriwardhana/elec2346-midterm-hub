// Finals + next-quiz study plan (Lectures 5–8 first, then a review of the midterm material). Each item: [label, detail].
// Ticks are stored under 'plan' in localStorage; the old midterm groups keep their ids so earlier ticks survive.
const PLAN = [
 {id:"fdays", title:"Schedule to the final", icon:"📅", c:["#f59e0b","#f97316"], note:"Next quiz Thu 19 Nov (course info lists it as Quiz 3 — tentative). Homework due Fri 27 Nov. Final exam date TBA (past finals ran 10–19 Dec). Lab report: two weeks after your lab session.", items:[
   ["Mon 9 – Wed 11 Nov","Op amps after slide 9: Lec 5 Examples 2–9, then 2017 Q4, 2019 Q6, 2020 B2, 2016 Q5, 2019 Q7"],
   ["Thu 12 – Sat 14 Nov","Diodes: Lec 6 Examples 1–3 + rectifier slides, then 2016 Q10, Q11, 2019 Q9, Q10"],
   ["Sun 15 – Tue 17 Nov","Capacitors & inductors: Lec 7 Examples 1–13, then 2016 Q4, 2017 Q5–Q6, 2018 Q4, 2020 A4, integrators 2016 Q6, 2017 Q9, 2018 Q3"],
   ["Wed 18 Nov","Quiz prep: Equations tab in Quiz mode for Lectures 5–7; redo anything you got wrong"],
   ["Thu 19 Nov","Quiz"],
   ["Fri 20 – Thu 26 Nov","Homework (due 27 Nov) + transients as they're lectured: 2018 Q6, 2019 Q8, 2020 B1, then 2017 Q7, 2018 Q7, 2020 B3"],
   ["Sat 28 Nov – exam −7 days","One full past paper every two days, timed (3 h, skip phasor questions): 2019 → 2020 → 2018 → 2017 → 2016"],
   ["Between papers","Midterm refresh: Thevenin/max power, nodal/mesh with dependent sources (25–35% of every final)"],
   ["Last week","Weak topics only, Equations tab in Quiz mode, redo every question you got wrong"]]},
 {id:"q5", title:"Tier 1 · Lecture 5 examples (op amps, slides 10–30)", icon:"🔺", c:["#0f766e","#14b8a6"], note:"Rework each from a blank page, then check the slide.", items:[
   ["Ex 2","Inverting amp with two sources ($v_o=-1$ V), both methods"],["Ex 3","Voltage follower vs plain divider"],["Ex 4","Summer: $v_o$ and $i_o$"],["Ex 5","Design $v_o=-5v_1+3v_2$ (one and two op amps)"],
   ["Ex 6","Instrumentation amp: derive the gain"],["Ex 7","Two cascaded non-inverting stages"],["Ex 8","Two inverters into a summer"],["Ex 9","4-bit DAC output levels"]]},
 {id:"q6", title:"Tier 1 · Lecture 6 examples (diodes)", icon:"🔦", c:["#0ea5e9","#06b6d4"], note:"", items:[
   ["Slides 10–13","Rectifier, battery clipper, OR and AND gates (ideal model)"],["Ex 1–2","Assume and check with two diodes"],["Slides 16–19","Load line and iteration ($I_D=4.262$ mA)"],
   ["Slide 21","Constant-voltage transfer characteristic"],["Ex 3","Small-signal: $I_D=2.9$ mA, $r_d$, $i_d(t)$"],["Slides 29–32","Half-wave, peak detector, bridge"]]},
 {id:"q7", title:"Tier 1 · Lecture 7 examples (capacitors & inductors)", icon:"🧱", c:["#10b981","#34d399"], note:"", items:[
   ["Ex 1–4","Charge, energy, $i=C\\,dv/dt$, $v$ from $\\int i$, piecewise $v(t)$"],["Ex 5, 8","DC steady state energies"],["Ex 6, 9","Equivalent C and L"],["Ex 7, 10","Inductor $v$, energy; parallel inductors with initial currents"],
   ["Ex 11","Summing integrator"],["Ex 12","Differentiator with a triangle input"],["Ex 13","Analog computer"]]},
 {id:"fpp", title:"Tier 1 · Past-paper questions since the midterm", icon:"📄", c:["#8b5cf6","#d946ef"], note:"Worked solutions in the Practice tab. Phasor questions (2016 Q7–Q9, 2017 Q8, 2018 Q5, Q8) are left out: they aren't in this year's outline.", items:[
   ["2016 Q4","$C_{eq}$ with jumpers"],["2016 Q5","Howland current pump"],["2016 Q6","Integrator into 10 Ω"],["2016 Q10","Diode transfer function"],["2016 Q11","Small-signal $\\Delta V_{out}$"],
   ["2017 Q4","Difference amp design + range"],["2017 Q5","$C_{eq}$ and $L_{eq}$"],["2017 Q6","Inductors with $i_1(t)$"],["2017 Q7","Parallel RLC roots"],["2017 Q9","Integrator saturation time"],
   ["2018 Q3","Integrator, dc input"],["2018 Q4","Analog computer + $L_{eq}$"],["2018 Q6","RL with two switches"],["2018 Q7","Underdamped parallel RLC"],
   ["2019 Q6","Two-op-amp difference amp"],["2019 Q7","Comparator"],["2019 Q8","RC, resistor switched out and in"],["2019 Q9","Diode transfer curve"],["2019 Q10","Diode small-signal"],
   ["2020 A4","Capacitor minimum energy"],["2020 B1","RL switching snapshots"],["2020 B2","Non-inverting summer"],["2020 B3","Parallel RLC"]]},
 {id:"mock", title:"Tier 2 · Full papers under exam conditions", icon:"⏱️", c:["#ec4899","#f43f5e"], note:"3 hours, closed notes, then mark against the Practice tab.", items:[
   ["2019","All 10 questions"],["2020","Section A + four of B"],["2018","Skip Q5, Q8"],["2017","Skip Q8"],["2016","Skip Q7–Q9"]]},
 {id:"tut", title:"Midterm review · Tutorials", icon:"📝", c:["#0f766e","#14b8a6"], note:"Your lecturer's own questions. Do all ten without notes.", items:[
   ["T1 Q1","$R_{eq}$ and $i_o$ (series–parallel)"],["T1 Q2","Nodal, four nodes"],["T1 Q3","Mesh: $v_{ab}$ and $i_o$"],["T1 Q4","Nodal with dependent sources"],["T1 Q5","Mesh with a shared current source"],
   ["T2 Q1","Superposition with a CCCS"],["T2 Q2","Source transformation"],["T2 Q3","Thevenin, then $i_x$"],["T2 Q4","Norton, then $i$"],["T2 Q5","Thevenin + Norton with a VCCS"]]},
 {id:"pp", title:"Midterm review · Past-paper questions in range", icon:"📄", c:["#06b6d4","#3b82f6"], note:"All five papers are finals, so only these parts are midterm material.", items:[
   ["2016 Q1","Nodal with CCVS + supernode"],["2016 Q2","Thevenin & Norton"],["2016 Q3","Black box → max power"],
   ["2017 Q1","Max power + % of source power"],["2017 Q2","Node equations by inspection"],["2017 Q3","Nodal with two dependent sources"],
   ["2018 Q1","Bridge max power + %"],["2018 Q2","Mesh equations by inspection"],
   ["2019 Q1","R at dc"],["2019 Q2","Nodal: node voltages and $I_x$"],["2019 Q3","Superposition"],["2019 Q4","Thevenin/Norton/max power"],["2019 Q5","Circuit from Thevenin values"],
   ["2020 A1","Balanced bridge"],["2020 A2","LED driver KCL"],["2020 A3","Ideal op-amp properties"],["2020 B4","Norton with VCCS"],["2020 B5","Thevenin of a bridge"]]},
 {id:"oa", title:"Midterm review · Op amp slides 1–9", icon:"🔺", c:["#10b981","#34d399"], note:"Rework each from a blank page before checking the slide.", items:[
   ["Slide 5","Ideal op-amp properties and the two rules"],["Slides 7–8","Example 1: non-ideal op amp, $v_o/v_s$ and $i$"],["Slide 9","Derive the inverting gain $-R_f/R_i$"]]},
 {id:"s1", title:"Midterm review · Sadiku Ch 1 — basic concepts", icon:"🔋", c:["#64748b","#334155"], note:"", items:[["1.13",""],["1.17",""],["1.19",""]]},
 {id:"s2", title:"Midterm review · Sadiku Ch 2 — basic laws", icon:"⚖️", c:["#64748b","#334155"], note:"", items:[["2.15",""],["2.21",""],["2.25",""],["2.35",""],["2.41",""],["2.43",""],["2.47",""]]},
 {id:"s3", title:"Midterm review · Sadiku Ch 3 — nodal & mesh", icon:"🟢", c:["#64748b","#334155"], note:"", items:[["3.9",""],["3.13",""],["3.19",""],["3.21",""],["3.23",""],["3.49",""],["3.51",""],["3.67",""],["3.71",""]]},
 {id:"s4", title:"Midterm review · Sadiku Ch 4 — theorems", icon:"🔌", c:["#64748b","#334155"], note:"", items:[["4.5",""],["4.13",""],["4.15",""],["4.17",""],["4.25",""],["4.33",""],["4.37",""],["4.47",""],["4.53",""],["4.63",""],["4.65",""],["4.71",""],["4.73",""],["4.83",""],["4.85",""]]},
 {id:"ty", title:"Midterm review · Extra question types from the supplementary PDF", icon:"🧷", c:["#64748b","#334155"], note:"One problem for each question type in the PDF that the lists above don't cover. Quick ones.", items:[
   ["1.9","Charge from an $i(t)$ graph"],["1.16","Power and energy from $i$, $v$ graphs"],["2.7","Count branches and nodes"],["2.13","KCL on a diagram (watch the signs)"],
   ["2.49","Δ → Y conversion"],["2.68","Ammeter loading error"],["4.6","Linearity table"],["4.31","Source transformation with a dependent source"]]},
 {id:"x", title:"Midterm review · Extra odd-numbered practice", icon:"➕", c:["#94a3b8","#64748b"], note:"Only if you finish everything else. Answers are in the odd-number answer PDF (it drops minus signs).", items:[
   ["2.13",""],["2.17",""],["2.19",""],["2.23",""],["2.39",""],["2.45",""],["2.53",""],["2.57",""],["3.5",""],["3.7",""],["3.11",""],["3.15",""],["3.17",""],["3.27",""],["3.41",""],["3.45",""],["3.53",""],["3.69",""],
   ["4.1",""],["4.3",""],["4.7",""],["4.9",""],["4.19",""],["4.23",""],["4.31",""],["4.39",""],["4.41",""],["4.45",""],["4.49",""],["4.51",""],["4.59",""],["4.69",""],["4.75",""]]},
];
const PLAN_SKIP = "Skip: past-paper questions on phasors, AC Thevenin, filters and resonance (2016 Q7–Q9, 2017 Q8, 2018 Q5, Q8) — they are not in the 2026 course outline. Also skip Sadiku PSpice, transistor and \"design a problem\" exercises.";
