// Finals study plan: new material first (step response, RLC, full papers), then a second pass and the midterm review. Each item: [label, detail].
// Ticks are stored under 'plan' in localStorage by group id, so earlier ticks survive the reordering.
const PLAN = [
 {id:"finaldays", title:"Schedule to the final", icon:"📅", c:["#f59e0b","#f97316"], note:"Final exam (40%): date TBA, so the dated days below run to the end of lectures and the rest is in order. Lectures end Mon 30 Nov, probably with RLC. The final covers the whole course; turn on “New since Quiz 3” to see what no quiz has tested yet.", items:[
   ["Fri 27 Nov","Submit the homework. Then Lecture 8 slides 14–22: unit step, RC step response $v=V_s+(V_0-V_s)e^{-t/\\tau}$ and the two switch examples"],
   ["Sat 28 Nov","RL step response (slides 23–28, Examples 6–7), then Sadiku 7.37, 7.39, 7.43, 7.45, 7.53, 7.59, 7.61, 7.63"],
   ["Sun 29 Nov","First-order op-amp circuits (slides 29–31) and Sadiku 7.71; delay circuit (Ex 8) and flashgun (Ex 9). Past papers: 2018 Q6, 2019 Q8, 2020 B1"],
   ["Mon 30 Nov","Last lecture (RLC). In the evening: series vs parallel α, ω₀, roots and the three damping cases from the Equations tab; 2017 Q7"],
   ["Tue 1 Dec","RLC practice: Sadiku Ch 8 set, then 2018 Q7 and 2020 B3"],
   ["Wed 2 Dec","Full paper 2019, timed (3 h), then mark it in Full papers"],
   ["Thu 3 Dec","Redo what went wrong in 2019. Second pass on op amps and diodes (Tier 2 groups)"],
   ["Next","Full paper 2020 (Section A + four of B), timed, then mark"],
   ["Next","Capacitors & inductors second pass + midterm refresh: Thevenin/max power, nodal/mesh with dependent sources (25–35% of every final)"],
   ["Next","Full papers 2018 → 2017 → 2016, one every two days (skip the phasor questions)"],
   ["Last two days","Weak topics only: Equations tab in Flashcard mode, redo every question you got wrong, read the exam-technique checklist"]]},
 {id:"fexam", title:"Final exam technique", icon:"📋", c:["#f97316","#ef4444"], note:"Past finals were 3-hour written papers with full working. Check Moodle for the date, venue and whether any notes are allowed.", items:[
   ["Time budget","About 1.8 minutes per mark (3 h ≈ 100 marks). Do the short Section-A-style questions first, then the long ones you know best"],
   ["First-order recipe","Three numbers: $x(0^+)$, $x(\\infty)$, $\\tau$ (with $R_{eq}$ seen from C or L). Restart the clock at every switching instant"],
   ["RLC recipe","Series or parallel? Get α and ω₀, the roots, the damping case, then fit two constants with $x(0^+)$ and $x'(0^+)$; add $x(\\infty)$ for a step"],
   ["Show your working","Label nodes and currents, write each KCL/KVL before solving, box answers with units: method marks are most of the marks"],
   ["Calculator","$e^{-x}$, $\\ln$, quadratic roots and 2×2/3×3 simultaneous equations; know your calculator's equation solver"],
   ["Check answers","$v_C$ and $i_L$ are continuous at a switch; τ has units of seconds; an inverting stage flips the sign; energies are never negative"],
   ["Watch the traps","Parallel C adds (opposite of R); $\\tau=L/R$; series RLC α = R/2L but parallel α = 1/2RC; diode at 0.7 V vs ideal"]]},
 {id:"q8", title:"Tier 1 · Lecture 8 examples (first-order circuits)", icon:"📉", c:["#8b5cf6","#d946ef"], note:"The first six (source-free) were tested in Quiz 3; the rest (slides 14–35) are new for the final.", items:[
   ["Slides 4–5","Derive the RC ODE and $v=V_0e^{-t/RC}$"],["Slide 6","Meaning of τ, 5τ rule, resistor energy"],["Ex 1","$R_{eq}=4\\,\\Omega$, $v_C$, $v_x$, $i_x$"],
   ["Ex 2","Switch opens: $v_C(0)=15$ V, $\\tau=0.2$ s, initial energy"],["Slides 9–10","RL: $i=I_0e^{-tR/L}$ and resistor energy"],["Ex 3–5","Slides 11–13: $R_{eq}$ with a dependent source, switching RL"],
   ["Slides 14–18","Unit step $u(t)$ and how a switched dc source becomes a step input"],["Slides 19–22","RC step response and both switch examples (A → B, switch opened)"],
   ["Ex 6–7","RL step response (slides 23–28)"],["Slides 29–31","First-order op-amp circuit with a capacitor"],["Ex 8","Delay circuit"],["Ex 9","Electronic flashgun"]]},
 {id:"c7", title:"Tier 1 · Sadiku Ch 7 — first-order circuits", icon:"⏱️", c:["#8b5cf6","#d946ef"], note:"Source-free RC/RL (7.1–7.23, 19 problems) were tested in Quiz 3. 7.37 onward (step response, op-amp circuits) is new for the final. Even-numbered ones have no textbook key; their answers were checked by hand and in Python.", items:[
   ["7.1","R, C, τ from $v$ and $i$"],["7.3","τ of an RC network"],["7.9","RC discharge after a switch"],["7.11","RL discharge after a switch"],["7.13","RL: R, L, τ, energy"],
   ["7.17","RL natural response, $v_o$"],["7.19","RL with a dependent source"],["7.37","First-order ODE"],["7.39(a)","RC step after a switch"],["7.43","RC with a dependent source"],
   ["7.45","RC step via Thevenin"],["7.53","RL before and after a switch (two circuits)"],["7.59","RL step response"],["7.61","RL with a stepped current source"],
   ["7.63","RL with $10u(-t)$"],["7.71","First-order op-amp circuit"],
   ["7.2","τ of an RC network"],["7.4","RC discharge after a switch"],["7.6","RC discharge after a switch"],["7.8","RC: R, C, τ, 50% energy time"],
   ["7.10","RC discharge and one-third time"],["7.14","τ of an RL network"],["7.15","τ of two RL networks"],["7.18","RL natural response, $v_o$"],
   ["7.20","RL: L, R, τ, energy fraction"],["7.21","R for 1 J stored at DC"],["7.22","RL natural response, $i$ and $v$"],["7.23","RL natural response, $v_o$ and $v_x$"]]},
 {id:"c8", title:"Tier 1 · Sadiku Ch 8 — second-order RLC circuits", icon:"〰️", c:["#ec4899","#f43f5e"], note:"Start after the RLC lecture (expected Mon 30 Nov). Every final since 2017 has an RLC question.", items:[
   ["8.1","Initial and final values"],["8.5","Initial and final values with a step source"],["8.9","Critically damped ODE"],["8.11","Critically damped ODE"],
   ["8.13","R for critical damping"],["8.15","Find R, L, C from responses"],["8.23","C for α = 1"],["8.27","Underdamped step ODE"],["8.31","$v_L(0^+)$, $v_C(0^+)$"],
   ["8.43","Choose R, C for α and $\omega_d$"],["8.45","Parallel RLC step response"],["8.47","Critically damped parallel RLC"],["8.49","Critically damped with a switch"]]},
 {id:"fpp", title:"Tier 1 · Past-paper questions since the midterm", icon:"📄", c:["#8b5cf6","#d946ef"], note:"Worked solutions in the Practice tab. Phasor questions (2016 Q7–Q9, 2017 Q8, 2018 Q5, Q8) are left out: they aren't in this year's outline.", items:[
   ["2016 Q4","$C_{eq}$ with jumpers"],["2016 Q5","Howland current pump"],["2016 Q6","Integrator into 10 Ω"],["2016 Q10","Diode transfer function"],["2016 Q11","Small-signal $\\Delta V_{out}$"],
   ["2017 Q4","Difference amp design + range"],["2017 Q5","$C_{eq}$ and $L_{eq}$"],["2017 Q6","Inductors with $i_1(t)$"],["2017 Q7","Parallel RLC roots"],["2017 Q9","Integrator saturation time"],
   ["2018 Q3","Integrator, dc input"],["2018 Q4","Analog computer + $L_{eq}$"],["2018 Q6","RL with two switches"],["2018 Q7","Underdamped parallel RLC"],
   ["2019 Q6","Two-op-amp difference amp"],["2019 Q7","Comparator"],["2019 Q8","RC, resistor switched out and in"],["2019 Q9","Diode transfer curve"],["2019 Q10","Diode small-signal"],
   ["2020 A4","Capacitor minimum energy"],["2020 B1","RL switching snapshots"],["2020 B2","Non-inverting summer"],["2020 B3","Parallel RLC"]]},
 {id:"mock", title:"Tier 1 · Full papers under exam conditions", icon:"⏱️", c:["#ec4899","#f43f5e"], note:"3 hours, closed notes, then mark against the Practice tab.", items:[
   ["2019","All 10 questions"],["2020","Section A + four of B"],["2018","Skip Q5, Q8"],["2017","Skip Q8"],["2016","Skip Q7–Q9"]]},
 {id:"q7", title:"Tier 2 · Lecture 7 examples (capacitors & inductors)", icon:"🧱", c:["#10b981","#34d399"], note:"Every final has 2–3 questions here, often an integrator or analog computer.", items:[
   ["Ex 1–4","Charge, energy, $i=C\\,dv/dt$, $v$ from $\\int i$, piecewise $v(t)$"],["Ex 5, 8","DC steady state energies"],["Ex 6, 9","Equivalent C and L"],["Ex 7, 10","Inductor $v$, energy; parallel inductors with initial currents"],
   ["Ex 11","Summing integrator"],["Ex 12","Differentiator with a triangle input"],["Ex 13","Analog computer"]]},
 {id:"c6", title:"Tier 2 · Sadiku Ch 6 — capacitors & inductors", icon:"🧱", c:["#10b981","#34d399"], note:"Odd numbers, checked against the textbook key.", items:[
   ["6.7","$v(t)$ from $i=5t$ mA"],["6.9","$v$ and $p$ from $i(t)$"],["6.15","Energy: parallel vs series"],["6.17","Three $C_{eq}$ networks"],["6.19","Bigger $C_{eq}$ network"],
   ["6.21","Ladder $C_{eq}$"],["6.37","Inductor $v$ and energy"],["6.39","Inductor $i$ from $v$"],["6.41","Inductor $i$ and energy"],["6.49","$L_{eq}$ with a jumper"],
   ["6.51","$L_{eq}$ bridge"],["6.53","$L_{eq}$ triangle"],["6.61","Parallel inductors: divider, $v_o$, energy"],["6.67","Integrator with a sine input"],
   ["6.71","Design a summing integrator"],["6.75","Differentiator with a ramp"],
   ["6.1","$i$ and $p$ from $v=2te^{-3t}$"],["6.5","Current from a triangle voltage"],["6.11","Sketch $v$ from a current graph"],["6.27","Min and max of four capacitors"],
   ["6.29","Two $C_{eq}$ networks"],["6.35","$L$ from $\\Delta i$ and $v$"],["6.43","Inductor energy"],["6.45","Inductor $i$ from a sawtooth $v$"],
   ["6.47","Equal C and L energy at DC"],["6.55","Two $L_{eq}$ networks"]]},
 {id:"q6", title:"Tier 2 · Lecture 6 examples (diodes)", icon:"🔦", c:["#0ea5e9","#06b6d4"], note:"Past finals ask one transfer-characteristic sketch and one small-signal question.", items:[
   ["Slides 10–13","Rectifier, battery clipper, OR and AND gates (ideal model)"],["Ex 1–2","Assume and check with two diodes"],["Slides 16–19","Load line and iteration ($I_D=4.262$ mA)"],
   ["Slide 21","Constant-voltage transfer characteristic"],["Slides 22–24","Small-signal model: $r_d=V_T/I_D$, a small signal riding on a DC bias"],["Ex 3","Slides 25–28: $I_D=2.9$ mA, $r_d$, $i_d(t)$"],["Slides 29–32","Half-wave, peak detector, bridge"]]},
 {id:"sp3", title:"Tier 2 · Supplementary Part 3 — diodes", icon:"🔦", c:["#0ea5e9","#06b6d4"], note:"Dr Lee's own diode set. All six use the ideal or constant-voltage model.", items:[
   ["Q1","Ideal diode: $v_L$ for $v_s<0$ and $v_s>0$"],["Q2","Constant-voltage model: $R$ for 5 mA, smallest $E$"],["Q3","Forward or reverse? Five single-diode cases"],
   ["Q4","Diode OR/AND networks: which conduct, $v_{out}$"],["Q5","Clipper with a 4 V battery (ideal model)"],["Q6","Same clipper, constant-voltage model"]]},
 {id:"q5", title:"Tier 2 · Lecture 5 examples (op amps, slides 10–30)", icon:"🔺", c:["#0f766e","#14b8a6"], note:"Rework each from a blank page, then check the slide.", items:[
   ["Ex 2","Inverting amp with two sources ($v_o=-1$ V), both methods"],["Ex 3","Voltage follower vs plain divider"],["Ex 4","Summer: $v_o$ and $i_o$"],["Ex 5","Design $v_o=-5v_1+3v_2$ (one and two op amps)"],
   ["Ex 6","Instrumentation amp: derive the gain"],["Ex 7","Two cascaded non-inverting stages"],["Ex 8","Two inverters into a summer"],["Ex 9","4-bit DAC output levels"]]},
 {id:"c5", title:"Tier 2 · Sadiku Ch 5 — op amps", icon:"🔺", c:["#0f766e","#14b8a6"], note:"From Supplementary Exercise Part 2. Odd numbers, so every answer is checked against the textbook key.", items:[
   ["5.13","Non-inverting: $v_o$ and $i_o$"],["5.17","Inverting gain, three switch positions"],["5.19","Inverting with a source network: $i_o$"],["5.21","Inputs on both pins"],
   ["5.25","Follower then divider"],["5.27","Divider, follower, divider"],["5.31","Follower inside a network: $i_x$"],["5.33","Non-inverting: $i_x$ and power"],
   ["5.37","Inverting summer (watch polarities)"],["5.39","Summer: find the input"],["5.47","Unbalanced difference amp"],["5.55","Three-stage gain from dB"],
   ["5.61","Inverter into a summer"],["5.65","Three cascaded stages"]]},
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
