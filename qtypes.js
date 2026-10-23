// Question types seen in the tutorials and the 2016–2021 past papers.
// scope: "mid" = Lectures 1–4 + op amp slides 1–9 (midterm range); "late" = later topics (finals only)
// find = keyword(s) that jump to related equations in the Equations tab
const QTYPES = [
{
 id:"q-th", icon:"🔌", scope:"mid", freq:5, title:"Thevenin / Norton equivalent",
 sources:["2016 Q2 – three parallel branches with sources (Sadiku 4.60)","2019 Q4 – find $V_{Th}$, $R_{Th}$, $I_N$ and the $R_L$ for max power","2020 B4 – Norton with a VCCS (gives $R_N=4\,\Omega$)","2020 B5 – Thevenin of a bridge","Tutorial 2 Q3–Q5"],
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
// later topics
{id:"q-lc", icon:"🔋", scope:"late", freq:4, title:"Capacitors & inductors (energy, series/parallel)", sources:["2016 Q4, 2017 Q5–Q6, 2018 Q4(b), 2020 A4"], steps:["$i=C\\,dv/dt$, $v=L\\,di/dt$, $w=\\tfrac12Cv^2$, $w=\\tfrac12Li^2$."], find:"thevenin"},
{id:"q-rlc", icon:"〰️", scope:"late", freq:4, title:"First/second-order transients (RL, RC, RLC)", sources:["2017 Q7, 2018 Q6–Q7, 2019 Q8, 2020 B1, B3"], steps:["Initial/final values, time constant, characteristic roots."], find:"thevenin"},
{id:"q-ac", icon:"🌀", scope:"late", freq:3, title:"Phasors / AC Thevenin / filters", sources:["2016 Q7–Q9, 2017 Q8, 2018 Q5, Q8"], steps:["Impedances $j\\omega L$, $1/j\\omega C$; same theorems in complex form."], find:"thevenin"},
{id:"q-oa2", icon:"🔻", scope:"late", freq:4, title:"Op-amp circuits after slide 9", sources:["2016 Q5 Howland pump, 2017 Q4, Q9, 2018 Q3–Q4, 2019 Q6–Q7, 2020 B2"], steps:["Summing, difference, integrator, comparator."], find:"op amp"},
{id:"q-diode", icon:"🔦", scope:"late", freq:3, title:"Diode circuits", sources:["2016 Q10–Q11, 2019 Q9–Q10"], steps:["Ideal / constant-drop / small-signal models."], find:"thevenin"},
];

const PAPERS = [
 {name:"Final Dec 2016", note:"Q1–Q3 are in range", items:[
   ["Q1","Nodal with CCVS 2i + 12 V source (supernode)"],["Q2","Thevenin & Norton of a three-branch circle circuit"],["Q3","Black box from a table → i at 6 Ω, max power"],["Q4","Capacitors (out of range)"],["Q5","Howland current pump (out of range)"],["Q6–Q9","Transients, phasors, filter (out of range)"],["Q10–Q11","Diodes (out of range)"]]},
 {name:"Final Dec 2017", note:"Q1–Q3 are in range", items:[
   ["Q1","Max power to $R_L$ + % of 360 V source power"],["Q2","Node-voltage equations by inspection"],["Q3","Nodal with two dependent sources, find $v_o$"],["Q4","Difference amplifier design (out of range)"],["Q5–Q7","L, C, RLC (out of range)"],["Q8","AC Thevenin (out of range)"],["Q9","Integrator saturation (out of range)"]]},
 {name:"Final Dec 2018", note:"Q1–Q2 are in range", items:[
   ["Q1","Bridge: $R_L$ for max power, $P_{max}$, % of 40 V source power"],["Q2","Mesh-current equations by inspection"],["Q3–Q4","Op-amp integrator / analog computer (out of range)"],["Q5–Q8","Filters, RL/RLC, AC (out of range)"]]},
 {name:"Final Dec 2019", note:"Q1–Q5 are in range", items:[
   ["Q1","R at dc (L short, C open)"],["Q2","Nodal: all node voltages and $I_x$"],["Q3","Superposition with two dependent sources"],["Q4","Thevenin, Norton, $R_L$ for max power"],["Q5","Sketch the circuit from given Thevenin values"],["Q6–Q7","Difference amp, comparator (out of range)"],["Q8–Q10","Transient, diodes (out of range)"]]},
 {name:"Final Dec 2020 (open book)", note:"A1–A3, B4, B5 are in range", items:[
   ["A1","Balanced bridge current"],["A2","LED driver: KCL with known $I_{LED}$"],["A3","Two properties of an ideal op amp"],["A4","Capacitor energy (out of range)"],["B1","RL switching (out of range)"],["B2","Non-inverting summer (out of range)"],["B3","Parallel RLC (out of range)"],["B4","Norton with VCCS + max power"],["B5","Thevenin of a bridge + max power"]]},
 {name:"Tutorials 1–2", note:"Set by your lecturer this term", items:[
   ["T1 Q1–Q3","$R_{eq}$, nodal (4 nodes), mesh on a Δ–Y network"],["T1 Q4–Q5","Nodal and mesh with dependent sources"],["T2 Q1–Q2","Superposition, source transformation"],["T2 Q3–Q5","Thevenin, Norton (with a dependent source)"]]},
];
