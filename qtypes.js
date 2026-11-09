// Question types seen in the tutorials and the 2016–2021 past papers.
// scope: "mid" = Lectures 1–4 + op amp basics (midterm material, still on the final); "late" = taught since the midterm
// find = keyword(s) that jump to related equations in the Equations tab
const QTYPES = [
{
 id:"q-th", icon:"🔌", scope:"mid", freq:5, title:"Thevenin / Norton equivalent",
 sources:["2016 Q2 – three parallel branches with sources (same layout as Sadiku 4.60, different values)","2019 Q4 – find $V_{Th}$, $R_{Th}$, $I_N$ and the $R_L$ for max power","2020 B4 – Norton with a VCCS (gives $R_N=4\\,\\Omega$)","2020 B5 – Thevenin of a bridge","Tutorial 2 Q3–Q5"],
 steps:["Remove the load and label terminals $a$, $b$.","$V_{Th}$: open-circuit voltage, usually by dividers or nodal.","$R_{Th}$: no dependent sources → kill sources, combine resistors. With dependent sources → $v_{oc}/i_{sc}$ or a 1 A test source.","$I_N=V_{Th}/R_{Th}$. Draw both equivalents with the values marked."],
 find:"thevenin"
},
{
 id:"q-mpt", icon:"⚡", scope:"mid", freq:5, title:"Maximum power transfer (+ % of source power)",
 sources:["2016 Q3 – black box from a table of $(R,V,i)$","2017 Q1 – 360 V source, 30 Ω, 150 Ω: $R_L$, $P_{max}$, % of source power","2018 Q1 – 40 V bridge (Sadiku 4.67)","2019 Q4, 2020 B4(d), 2020 B5(d)"],
 steps:["Find the Thevenin equivalent seen by $R_L$.","$R_L=R_{Th}$, $P_{max}=V_{Th}^2/4R_{Th}$.","For %: put $R_L$ back into the <i>original</i> circuit, find the source current, and use $P_{L}/P_{source}$."],
 find:"maximum power"
},
{
 id:"q-nodal", icon:"🟢", scope:"mid", freq:4, title:"Nodal analysis with dependent sources / supernodes",
 sources:["2016 Q1 – CCVS $2i$ and a 12 V source between nodes (Sadiku 3.20)","2017 Q3 – two dependent sources, find $v_o$","2019 Q2 – CCVS, 3 V and 5 V sources, find all node voltages and $I_x$","Tutorial 1 Q2, Q4"],
 steps:["Choose ground where the most elements meet (or at a voltage source's − end).","Every voltage source between two unknown nodes → supernode plus constraint equation.","Write the controlling variable in node voltages.","Solve, then answer exactly what was asked (a current, not just voltages)."],
 find:"nodal"
},
{
 id:"q-insp", icon:"🧮", scope:"mid", freq:2, title:"Write nodal / mesh equations by inspection",
 sources:["2017 Q2 – node-voltage equations by inspection (current sources only)","2018 Q2 – mesh-current equations by inspection (Sadiku 3.73)"],
 steps:["Diagonal = sum of conductances at the node (or resistances round the mesh).","Off-diagonal = minus the shared conductance (or resistance).","RHS = source currents <i>into</i> the node (or source voltages that push clockwise).","Write the matrix form. Solving it is a bonus."],
 find:"inspection"
},
{
 id:"q-mesh", icon:"🔁", scope:"mid", freq:2, title:"Mesh analysis with current sources / supermesh",
 sources:["Tutorial 1 Q3 (Δ–Y network: $v_{ab}$, $i_o$)","Tutorial 1 Q5 (3 A source shared by two meshes, CCVS $2v_o$)"],
 steps:["Clockwise currents in every window.","Current source on an outer edge → that mesh current is known.","Shared current source → supermesh: KVL round both, plus $i_a-i_b=I_s$."],
 find:"mesh"
},
{
 id:"q-sup", icon:"➕", scope:"mid", freq:2, title:"Superposition",
 sources:["2019 Q3 – two dependent sources, find $I_x$, $I_y$, $V_x$","Tutorial 2 Q1 – 6 A and 30 V with a CCCS"],
 steps:["One independent source at a time: V source → short, I source → open.","Keep all dependent sources.","Add the partial responses with signs.","Never add powers."],
 find:"superposition"
},
{
 id:"q-req", icon:"🧩", scope:"mid", freq:3, title:"Equivalent resistance / divider networks",
 sources:["2019 Q1 – $R$ at dc (L → short, C → open)","2020 A1 – balanced bridge, find $i$","2020 A2 – LED driver: KCL with a known branch current","Tutorial 1 Q1"],
 steps:["Merge wire-connected points into single nodes first.","Look for a balanced bridge (no middle current).","Collapse from the far end towards the terminals.","At dc: inductor = wire, capacitor = open."],
 find:"parallel"
},
{
 id:"q-oa", icon:"🔺", scope:"mid", freq:1, title:"Ideal op-amp properties / inverting amplifier",
 sources:["2020 A3 – name two characteristics of an ideal op amp","Slides 7–8 – non-ideal op amp example","Slide 9 – inverting amplifier gain"],
 steps:["Ideal: $A\\to\\infty$, $R_i\\to\\infty$, $R_o\\to0$.","So $i_+=i_-=0$ and $v_+=v_-$.","KCL at the − input gives the gain."],
 find:"op amp"
},
{
 id:"q-design", icon:"✏️", scope:"mid", freq:1, title:"Build a circuit from its Thevenin equivalent",
 sources:["2019 Q5 – $I_s=24$ mA, $R_1=6$ kΩ, $R_2=1$ kΩ, $R_3=3$ kΩ give $V_{Th}=43.2$ V, $R_{Th}=2.1$ kΩ"],
 steps:["Try the $R_{Th}$ first: which series/parallel combination of the given resistors gives it?","Then place the source so the divider gives $V_{Th}$.","Check both numbers."],
 find:"source transformation"
},
// since the midterm (scope "late")
{q2:true, id:"q-oa2", icon:"🔺", scope:"late", freq:4, title:"Op-amp amplifiers: summer, difference, non-inverting, cascade",
 sources:["2017 Q4(a) – design $v_o=8(v_b-v_a)$","2019 Q6 – choose $R_1$, $R_2$ so $V_o=5(V_2-V_1)$ (two op amps)","2020 B2 – non-inverting summer $v_o=v_1+2v_2+4v_3$, then $i_1$ and $i_o$","Lecture 5 Examples 2–9"],
 steps:["Name each stage (inverting, non-inverting, summer, difference). Use its formula if it matches exactly.","If not, set $v_-=v_+$, no input current, and write KCL at the − node (and at the + node if it has a resistor network).","Cascade: work stage by stage from the input.","Design questions: match coefficients, then pick sensible values (10 kΩ–100 kΩ).","$i_o$: KCL at the output node (load + feedback)."],
 find:"amplifier"},
{q2:true, id:"q-sat", icon:"📏", scope:"late", freq:3, title:"Saturation and linear-range limits",
 sources:["2017 Q4(b) – range of $v_b$ with ±8 V rails ($0\\le v_b\\le2$ V)","2020 B2(d) – largest $v_3$ before ±12 V saturation (2.5 V)","2017 Q9 – how long until the integrator hits −6 V"],
 steps:["Write $v_o$ in terms of the input you're varying.","Apply $-V_{CC}\\le v_o\\le V_{CC}$ and solve the inequality.","For integrators, find the time when the ramp reaches the rail."],
 find:"saturation"},
{id:"q-int", icon:"∫", scope:"late", freq:4, title:"Integrator, differentiator, analog computer",
 sources:["2016 Q6 – integrator driving a 10 Ω load","2017 Q9 – integrator with an initial 5 V on C, switched input","2018 Q3 – 2.5 mV dc into a 100 kΩ/20 µF integrator","2018 Q4(a) – analog computer for $v''+5v=-2f(t)$","Lecture 7 Examples 11–13"],
 steps:["$RC$ first. Then $v_o(t)=v_o(0)-\\frac1{RC}\\int v_i\\,dt$.","Get $v_o(0)$ from the initial capacitor voltage: $v_-=0$, so $v_o=-v_C$ (with + on the input side).","Piecewise input → piecewise ramps; restart the integral at each switch.","Analog computer: isolate the highest derivative, integrate twice, feed back with $1/RC$ gains, fix signs with inverters."],
 find:"integrator"},
{q2:true, id:"q-oa3", icon:"🔀", scope:"late", freq:2, title:"Special op-amp circuits: Howland pump, comparator, instrumentation amp",
 sources:["2016 Q5 – Howland current pump: $i_L=V_{in}/R$","2019 Q7 – comparator transfer curve + explain the name","Lecture 5 Example 6 – instrumentation amp derivation"],
 steps:["Comparator has no feedback: output is $\\pm V_{CC}$, switching at $v_{in}=V_{ref}$.","Howland: $v_-=v_o/2$, then KCL at the load node.","\"Show that\" questions: label every node voltage, use $v_-=v_+$ and equal currents in series resistors."],
 find:"op amp"},
{q2:true, id:"q-diode", icon:"🔦", scope:"late", freq:2, title:"Diode transfer characteristic (ideal / constant-voltage model)",
 sources:["2016 Q10 – two diodes with batteries $V$: dead zone $|V_i|\\le V$","2019 Q9 – clamps at +3 V, slope 1/3 below −2 V","Lecture 6 slides 10–11, 21"],
 steps:["For each diode, find the input voltage at which it turns on.","Split the $v_i$ axis at those break points.","In each region replace ON diodes with shorts (or 0.7 V) and OFF with opens; write $v_o$ as a divider.","Sketch with slopes and break points labelled."],
 find:"diode"},
{q2:true, id:"q-diode2", icon:"🔍", scope:"late", freq:1, title:"Which diodes are on? (assume and check, diode logic)",
 sources:["Lecture 6 Examples 1–2 (two diodes, ±10 V)","Lecture 6 slides 12–13 (OR / AND gates)"],
 steps:["Assume a state for each diode.","Solve the resulting linear circuit.","Check: ON diodes need $i_D\\ge0$, OFF diodes need $v_D\\le0$. Fix any contradiction and redo."],
 find:"diode"},
{q2:true, id:"q-ss", icon:"〽️", scope:"late", freq:2, title:"Diode small-signal analysis",
 sources:["2016 Q11 – $\\Delta V_{out}$ for a 1 V change in $V_{in}$","2019 Q10 – $v_o/v_s$ with a current-source-biased diode","Lecture 6 Example 3 ($r_d\\approx8.6\\,\\Omega$)"],
 steps:["DC: find $I_D$ (constant-voltage model, AC sources off, caps open).","$r_d=V_T/I_D$.","AC: DC sources off, caps short, diode → $r_d$. Solve the divider."],
 find:"small-signal"},
{id:"q-rect", icon:"🔋", scope:"late", freq:1, title:"Rectifiers and peak detectors",
 sources:["Lecture 6 slides 29–32","Lab CCT01"],
 steps:["Half-wave: $v_{out}=v_{in}-V_{D,on}$ while conducting.","With C: holds $V_p-V_{D,on}$; reverse stress ~$2V_p$; ripple falls as $C$ grows.","Bridge: $|v_{in}|-2V_{D,on}$."],
 find:"rectifier"},
{id:"q-lc", icon:"🧱", scope:"late", freq:4, title:"Equivalent C or L of a network",
 sources:["2016 Q4 – six capacitors with jumpers ($3C/4$)","2017 Q5 – $C_{eq}=1.6C$, $L_{eq}=5L/8$","2018 Q4(b) – $L_{eq}=L/2$","Lecture 7 Examples 6, 9"],
 steps:["Label the nodes. Every plain wire (including a rectangle or arc around the network) merges points into one node.","Delete elements with both ends on the same node, or hanging off a node with no other connection.","C: parallel adds, series is reciprocal. L: like resistors."],
 find:"parallel"},
{id:"q-lct", icon:"📈", scope:"late", freq:3, title:"C and L with time-varying signals",
 sources:["2017 Q6 – $i_1=0.6e^{-2t}$ in 3 H ∥ 6 H + 8 H","2020 A4 – when is capacitor energy smallest?","Lecture 7 Examples 2–4, 7, 10"],
 steps:["$i=C\\,dv/dt$ or $v=L\\,di/dt$ to differentiate.","Integrate the other way, and don't forget the initial value.","Parallel inductors: same voltage, each keeps its own $i(0)$.","Energy: $\\tfrac12Cv^2$, $\\tfrac12Li^2$."],
 find:"law"},
{id:"q-dc", icon:"⏸️", scope:"late", freq:3, title:"DC steady state with C and L",
 sources:["2019 Q1 – $R$ at dc","2020 B1(a),(d) – $i(0^-)$ and stored energy","Lecture 7 Examples 5, 8"],
 steps:["C → open, L → short.","Solve the resistive circuit.","Energies from $v_C$ and $i_L$."],
 find:"dc"},
{id:"q-rc1", icon:"⏱️", scope:"late", freq:3, title:"First-order switching (RC / RL)",
 sources:["2018 Q6 – two switches, 5 H: $i(1)\\approx2.00$ A, $i(3)=3.589$ A","2019 Q8 – resistor removed at 0, back at 100 ms","2020 B1 – $v(0^+)$ and $di/dt(0^+)$"],
 steps:["$t=0^-$: DC circuit → $v_C$ or $i_L$.","$t=0^+$: same $v_C$ / $i_L$; re-solve everything else.","$t=\\infty$: DC again. τ from $R_{Th}$.","$x(t)=x(\\infty)+[x(0^+)-x(\\infty)]e^{-t/\\tau}$; restart at every later switching time."],
 find:"first-order"},
{id:"q-rlc", icon:"〰️", scope:"late", freq:3, title:"Second-order RLC: roots, damping, response",
 sources:["2017 Q7 – parallel RLC roots for two R values, critical R","2018 Q7 – underdamped $v(t)$ from $V_0$, $I_0$","2020 B3 – L from roots, derive the ODE, $i(t)$"],
 steps:["Series or parallel? Pick the right α.","Roots → over/critical/under-damped.","$x(0^+)$ and $x'(0^+)$ from KCL/KVL at $0^+$.","Fit the two constants. Step response: add $x(\\infty)$."],
 find:"damping"},
{id:"q-ac", icon:"🌀", scope:"late", freq:3, title:"Phasors / AC Thevenin / filters (probably not this year)",
 sources:["2016 Q7–Q9, 2017 Q8, 2018 Q5, Q8"],
 steps:["Not in the 2026 course outline, which ends at first/second-order circuits. Skip unless Dr Lee says otherwise."],
 find:"rlc"},
];

const PAPERS = [
 {name:"Final Dec 2016", note:"Q7–Q9 use phasors (not in this year's outline)", items:[
   ["Q1","Nodal with CCVS 2i + 12 V source (supernode)"],["Q2","Thevenin & Norton of a three-branch circuit"],["Q3","Black box from a table → i at 6 Ω, max power"],["Q4","$C_{eq}$ of six capacitors with jumpers"],["Q5","Howland current pump"],["Q6","Integrator driving a 10 Ω load"],["Q7–Q9","Phasors, AC mesh, high-pass filter (skip)"],["Q10","Diode transfer function, ideal model"],["Q11","Small-signal: $\\Delta V_{out}$ for two diodes"]]},
 {name:"Final Dec 2017", note:"Q8 uses phasors (skip)", items:[
   ["Q1","Max power to $R_L$ + % of 360 V source power"],["Q2","Node-voltage equations by inspection"],["Q3","Nodal with two dependent sources, find $v_o$"],["Q4","Difference amplifier design + linear range"],["Q5","$C_{eq}$ and $L_{eq}$"],["Q6","Parallel/series inductors with $i_1(t)$"],["Q7","Parallel RLC roots and damping"],["Q8","AC Thevenin (skip)"],["Q9","Integrator saturation time"]]},
 {name:"Final Dec 2018", note:"Q5 and Q8 use phasors (skip)", items:[
   ["Q1","Bridge: $R_L$ for max power, $P_{max}$, % of 40 V source power"],["Q2","Mesh-current equations by inspection"],["Q3","Integrator with a dc input"],["Q4","Analog computer + $L_{eq}$"],["Q5","Band-pass filter, resonance (skip)"],["Q6","RL with two switches"],["Q7","Underdamped parallel RLC"],["Q8","AC Thevenin + max average power (skip)"]]},
 {name:"Final Dec 2019", note:"Every question is in this year's range", items:[
   ["Q1","R at dc (L short, C open)"],["Q2","Nodal: all node voltages and $I_x$"],["Q3","Superposition with two dependent sources"],["Q4","Thevenin, Norton, $R_L$ for max power"],["Q5","Sketch the circuit from given Thevenin values"],["Q6","Two-op-amp difference amplifier"],["Q7","Comparator"],["Q8","RC with a resistor switched out and back in"],["Q9","Diode transfer curve, ideal model"],["Q10","Diode small-signal $v_o/v_s$"]]},
 {name:"Final Dec 2020 (open book)", note:"A all + any four of B. Every question is in range", items:[
   ["A1","Balanced bridge current"],["A2","LED driver: KCL with known $I_{LED}$"],["A3","Two properties of an ideal op amp"],["A4","Capacitor: time of minimum energy"],["B1","RL switching: $i(0^-)$, $v(0^+)$, $di/dt$, energy"],["B2","Non-inverting summer"],["B3","Parallel RLC: L from roots, ODE, $i(t)$"],["B4","Norton with VCCS + max power"],["B5","Thevenin of a bridge + max power"]]},
 {name:"Tutorials 1–2", note:"Set by your lecturer this term", items:[
   ["T1 Q1–Q3","$R_{eq}$, nodal (4 nodes), mesh on a Δ–Y network"],["T1 Q4–Q5","Nodal and mesh with dependent sources"],["T2 Q1–Q2","Superposition, source transformation"],["T2 Q3–Q5","Thevenin, Norton (with a dependent source)"]]},
];
